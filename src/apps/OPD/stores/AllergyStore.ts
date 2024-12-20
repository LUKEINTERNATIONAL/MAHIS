import { defineStore } from "pinia";

export function concatenateArrays<T>(...arrays: T[][]): T[] {
    // Concatenate all arrays
    return arrays.reduce((acc, arr) => acc.concat(arr), []);
}

const healthcareEquipmentAllergies = [
    {
        concept_id: 10003,
        name: "Latex",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T08:00:00.000Z",
        concept_name_id: 166,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "a3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10004,
        name: "Nickel",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T09:00:00.000Z",
        concept_name_id: 163,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "b3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10009,
        name: "Sulfur",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T09:00:00.000Z",
        concept_name_id: 162,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "b3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10005,
        name: "Adhesive Tape",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T10:00:00.000Z",
        concept_name_id: 155,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "c3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10006,
        name: "Surgical Gloves",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T11:00:00.000Z",
        concept_name_id: 158,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "d3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10007,
        name: "Medical Implants",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T12:00:00.000Z",
        concept_name_id: 104,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "e3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10003,
        name: "Injera Delight",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T08:00:00.000Z",
        concept_name_id: 100,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "a3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10004,
        name: "Ugali Feast",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T09:00:00.000Z",
        concept_name_id: 164,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "b3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10005,
        name: "Mursik Smoothie",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T10:00:00.000Z",
        concept_name_id: 156,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "c3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10006,
        name: "Sukuma Wiki Surprise",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T11:00:00.000Z",
        concept_name_id: 103,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "d3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10007,
        name: "Mahamri Mix",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T12:00:00.000Z",
        concept_name_id: 160,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "e3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10008,
        name: "Chapati Charm",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T13:00:00.000Z",
        concept_name_id: 105,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "f3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10009,
        name: "Nyama Choma Delight",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T14:00:00.000Z",
        concept_name_id: 106,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "g3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10003,
        name: "Pollen",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T08:00:00.000Z",
        concept_name_id: 165,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "a3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10004,
        name: "Dust Mites",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T09:00:00.000Z",
        concept_name_id: 101,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "b3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10005,
        name: "Mold",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T10:00:00.000Z",
        concept_name_id: 102,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "c3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10006,
        name: "Pet Dander",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T11:00:00.000Z",
        concept_name_id: 157,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "d3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 10007,
        name: "Cockroach Droppings",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T12:00:00.000Z",
        concept_name_id: 161,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "e3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
    {
        concept_id: 6408,
        name: "Other",
        locale: "en",
        creator: 1,
        date_created: "2024-03-26T12:00:00.000Z",
        concept_name_id: 161,
        voided: 0,
        voided_by: null,
        date_voided: null,
        void_reason: null,
        uuid: "e3e71b3e-8d80-11d8-abbb-0024217bb78e",
        concept_name_type: "FULLY_SPECIFIED",
        locale_preferred: 0,
    },
];

export function searchHealthcareEquipmentAllergies(searchString: string) {
    searchString = searchString ? searchString.toString() : "";
    const hcea = healthcareEquipmentAllergies.filter((allergy) => allergy.name.toLowerCase().includes(searchString.toLowerCase()));
    return hcea;
}

export const useAllegyStore = defineStore("AllergyStore", {
    state: () => ({
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,
    }),
    actions: {
        setMedicalAllergiesList(data: any) {
            this.medicalAllergiesList = data;
        },
        setSelectedMedicalAllergiesList(data: any) {
            this.selectedMedicalAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedMedicalAllergiesList.splice(index, 1);
                }
            });
            this.selectedMedicalAllergiesList.push(data);
            this.selectedMedicalAllergiesList = this.selectedMedicalAllergiesList.filter((item: any) => item.selected === true);
        },
        removeSelectedAllergy(allergyToRemove: any) {
            this.selectedMedicalAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == allergyToRemove.concept_name_id) {
                    this.selectedMedicalAllergiesList.splice(index, 1);
                }
            });
            this.changeSelectionToFalse(allergyToRemove);
        },
        findSelectedAllergyByName(name: string): any {
            return this.selectedMedicalAllergiesList.find((allergy: any) => allergy.name === name);
        },
        changeSelectionToFalse(allergy: any) {
            this.medicalAllergiesList.forEach((allergy_: any, index: number) => {
                if (allergy_.concept_name_id == allergy.concept_name_id) {
                    this.medicalAllergiesList[index].selected = false;
                }
            });
        },
        clearSelectedMedicalAllergiesList() {
            this.selectedMedicalAllergiesList.forEach((allergy: any) => {
                this.changeSelectionToFalse(allergy);
            })

            this.medicalAllergiesList.forEach((allergie: any) => {
                allergie.selected = false;
            })
            this.selectedMedicalAllergiesList = [];
        }
    },
    persist: true,
});
