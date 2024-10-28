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
    <DashBox :status="no_item" :content="'No Diagnosis added'" />

    <span v-if="display_item">
        <list
            classNames="dashed_bottom_border"
            :listData="diagnosis[0].selectedData"
            @clicked:edit="editDiagnosis($event)"
            @clicked:delete="deleteDiagnosis"
        >
        </list>
    </span>

    <ion-row v-if="search_item">
        <basic-form :contentData="diagnosis" @update:selected="handleInputData" @update:inputValue="handleInputData" @clicked:button="addNewRow">
        </basic-form>
    </ion-row>
    <ion-row v-if="addItemButton" style="margin-top: 10px">
        <DynamicButton fill="clear" :icon="iconsContent.plus" iconSlot="icon-only" @clicked:btn="displayInputFields()" name="Add new Diagnosis" />
    </ion-row>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous Diagnosis</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <previousDiagnosis />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
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

            header: ["Diagnosis", "Order Date", "Action"],
        };
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    computed: {
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useDemographicsStore, ["demographics"]),
        inputFields() {
            return this.diagnosis[0].data.rowData[0].colData;
        },
    },
    watch: {
        diagnosis: {
            handler() {
                this.setDashedBox();
            },
            deep: true,
        },
    },
    async mounted() {
        this.updateDiagnosisStores();
        this.setDashedBox();
        await this.setListData();
        // this.$nextTick(() => {
        //     const table = (this.$refs.dataTable as any).dt;
        //     table.columns.adjust().draw();
        //     table.on("click", ".delete-btn", (e: Event) => {
        //         const data: any = (e.target as HTMLElement).getAttribute("data-id");
        //         // this.voidLabOrder(JSON.parse(data), e);
        //     });
        // });
    },
    methods: {
        async setListData() {
            const obsP = await ObservationService.getAll(this.demographics.patient_id, "Primary diagnosis");
            const obsS = await ObservationService.getAll(this.demographics.patient_id, "Secondary diagnosis");
            const observations = [...(obsP || []), ...(obsS || [])];
            this.tableData = await this.generateListItems(observations);
            console.log("🚀 ~ setListData ~ this.tableData:", this.tableData);

            // await this.updateInvestigationWizard();
            DataTable.use(DataTablesCore);
        },
        async generateListItems(data: any) {
            if (data.length > 0) {
                // Use Promise.all to wait for all async operations to complete
                const promiseResults = await Promise.all(
                    data.map(async (item: any) => {
                        const name = await ObservationService.getConceptName(item.value_coded);
                        const obs_date = item.obs_datetime;
                        return [
                            name,
                            HisDate.toStandardHisFormat(obs_date),
                            `<button class="btn btn-outline-danger btn-sm delete-btn" data-id='${JSON.stringify(item)}'>${
                                this.iconsContent.delete2
                            }</button>`,
                        ];
                    })
                );

                return promiseResults;
            } else {
                return [];
            }
        },
        displayInputFields() {
            this.conditionStatus = "";
            this.selectedText = "";
            this.no_item = false;
            this.addItemButton = false;
            this.search_item = true;
        },
        async validaterowData() {
            this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = false;
            this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "";

            this.diagnosisData = await this.getDiagnosis(this.inputFields[0].value);
            if (this.inputFields[0].value == this.diagnosisData[0]?.name) {
                return true;
            } else {
                this.search_item = true;
                this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = true;
                this.diagnosis[0].data.rowData[0].colData[0].alertsErrorMassage = "Please select diagnosis from the list";
                return false;
            }
        },
        async addNewRow() {
            if (await this.validaterowData()) {
                this.diagnosis[0].data.rowData[0].colData[0].value = this.inputFields[0].value;
                this.search_item = false;
                this.display_item = true;
                this.addItemButton = true;
                this.buildDiagnosis();
            }
            this.diagnosis[0].data.rowData[0].colData[0].value = "";
            this.diagnosis[0].data.rowData[0].colData[0].popOverData.data = [];
        },
        buildDiagnosis() {
            this.diagnosis[0].selectedData.push({
                actionBtn: true,
                btn: ["edit", "delete"],
                name: this.inputFields[0].value,
                id: this.diagnosisData[0].concept_id,
                display: [this.inputFields[0].value],
                data: {
                    concept_id: 6542, //primary diagnosis
                    value_coded: this.diagnosisData[0].concept_id,
                    obs_datetime: Service.getSessionDate(),
                },
            });
        },
        updateDiagnosisStores() {
            const diagnosisStore = useDiagnosisStore();
            diagnosisStore.setDiagnosis(this.diagnosis);
        },
        openPopover(e: any) {
            this.event = e;
            this.popoverOpen = true;
        },
        async handleInputData(col: any) {
            if (col.inputHeader == "Diagnosis") {
                this.diagnosisData = await this.getDiagnosis(col.value);
                this.diagnosis[0].data.rowData[0].colData[0].popOverData.data = this.diagnosisData;
                this.validaterowData();
            }
        },
        async getDiagnosis(value: any) {
            return await PatientDiagnosisService.getDiagnosis(value, 1, 5);
        },
        editDiagnosis(test: any) {
            this.deleteDiagnosis(test);
            this.selectedText = test.name;
            this.diagnosis[0].data.rowData[0].colData[0].value = test.name;
            this.addItemButton = false;
            this.search_item = true;
            this.updateDiagnosisStores();
        },
        async openDeletePopover(e: any) {
            const deleteConfirmed = await popoverConfirmation(`Do you want to delete ${e.name} ?`, e.event);
            if (deleteConfirmed) {
                this.deleteDiagnosis(e.name);
            }
        },
        deleteDiagnosis(diagnosis: any) {
            this.diagnosis[0].selectedData = this.diagnosis[0].selectedData.filter((item: any) => item.display[0] !== diagnosis.name);
            this.updateDiagnosisStores();
        },
        setDashedBox() {
            if (this.inputFields[0].value) {
                this.addItemButton = false;
                this.search_item = true;
                this.no_item = false;
            }
            if (this.diagnosis[0].selectedData.length > 0) {
                this.display_item = true;
                this.no_item = false;
            } else if (!this.search_item) {
                this.no_item = true;
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
