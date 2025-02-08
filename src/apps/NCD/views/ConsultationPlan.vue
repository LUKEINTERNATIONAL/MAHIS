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

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
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
} from "@ionic/vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import { storeToRefs } from "pinia";

// Import components
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import DynamicButton from "@/components/DynamicButton.vue";
import Stepper from "@/components/Stepper.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import DiagnosisComponent from "@/apps/NCD/components/ConsultationPlan/Diagnosis.vue";
import ComplicationsScreening from "@/apps/NCD/components/ConsultationPlan/ComplicationsScreening.vue";
import Investigations from "@/apps/NCD/components/ConsultationPlan/Investigations.vue";
import TreatmentPlan from "@/apps/NCD/components/ConsultationPlan/TreatmentPlan.vue";
import RiskAssessment from "@/apps/NCD/components/ConsultationPlan/RiskAssessment.vue";
import NextAppointment from "@/apps/NCD/components/ConsultationPlan/NextAppointment.vue";
import VitalSigns from "@/apps/NCD/components/ConsultationPlan/VitalSigns.vue";
import Wizard from "form-wizard-vue3";

// Import stores
import { useVitalsStore } from "@/apps/NCD/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useNCDMedicationsStore, MedicationSelectionHasValues } from "@/stores/NCDMedicationStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { useComplicationsStore } from "@/stores/ComplicationsStore";
import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
import { useNonPharmaTherapyStore } from "@/stores/nonPharmaTherapyStore";

// Import services and utilities
import { Service } from "@/services/service";
import { VitalsService } from "@/services/vitals_service";
import { createModal, toastWarning, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { resetNCDPatientData } from "@/apps/NCD/config/reset_ncd_data";
import { icons } from "@/utils/svg";
import { formatRadioButtonData, formatCheckBoxData, formatGroupRadioButtonData, formatInputFiledData } from "@/services/formatServerData";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
    modifyGroupedRadioValue,
} from "@/services/data_helpers";
import { validateInputFiledData } from "@/services/group_validation";
import { saveEncounterData, EncounterTypeId } from "@/services/encounter_type";
import { ObservationService } from "@/services/observation_service";
import { OrderService } from "@/services/order_service";
import { ConceptService } from "@/services/concept_service";
import { createNCDDrugOrder } from "@/apps/NCD/services/medication_service";
import { useFormWizard } from "@/composables/useFormWizard";

//composable
const { onTabBeforeChange, onChangeCurrentTab, currentTabIndex } = useFormWizard();
// Router
const router = useRouter();

// State
const wizardData = ref<any[]>([]);
const StepperData = ref<any[]>([]);
const isOpen = ref(false);
const showWizard = ref(true);

// Store references
const vitalsStore = useVitalsStore();
const demographicsStore = useDemographicsStore();
const investigationStore = useInvestigationStore();
const diagnosisStore = useDiagnosisStore();
const treatmentPlanStore = useTreatmentPlanStore();
const ncdMedicationsStore = useNCDMedicationsStore();
const generalStore = useGeneralStore();
const outcomeStore = useOutcomeStore();
const enrollmentStore = useEnrollementStore();
const complicationsStore = useComplicationsStore();

// Destructure store refs
const { patient } = storeToRefs(demographicsStore);
const { vitals } = storeToRefs(vitalsStore);
const { investigations } = storeToRefs(investigationStore);
const { diagnosis } = storeToRefs(diagnosisStore);
const { substance } = storeToRefs(enrollmentStore);
const { selectedNCDMedicationList } = storeToRefs(ncdMedicationsStore);
const { FootScreening, visualScreening, cvScreening } = storeToRefs(complicationsStore);

//services
import { saveOfflinePatientData } from "@/services/offline_service";

