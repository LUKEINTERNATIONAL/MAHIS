import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";

export function createNCDDrugOrder() {
    console.log(mapToOrders())
}

const mapToOrders = () => {
    const NCDMedicationsStore = useNCDMedicationsStore();
    return NCDMedicationsStore.selectedNCDMedicationList.map((drug: any) => {
        drug.frequency = NCDMedicationsStore.frequency_selections[drug.drug_id] || "";
        drug.totalDosage = Object.values(drug.dosage).reduce((sum: number, value) => sum + Number(value), 0);
        console.log(drug);

        const startDate = DrugPrescriptionService.getSessionDate();
        const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency.label) || ({} as (typeof DRUG_FREQUENCIES)[0]);
        return {
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: drug.totalDosage == "Unknown" ? 0 : drug.totalDosage * frequency?.value || 0,
            start_date: startDate,
            // auto_expire_date: this.calculateExpireDate(startDate, drug.duration),
            // units: drug.units,
            instructions: `${drug.name}: ${drug.totalDosage} ${drug.units} ${frequency?.code || ""} for ${drug.duration} days`,
            dose: drug.totalDosage,
            frequency: frequency?.code || "",
        };
    });   
}
