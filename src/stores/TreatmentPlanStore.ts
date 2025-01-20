import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useTreatmentPlanStore = defineStore("TreatmentPlanStore", {
    state: () => ({
        selectedMedicalDrugsList: [] as any,
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,
        nonPharmalogicalTherapyAndOtherNotes: "" as string,
        partialOPDdrugList: [] as any,
        editingDrugItem: null,
    }),
    actions: {
        setSelectedMedicalDrugsList(data: any[]): any[] {
            const drugMap = new Map(this.selectedMedicalDrugsList.map((drug: any) => [drug.drug_id, drug]));
            data.forEach((newDrug) => {
                drugMap.set(newDrug.drug_id, newDrug);
            });
            this.selectedMedicalDrugsList = Array.from(drugMap.values());
            return this.selectedMedicalDrugsList;
        },
        removeDrugById(drugId: string | number): void {
            const index = this.selectedMedicalDrugsList.findIndex((drug: any) => drug.drug_id === drugId);

            if (index !== -1) {
                this.selectedMedicalDrugsList.splice(index, 1);
            }
        },
        setMedicalAllergiesList(data: any) {
            this.medicalAllergiesList = data;
        },
        setNonPharmalogicalTherapyAndOtherNotes(value: string) {
            this.nonPharmalogicalTherapyAndOtherNotes = value;
        },
        getNonPharmalogicalTherapyAndOtherNotes() {
            return this.nonPharmalogicalTherapyAndOtherNotes;
        },
        setSelectedMedicalAllergiesList(data: any) {
            this.selectedMedicalAllergiesList.forEach((allergy: any, index: number) => {
                if (allergy.concept_name_id == data.concept_name_id) {
                    this.selectedMedicalAllergiesList.splice(index, 1);
                }
            });
            this.selectedMedicalAllergiesList.push(data);
        },
        getSelectedMedicalAllergiesList() {
            return this.selectedMedicalAllergiesList;
        },
        setPartialOPDdrugList(data: any[]): void {
            const uniqueDrugsMap = new Map();
            data.forEach((drug) => {
                if (drug && drug.drug_id) {
                    uniqueDrugsMap.set(drug.drug_id, drug);
                }
            });
            this.partialOPDdrugList = Array.from(uniqueDrugsMap.values());
        },
        getPartialOPDdrugList(): any {
            return this.partialOPDdrugList;
        },
    },
    persist: true,
});