// Tabs configuration
const tabs = ref([
    { title: "Vitals", icon: "" },
    { title: "Risk Assessment", icon: "" },
    { title: "Investigations", icon: "" },
    { title: "Diagnosis", icon: "" },
    { title: "Complications Screening", icon: "" },
    { title: "Treatment Plan", icon: "" },
    { title: "Next Appointment", icon: "" },
]);

// Methods
const openBackController = () => {
    //   if (this.backUrl) {
    router.push("patientProfile");
    //   } else {
    //     createModal(SaveProgressModal);
    //   }
};
const getData = async () => {
    for (let i = 0; i < generalStore.NCDActivities.length; i++) {
        const title = generalStore.NCDActivities[i];
        const number = i + 1;

        wizardData.value.push({
            title,
            class: "common_step",
            checked: i === 0 ? false : "",
            disabled: false,
            number,
            last_step: i === generalStore.NCDActivities.length - 1 ? "last_step" : "",
        });

        StepperData.value.push({
            title,
            component: title.replace(/\s+/g, ""),
            value: number.toString(),
        });
    }
};

const refreshWizard = () => {
    showWizard.value = false;
    currentTabIndex.value = 0;
    setTimeout(() => {
        showWizard.value = true;
    }, 0);
};

const markWizard = async () => {
    if (await validateInputFiledData(vitals.value, false)) {
        tabs.value[0].icon = "check";
    } else {
        tabs.value[0].icon = "";
    }

    const data = await formatRadioButtonData(substance.value);
    if (data.length > 0) {
        tabs.value[1].icon = "check";
    } else {
        tabs.value[1].icon = "";
    }

    const labOrders = await OrderService.getOrders(patient.value.patientID);
    const filteredArray = labOrders.filter((obj: any) => {
        return HisDate.toStandardHisFormat(HisDate.currentDate()) === HisDate.toStandardHisFormat(obj.order_date);
    });
    tabs.value[2].icon = filteredArray.length > 0 ? "check" : "";

    const firstDate = await ObservationService.getFirstObsDatetime(patient.value.patientID, "Primary diagnosis");
    tabs.value[3].icon = firstDate && HisDate.toStandardHisFormat(firstDate) == HisDate.currentDate() ? "check" : "";

    if (await setComplications()) {
        tabs.value[4].icon = "check";
    } else {
        tabs.value[4].icon = "";
    }

    if (selectedNCDMedicationList.value.length > 0) {
        tabs.value[5].icon = MedicationSelectionHasValues() ? "check" : "";
    } else {
        tabs.value[5].icon = "";
    }
};
const setComplications = async () => {
    const neuropathy = await ObservationService.getFirstValueCoded(patient.value.patientID, "Peripheral neuropathy");
    const deformity = await ObservationService.getFirstValueCoded(patient.value.patientID, "Deformity");
    const ulcers = await ObservationService.getFirstValueCoded(patient.value.patientID, "Ulcers");
    const leftEye = await ObservationService.getFirstValueText(patient.value.patientID, "Left eye visual acuity");
    const rightEye = await ObservationService.getFirstValueText(patient.value.patientID, "Right eye visual acuity");
    const cv = await ObservationService.getFirstValueText(patient.value.patientID, "CVD");

    if (leftEye) modifyFieldValue(visualScreening.value, "Left eye visual acuity", "value", leftEye);
    if (rightEye) modifyFieldValue(visualScreening.value, "Right eye visual acuity", "value", rightEye);
    if (cv) modifyFieldValue(cvScreening.value, "CVD", "value", cv);
    if (neuropathy) modifyGroupedRadioValue(FootScreening.value, "Peripheral neuropathy", "selectedValue", neuropathy);
    if (deformity) modifyGroupedRadioValue(FootScreening.value, "Deformity", "selectedValue", deformity);
    if (ulcers) modifyGroupedRadioValue(FootScreening.value, "Ulcers", "selectedValue", ulcers);

    if (neuropathy || deformity || ulcers || leftEye || rightEye || cv) {
        return true;
    } else {
        return false;
    }
};
const saveVitals = async () => {
    if (await validateInputFiledData(vitals.value)) {
        const newVitals = await formatInputFiledData(vitals.value);
        if (newVitals.length > 0) {
            const patientData = JSON.parse(JSON.stringify(patient.value));
            let vitals = patientData?.vitals;
            vitals.unsaved = [...vitals.unsaved, ...newVitals];
            await saveOfflinePatientData(patientData);
            toastSuccess("Vitals saved successful");
        }
    } else toastWarning("Failed to save vitals");
    return false;
};

