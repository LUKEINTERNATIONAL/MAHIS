<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <!-- <Stepper
                stepperTitle="The consultation plan"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
            /> -->
            <div style="width: 85vw; margin: 0 auto; margin-top: 30px">
                <Wizard
                    vertical-tabs
                    navigable-tabs
                    scrollable-tabs
                    :doneButton="{
                        text: 'Finish',
                        icon: 'check',
                        hideText: false,
                        hideIcon: false,
                        disabled: false,
                    }"
                    :custom-tabs="tabs"
                    :beforeChange="onTabBeforeChange"
                    @change="onChangeCurrentTab"
                    @complete:wizard="saveData()"
                >
                    <div>
                        <div class="back_profile">
                            <DynamicButton
                                name="Back to profile"
                                iconSlot="start"
                                fill="clear"
                                :icon="chevronBackOutline"
                                @click="openBackController()"
                            />
                        </div>
                    </div>
                    <VitalSigns v-if="currentTabIndex === 0" />
                    <RiskAssessment v-if="currentTabIndex === 1" />
                    <Investigations v-if="currentTabIndex === 2" />
                    <DiagnosisComponent v-if="currentTabIndex === 3" />
                    <ComplicationsScreening v-if="currentTabIndex === 4" />
                    <TreatmentPlan v-if="currentTabIndex === 5" />
                    <NextAppointment v-if="currentTabIndex === 6" />
                </Wizard>
            </div>
        </ion-content>
        <!-- <BasicFooter @finishBtn="saveData()" /> -->
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
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import DynamicButton from "@/components/DynamicButton.vue";
import Stepper from "@/components/Stepper.vue";
// import FormWizard from "@/components/FormWizard.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { useGeneralStore } from "@/stores/GeneralStore";
import { resetNCDPatientData } from "@/apps/NCD/config/reset_ncd_data";
import { PatientReferralService } from "@/services/patient_referral_service";
import { PatientAdmitService } from "@/services/patient_admit_service";
import { UserService } from "@/services/user_service";
import BasicFooter from "@/components/BasicFooter.vue";
import ScreenSizeMixin from "@/views/Mixin/ScreenSizeMixin.vue";
import FormWizard from "@/views/Mixin/FormWizard.vue";
import DiagnosisComponent from "@/apps/NCD/components/ConsultationPlan/Diagnosis.vue";
import ComplicationsScreening from "@/apps/NCD/components/ConsultationPlan/ComplicationsScreening.vue";
import Investigations from "@/apps/NCD/components/ConsultationPlan/Investigations.vue";
import TreatmentPlan from "@/apps/NCD/components/ConsultationPlan/TreatmentPlan.vue";
import RiskAssessment from "@/apps/NCD/components/ConsultationPlan/RiskAssessment.vue";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { formatRadioButtonData, formatCheckBoxData } from "@/services/formatServerData";
import NextAppointment from "@/apps/NCD/components/ConsultationPlan/NextAppointment.vue";
import VitalSigns from "@/components/VitalSigns.vue";
import { createNCDDrugOrder } from "@/apps/NCD/services/medication_service"
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
export default defineComponent({
    mixins: [ScreenSizeMixin, FormWizard],
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
        FormWizard,
        BasicFooter,
        DiagnosisComponent,
        ComplicationsScreening,
        Investigations,
        TreatmentPlan,
        NextAppointment,
        VitalSigns,
        DynamicButton,
        RiskAssessment,
    },
    data() {
        return {
            wizardData: [] as any,
            StepperData: [] as any,
            isOpen: false,
            iconsContent: icons,
            tabs: [
                {
                    title: "Vitals",
                    icon: "",
                },
                {
                    title: "Risk Assessment",
                    icon: "",
                },
                {
                    title: "Investigations",
                    icon: "",
                },
                {
                    title: "Diagnosis",
                    icon: "",
                },
                {
                    title: "Complications Screening",
                    icon: "",
                },

                {
                    title: "Treatment Plan",
                    icon: "",
                },

                {
                    title: "Next Appointment",
                    icon: "",
                },
            ],
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useGeneralStore, ["NCDActivities"]),
        ...mapState(useOutcomeStore, ["dispositions"]),
        ...mapState(useEnrollementStore, ["substance"]),
    },
    created() {
        this.getData();
    },
    mounted() {
        if (this.NCDActivities.length == 0) {
            this.$router.push("patientProfile");
        }
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
        openBackController() {
            createModal(SaveProgressModal);
        },
        async getData() {
            // const steps = ["Vital Signs", "Investigations", "Diagnosis", "Complications Screening", "Treatment Plan", "Next Appointment", "Outcome"];
            for (let i = 0; i < this.NCDActivities.length; i++) {
                const title = this.NCDActivities[i];
                const number = i + 1;

                this.wizardData.push({
                    title,
                    class: "common_step",
                    checked: i === 0 ? false : "",
                    disabled: false,
                    number,
                    last_step: i === this.NCDActivities.length - 1 ? "last_step" : "",
                });

                this.StepperData.push({
                    title,
                    component: title.replace(/\s+/g, ""),
                    value: number.toString(),
                });
            }
        },
        markWizard() {
            if (this.vitals.validationStatus) {
                this.tabs[0].icon = "check";
            } else {
                this.tabs[0].icon = "";
            }

            if (this.investigations[0].selectedData.length > 0) {
                this.tabs[2].icon = "check";
            } else {
                this.tabs[2].icon = "";
            }

            if (this.diagnosis[0].selectedData.length > 0) {
                this.tabs[3].icon = "check";
            } else {
                this.tabs[3].icon = "";
            }

            if (this.selectedMedicalDrugsList.length > 0) {
                this.tabs[5].icon = "check";
            } else {
                this.tabs[5].icon = "";
            }
        },

        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        async saveData() {
            await this.saveVitals();
            await this.saveDiagnosis();
            await this.saveTreatmentPlan();
            await this.saveOutComeStatus();
            await resetNCDPatientData();
            await UserService.setProgramUserActions();
            this.$router.push("patientProfile");
        },
        async saveVitals() {
            if (this.vitals.validationStatus) {
                const userID: any = Service.getUserID();
                const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
                vitalsInstance.onFinish(this.vitals);
            }
        },
        async saveDiagnosis() {
            if (this.diagnosis[0].selectedData.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.diagnosis[0].selectedData));
            }
        },
        async saveSubstanceAbuse() {
            const data: any = await formatRadioButtonData(this.substance);
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, data);
            }
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;
            const treatmentInstance = new Treatment();

            if (!isEmpty(this.selectedMedicalAllergiesList)) {
                const allergies = this.mapToAllergies();
                treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
            }

            if (!isEmpty(this.nonPharmalogicalTherapyAndOtherNotes)) {
                const treatmentNotesTxt = [
                    {
                        concept_id: 2688,
                        obs_datetime: Service.getSessionDate(),
                        value_text: this.nonPharmalogicalTherapyAndOtherNotes,
                    },
                ];
                treatmentInstance.onSubmitNotes(patientID, userID, treatmentNotesTxt);
            }

            await createNCDDrugOrder();
        },

        async saveOutComeStatus() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;

            if (!isEmpty(this.dispositions)) {
                this.dispositions.forEach(async (disposition: any) => {
                    if (disposition.type == "Admitted for short stay") {
                        const prePayload = {
                            obs_datetime: disposition.date.year + "-" + disposition.date.month + "-" + disposition.date.day,
                            concept_id: disposition.concept_id,
                            value_text: disposition.name,
                        } as any;

                        const admissionOutcome = new PatientAdmitService(patientID, userID);
                        const obs = await admissionOutcome.buildValueText("Admit to ward", prePayload.value_text);
                        obs.obs_datetime = prePayload.obs_datetime;
                        obs.value_text = prePayload.value_text;
                        await admissionOutcome.createEncounter();
                        await admissionOutcome.saveObservationList([obs] as any);
                    }
                    if (disposition.type == "Referred out") {
                        const prePayload = {
                            obs_datetime: disposition.date.year + "-" + disposition.date.month + "-" + disposition.date.day,
                            concept_id: disposition.concept_id,
                            value_text: disposition.name,
                            location_id: disposition.other.location_id,
                        } as any;

                        const referralOutcome = new PatientReferralService(patientID, userID);
                        const obs = await referralOutcome.buildValueText("Referred", prePayload.value_text);
                        obs.obs_datetime = prePayload.obs_datetime;
                        obs.value_text = prePayload.location_id;
                        await referralOutcome.createEncounter();
                        await referralOutcome.saveObservationList([obs] as any);
                    }
                });
            }
        },
        openModal() {
            createModal(SaveProgressModal);
        },
        calculateExpireDate(startDate: string | Date, duration: any) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + parseInt(duration));
            return HisDate.toStandardHisFormat(date);
        },
        mapToAllergies(): any[] {
            return this.selectedMedicalAllergiesList.map((allergy: any) => {
                return {
                    concept_id: 985,
                    obs_datetime: Service.getSessionDate(),
                    value_coded: allergy.concept_id,
                };
            });
        },
    },
});
</script>

<style scoped></style>
