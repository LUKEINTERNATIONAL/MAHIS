import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useTreatmentPlanStore = defineStore('TreatmentPlanStore', {
    state: () => ({
        selectedMedicalDrugsList: [] as any,
        medicalAllergiesList: [] as any,
        selectedMedicalAllergiesList: [] as any,
        nonPharmalogicalTherapyAndOtherNotes: '' as string,
        partialOPDdrugList: [] as any,
        selectedNCDMedicationList: [] as any,
    }),
    actions:{
        setSelectedMedicalDrugsList(data: any) {
            this.selectedMedicalDrugsList = data;
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
                    this.selectedMedicalAllergiesList.splice(index, 1)
                }
            });
            this.selectedMedicalAllergiesList.push(data);
        },
        getSelectedMedicalAllergiesList() {
            return this.selectedMedicalAllergiesList;
        },
        setPartialOPDdrugList(data: any): void {
            this.partialOPDdrugList = data;
        },
        getPartialOPDdrugList(): any {
            return this.partialOPDdrugList;
        },
        setSelectedNCDMedicationList(drug_item: any): void {
            this.selectedNCDMedicationList.push(drug_item);
        },
        getSelectedNCDMedicationList() {
            return this.selectedNCDMedicationList;
        }
    },
    persist:true,
})