<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Physical examination"
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
import { defineComponent } from "vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/apps/ANC/store/physical exam/VitalsStore";
import { VitalsService } from "@/services/ANC/anc_vitals_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { getCheckboxSelectedValue, getFieldValue } from "@/services/data_helpers";
export default defineComponent({
    name: "PhysicalExam",
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
            wizardData: [
                {
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Maternal exam",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Fetal assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Fetal presentation",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "Presenting signs for IPV",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    component: "vitals",
                    value: "1",
                },
                {
                    title: "Maternal exam",
                    component: "MaternalExam",
                    value: "2",
                },
                {
                    title: "Fetal assessment",
                    component: "FetalAssessment",
                    value: "3",
                },
                {
                    title: "Fetal presentation",
                    component: "FetalPresentation",
                    value: "4",
                },
                {
                    title: "Presenting signs or conditions for IPV ",
                    component: "PresentingSigns",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore,["vitals"]),
        ...mapState(useVitalsStore,["respiration"]),
        ...mapState(useVitalsStore,["preEclampsia"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
    },
    mounted() {
        this.markWizard();
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        DangerSigns: {
            handler() {
                this.markWizard();
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
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
            // if(this.vitals.validationStatus){
            // this.wizardData[0].checked = true;
            // this.wizardData[0].class = "open_step common_step";
            // }else{
            //   this.wizardData[0].checked = false;
            // }

            // if(this.DangerSigns[0].selectdData.length > 0){
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = 'open_step common_step'
            // }else{
            //   this.wizardData[1].checked = false;
            // }

            // if (this.diagnosis[0].selectdData.length > 0) {
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = "open_step common_step";
            // } else {
            //     this.wizardData[2].checked = false;
            // }
        },
        deleteDisplayData(data: any){
          return  data.map((item: any) => {
            delete item?.display;
            return item?.data;
          });
        },
        saveData() {
            if (this.vitals) {
                this.saveVitals()
                // this.saveInvestigation();
                // this.saveDiagnosis();
                // this.saveTreatmentPlan();
                // this.saveOutComeStatus();
                this.$router.push("patientProfile");
            } else {
                toastWarning("Please complete all required fields");
                // this.saveOutComeStatus();
            }
        },

        buildVitals() {
        this.vitals[0].selectedData = {
          height: getFieldValue(this.vitals, "Height", "value"),
          weight: getFieldValue(this.vitals, "Weight", "value"),
          pregestation_weight: getFieldValue(this.vitals, "PreWeight", "value"),
          systolic_pressure: getFieldValue(this.vitals, "Systolic", "value"),
          diastolic_pressure: getFieldValue(this.vitals, "Diastolic", "value"),
          repeated_systolic_pressure: getFieldValue(this.vitals, "repeatedSystolic", "value"),
          repeated_diastolic_pressure: getFieldValue(
          this.vitals,
          "repeatedDiastolic",
          "value"
        ),
        temperature: getFieldValue(
          this.vitals,
          "Temp",
          "value"
        ),
        pulse_rate: getFieldValue(
          this.vitals,
          "Pulse",
          "value"
        ),
        oxygen_saturation: getFieldValue(
          this.vitals,
          "oxygenSaturation",
          "value"
        ),
        respiratory_rate: getFieldValue(
          this.vitals,
          "respiratoryRate",
          "value"
        ),
        respiration_exam: getCheckboxSelectedValue(this.respiration, "respirationExam"),
        pre_eclampsia: getCheckboxSelectedValue(
          this.preEclampsia,
          "preEclampsia"
        )
      };
    },
        // saveInvestigation() {
        //     const investigationInstance = new LabOrder();
        //     investigationInstance.postActivities(this.demographics.patient_id, this.getFormatedData(this.investigations[0].selectedData));
        // },
        saveVitals() {
            this.buildVitals();
            if (Object.keys(this.vitals[0].selectedData).length === 0)
            return;
            const userID: any = Service.getUserID();
            const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
            console.log(this.vitals[0].selectedData)
            vitalsInstance.onFinish(this.vitals[0].selectedData);
        },
        // saveDiagnosis() {
        //     const userID: any = Service.getUserID();
        //     const diagnosisInstance = new Diagnosis();
        //     diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
        // },
        // async saveTreatmentPlan() {
        //     const userID: any = Service.getUserID();
        //     const patientID = this.demographics.patient_id;
        //     const treatmentInstance = new Treatment();

        //     if (!isEmpty(this.selectedMedicalAllergiesList)) {
        //         const allergies = this.mapToAllergies();
        //         treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
        //     }

        //     if (!isEmpty(this.nonPharmalogicalTherapyAndOtherNotes)) {
        //         const treatmentNotesTxt = [
        //             {
        //                 concept_id: 2688,
        //                 obs_datetime: Service.getSessionDate(),
        //                 value_text: this.nonPharmalogicalTherapyAndOtherNotes,
        //             },
        //         ];
        //         treatmentInstance.onSubmitNotes(patientID, userID, treatmentNotesTxt);
        //     }

        //     if (!isEmpty(this.selectedMedicalDrugsList)) {
        //         const drugOrders = this.mapToOrders();
        //         const prescriptionService = new DrugPrescriptionService(patientID, userID);
        //         const encounter = await prescriptionService.createEncounter();
        //         if (!encounter) return toastWarning("Unable to create treatment encounter");
        //         const drugOrder = await prescriptionService.createDrugOrder(drugOrders);
        //         if (!drugOrder) return toastWarning("Unable to create drug orders!");
        //         toastSuccess("Drug order has been created");
        //     }
        //     this.$router.push("LabTests");
        // },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
