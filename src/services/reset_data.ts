
import { useVitalsStore } from '@/stores/VitalsStore'
import { useInvestigationStore } from '@/stores/InvestigationStore'
import { useDispositionStore } from '@/stores/DispositionStore'
import { useMedicationsStore } from '@/stores/MedicationsStore'

export function resetPatientData(){
    const vitals = useVitalsStore()
    const investigations = useInvestigationStore()
    const disposition = useDispositionStore() 
    const medications = useMedicationsStore()
    vitals.$reset()
    investigations.$reset()
    disposition.$reset()
    medications.$reset()
}