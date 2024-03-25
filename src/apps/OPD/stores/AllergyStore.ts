import { defineStore } from 'pinia'

const temp_data = [
    {
      "concept_id": 88,
      "name": "Aspirin",
      "locale": "en",
      "creator": 1,
      "date_created": "2004-01-01T00:00:00.000+02:00",
      "concept_name_id": 91,
      "voided": 0,
      "voided_by": null,
      "date_voided": null,
      "void_reason": null,
      "uuid": "b9965c3e-8d80-11d8-abbb-0024217bb78e",
      "concept_name_type": "FULLY_SPECIFIED",
      "locale_preferred": 0
    },
    {
      "concept_id": 72,
      "name": "Paracetamol",
      "locale": "en",
      "creator": 1,
      "date_created": "2005-03-15T00:00:00.000+02:00",
      "concept_name_id": 65,
      "voided": 0,
      "voided_by": null,
      "date_voided": null,
      "void_reason": null,
      "uuid": "c1243a6f-8d81-11d8-9876-0024217bb78e",
      "concept_name_type": "FULLY_SPECIFIED",
      "locale_preferred": 0
    },
    {
      "concept_id": 105,
      "name": "Ibuprofen",
      "locale": "en",
      "creator": 1,
      "date_created": "2006-07-20T00:00:00.000+02:00",
      "concept_name_id": 102,
      "voided": 0,
      "voided_by": null,
      "date_voided": null,
      "void_reason": null,
      "uuid": "e29871c0-8d81-11d8-8df0-0024217bb78e",
      "concept_name_type": "FULLY_SPECIFIED",
      "locale_preferred": 0
    }
  ]
  

export const useAllegyStore = defineStore('AllergyStore', {
    state: () => ({
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,

        healthcareItemsAllergiesList: temp_data as any,
        selectedHealthcareItemsAllergiesList: [] as any,

        environmentItemsAllergiesList: temp_data as any,
        selectedEnvironmentItemsAllergiesList: [] as any,

        foodItemsAllergiesList: [] as any,
        selectedFoodItemsAllergiesList: temp_data as any,
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