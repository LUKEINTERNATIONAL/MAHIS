import { defineStore } from "pinia";
import { ref } from "vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

const DiabetesMedication = [
    'Long acting Insulin',
    'Short Acting Insulin',
    'Metformin',
    'Glibenclamide',
]
const AntiHypertensives = [
    'Diuretic',
    'CCB',
    'ACE-I',
    'BB',
]
const other = [
    'Aspirin',
    'Statin',
]

const drugObj = (drug_id: number, name: string, category: string) => {
    return { drug_id: drug_id, name: name, category: category, units: "", dosage_form: "", dose_strength: "" };
}

export const useOtherNCDMedicationStore = defineStore("OtherNCDMedicationsStore", {
    state: () => ({
        otherNCDMedications: [] as any,
        selectedOtherNCDMedicationList: [] as any,
    }),
    actions: {
        setSelectedNCDMedicationList(drug_item: any): void {
            this.selectedOtherNCDMedicationList.push(drug_item);
        },
        getSelectedNCDMedicationList() {
            return this.selectedOtherNCDMedicationList;
        },
        addSearchedDrug(data: any) {
            const drug = drugObj(data.drug_id, data.name, "Other");
            const exists = this.otherNCDMedications.some((med: any) => med.drug_id === drug.drug_id);
            if (!exists) {
                this.otherNCDMedications.unshift(drug);
                const newMedication = {
                    medication: drug.name,
                    dosage: {
                        morning: null,
                        afternoon: null,
                        evening: null,
                    },
                };
                this.setSelectedNCDMedicationList(newMedication);
            }
        },
        clearOtherNCDMedications() {
            this.otherNCDMedications = [];
            this.selectedOtherNCDMedicationList = [];
        }
    },
    persist: true,
});

export const useNCDMedicationsStore = defineStore("NCDmedicationsStore", {
    state: () => ({
        medications: [] as any,
        selectedNCDMedicationList: [] as any,
        frequency_selections: ref<{ [key: string]: any }>({}),
    }),
    actions: {
        setMedications(data: any) {
            this.medications = data;
        },
        initMedications() {
            if (this.medications.length == 0) {
                this.medications.push(...other.map((drug, index) => drugObj(index + 1, drug, "Other") as any));

                this.medications.push(
                    ...AntiHypertensives.map((drug, index) => drugObj(other.length + index + 1, drug, "AntiHypertensive") as any)
                );

                this.medications.push(
                    ...DiabetesMedication.map(
                        (drug, index) => drugObj(AntiHypertensives.length + index + 1, drug, "DiabetesMedication") as any
                    )
                );
            }
        },
        setSelectedNCDMedicationList(drug_item: any): void {
            this.selectedNCDMedicationList.push(drug_item);
        },
        getSelectedNCDMedicationList() {
            return this.selectedNCDMedicationList;
        },
    },
    persist: true,
});

export function addOtherMedicationToNCDMedicationList() {
    try {
        const NCDMedicationsStore = useNCDMedicationsStore();
        const OtherNCDMedicationStore = useOtherNCDMedicationStore();
        NCDMedicationsStore.medications = [...OtherNCDMedicationStore.otherNCDMedications, ...NCDMedicationsStore.medications];
        NCDMedicationsStore.medications = NCDMedicationsStore.medications.reduce((unique: any, item: any) => {
            if (!unique.some((med: any) => med.drug_id === item.drug_id)) {
                unique.push(item);
            }
            return unique;
        }, []);

        NCDMedicationsStore.selectedNCDMedicationList = [
            ...OtherNCDMedicationStore.selectedOtherNCDMedicationList,
            ...NCDMedicationsStore.selectedNCDMedicationList,
        ];
        toastSuccess("Medication added successfully");
    } catch (error) {
        
    }
}