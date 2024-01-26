
import { useVitalsStore } from '@/stores/VitalsStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDispositionStore } from '@/stores/DispositionStore'
import { useMedicationsStore } from '@/stores/MedicationsStore'
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'
import { useDiagnosisStore } from '@/stores/DiagnosisStore'

import { useDemographicsStore } from '@/stores/DemographicStore'
import { useEnrollementStore } from '@/stores/EnrollmentStore'
import { useNextAppointmentStore } from '@/stores/NextAppointmentStore'
import { useRegistrationStore } from '@/stores/RegistrationStore'

export function resetPatientData(){
    const vitals = useVitalsStore()
    const investigations = useInvestigationStore()
    const disposition = useDispositionStore() 
    const medications = useMedicationsStore()
    const treatmentPlan = useTreatmentPlanStore()
    const diagnosis = useDiagnosisStore()
    vitals.$reset()
    investigations.$reset()
    disposition.$reset()
    medications.$reset()
    treatmentPlan.$reset()
    diagnosis.$reset()
}

export function resetDemographics(){
    const demographics = useDemographicsStore()
    const enrollement = useEnrollementStore()
    const nextAppointment = useNextAppointmentStore() 
    const registration = useRegistrationStore() 
    demographics.$reset()
    enrollement.$reset()
    nextAppointment.$reset()
    registration.$reset()
}