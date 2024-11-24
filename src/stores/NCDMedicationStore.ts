import { defineStore } from "pinia";
import { ref } from "vue";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { DrugService } from "@/services/drug_service";

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
            drug.units = data.units;
            const exists = this.otherNCDMedications.some((med: any) => med.drug_id === drug.drug_id);
            if (!exists) {
                this.otherNCDMedications.unshift(drug);
                const newMedication = {
                    dosage: {
                        morning: null,
                        afternoon: null,
                        evening: null,
                    },
                    duration: null,
                    ...drug,
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
        filteredMedications: [] as any,
        selectedNCDMedicationList: [] as any,
        frequency_selections: ref<{ [key: string]: any }>({}),
    }),
    actions: {
        setMedications(data: any) {
            this.medications = data;
            this.filteredMedications  = data;
        },
        setFilteredMedications(data: any) {
            this.filteredMedications = data;
        },
        initMedications() {

        },

        setSelectedNCDMedicationList(drug_item: any): void {
            this.selectedNCDMedicationList.push(drug_item);
        },
        getSelectedNCDMedicationList() {
            return this.selectedNCDMedicationList;
        },
        clearMedicationDataStores() {
            this.medications = [];
            this.filteredMedications = [];
            this.selectedNCDMedicationList = [];
            this.frequency_selections = [];
        }
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

        NCDMedicationsStore.filteredMedications = NCDMedicationsStore.medications;
        toastSuccess("Medication added successfully");
    } catch (error) {
        
    }
}

const DiabetesMedication = {
    name: "DiabetesMedication",
    ids: [337, 336, 280, 410, 729, 263, 812, 265, 264, 240, 266, 726, 728, 223],
};

const AntiHypertensivesMedication = {
    name: "AntiHypertensivesMedication",
    ids: [],
};

const Diuretics = {
    name: "Diuretics (Water Pills)",
    ids: [274, 168, 648, 289, 286, 164, 287, 288, 672, 257, 1233, 671],
};

const CCB = {
    name: "CCB (Calcium Channel Blockers)",
    ids: [559, 1236, 1234, 558, 1235, 1211, 276, 277, 278, 279],
};

const ACE_I = {
    name: "ACE-I (Angiotensin Converting Enzyme Inhibitors)",
    ids: [556, 653, 557, 652, 943, 1238, 1240, 1237, 942, 1239, 946, 1503, 944, 1504, 945, 1505],
};

const BB = {
    name: "BB (Beta Blockers)",
    ids: [116, 85, 117, 1232, 936, 1364, 937, 1365, 1366],
};


export async function fetchAndStoreMedications(medicationType: any) {
    const NCDMedicationsStore = useNCDMedicationsStore();
    const promises = medicationType.ids.map(async (medicationId: any) => {
        try {
        const data = await DrugService.getDrugById(medicationId);
        if (data) {
            if (!NCDMedicationsStore.medications.some((med: any) => med.drug_id === data.drug_id)) {
                const drug = drugObj(data.drug_id, data.name, medicationType.name);
                NCDMedicationsStore.medications.push(drug);
            }
        }
        } catch (error) {
        console.error(`Error fetching drug ID ${medicationId}:`, error);
        }
    });

    NCDMedicationsStore.filteredMedications = NCDMedicationsStore.medications;
    return Promise.all(promises);
}

export function getDiabetesDrugs() {
  return fetchAndStoreMedications(DiabetesMedication);
}

export function getAntiHypertensivesMedication() {
  AntiHypertensivesMedication.ids = [
    ...Diuretics.ids,
    ...CCB.ids,
    ...ACE_I.ids,
    ...BB.ids
  ] as any;
  
  return fetchAndStoreMedications(AntiHypertensivesMedication);
}

export function clearMedicationData() {
    const NCDMedicationsStore = useNCDMedicationsStore();
    NCDMedicationsStore.clearMedicationDataStores();
}

export function MedicationSelectionHasValues(): boolean {
    const NCDMedicationsStore = useNCDMedicationsStore();

    return NCDMedicationsStore.selectedNCDMedicationList.some((med: any) => {
        const { morning, afternoon, evening } = med.dosage;
        const morningNum = typeof morning === "string" ? Number(morning) : morning;
        const afternoonNum = typeof afternoon === "string" ? Number(afternoon) : afternoon;
        const eveningNum = typeof evening === "string" ? Number(evening) : evening;

        return (
            (typeof morningNum === "number" && morningNum > 0) ||
            (typeof afternoonNum === "number" && afternoonNum > 0) ||
            (typeof eveningNum === "number" && eveningNum > 0)
        );
    });
}