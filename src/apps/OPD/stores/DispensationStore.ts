import { DrugPrescriptionService } from '@/services/drug_prescription_service';
import { defineStore } from 'pinia'

interface DispensationData {
    drugPrescriptions: any[]
    dispensedMedication: any[]
    payload: {} //{"dispensations":[{"drug_order_id":2399362,"date":"2024-03-27","quantity":"3"}],"program_id":14}

}

export const useDispensationStore = defineStore('dispensation', {
    state: (): DispensationData => ({
        drugPrescriptions: [],
        dispensedMedication: [],
        payload: {}
    }),
    actions: {
        validateInputs() {
            let isThereAnError = false
            this.drugPrescriptions.forEach(Element => {
                if (Element.other.quantity == 0 && Element.reason == "") {
                    Element.showValidation = true
                    isThereAnError = true
                } else {
                    Element.showValidation = false
                }
            })
            return isThereAnError
        },
        initializeDispensedAmount() {
            this.drugPrescriptions.forEach(Element => {
                Element.other.quantity = 0
            })
        },
        initializeValidationsBoolean() {
            this.drugPrescriptions.forEach(Element => {
                Element.showValidation = false
            })
        },
        initializeReasonParameter() {
            this.drugPrescriptions.forEach(Element => {
                Element.reason = ""
            })
        },
        getValidation(index: number) {
            return this.drugPrescriptions[index].showValidation
        },
        setReason(reason: string, index: number) {
            this.drugPrescriptions[index].reason = reason
        },
        setDrugPrescriptions(prescriptions: any[]) {
            this.drugPrescriptions = prescriptions
        },
        getDrugPrescriptions() {
            return this.drugPrescriptions
        },
        updateCheckboxBool(selected: boolean, index: any) {
            this.drugPrescriptions[index].isSelected = selected
            if (!selected) {
                this.drugPrescriptions[index].other.quantity = 0
                this.drugPrescriptions[index].reason = ""
            }
        },
        getCheckedBool(index: any) {
            return this.drugPrescriptions[index].isSelected
        },
        getReason(index: number) {
            return this.drugPrescriptions[index].reason
        },
        getDispensedMedications() {
            return this.dispensedMedication;
        },
        addQuantity(quantity: number, index: number) {
            this.drugPrescriptions[index].other.quantity = quantity
        },
        saveDispensedMedications() {
            this.dispensedMedication = this.drugPrescriptions
        },
        setDispensedMedicationsPayload() {
            //{"dispensations":[{"drug_order_id":2399362,"date":"2024-03-27","quantity":"3"}],"program_id":14}
            const payloadObject = {
                dispensations: [] as any[],
                program_id: 14
            }
            const dispensedDrugsWithDetailsArray = [] as any[]

            this.dispensedMedication.forEach(Element => {
                const dispensedDrugsDetailsObject = {
                    drug_order_id: null,
                    quantity: null,
                    date: null
                }

                dispensedDrugsDetailsObject.drug_order_id = Element.other.order_id
                dispensedDrugsDetailsObject.quantity = Element.other.quantity
                dispensedDrugsDetailsObject.date = Element.prescription

                dispensedDrugsWithDetailsArray.push(dispensedDrugsDetailsObject)
            })
            payloadObject.dispensations = dispensedDrugsWithDetailsArray
            this.payload = payloadObject
        },
        getDispensedMedicationsPayload() {
            return this.payload
        }
    }
})