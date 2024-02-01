
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
import { useGeneralStore } from '@/stores/GeneralStore'

export function resetPatientData(){
    const vitals = useVitalsStore()
    const investigations = useInvestigationStore()
    const disposition = useDispositionStore() 
    const medications = useMedicationsStore()
    const treatmentPlan = useTreatmentPlanStore()
    const diagnosis = useDiagnosisStore()
    const general = useGeneralStore()
     
    vitals.$reset()
    investigations.$reset()
    disposition.$reset()
    medications.$reset()
    treatmentPlan.$reset()
    diagnosis.$reset()
    general.$reset()
}

export function resetDemographics(){
    const enrollement = useEnrollementStore()
    const nextAppointment = useNextAppointmentStore() 
    const registration = useRegistrationStore() 
    enrollement.$reset()
    nextAppointment.$reset()
    registration.$reset()
}