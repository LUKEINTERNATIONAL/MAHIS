<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <div style="width: 85vw; margin: 0 auto; margin-top: 30px">
                <Wizard
                    v-if="showWizard"
                    ref="wizard"
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
import { useVitalsStore } from "@/apps/NCD/stores/VitalsStore";
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
import { useNCDMedicationsStore, MedicationSelectionHasValues } from "@/stores/NCDMedicationStore";
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
import { formatRadioButtonData, formatCheckBoxData, formatGroupRadioButtonData, formatInputFiledData } from "@/services/formatServerData";
import NextAppointment from "@/apps/NCD/components/ConsultationPlan/NextAppointment.vue";
import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
import VitalSigns from "@/apps/NCD/components/ConsultationPlan/VitalSigns.vue";
import { createNCDDrugOrder } from "@/apps/NCD/services/medication_service";
import { validateInputFiledData } from "@/services/group_validation";
import { saveEncounterData, EncounterTypeId } from "@/services/encounter_type";
import { ObservationService } from "@/services/observation_service";
import { OrderService } from "@/services/order_service";
import { ConceptService } from "@/services/concept_service";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
    modifyGroupedRadioValue,
} from "@/services/data_helpers";
import { useComplicationsStore } from "@/stores/ComplicationsStore";
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
            showWizard: true,
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
        ...mapState(useTreatmentPlanStore, ["nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useNCDMedicationsStore, ["selectedNCDMedicationList"]),
        ...mapState(useGeneralStore, ["NCDActivities"]),
        ...mapState(useOutcomeStore, ["dispositions"]),
        ...mapState(useEnrollementStore, ["substance"]),
        ...mapState(useComplicationsStore, ["FootScreening", "visualScreening", "cvScreening"]),
    },
    created() {
        this.getData();
    },
    async mounted() {
        if (this.NCDActivities.length == 0) {
            this.$router.push("patientProfile");
        }
        await this.setData();
        await this.markWizard();
    },
    watch: {
        vitals: {
            async handler() {
                await this.markWizard();
            },
            deep: true,
        },
        demographics: {
            async handler() {
                this.refreshWizard();
                await this.markWizard();
            },
            deep: true,
        },
        investigations: {
            async handler() {
                await this.markWizard();
            },
            deep: true,
        },
        diagnosis: {
            async handler() {
                await this.markWizard();
            },
            deep: true,
        },
        substance: {
            async handler() {
                await this.setRiskAssessment();
                await this.markWizard();
            },
            deep: true,
        },
        selectedNCDMedicationList: {
            async handler() {
                await this.markWizard();
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.markWizard();
            },
        },
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        async setData() {
            await this.setRiskAssessment();
            await this.setComplications();
        },
        refreshWizard(): void {
            this.showWizard = false;
            this.currentTabIndex = 0;
            setTimeout(() => {
                this.showWizard = true;
            }, 0);
        },
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
        async markWizard() {
            if (await validateInputFiledData(this.vitals, false)) {
                this.tabs[0].icon = "check";
            } else {
                this.tabs[0].icon = "";
            }
            const data: any = await formatRadioButtonData(this.substance);
            if (data.length > 0) {
                this.tabs[1].icon = "check";
            } else {
                this.tabs[1].icon = "";
            }

            const labOrders = await OrderService.getOrders(this.demographics.patient_id);
            const filteredArray = await labOrders.filter((obj: any) => {
                return HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(obj.order_date);
            });
            if (filteredArray.length > 0) {
                this.tabs[2].icon = "check";
            } else {
                this.tabs[2].icon = "";
            }
            const firstDate = await ObservationService.getFirstObsDatetime(this.demographics.patient_id, "Primary diagnosis");
            if (firstDate && HisDate.toStandardHisFormat(firstDate) == HisDate.currentDate()) {
                this.tabs[3].icon = "check";
            } else {
                this.tabs[3].icon = "";
            }

            if (await this.setComplications()) {
                this.tabs[4].icon = "check";
            } else {
                this.tabs[4].icon = "";
            }

            if (this.selectedNCDMedicationList.length > 0) {
                console.log(MedicationSelectionHasValues());
                if (MedicationSelectionHasValues() == true) {
                    this.tabs[5].icon = "check";
                } else {
                    this.tabs[5].icon = "";
                }
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
            if (await this.saveVitals()) {
                await this.saveDiagnosis();
                await this.saveTreatmentPlan();
                await this.saveOutComeStatus();
                await this.saveSubstanceAbuse();
                await this.saveComplications();
                await resetNCDPatientData();
                await UserService.setProgramUserActions();
                this.$router.push("patientProfile");
            }
        },
        async setRiskAssessment() {
            let smoke = await ObservationService.getFirstValueCoded(this.demographics.patient_id, "Smoking history");
            const drink = await ObservationService.getFirstValueCoded(this.demographics.patient_id, "Does the patient drink alcohol?");
            if (smoke == "patient smokes") smoke = "Smoking";
            if (smoke) modifyRadioValue(this.substance, "Smoking history", "selectedValue", smoke);
            if (drink) modifyRadioValue(this.substance, "Does the patient drink alcohol?", "selectedValue", drink);
        },
        async setComplications() {
            const neuropathy = await ObservationService.getFirstValueCoded(this.demographics.patient_id, "Peripheral neuropathy");
            const deformity = await ObservationService.getFirstValueCoded(this.demographics.patient_id, "Deformity");
            const ulcers = await ObservationService.getFirstValueCoded(this.demographics.patient_id, "Ulcers");
            const leftEye = await ObservationService.getFirstValueText(this.demographics.patient_id, "Left eye visual acuity");
            const rightEye = await ObservationService.getFirstValueText(this.demographics.patient_id, "Right eye visual acuity");
            const cv = await ObservationService.getFirstValueText(this.demographics.patient_id, "CVD");

            if (leftEye) modifyFieldValue(this.visualScreening, "Left eye visual acuity", "value", leftEye);
            if (rightEye) modifyFieldValue(this.visualScreening, "Right eye visual acuity", "value", rightEye);
            if (cv) modifyFieldValue(this.cvScreening, "CVD", "value", cv);
            if (neuropathy) modifyGroupedRadioValue(this.FootScreening, "Peripheral neuropathy", "selectedValue", neuropathy);
            if (deformity) modifyGroupedRadioValue(this.FootScreening, "Deformity", "selectedValue", deformity);
            if (ulcers) modifyGroupedRadioValue(this.FootScreening, "Ulcers", "selectedValue", ulcers);

            if (neuropathy || deformity || ulcers || leftEye || rightEye || cv) {
                return true;
            } else {
                return false;
            }
        },
        async saveComplications() {
            const data = [];
            const childDataVisualScreening = await formatInputFiledData(this.visualScreening);
            const childDataFootScreening = await formatGroupRadioButtonData(this.FootScreening);
            const childDataCVRisk = await formatInputFiledData(this.cvScreening);
            if (childDataVisualScreening.length > 0) {
                data.push({
                    concept_id: await ConceptService.getConceptID("Visual acuity", true),
                    value_text: "visual acuity test",
                    obs_datetime: ConceptService.getSessionDate(),
                    child: childDataVisualScreening,
                });
            }
            if (childDataFootScreening.length > 0) {
                data.push({
                    concept_id: await ConceptService.getConceptID("Foot check", true),
                    value_text: "foot screening",
                    obs_datetime: ConceptService.getSessionDate(),
                    child: childDataFootScreening,
                });
            }
            if (childDataCVRisk.length > 0) {
                data.push(...childDataCVRisk);
            }
            if (data.length > 0) {
                await saveEncounterData(this.demographics.patient_id, EncounterTypeId.SCREENING, "" as any, data);
                toastSuccess("Complications saved successfully");
            }
        },

        async saveVitals() {
            if (await validateInputFiledData(this.vitals)) {
                const userID: any = Service.getUserID();
                const vitalsInstance = new VitalsService(this.demographics.patient_id, userID);
                vitalsInstance.onFinish(this.vitals);
                toastSuccess("Vitals saved successfully");
                return true;
            } else {
                toastWarning("Fail to save vitals");
                return false;
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
            await saveEncounterData(this.demographics.patient_id, EncounterTypeId.ASSESSMENT, "" as any, await formatRadioButtonData(this.substance));
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.demographics.patient_id;
            const treatmentInstance = new Treatment();

            const allergyStore = useAllegyStore();
            if (!isEmpty(allergyStore.selectedMedicalAllergiesList)) {
                const allergies = this.mapToAllergies();
                await treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
                allergyStore.clearSelectedMedicalAllergiesList();
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
            const allergyStore = useAllegyStore();
            return allergyStore.selectedMedicalAllergiesList.map((allergy: any) => {
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
