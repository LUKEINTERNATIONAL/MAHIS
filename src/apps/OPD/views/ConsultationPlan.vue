<template>
    <ion-page>
      <OPDPrintingModal
          :onYes="printYes"
          :onNo="printNo"
          :isOpen="printModalOpen"
          :title="`Do you want to print the consultation summary?`"
      />
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />

            <Stepper
                :stepperTitle="userRoleSettings.stepperTitle"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :openStepper="openStepper"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
                :getSaveFunction="getSaveFunction"
                :hasPatientsWaitingList="hasPatientsWaitingForLab"
                :specialButtonLabel="'save & end visit'"
                :specialButtonFn="saveData"
                :userRole="userRole"
            />
        </ion-content>
        <!--      <OPDFooter @finishBtn="saveData()" />-->
        <div v-if="(userRole === 'Clinician' || userRole === 'Superuser') && showAlert" class="pause-alert">
            Consultation for this patient is paused due to lab orders.
        </div>
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
import { createModal, toastDanger } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "../stores/OpdVitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { usePregnancyStore } from "@/apps/OPD/stores/PregnancyStore";
import { usePresentingComplaintsStore } from "@/apps/OPD/stores/PresentingComplaintsStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { usePastMedicalHistoryStore } from "@/apps/OPD/stores/PastMedicalHistoryStore";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent, ref } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { formatRadioButtonData, formatCheckBoxData, formatInputFiledData } from "@/services/formatServerData";
import { PatientComplaintsService } from "@/apps/OPD/services/patient_complaints_service";
import { PatientGeneralConsultationService } from "@/services/patient_general_consultation";
import { PastMedicalHistory } from "../services/past_medical_history_service";
import { useLevelOfConsciousnessStore } from "@/apps/OPD/stores/LevelOfConsciousnessStore";
import { ConsciousnessService } from "@/apps/OPD/services/consciousness_service";
import { usePhysicalExaminationStore } from "@/apps/OPD/stores/PhysicalExamination";
import { PhysicalExamService } from "@/apps/OPD/services/physical_exam_service";
import { resetOPDPatientData } from "@/apps/OPD/config/reset_opd_data";
import BasicFooter from "@/components/BasicFooter.vue";
import { ObservationService } from "@/services/observation_service";
import { WorkflowService } from "@/services/workflow_service";
import { useGeneralStore } from "@/stores/GeneralStore";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { PatientOpdList } from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import { getUserLocation } from "@/services/userService";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { PatientService } from "@/services/patient_service";
import { EncounterService } from "@/services/encounter_service";
import { ConceptService } from "@/services/concept_service";
import OPDFooter from "@/apps/OPD/components/OPDFooter.vue";
import CheckInConfirmationModal from "@/components/Modal/CheckInConfirmationModal.vue";
import OPDPrintingModal from "@/apps/OPD/components/ConsultationPlan/Modals/OPDPrintingModal.vue";
import { usePatientProfile } from "@/composables/usePatientProfile";