const saveDiagnosis = async () => {
    if (diagnosis.value[0].selectedData.length > 0) {
        const userID = Service.getUserID();
        const diagnosisInstance = new Diagnosis();
        const formattedData = diagnosis.value[0].selectedData.map((item: any) => item?.data);
        diagnosisInstance.onSubmit(patient.value.patientID, userID, formattedData);
    }
};

const saveComplications = async () => {
    const data = [];
    const childDataVisualScreening = await formatInputFiledData(visualScreening.value);
    const childDataFootScreening = await formatGroupRadioButtonData(FootScreening.value);
    const childDataCVRisk = await formatInputFiledData(cvScreening.value);

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
        await saveEncounterData(patient.value.patientID, EncounterTypeId.SCREENING, "" as any, data);
        toastSuccess("Complications saved successfully");
    }
};

const saveSubstanceAbuse = async () => {
    await saveEncounterData(patient.value.patientID, EncounterTypeId.ASSESSMENT, "" as any, await formatRadioButtonData(substance.value));
};

const saveTreatmentPlan = async () => {
    const userID = Service.getUserID();
    const patientID = patient.value.patientID;
    const treatmentInstance = new Treatment();
    const allergyStore = useAllegyStore();

    if (!isEmpty(allergyStore.selectedMedicalAllergiesList)) {
        const allergies = allergyStore.selectedMedicalAllergiesList.map((allergy: any) => ({
            concept_id: 985,
            obs_datetime: Service.getSessionDate(),
            value_coded: allergy.concept_id,
        }));
        await treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
        allergyStore.clearSelectedMedicalAllergiesList();
    }

    if (!isEmpty(treatmentPlanStore.nonPharmalogicalTherapyAndOtherNotes)) {
        const treatmentNotesTxt = [
            {
                concept_id: 2688,
                obs_datetime: Service.getSessionDate(),
                value_text: treatmentPlanStore.nonPharmalogicalTherapyAndOtherNotes,
            },
        ];
        treatmentInstance.onSubmitNotes(patientID, userID, treatmentNotesTxt);
    }

    await createNCDDrugOrder();
    await useNonPharmaTherapyStore().saveNonPharmaTherapyPatientData();
};

const saveData = async () => {
    if (await saveVitals()) {
        await saveDiagnosis();
        await saveTreatmentPlan();
        await saveSubstanceAbuse();
        await saveComplications();
        await resetNCDPatientData();
        router.push("patientProfile");
    }
};

// Lifecycle hooks and watchers
onMounted(async () => {
    if (generalStore.NCDActivities.length === 0) {
        router.push("patientProfile");
        return;
    }
    await getData();
    await markWizard();
});

watch(
    vitals,
    async () => {
        await markWizard();
    },
    { deep: true }
);

watch(
    patient,
    async () => {
        refreshWizard();
        await markWizard();
    },
    { deep: true }
);

watch(
    investigations,
    async () => {
        await markWizard();
    },
    { deep: true }
);

watch(
    diagnosis,
    async () => {
        await markWizard();
    },
    { deep: true }
);

watch(
    substance,
    async () => {
        await markWizard();
    },
    { deep: true }
);

watch(
    selectedNCDMedicationList,
    async () => {
        await markWizard();
    },
    { deep: true }
);

// Expose needed methods and properties
defineExpose({
    saveData,
    markWizard,
    refreshWizard,
});
</script>

<style scoped></style>
