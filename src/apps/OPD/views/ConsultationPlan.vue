<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="The consultation plan"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
                :openStepper="openStepper"
            />
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
import { defineComponent } from "vue";
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
import { WorkflowService } from "@/services/workflow_service";
import { useGeneralStore } from "@/stores/GeneralStore";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    modifyWizardData,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";

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
        BasicFooter,
    },
    data() {
        return {
            dispositions: "" as any,
            openStepper: "1" as any,
            wizardData: [] as any,
            StepperData: [] as any,
            isOpen: false,
            iconsContent: icons,
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
        ...mapState(useTreatmentPlanStore, ["selectedMedicalDrugsList", "nonPharmalogicalTherapyAndOtherNotes", "selectedMedicalAllergiesList"]),
        ...mapState(useLevelOfConsciousnessStore, ["levelOfConsciousness", "levelOfConsciousnessMinor"]),
        ...mapState(useGeneralStore, ["activities"]),
    },
    created() {
        // this.getData();
    },
    async mounted() {
        this.getData();
        // if (this.activities.length == 0) {
        //     this.$router.push("patientProfile");
        // }

        this.markWizard();

        // this.openStepper
    },
    watch: {
        vitals: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        $route: {
            handler() {
                this.markWizard();
                this.getData();
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
        async getData() {
            this.wizardData = [];
            const { name } = await WorkflowService.nextTask(this.demographics.patient_id);

            // const steps = ["Clinical Assessment", "Investigations", "Diagnosis", "Treatment Plan", "Outcome"];
            const [{ programActivity: steps }] = this.activities;
            for (let i = 0; i < steps.length; i++) {
                let wizardClass = "common_step";
                if (name == "PRESENTING COMPLAINTS" && steps[i] == "Clinical Assessment") {
                    this.openStepper = i + 1;
                    wizardClass = "open_step common_step";
                }
                if (name == "LAB RESULTS" && steps[i] == "Investigations") {
                    this.openStepper = i + 1;
                    wizardClass = "open_step common_step";
                }
                if (name == "OUTPATIENT DIAGNOSIS" && steps[i] == "Diagnosis") {
                    this.openStepper = i + 1;
                    wizardClass = "open_step common_step";
                }
                if (name == "PRESCRIPTION" && steps[i] == "Treatment") {
                    this.openStepper = i + 1;
                    wizardClass = "open_step common_step";
                }
                if (name == "PATIENT OUTCOME" && steps[i] == "Outcome") {
                    this.openStepper = i + 1;
                    wizardClass = "open_step common_step";
                }
                const title = steps[i];
                const number = i + 1;

                this.wizardData.push({
                    title,
                    class: wizardClass,
                    checked: i === 0 ? false : "",
                    disabled: false,
                    number,
                    last_step: i === steps.length - 1 ? "last_step" : "",
                });

                this.StepperData.push({
                    title,
                    component: title.replace(/\s+/g, ""),
                    value: number.toString(),
                });
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

            if (this.dispositions.length > 0) {
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
        async saveData() {
            await this.saveDiagnosis();
            await this.saveTreatmentPlan();
            await this.saveOutComeStatus();
            await this.saveWomenStatus();
            await this.savePresentingComplaints();
            await this.savePastMedicalHistory();
            await this.saveConsciousness();
            await this.savePhysicalExam();
            resetOPDPatientData();
            this.$router.push("patientProfile");
        },
        async savePastMedicalHistory() {
            const pastMedicalHistoryData: any = await this.buildPastMedicalHistory();
            const userID: any = Service.getUserID();
            if (pastMedicalHistoryData.length > 0) {
                const pastMedicalHistory = new PastMedicalHistory(this.demographics.patient_id, userID);
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
                const PatientComplaints = new PatientComplaintsService(this.demographics.patient_id, userID);
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
                const PhysicalExam = new PhysicalExamService(this.demographics.patient_id, userID);
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
                const patientPregnancy = new PatientGeneralConsultationService(this.demographics.patient_id, userID);
                const encounter = await patientPregnancy.createEncounter();
                if (!encounter) return toastWarning("Unable to create pregnant Status encounter");
                const patientStatus = await patientPregnancy.saveObservationList(womenStatus);
                if (!patientStatus) return toastWarning("Unable to create pregnant Status !");
                toastSuccess("Pregnant Status has been created");
            }
        },
        saveDiagnosis() {
            if (this.OPDdiagnosis[0].selectedData.length > 0) {
                const userID: any = Service.getUserID();
                const diagnosisInstance = new Diagnosis();
                diagnosisInstance.onSubmit(this.demographics.patient_id, userID, this.getFormatedData(this.OPDdiagnosis[0].selectedData));
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

            if (!isEmpty(this.selectedMedicalDrugsList)) {
                const drugOrders = this.mapToOrders();
                const prescriptionService = new DrugPrescriptionService(patientID, userID);
                const encounter = await prescriptionService.createEncounter();
                if (!encounter) return toastWarning("Unable to create treatment encounter");
                const drugOrder = await prescriptionService.createDrugOrder(drugOrders);
                if (!drugOrder) return toastWarning("Unable to create drug orders!");
                toastSuccess("Drug order has been created");
            }
        },

        async saveOutComeStatus() {
            // const userID: any = Service.getUserID()
            // const patientID = this.demographics.patient_id
            // if (!isEmpty(this.dispositions)) {
            //     for (let key in this.dispositions) {
            //         if (this.dispositions[key].type == 'Admit') {
            //             console.log(this.dispositions[key])
            //         } else {
            //         }
            //     }
            // }
        },
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
            const data = await formatRadioButtonData(this.levelOfConsciousness);
            if (data.length > 0) {
                const userID: any = Service.getUserID();
                const consciousness = new ConsciousnessService(this.demographics.patient_id, userID);
                const encounter = await consciousness.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient complaints encounter");

                const patientAge = HisDate.getAgeInYears(this.demographics.birthdate);

                let data;

                if (patientAge < 18) {
                    data = await formatRadioButtonData(this.levelOfConsciousnessMinor);
                } else {
                    data = await formatRadioButtonData(this.levelOfConsciousness);
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

<style scoped></style>
