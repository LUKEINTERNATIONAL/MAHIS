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
import { useAncEndStore } from "@/apps/ANC/store/ancEnd/ancEndStore";
import { useBehaviourCousellingStore } from "@/apps/ANC/store/counselling/behaviourCousellingStore";
import { useDietCounsellingStore } from "@/apps/ANC/store/counselling/dietCounsellingStore";
import { usePhysiologicalCounselingStore } from "@/apps/ANC/store/counselling/physiologicalCounselingStore";
import { useHeadssAssessmentStore } from "@/apps/ANC/store/others/headsAssessment";
import { useAncVitalsStore } from "@/apps/ANC/store/physical exam/AncVitalsStore";
import { useFetalAssessment } from "@/apps/ANC/store/physical exam/FetalAssessmentStore";
import { useFetalPresentationStore } from "@/apps/ANC/store/physical exam/FetalPresantationStore";
import { usePresentingSigns } from "@/apps/ANC/store/physical exam/PresentingSignsStore";
import { useMaternalExamStore } from "@/apps/ANC/store/physical exam/MaternalExamStore";
import { useSpecificHealthConcernsStore } from "@/apps/ANC/store/quickCheck/specificHealthConcerns";
import { useReasonForVisitStore } from "@/apps/ANC/store/quickCheck/reasonForVisit";
import { useDangerSignsStore } from "@/apps/ANC/store/Tempo";
import { useConfirmPregnancyStore } from "@/apps/ANC/store/quickCheck/confirmPregnancy";
import { useReferralStore } from "@/apps/ANC/store/referral/referralStore";
import { useIpvStore } from "@/apps/ANC/store/symptomsFollowUp/ipvStore";
import { useFatalMovementStore } from "@/apps/ANC/store/symptomsFollowUp/fatalMovementStore";
import { useCurrentPhysiologicalSymptomsStore } from "@/apps/ANC/store/symptomsFollowUp/currentPhysiologicalSymptomsStore";
import { useMedicalFollowUpStore } from "@/apps/ANC/store/symptomsFollowUp/medicalFollowUpStore";
import { usePersistentBehaviourStore } from "@/apps/ANC/store/symptomsFollowUp/persistentBehaviourStore";
import { usePersistentSymptomsStore } from "@/apps/ANC/store/symptomsFollowUp/persistentSymptomsStore";
import { useWomenBehaviourStore } from "@/apps/ANC/store/symptomsFollowUp/womenBehaviourStore";
import { useMedicStore } from "@/apps/ANC/store/symptomsFollowUp/MedicStore";
import { useDiagnosisCounsellingStore } from "@/apps/ANC/store/diagnosisCounsellingStore";
import { useDewormingStore } from "@/apps/ANC/store/dewormingStore";
import { useImmunizationStore } from "@/apps/ANC/store/immunizationStore";
import { useIntimatePartnerStore } from "@/apps/ANC/store/intimatePartnerStore";
import { useLabTestsStore } from "@/apps/ANC/store/LabTestsStore";
import { useMedicationDispensedStore } from "@/apps/ANC/store/medicationDispensed";
import { useTBScreeningStore } from "@/apps/ANC/store/TBScreeningStore";
import { useUrineTestStore } from "@/apps/ANC/store/UrineTestStore";
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

    const ANCobstreticHistory = useObstreticHistoryStore();
    const ANCmedicalHistory = useMedicalHistoryStore();
    const ANCmedic = useMedicationStore();
    const ANCwomanBehavior = useWomanBehaviourStore();
    const ANCcurretPregnancy = useCurrentPregnanciesStore();
    const ancEnd = useAncEndStore();
    const ANCbehaviourCounselling = useBehaviourCousellingStore();
    const ANCdietCounselling = useDietCounsellingStore();
    const ANCphysCounselling = usePhysiologicalCounselingStore();
    const heads = useHeadssAssessmentStore();
    const ANCancvitals = useAncVitalsStore();
    const ANCfatalAssment = useFetalAssessment();
    const ANCfatalPres = useFetalPresentationStore();
    const ANCpresSigns = usePresentingSigns();
    const ANCmaternalExam = useMaternalExamStore();
    const ANCspecifidHealthConditions = useSpecificHealthConcernsStore();
    const ANCvisits = useReasonForVisitStore();
    const ANCdangerSigns = useDangerSignsStore();
    const ANCpregnancy = useConfirmPregnancyStore();
    const ANCreferal = useReferralStore();
    const ANCstore = useIpvStore();
    const ANCfatalMovement = useFatalMovementStore();
    const ANCcurrentPhysiological = useCurrentPhysiologicalSymptomsStore();
    const ANCmedicalFollowUp = useMedicalFollowUpStore();
    const ANCpersistent = usePersistentBehaviourStore();
    const ANCpersistentSymptoms = usePersistentSymptomsStore()
    const ANCwomenBehavior = useWomenBehaviourStore();
    const ANCmedication = useMedicStore();
    const ANCdiagnosisCounselling = useDiagnosisCounsellingStore();
    const ANCdeworming = useDewormingStore();
    const ANCdiagnosis = useDiagnosisStore();
    const ANCimmunisation = useImmunizationStore();
    const ANCintimatePartner = useIntimatePartnerStore();
    const ANCLabTest = useLabTestsStore();
    const ANCmedicationDispensed = useMedicationDispensedStore();
    const ANCtbScreening = useTBScreeningStore();
    const ANCurineTest = useUrineTestStore();

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

  

     ANCobstreticHistory.$reset();
     ANCmedicalHistory.$reset();
     ANCmedic.$reset();
     ANCwomanBehavior.$reset();
     ANCcurretPregnancy.$reset();
 

}

export function resetDemographics() {
    // const demographics = useDemographicsStore();
    // demographics.$reset();
}
