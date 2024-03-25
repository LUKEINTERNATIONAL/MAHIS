import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useAllegyStore = defineStore('AllergyStore', {
    state: () => ({
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,

        healthcareItemsAllergiesList: [] as any,

        environmentItemsAllergiesList: [] as any,
        
        foodItemsAllergiesList: [] as any
    }),
    actions:{
        setMedicalAllergiesList(data: any) {
            this.medicalAllergiesList = data
        },
        setSelectedMedicalAllergiesList(data: any) {
            this.selectedMedicalAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedMedicalAllergiesList.splice(index, 1)
                }
            })
            this.selectedMedicalAllergiesList.push(data)
        },
    },
    persist:true,

})