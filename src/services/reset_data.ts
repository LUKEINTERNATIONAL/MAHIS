import { useVitalsStore } from "@/stores/VitalsStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useOutcomeStore } from "@/stores/OutcomeStore";
import { useMedicationsStore } from "@/stores/MedicationsStore";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";

import { useDemographicsStore } from "@/stores/DemographicStore";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { useNextAppointmentStore } from "@/stores/NextAppointmentStore";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { useGeneralStore } from "@/stores/GeneralStore";
import { useObstreticHistoryStore } from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import { useMedicalHistoryStore } from "@/apps/ANC/store/profile/medicalHistoryStore";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { useCurrentPregnanciesStore } from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import { useMedicationStore } from "@/apps/ANC/store/profile/MedicationStore";
//import { useMedicationsStore } from "@/apps/ANC/store/profile/MedicationsStore";

export async function resetPatientData() {
    sessionStorage.setItem("saveProgressStatus", "false");
    const vitals = useVitalsStore();
    const investigations = useInvestigationStore();
    const outcome = useOutcomeStore();
    const medications = useMedicationsStore();
    const treatmentPlan = useTreatmentPlanStore();
    const diagnosis = useDiagnosisStore();
    const general = useGeneralStore();
    const enrollement = useEnrollementStore();
    const nextAppointment = useNextAppointmentStore();
    const registration = useRegistrationStore();

    const obstreticHistory = useObstreticHistoryStore();
    const medicalHistory = useMedicalHistoryStore();
    const medic = useMedicationStore();
    const womanBehavior = useWomanBehaviourStore();
    const curretPregnancy = useCurrentPregnanciesStore();

    vitals.setVitals(vitals.getInitialSocialHistory());
    registration.setPersonalInformation(registration.getInitialPersonalInformation());
    registration.setSocialHistory(registration.getInitialSocialHistory());
    registration.setHomeLocation(registration.getInitialHomeLocation());
    registration.setCurrentLocation(registration.getInitialCurrentLocation());
    registration.setGuardianInformation(registration.getInitialGuardianInformation());

    enrollement.setDiagnosis(enrollement.getInitialEnrollmentDiagnosis());
    enrollement.setPatientHistory(enrollement.getInitialPatientHistory());
    enrollement.setSubstance(enrollement.getInitialSubstance());
    enrollement.setPatientHistory(enrollement.getInitialFamilyHistory());
    enrollement.setNCDNumber(enrollement.getInitialNCDNumber());
    enrollement.setPatientHistoryHIV(enrollement.getInitialPatientHistoryHIV());
    investigations.$reset();
    outcome.$reset();
    medications.$reset();
    treatmentPlan.$reset();
    diagnosis.$reset();
    general.$reset();
    enrollement.$reset();
    nextAppointment.$reset();

    //ANC profile

    obstreticHistory.$reset();
    medicalHistory.$reset();
    medic.$reset()
    womanBehavior.$reset();
    curretPregnancy.$reset();
}

export function resetDemographics() {
    // const demographics = useDemographicsStore();
    // demographics.$reset();
}
