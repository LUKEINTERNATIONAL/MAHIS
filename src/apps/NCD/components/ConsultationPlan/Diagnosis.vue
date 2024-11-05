<template>
    <div class="table-responsive">
        <DataTable ref="dataTable" :options="options" :data="tableData" class="display nowrap" width="100%">
            <thead>
                <tr>
                    <th v-for="head in header" :key="head">{{ head }}</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { icons } from "@/utils/svg";
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import DashBox from "@/components/DashBox.vue";
import SelectionPopover from "@/components/SelectionPopover.vue";
import BasicInputField from "@/components/BasicInputField.vue";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation } from "@/utils/Alerts";
import List from "@/components/List.vue";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import { Service } from "@/services/service";
import previousDiagnosis from "@/apps/NCD/components/ConsultationPlan/previousVisits/previousDiagnosis.vue";
import { Diagnosis } from "../../services/diagnosis";
import HisDate from "@/utils/Date";
import { ObservationService } from "@/services/observation_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import DataTablesResponsive from "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-dt";
import "datatables.net-responsive";
import "datatables.net-select";
import "datatables.net-buttons";
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import AddDiagnosisModal from "./Diagnosis/AddDiagnosisModal.vue";
import { EncounterService } from "@/services/encounter_service";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
        DashBox,
        SelectionPopover,
        BasicInputField,
        List,
        BasicForm,
        DynamicButton,
        previousDiagnosis,
        DataTable,
    },
    data() {
        return {
            iconsContent: icons,
            no_item: false,
            search_item: false,
            display_item: false,
            addItemButton: true,
            selectedText: "" as any,
            conditionStatus: "" as any,
            data: [] as any,
            diagnosisData: [] as any,
            popoverOpen: false,
            event: "" as any,
            selectedCondition: "" as any,
            tableData: [] as any,
            options: {
                responsive: true,
                select: false,
                layout: {
                    topStart: "buttons",
                    topEnd: "search",
                    bottomStart: "info",
                    bottomEnd: "paging",
                },
                ordering: false,
                buttons: [
                    {
                        text: " <b>+ Add diagnosis </b>",
                        className: "add-test text-white",
                        action: async () => {
                            await this.openEnterResultModal();
                        },
                    },
                ],
            } as any,

            header: ["Diagnosis", "Date", "Action"],
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    watch: {
        $route: {
            async handler() {
                await this.setListData();
            },
            deep: true,
        },
    },
    async mounted() {
        await this.setListData();
        this.$nextTick(() => {
            const table = (this.$refs.dataTable as any).dt;
            table.columns.adjust().draw();
            table.on("click", ".delete-btn", (e: Event) => {
                const data: any = (e.target as HTMLElement).getAttribute("data-id");
                this.voidDiagnosis(JSON.parse(data), e);
            });
        });
    },
    methods: {
        async voidDiagnosis(data: any, event: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${data.name} ?`, event);
            if (deleteConfirmed) {
                await ObservationService.voidObs(data.id);
                await this.setListData();
            }
        },
        async openEnterResultModal() {
            await createModal(AddDiagnosisModal, { class: "lab-results-modal" }, true);
            await this.setListData();
        },
        async setListData() {
            const obsP = await ObservationService.getAll(this.demographics.patient_id, "Primary diagnosis");
            const obsS = await ObservationService.getAll(this.demographics.patient_id, "Secondary diagnosis");
            const observations = [...(obsP || []), ...(obsS || [])];
            this.tableData = await this.generateListItems(observations);
            DataTable.use(DataTablesCore);
        },
        async generateListItems(data: any) {
            if (data.length > 0) {
                const promiseResults = await Promise.all(
                    data.map(async (item: any) => {
                        const name = await ObservationService.getConceptName(item.value_coded);
                        const obs_date = item.obs_datetime;
                        return [
                            name,
                            HisDate.toStandardHisFormat(obs_date),
                            `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify({
                                id: item.obs_id,
                                name: name,
                            })}'>${this.iconsContent.delete2}</button>`,
                        ];
                    })
                );

                return promiseResults;
            } else {
                return [];
            }
        },
    },
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-buttons-dt";
@import "datatables.net-responsive-dt";
@import "datatables.net-select-dt";

.table-responsive {
    width: 100%;
    overflow-x: auto;
}
div.dt-buttons > .dt-button:first-child {
    border: 1px solid #fff;
    background: #046c04;
    border-radius: 5px;
}
div.dt-buttons > .dt-button:hover:not(.disabled) {
    background: #188907 !important;
    border: 1px solid #fff !important;
}
.dt-type-date {
    text-align: left !important;
}
</style>
<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}

.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons {
    padding-left: 20px;
}
.item_no_border {
    --border-color: transparent;
}
.search_result {
    padding: 10px;
}
</style>
