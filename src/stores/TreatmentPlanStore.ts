import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useTreatmentPlanStore = defineStore('TreatmentPlanStore', {
    state: () => ({
        selectedMedicalDrugsList: [] as any,
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,
        nonPharmalogicalTherapyAndOtherNotes: '' as string,
    }),
    actions:{
        setSelectedMedicalDrugsList(data: any) {
            this.selectedMedicalDrugsList = data
        },
        setMedicalAllergiesList(data: any) {
            this.medicalAllergiesList = data
        },
        setNonPharmalogicalTherapyAndOtherNotes(value: string) {
            this.nonPharmalogicalTherapyAndOtherNotes = value
        },
        getNonPharmalogicalTherapyAndOtherNotes() {
            return this.nonPharmalogicalTherapyAndOtherNotes
        },
        setSelectedMedicalAllergiesList(data: any) {
            this.selectedMedicalAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedMedicalAllergiesList.splice(index, 1)
                }
            })
            this.selectedMedicalAllergiesList.push(data)
        },
        getSelectedMedicalAllergiesList() {
            return this.selectedMedicalAllergiesList
        }
    },
    persist:true,

})