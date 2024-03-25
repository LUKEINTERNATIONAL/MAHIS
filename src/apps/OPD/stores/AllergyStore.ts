import { defineStore } from 'pinia'

export const useAllegyStore = defineStore('AllergyStore', {
    state: () => ({
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,

        healthcareItemsAllergiesList: [] as any,
        selectedHealthcareItemsAllergiesList: [] as any,

        environmentItemsAllergiesList: [] as any,
        selectedEnvironmentItemsAllergiesList: [] as any,

        foodItemsAllergiesList: [] as any,
        selectedFoodItemsAllergiesList: [] as any,
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

        setSelectedHealthcareItemsAllergiesList(data: any) {
            this.selectedHealthcareItemsAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedHealthcareItemsAllergiesList.splice(index, 1)
                }
            })
            this.selectedHealthcareItemsAllergiesList.push(data)
        },

        setSelectedEnvironmentItemsAllergiesList(data: any) {
            this.selectedEnvironmentItemsAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedEnvironmentItemsAllergiesList.splice(index, 1)
                }
            })
            this.selectedEnvironmentItemsAllergiesList.push(data)
        },

        setSelectedFoodItemsAllergiesList(data: any) {
            this.selectedFoodItemsAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id = data.concept_name_id) {
                    this.selectedFoodItemsAllergiesList.splice(index, 1)
                }
            })
            this.selectedFoodItemsAllergiesList.push(data)
        }
    },
    persist:true,

})