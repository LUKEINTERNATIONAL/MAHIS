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

import { useAllegyStore } from "@/apps/OPD/stores/AllergyStore";
import { useOPDDiagnosisStore } from "@/apps/OPD/stores/DiagnosisStore";
import { useDispensationStore } from "@/apps/OPD/stores/DispensationStore";
import { useLevelOfConsciousnessStore } from "@/apps/OPD/stores/LevelOfConsciousnessStore";
import { useNonPharmacologicalInterventionStore } from "@/apps/OPD/stores/NonPharmacologicalInterventionStore";
import { usePastMedicalHistoryStore } from "@/apps/OPD/stores/PastMedicalHistoryStore";
import { usePregnancyStore } from "@/apps/OPD/stores/PregnancyStore";
import { usePresentingComplaintsStore } from "@/apps/OPD/stores/PresentingComplaintsStore";

import { useWeightHeightVitalsStore } from "@/apps/Immunization/stores/VitalsStore";
import { usePhysicalExaminationStore } from "@/apps/OPD/stores/PhysicalExamination";
//import { useVitalsStore } from "../stores/OpdVitalsStore";

export async function resetOPDPatientData() {
    localStorage.setItem("saveProgressStatus", "false");
    const opdVitals = useVitalsStore();
    const vitals = useVitalsStore();
    const investigations = useInvestigationStore();
    const outcome = useOutcomeStore();
    const medications = useMedicationsStore();
    const treatmentPlan = useTreatmentPlanStore();
    const diagnosis = useDiagnosisStore();
    const enrollement = useEnrollementStore();
    const nextAppointment = useNextAppointmentStore();
    const registration = useRegistrationStore();
    const weightHeightVitals = useWeightHeightVitalsStore();
    const presentingComplaintsStore = usePresentingComplaintsStore();
    const pastMedicalHistoryStore = usePastMedicalHistoryStore();
    const OPDDiagnosisStore = useOPDDiagnosisStore();

    const levelOfConsciousness = useLevelOfConsciousnessStore()
    const pregnancy = usePregnancyStore()
    const physicalExamination = usePhysicalExaminationStore()
    const allegy = useAllegyStore()


    levelOfConsciousness.reset();
    pregnancy.setPregnancy(pregnancy.getPregnancy())
    pastMedicalHistoryStore.setPastMedicalHistory(pastMedicalHistoryStore.getInitial());
    physicalExamination.setPhysicalExamStore(physicalExamination.getInitial());
    //allegy.selectedMedicalAllergiesList(allegy)

    
    opdVitals.$reset();


    presentingComplaintsStore.setPresentingComplaints(presentingComplaintsStore.getInitial());

    
    // OPDDiagnosisStore.setOPDDiagnosis(OPDDiagnosisStore.getInitial());

    vitals.setVitals(vitals.getInitialVitals());
    registration.setPersonalInformation(registration.getInitialPersonalInformation());
    registration.setSocialHistory(registration.getInitialSocialHistory());
    registration.setHomeLocation(registration.getInitialHomeLocation());
    registration.setCurrentLocation(registration.getInitialCurrentLocation());
    registration.setGuardianInformation(registration.getInitialGuardianInformation());
    weightHeightVitals.setVitals(weightHeightVitals.getInitialVitals());

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
    enrollement.$reset();
    nextAppointment.$reset();
    OPDDiagnosisStore.$reset();
}

export function resetDemographics() {
    // const demographics = useDemographicsStore();
    // demographics.$reset();
}
