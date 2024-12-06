<template>
    <ion-header style="display: flex; justify-content: space-between">
        <ion-title class="modalTitle">Add Diagnosis</ion-title>
        <ion-icon @click="dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="iconsContent.cancel"></ion-icon>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <div class="modal_wrapper">
            <div class="">
                <basic-form :contentData="diagnosis" @search-change="getDiagnosis" @update:inputValue="handleInputData"> </basic-form>
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
import { useDiagnosisStore } from "@/apps/NCD/stores/DiagnosisStore";
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
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { ConceptService } from "@/services/concept_service";

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
        ...mapState(useDemographicsStore, ["patient"]),
    },
    async mounted() {
        await this.getDiagnosis("");
    },
    methods: {
        async getDiagnosis(value: any) {
            const diagnosis = await PatientDiagnosisService.getDiagnosis(value, 1, 5);
            modifyFieldValue(this.diagnosis, "diagnosis", "multiSelectData", diagnosis);
        },
        dismiss() {
            modalController.dismiss();
        },
        async addNewRow() {
            const diagnosis = getFieldValue(this.diagnosis, "diagnosis", "value")?.name;
            modifyFieldValue(this.diagnosis, "diagnosis", "alertsErrorMassage", "");
            if (diagnosis) {
                const concept_id = await ConceptService.getConceptID(diagnosis, true);
                await saveEncounterData(this.patient.patientID, EncounterTypeId.DIAGNOSIS, "" as any, [
                    {
                        concept_id: 6542, //primary diagnosis
                        value_coded: concept_id,
                        obs_datetime: ConceptService.getSessionDate(),
                    },
                ]);
                toastSuccess("Diagnosis successfully saved");
                this.dismiss();
            } else {
                modifyFieldValue(this.diagnosis, "diagnosis", "alertsErrorMassage", "Please select diagnosis from the list");
            }
        },
        updateDiagnosisStores() {
            const diagnosisStore = useDiagnosisStore();
            diagnosisStore.setDiagnosis(this.diagnosis);
        },
        async handleInputData(col: any) {
            modifyFieldValue(this.diagnosis, "diagnosis", "alertsErrorMassage", "");
        },
    },
});
</script>

<style scoped>
.background {
    /* background-color: #fff; */
}
</style>