export default defineComponent({
    name: "ConsultationPlan",
    mixins: [SetUserRole, SetEncounter],
    components: {
      OPDPrintingModal,
      CheckInConfirmationModal,
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
        BasicFooter,
        OPDFooter,
    },
    data() {
        return {
            outcomes: "" as any,
            openStepper: "1" as any,
            wizardData: [] as any,
            StepperData: [] as any,
            isOpen: false,
            hasPatientsWaitingForLab: false,
            iconsContent: icons,
            isLoading: false,
            patients: [] as any,
            showAlert: false,
            checkedIn: false as Boolean,
            printModalOpen: false,

        };
    },
    props: {
        list: {
            default: "" as any,
        },
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(usePregnancyStore, ["pregnancy"]),
        ...mapState(usePresentingComplaintsStore, ["presentingComplaints"]),
        ...mapState(usePastMedicalHistoryStore, ["pastMedicalHistory"]),
        ...mapState(useVitalsStore, ["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useOPDDiagnosisStore, ["OPDdiagnosis"]),
        ...mapState(usePhysicalExaminationStore, ["physicalExam"]),
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useLevelOfConsciousnessStore, ["adult", "minor"]),
        ...mapState(useGeneralStore, ["OPDActivities"]),
        ...mapState(usePatientList, [
            "patientsWaitingForVitals",
            "patientsWaitingForConsultation",
            "patientsWaitingForLab",
            "patientsWaitingForDispensation",
            "counter",
        ]),
    },
    async created() {},
    async mounted() {
        await this.getData();
        await this.fetchPatientLabStageData();
        this.markWizard();
    },
    watch: {
        patientsWaitingForLab(newValue) {
            this.hasPatientsWaitingForLab = newValue.some((p: any) => p.patient_id === this.patient.patientID);
            this.showAlert = this.hasPatientsWaitingForLab;
            if (this.showAlert) {
                setTimeout(() => {
                    this.showAlert = false;
                }, 15000);
            }
        },
        vitals: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        $route: {
            async handler() {
                await this.getData();
                this.markWizard();
                this.fetchPatientLabStageData();
                this.hasPatientsWaitingForLab = false;
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
        hasPatientsWaitingForLab: {
            immediate: true,
            handler(newValue) {
                console.log("Updated lab waiting status:", newValue);
            },
        },
    },
    setup() {
       const { printVisitSummary } = usePatientProfile();
       const presentingComplaintsValue = ref<string[]>([]);

        async function loadSavedEncounters(patientVisitDate: any) {
            const patient = new PatientService();
            const encounters = await EncounterService.getEncounters(patient.getID(), { date: patientVisitDate });
            await setPresentingComplainsEncounters(encounters);
        }

        async function setPresentingComplainsEncounters(data: any) {
            const observations = data.find((encounter: any) => encounter.type.name === "PRESENTING COMPLAINTS")?.observations;
            if (observations) {
                presentingComplaintsValue.value = await getConceptValues(filterObs(observations, "Presenting complaint"), "coded");
            } else {
                presentingComplaintsValue.value = [];
            }
        }

        function filterObs(observations: any, conceptName: string) {
            return observations?.filter((obs: any) => obs.concept.concept_names.some((name: any) => name.name === conceptName));
        }

        async function getConceptValues(filteredObservations: any, type: string) {
            if (filteredObservations) {
                return Promise.all(
                    filteredObservations.map(async (item: any) => {
                        return await ConceptService.getConceptName(item.value_coded);
                    })
                );
            }
            return [];
        }

        const mounted = async () => {
            const todayDate = new Date().toISOString().split("T")[0];
            await loadSavedEncounters(todayDate);
        };
        mounted();
        return {
            presentingComplaintsValue,
            printVisitSummary,
            loadSavedEncounters,
            chevronBackOutline,
            checkmark,
        };
    },

    methods: {
        endConsultation() {},
      togglePrintModal() {
        this.printModalOpen = !this.printModalOpen;
      },
      closeCheckInModal() {
        this.printModalOpen = false;
      },

      async printYes() {
        await this.printVisitSummary();
        this.$router.push("home");
        toastSuccess("Patient has finished consultation!");
      },

      async printNo() {
        toastSuccess("Patient has finished consultation!");
        this.$router.push("home");
      },
        getSaveFunction(index: any) {
            if (index < this.StepperData.length - 1) {
                switch (index) {
                    case 0:
                        if (this.presentingComplaintsValue.length === 0) {
                            return this.saveClinicalAssessment;
                        } else {
                            return () => Promise.resolve();
                        }
                    case 1:
                        return () => Promise.resolve();
                    case 2:
                        return () => Promise.resolve();
                    case 3:
                        return () => Promise.resolve();
                    default:
                        return () => Promise.resolve();
                }
            } else {
                return async () => {
                    this.saveDiagnosis();
                    await this.saveTreatmentPlan();
                    await useOutcomeStore().saveOutcomPatientData();
                    resetOPDPatientData();

                    const location = await getUserLocation();
                    const locationId = location ? location.code : null;

                    if (!locationId) {
                        toastDanger("Location ID could not be found. Please check your settings.");
                        return;
                    }
                    if (this.userRole !== "Lab") {
                        await PatientOpdList.addPatientToStage(this.patient.patientID, dates.todayDateFormatted(), "DISPENSATION", locationId);
                        await usePatientList().refresh(locationId);
                        this.togglePrintModal();
                        return;

                    } else {
                        await PatientOpdList.addPatientToStage(this.patient.patientID, dates.todayDateFormatted(), "CONSULTATION", locationId);
                        await usePatientList().refresh(locationId);
                        this.$router.push("home");
                        toastSuccess("Lab results submitted. Patient can return to consultation");
                    }
                };
            }
        },
        async fetchPatientLabStageData() {
            const location = await getUserLocation();
            const locationId = location ? location.code : null;

            if (locationId) {
                const LabPatients = await PatientOpdList.getPatientList("LAB", locationId);
                if (this.patient.patientID) {
                    this.hasPatientsWaitingForLab = LabPatients.some((p: any) => p.patient_id === this.patient.patientID);
                }
            }
        },
        setList() {
            const listMapping: Record<string, any[]> = {
                VITALS: this.patientsWaitingForVitals,
                CONSULTATION: this.patientsWaitingForConsultation,
                LAB: this.patientsWaitingForLab,
                DISPENSATION: this.patientsWaitingForDispensation,
            };

            this.patients = listMapping[this.list] || [];
        },

        async getData() {
            try {
                this.wizardData = [];
                this.StepperData = [];
                const { name } = await WorkflowService.nextTask(this.patient.patientID);
                console.log("🚀 ~ getData ~ name:", name);

                // const steps = ["Clinical Assessment", "Investigations", "Diagnosis", "Treatment Plan", "Outcome"];
                for (let i = 0; i < this.OPDActivities.length; i++) {
                    let wizardClass = "common_step";
                    if (name == "PRESENTING COMPLAINTS" && this.OPDActivities[i] == "Clinical Assessment") {
                        this.openStepper = i + 1;
                        wizardClass = "open_step common_step";
                    }
                    if (name == "LAB RESULTS" && this.OPDActivities[i] == "Investigations") {
                        this.openStepper = i + 1;
                        wizardClass = "open_step common_step";
                    }
                    if (name == "OUTPATIENT DIAGNOSIS" && this.OPDActivities[i] == "Diagnosis") {
                        this.openStepper = i + 1;
                        wizardClass = "open_step common_step";
                    }
                    if (name == "PRESCRIPTION" && this.OPDActivities[i] == "Treatment Plan") {
                        this.openStepper = i + 1;
                        wizardClass = "open_step common_step";
                    }
                    if (name == "PATIENT OUTCOME" && this.OPDActivities[i] == "Outcome") {
                        this.openStepper = i + 1;
                        wizardClass = "open_step common_step";
                    }
                    let title = this.OPDActivities[i];
                    let componentName = this.OPDActivities[i];
                    if (this.OPDActivities[i] == "Diagnosis") {
                        componentName = "OPDDiagnosis";
                    }
                    if (this.OPDActivities[i] == "Treatment Plan") {
                        componentName = "OPDTreatmentPlan";
                    }

                    const number = i + 1;

                    this.wizardData.push({
                        title,
                        class: wizardClass,
                        checked: i === 0 ? false : "",
                        disabled: false,
                        number,
                        last_step: i === this.OPDActivities.length - 1 ? "last_step" : "",
                    });

                    this.StepperData.push({
                        title,
                        component: componentName.replace(/\s+/g, ""),
                        value: number.toString(),
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },

        markWizard() {
            if (this.presentingComplaints) {
                modifyWizardData(this.wizardData, "Clinical Assessments", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Clinical Assessments", {
                    checked: false,
                });
            }

            if (this.investigations[0].selectedData.length > 0) {
                modifyWizardData(this.wizardData, "Investigations", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Investigations", {
                    checked: false,
                });
            }

            if (this.OPDdiagnosis[0].selectedData.length > 0) {
                modifyWizardData(this.wizardData, "Diagnosis", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Diagnosis", {
                    checked: false,
                });
            }

            if (this.selectedMedicalDrugsList.length > 0) {
                modifyWizardData(this.wizardData, "Treatment Plan", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Treatment Plan", {
                    checked: false,
                });
            }

            if (this.outcomes.length > 0) {
                modifyWizardData(this.wizardData, "Outcome", {
                    checked: true,
                    class: "open_step common_step",
                });
            } else {
                modifyWizardData(this.wizardData, "Outcome", {
                    checked: false,
                });
            }
        },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data[0] || item?.data;
            });
        },
        async saveClinicalAssessment() {
            this.isLoading = true;
            try {
                const obs = await ObservationService.getAll(this.patient.patientID, "Presenting complaint");
                let filteredArray = [];
                if (obs) {
                    filteredArray = obs.filter((obj: any) => {
                        return HisDate.toStandardHisFormat(HisDate.sessionDate()) === HisDate.toStandardHisFormat(obj.obs_datetime);
                    });
                }
                if (this.presentingComplaints[0].selectedData.length > 0 || filteredArray.length > 0) {
                    await this.saveConsciousness();
                    await this.savePresentingComplaints();
                    await this.saveWomenStatus();
                    await this.savePastMedicalHistory();
                    await this.saveAllergies();
                    await this.savePhysicalExam();
                    resetOPDPatientData();
                } else {
                    toastWarning("Patient complaints are required");
                    return;
                }
            } catch (error) {
            } finally {
                this.isLoading = false;
            }
        },
        async saveData() {
            try {
                await this.saveDiagnosis();
                await this.saveTreatmentPlan();
                await useOutcomeStore().saveOutcomPatientData();
                resetOPDPatientData();
                const visit = await PatientOpdList.getCheckInStatus(this.patient.patientID);
                await PatientOpdList.checkOutPatient(visit[0].id, dates.todayDateFormatted());
                const location = await getUserLocation();
                const locationId = location ? location.code : null;
                await usePatientList().refresh(locationId);
                this.checkedIn = false;
            } catch (e) {}
          this.togglePrintModal();
          return;
        },
        async savePastMedicalHistory() {
            const pastMedicalHistoryData: any = await this.buildPastMedicalHistory();
            const userID: any = Service.getUserID();
            if (pastMedicalHistoryData.length > 0) {
                const pastMedicalHistory = new PastMedicalHistory(this.patient.patientID, userID);
                const encounter = await pastMedicalHistory.createEncounter();
                if (!encounter) return toastWarning("Unable to create past medical history encounter");
                const savingStatus = await pastMedicalHistory.saveObservationList(pastMedicalHistoryData);
                if (!savingStatus) return toastWarning("Unable to create past medical history!");
                toastSuccess("Past medical history has been created");
            }
        },
        async savePresentingComplaints() {
            if (this.presentingComplaints[0].selectedData.length > 0) {
                const userID: any = Service.getUserID();
                const PatientComplaints = new PatientComplaintsService(this.patient.patientID, userID);
                const encounter = await PatientComplaints.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient complaints encounter");
                const patientStatus = await PatientComplaints.saveObservationList(this.getFormatedData(this.presentingComplaints[0].selectedData));
                if (!patientStatus) return toastWarning("Unable to create patient complaints  !");
                toastSuccess("Patient complaints has been created");
            }
            this.presentingComplaints[0].selectedData;
        },
        async savePhysicalExam() {
            const data = await this.buildPhysicalExamination();
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const PhysicalExam = new PhysicalExamService(this.patient.patientID, userID);
                const encounter = await PhysicalExam.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient physical examination encounter");
                const patientStatus = await PhysicalExam.saveObservationList(data);
                if (!patientStatus) return toastWarning("Unable to create patient physical examination  !");
                toastSuccess("Physical examination has been created");
            }
        },
        async saveWomenStatus() {
            const womenStatus = await formatRadioButtonData(this.pregnancy);
            if (womenStatus.length > 0) {
                const userID: any = Service.getUserID();
                const patientPregnancy = new PatientGeneralConsultationService(this.patient.patientID, userID);
                const encounter = await patientPregnancy.createEncounter();
                if (!encounter) return toastWarning("Unable to create pregnant Status encounter");
                const patientStatus = await patientPregnancy.saveObservationList(womenStatus);
                if (!patientStatus) return toastWarning("Unable to create pregnant Status !");
                toastSuccess("Pregnant Status has been created");
            }
        },
       async saveDiagnosis() {
            if (this.OPDdiagnosis[0].selectedData.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
               await diagnosisInstance.onSubmit(this.patient.patientID, userID, this.getFormatedData(this.OPDdiagnosis[0].selectedData));
            }
        },
        async saveAllergies() {
            const userID: any = Service.getUserID();
            const patientID = this.patient.patientID;
            const treatmentInstance = new Treatment();
            if (!isEmpty(this.selectedMedicalAllergiesList)) {
                const allergies = this.mapToAllergies();
               await treatmentInstance.onSubmitAllergies(patientID, userID, allergies);
            }
        },
        async saveTreatmentPlan() {
            const userID: any = Service.getUserID();
            const patientID = this.patient.patientID;
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

            if (!isEmpty(this.selectedMedicalDrugsList)) {
                const drug_oder_obs_list = [] as any;
                const drugOrders = this.mapToOrders();
                const prescriptionService = new DrugPrescriptionService(patientID, userID);
                const encounter = await prescriptionService.createEncounter();
                if (!encounter) return toastWarning("Unable to create treatment encounter");
                const drugOrder = await prescriptionService.createDrugOrder(drugOrders);
                if (!drugOrder) return toastWarning("Unable to create drug orders!");
                drugOrder.forEach((drug_oder: any) => {
                    this.selectedMedicalDrugsList.forEach((selected_medication: any) => {
                        if (selected_medication.drug_id == drug_oder.drug_inventory_id) {
                            const drug_oder_obs = {
                                concept_id: selected_medication.route_concept_id,
                                value_text: selected_medication.route_name,
                                obs_datetime: Service.getSessionDate(),
                                encounter_id: encounter.encounter_id,
                                order_id: drug_oder.order_id,
                            };
                            drug_oder_obs_list.push(drug_oder_obs);
                        }
                    });
                });
                if (drug_oder_obs_list.length > 0) {
                    drug_oder_obs_list.forEach(async (ob_to_be: any) => {
                        const payload = {
                            encounter_id: ob_to_be.encounter_id,
                            observations: [ob_to_be],
                        };
                        const obs = await ObservationService.create(payload);
                    });
                }
                toastSuccess("Drug order has been created");
            }
        },
        saveInvestigations() {},
        openModal() {
            createModal(SaveProgressModal);
        },
        mapToOrders(): any[] {
            return this.selectedMedicalDrugsList.map((drug: any) => {
                const startDate = DrugPrescriptionService.getSessionDate();
                const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
                return {
                    drug_inventory_id: drug.drug_id,
                    equivalent_daily_dose: drug.dose == "Unknown" ? 0 : drug.dose * frequency?.value || 0,
                    start_date: startDate,
                    auto_expire_date: this.calculateExpireDate(startDate, drug.duration),
                    units: drug.units,
                    instructions: `${drug.drugName}: ${drug.dose} ${drug.units} ${frequency?.code || ""} for ${drug.duration} days`,
                    dose: drug.dose,
                    frequency: frequency?.code || "",
                };
            });
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
        async buildPastMedicalHistory() {
            return [
                ...(await formatCheckBoxData(this.pastMedicalHistory)),
                ...(await formatRadioButtonData(this.pastMedicalHistory)),
                ...(await formatInputFiledData(this.pastMedicalHistory)),
            ];
        },
        async saveConsciousness() {
            const data = await formatRadioButtonData(this.adult);
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const consciousness = new ConsciousnessService(this.patient.patientID, userID);
                const encounter = await consciousness.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient complaints encounter");

                const patientAge = HisDate.getAgeInYears(this.patient.personInformation.birthdate);

                let data;

                if (patientAge < 18) {
                    data = await formatRadioButtonData(this.minor);
                } else {
                    data = await formatRadioButtonData(this.adult);
                }
                await consciousness.saveObservationList(data);
            }
        },
        async buildPhysicalExamination() {
            return [
                ...(await formatCheckBoxData(this.physicalExam)),
                ...(await formatRadioButtonData(this.physicalExam)),
                ...(await formatInputFiledData(this.physicalExam)),
            ];
        },
    },
});
</script>

<style scoped>
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
}

ion-spinner {
    width: 80px;
    height: 80px;
}

.loading-text {
    margin-top: 20px;
    font-size: 18px;
    color: #333;
}
.pause-alert {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin-bottom: 1px;
    text-align: center;
}

.loading {
    pointer-events: none;
}
</style>
