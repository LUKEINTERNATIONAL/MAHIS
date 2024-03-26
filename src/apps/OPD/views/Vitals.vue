<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Vitals"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
            />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
//import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useDispositionStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { useVitalsStore } from "../stores/OpdVitalsStore";
import { getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        DemographicBar,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        IonModal,
        Stepper,
    },
    data() {
        return {
            dispositions: "" as any,
            wizardData: [
                {
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    componet: "OPDVitals",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
       // ...mapState(useInvestigationStore, ["investigations"]),
       // ...mapState(useDiagnosisStore, ["diagnosis"]),
       // ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
    },
    mounted() {
        this.markWizard();
        this.handleHeight();
        this.handleSpecifyHeight()
        this.handlePulseRate()
        this.handlePulseRateNotDone()
        this.handlePulseOtherNotDone()
        this.handleBloodPressureDone()
        this.handleBPNotDone()
        this.handleRespiratoryRateDone()
        this.handleRespiratoryRateNotDone()
        this.handleRespiratoryRateNotDoneReason()
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
                this.handleHeight();
                this.handleSpecifyHeight()
                this.handlePulseRate()
                this.handlePulseRateNotDone()
                this.handlePulseOtherNotDone()
                this.handleBloodPressureDone()
                this.handleBPNotDone()
                this.handleRespiratoryRateDone()
                this.handleRespiratoryRateNotDone()
                this. handleRespiratoryRateNotDoneReason()
            },
            deep: true,
        },
        investigations: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        diagnosis: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        selectedMedicalDrugsList: {
            handler() {
                this.markWizard();
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        handleHeight(){
            if(getRadioSelectedValue(this.vitals,'OpdTemperature')=='yes'){
                modifyFieldValue(this.vitals,'Temp','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'Temp','displayNone',true)
            }
        },
        handleSpecifyHeight(){
            if(getRadioSelectedValue(this.vitals,'OpdTemperature')=='no'){
                modifyRadioValue(this.vitals,'temperatureNotDone','displayNone',false)
            }else{
                 modifyRadioValue(this.vitals,'temperatureNotDone','displayNone',true)
            }
        },
        handlePulseRate(){
            if(getRadioSelectedValue(this.vitals,'OpdPulseRate')=='done'){
                modifyFieldValue(this.vitals,'Pulse','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'Pulse','displayNone',true)
            }
        },
        handlePulseRateNotDone(){
            if(getRadioSelectedValue(this.vitals,'OpdPulseRate')=='notDone'){
                modifyRadioValue(this.vitals,'OpdPulseRateNotDone','displayNone',false)
            }else{
                 modifyRadioValue(this.vitals,'OpdPulseRateNotDone','displayNone',true)
            }
        },
        handlePulseOtherNotDone(){
            if(getRadioSelectedValue(this.vitals,'OpdPulseRateNotDone')=='Other'){
                modifyFieldValue(this.vitals,'otherReason','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'otherReason','displayNone',true)
            }
        },
        handleBloodPressureDone(){
            if(getRadioSelectedValue(this.vitals,'OpdBloodPressure')=='done'){
                modifyFieldValue(this.vitals,'Systolic','displayNone',false)
                modifyFieldValue(this.vitals,'Diastolic','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'Systolic','displayNone',true)
                 modifyFieldValue(this.vitals,'Diastolic','displayNone',true)
            }
        },
        handleBPNotDone(){
            if(getRadioSelectedValue(this.vitals,'OpdBloodPressure')=='notDone'){
                modifyRadioValue(this.vitals,'OpdBloodPressureReason','displayNone',false)
            }else{
                 modifyRadioValue(this.vitals,'OpdBloodPressureReason','displayNone',true)
            }
        },
        handleRespiratoryRateDone(){
            if(getRadioSelectedValue(this.vitals,'OpdRespiratoryRate')=='done'){
                modifyFieldValue(this.vitals,'RespiratoryRate','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'RespiratoryRate','displayNone',true)
            }
        },
        handleRespiratoryRateNotDone(){
            if(getRadioSelectedValue(this.vitals,'OpdRespiratoryRate')=='notDone'){
                modifyRadioValue(this.vitals,'OpdRespiratoryRateNotDone','displayNone',false)
            }else{
                 modifyRadioValue(this.vitals,'OpdRespiratoryRateNotDone','displayNone',true)
            }
        },
        handleRespiratoryRateNotDoneReason(){
            if(getRadioSelectedValue(this.vitals,'OpdRespiratoryRateNotDone')=='reason'){
                modifyFieldValue(this.vitals,'Respiratory reason','displayNone',false)
            }else{
                 modifyFieldValue(this.vitals,'Respiratory reason','displayNone',true)
            }
        },
        markWizard() {
            if (this.vitals.validationStatus) {
                this.wizardData[0].checked = true;
                this.wizardData[0].class = "open_step common_step";
            } else {
                this.wizardData[0].checked = false;
            }

        },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        saveData() {
            if (this.vitals.validationStatus ) {
                this.saveVitals();
                this.saveOutComeStatus();
                this.$router.push("patientProfile");
            } else {
                toastWarning("Please complete all required fields");
                this.saveOutComeStatus();
            }
        },
        saveInvestigation() {
            const investigationInstance = new LabOrder();
            investigationInstance.postActivities(this.demographics.patient_id, this.getFormatedData(this.investigations[0].selectedData));
        },
        saveVitals() {
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            vitalsInstance.onFinish(this.vitals);
        },
        saveDiagnosis() {
            const userID: any = Service.getUserID();
            const diagnosisInstance = new Diagnosis();
            diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
        },

        async saveOutComeStatus() {
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        calculateExpireDate(startDate: string | Date, duration: any) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + parseInt(duration));
            return HisDate.toStandardHisFormat(date);
        },
    },
});
</script>

<style scoped></style>
