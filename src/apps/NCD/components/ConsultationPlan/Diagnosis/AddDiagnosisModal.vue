<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">Add Diagnosis</ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="modal_wrapper">
            <div class="">
                <basic-form
                    :contentData="diagnosis"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
                    @clicked:button="addNewRow"
                >
                </basic-form>
            </div>
        </div>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <ion-row>
            <ion-col>
                <DynamicButton @click="addNewRow()" name="Save" fill="solid" style="float: right; margin: 2%; width: 130px" />
            </ion-col>
        </ion-row>
    </ion-footer>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonInput,
    IonPopover,
    modalController,
} from "@ionic/vue";
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
import { saveEncounterData, EncounterTypeId } from "@/services/encounter_type";

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
        dismiss() {
            modalController.dismiss();
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
        async saveDiagnosis() {
            await saveEncounterData(this.demographics.patient_id, EncounterTypeId.DIAGNOSIS, "" as any, [
                {
                    concept_id: 6542, //primary diagnosis
                    value_coded: this.diagnosisData[0].concept_id,
                    obs_datetime: Service.getSessionDate(),
                },
            ]);
        },
        //  async saveDiagnosis() {
        //     if (this.diagnosis[0].selectedData.length > 0) {
        //         const userID: any = Service.getUserID();
        //         const diagnosisInstance = new Diagnosis();
        //         diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
        //     }
        // },
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

<style scoped>
.background {
    /* background-color: #fff; */
}
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
.action_buttons {
    opacity: 0; /* Initially hide the action buttons */
    transition: opacity 0.3s; /* Add a smooth transition effect */
}

.dashed_bottom_border:hover .action_buttons {
    opacity: 1; /* Show the action buttons when the row is hovered over */
}
.dashed_bottom_border {
    font-weight: 700;
}
.sub_item_body {
    margin-left: 45px;
}
ion-segment-button {
    background: #fff;
    margin-right: 1px;
    font-size: 12px;
    text-transform: unset;
}
.bottomSummary {
    margin-top: 20px;
    max-width: 600px;
}
.bottomSummary .segment-button-checked {
    background: #fff !important;
    --indicator-color: none;
}
.bottomSummary ion-segment-button {
    background: #e6e6e6;
    margin-right: 5px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    text-transform: unset;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
}
</style>
