<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Quick check"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
            />
            <ion-spinner v-if="isLoading" name="lines"></ion-spinner>
        </ion-content>
      <BasicFooter @finishBtn="saveData()" />
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
    IonSpinner,
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";


import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { useDangerSignsStore } from "@/apps/ANC/store/quickCheck/dangerSigns";
import { PastMedicalHistory } from "@/apps/OPD/services/past_medical_history_service";
import { PatientComplaintsService } from "@/apps/OPD/services/patient_complaints_service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { PatientGeneralConsultationService } from "@/services/patient_general_consultation";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "@/services/drug_prescription_service";
import HisDate from "@/utils/Date";
import { usePregnancyStore } from "@/apps/OPD/stores/PregnancyStore";
import { usePresentingComplaintsStore } from "@/apps/OPD/stores/PresentingComplaintsStore";
import { usePastMedicalHistoryStore } from "@/apps/OPD/stores/PastMedicalHistoryStore";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { usePhysicalExaminationStore } from "@/apps/OPD/stores/PhysicalExamination";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { DangerSignsService } from "@/apps/ANC/service/danger_signs_service";
import { useConfirmPregnancyStore } from "@/apps/ANC/store/quickCheck/confirmPregnancy";
import { ConfirmPregnancyService } from "@/apps/ANC/service/confirm_pregnancy_service";
import { SpecificHealthConcernsService } from "@/apps/ANC/service/specific_health_concerns_service";
import { useSpecificHealthConcernsStore } from "@/apps/ANC/store/quickCheck/specificHealthConcerns";
import { useReasonForVisitStore } from "@/apps/ANC/store/quickCheck/reasonForVisit";
import { ReasonForVisitService } from "@/apps/ANC/service/reason_for_visit_service";
import { resetPatientData } from "@/services/reset_data";
import { getCheckboxSelectedValue, getRadioSelectedValue } from "@/services/data_helpers";
import { validateField } from "@/services/ANC/quickCheck_validation_service";
import BasicFooter from "@/components/BasicFooter.vue";
export default defineComponent({
    name: "Home",
    components: {
      BasicFooter,
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
        IonSpinner,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Confirm pregnancy",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Reason for visit",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "last_step",
                },
                // {
                //   'title': 'Reason for visit',
                //   'class': 'common_step',
                //   'checked':'',
                //   'icon': false,
                //   'disabled':false,
                //   'number': 3,
                //   'last_step': ''
                // },
            ],
            StepperData: [
                {
                    title: "Confirm pregnancy",
                    component: "ConfirmPregnancy",
                    value: "1",
                },
                {
                    title: "Reason for visit",
                    component: "ReasonForVisit",
                    value: "2",
                },
                // {
                //   title: 'Reason for visit',
                //   component: 'SubsequentVisits',
                //   value: '3',
                // },
            ],
            isOpen: false,
            iconsContent: icons,
            isLoading: false,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(usePregnancyStore, ["pregnancy"]),
        ...mapState(usePresentingComplaintsStore, ["presentingComplaints"]),
        ...mapState(usePastMedicalHistoryStore, ["pastMedicalHistory"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useOPDDiagnosisStore, ["OPDdiagnosis"]),
        ...mapState(usePhysicalExaminationStore, ["physicalExam"]),
        ...mapState(useDangerSignsStore, ["DangerSigns"]),
        ...mapState(useReasonForVisitStore, ["ReasonForVisit"]),
        ...mapState(useConfirmPregnancyStore, ["ConfirmPregnancy"]),
        ...mapState(useSpecificHealthConcernsStore, ["HealthConcerns"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        reasonVisitFacility() {
            return getRadioSelectedValue(this.ReasonForVisit, "Reason for visit");
        },
        //dangerSigns(){return getCheckboxSelectedValue(this.ReasonForVisit,'Central cyanosis')},//,'Pre-term labour',"None","Unconscious","Fever","Imminent delivery","Severe headache","Vomiting", "Severe abdominal pain","Draining liquor","Respiratory problems","Convulsion history","Convulsion history","Epigastric pain",
        pregnancyConfirmed() {
            return getRadioSelectedValue(this.ConfirmPregnancy, "Pregnancy confirmed");
        },
        pregnancyPlanned() {
            return getRadioSelectedValue(this.ConfirmPregnancy, "Pregnancy planned");
        },
        // referWoman(){return getRadioSelectedValue(this.ReasonForVisit,'Action for danger signs')},
    },

    async mounted() {
        this.markWizard();
    },
    watch: {
        vitals: {
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
        OPDdiagnosis: {
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
        markWizard() {
            // if (this.vitals.validationStatus) {
            //   this.wizardData[0].checked = true;
            //   this.wizardData[0].class = "open_step common_step";
            // } else {
            //   this.wizardData[0].checked = false;
            // }
            //
            // if (this.investigations[0].selectedData.length > 0) {
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = "open_step common_step";
            // } else {
            //   this.wizardData[1].checked = false;
            // }
            //
            // if (this.OPDdiagnosis[0].selectedData.length > 0) {
            //   this.wizardData[2].checked = true;
            //   this.wizardData[2].class = "open_step common_step";
            // } else {
            //   this.wizardData[2].checked = false;
            // }
            //
            // if (this.selectedMedicalDrugsList.length > 0) {
            //   this.wizardData[4].checked = true;
            //   this.wizardData[4].class = "open_step common_step";
            // } else {
            //   this.wizardData[4].checked = false;
            // }
        },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data[0] || item?.data;
            });
        },
        validationRules(data: any, fields: any) {
            let isChecked = false;
            for (let i = 0; i < fields.length; i++) {
                const value = getCheckboxSelectedValue(this.ReasonForVisit, fields[i]);
                if (value) {
                    isChecked = true;
                    break;
                }
            }
            //return isChecked
            // return isChecked && fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));

            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        async saveData() {
            await this.saveQuickCheck();
            resetPatientData();
        },
        async saveQuickCheck() {
            const fields: any = ["pregnancyPlanned", "pregnancyConfirmed", "reasonVisitFacility"];
            // "dangerSigns",'Pre-term labour',"None","Unconscious","Fever","Imminent delivery",
            // "Severe headache","Vomiting", "Severe abdominal pain","Draining liquor",
            // "Respiratory problems","Convulsion history","Convulsion history",
            // "Epigastric pain",] //"referWoman","reasonVisitFacility","pregnancyConfirmed","pregnancyPlanned",

            if (await this.validationRules(this.ReasonForVisit && this.ConfirmPregnancy, fields)) {
                // && this.ConfirmPregnancy
                if (this.ConfirmPregnancy.length > 0 && this.ReasonForVisit.length > 0) {
                    const userID: any = Service.getUserID();
                    const quickCheck = new ConfirmPregnancyService(this.demographics.patient_id, userID);
                    const encounter = await quickCheck.createEncounter();
                    if (!encounter) return toastWarning("Unable to create quick check encounter");
                    const patientStatus = await quickCheck.saveObservationList(await this.buildQuickCheck());
                    if (!patientStatus) return toastWarning("Unable to create quick check details!");
                    toastSuccess("Quick check details have been created");
                }
                this.$router.push("ANCHome");
            } else {
                await toastWarning("Please complete all required fields");
            }

            console.log(await this.buildQuickCheck());
        },
        openModal() {
            createModal(SaveProgressModal);
        },

        async buildQuickCheck() {
            return [
                ...(await formatCheckBoxData(this.ReasonForVisit)),
                ...(await formatRadioButtonData(this.ReasonForVisit)),
                ...(await formatInputFiledData(this.ReasonForVisit)),
                ...(await formatCheckBoxData(this.ConfirmPregnancy)),
                ...(await formatRadioButtonData(this.ConfirmPregnancy)),
                ...(await formatInputFiledData(this.ConfirmPregnancy)),
            ];
        },
    },
});
</script>

<style scoped></style>
