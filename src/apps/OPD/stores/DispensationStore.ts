import { DrugPrescriptionService } from '@/services/drug_prescription_service';
import { defineStore } from 'pinia'

interface DispensationData {
    storeDrugPrescriptions: any[]
    undispensedPrescriptions: any[]
    dispensedMedication: any[]
    payload: any[]
}

export const useDispensationStore = defineStore('dispensation', {
    state: (): DispensationData => ({
        storeDrugPrescriptions: [],
        undispensedPrescriptions: [],
        dispensedMedication: [],
        payload: []
    }),
    actions: {
        setPreviousDrugPrescriptions(prescriptions: any[]) {
            this.storeDrugPrescriptions = prescriptions;
        },
        getPreviousDrugPrescriptions() {
            return this.storeDrugPrescriptions;
        },
        addCheckboxBool(checked: boolean, index: any) {
            this.storeDrugPrescriptions[index].isSelected = checked;
        },
        getUnprescribedMedications() {
            const drugPrescriptions = this.storeDrugPrescriptions

            drugPrescriptions.forEach(element => {
                if (element.isSelected) {
                    return
                } else {
                    this.undispensedPrescriptions.push(element)
                }
            })
            return this.undispensedPrescriptions
        },
        setDispensedMedications() {
            const drugPrescriptions = this.storeDrugPrescriptions

            drugPrescriptions.forEach(element => {
                if (element.isSelected) {
                    this.dispensedMedication.push(element)
                } else {
                    return
                }
            })
            
        },
        setPayload() {
            const payloadObject = {}
            const dispensedDrugsArray = []
            const drugObject = {}

            this.dispensedMedication.forEach(Element => {
                const drug_order_id = Element.other.order.order_id
                const quantity = 0
            })
        }
    }
})