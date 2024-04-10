
import { useVitalsStore } from '@/stores/VitalsStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useOutcomeStore } from '@/stores/OutcomeStore'
import { useMedicationsStore } from '@/stores/MedicationsStore'
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'
import { useDiagnosisStore } from '@/stores/DiagnosisStore'

import { useDemographicsStore } from '@/stores/DemographicStore'
import { useEnrollementStore } from '@/stores/EnrollmentStore'
import { useNextAppointmentStore } from '@/stores/NextAppointmentStore'
import { useRegistrationStore } from '@/stores/RegistrationStore'
import { useGeneralStore } from '@/stores/GeneralStore'

export function resetPatientData(){
    const vitals = useVitalsStore()
    const investigations = useInvestigationStore()
    const outcome = useOutcomeStore() 
    const medications = useMedicationsStore()
    const treatmentPlan = useTreatmentPlanStore()
    const diagnosis = useDiagnosisStore()
    const general = useGeneralStore()
    const enrollement = useEnrollementStore()
    const nextAppointment = useNextAppointmentStore()
     
    vitals.$reset()
    investigations.$reset()
    outcome.$reset()
    medications.$reset()
    treatmentPlan.$reset()
    diagnosis.$reset()
    general.$reset()
    enrollement.$reset()
    nextAppointment.$reset()
}

export function resetDemographics(){
    const registration = useRegistrationStore() 
    registration.$reset()
}