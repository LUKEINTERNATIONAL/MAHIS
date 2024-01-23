
import { useVitalsStore } from '@/stores/VitalsStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDispositionStore } from '@/stores/DispositionStore'
import { useMedicationsStore } from '@/stores/MedicationsStore'
import { useTreatmentPlanStore } from '@/stores/TreatmentPlanStore'

export function resetPatientData(){
    const vitals = useVitalsStore()
    const investigations = useInvestigationStore()
    const disposition = useDispositionStore() 
    const medications = useMedicationsStore()
    const treatmentPlan = useTreatmentPlanStore()
    vitals.$reset()
    investigations.$reset()
    disposition.$reset()
    medications.$reset()
    treatmentPlan.$reset()
}