import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";
import HisDate from "@/utils/Date";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { storeToRefs } from "pinia";
import { saveOfflinePatientData } from "@/services/offline_service";



export async function createNCDDrugOrder() {
    try {
        const demographicsStore = useDemographicsStore();
        const { patient } = storeToRefs(demographicsStore);
        const drugOrders = mapToOrders();
        const patientData = JSON.parse(JSON.stringify(patient.value));
        if (drugOrders.length > 0) {
            (patientData.MedicationOrder ??= {}).unsaved ??= [];
            const NCDdrugOrders = { NCD_Drug_Orders: drugOrders };
            patientData.MedicationOrder.unsaved.push(NCDdrugOrders);
            await saveOfflinePatientData(patientData);
            const NCDMedicationsStore = useNCDMedicationsStore();
            NCDMedicationsStore.clearMedicationDataStores();
            toastSuccess("Drug order(s) has been created");
        } else {
            toastWarning("Unable to create drug orders!");
        }
    } catch (error) {
        toastWarning("Unable to create drug orders!");
    }
}

const mapToOrders = () => {
    const NCDMedicationsStore = useNCDMedicationsStore();
    return NCDMedicationsStore.selectedNCDMedicationList.map((drug: any) => {
        drug.frequency = NCDMedicationsStore.frequency_selections[drug.drug_id] || "";
        drug.totalDosage = Object.values(drug.dosage).reduce((sum: number, value) => sum + Number(value), 0);

        const startDate = DrugPrescriptionService.getSessionDate();
        const frequency = determineFrequency(drug.drug_id) as any;
        return {
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: drug.totalDosage == "Unknown" ? 0 : drug.totalDosage * frequency?.value || 0,
            start_date: startDate,
            auto_expire_date: calculateExpireDate(startDate, drug.duration),
            units: drug.units,
            instructions: `${drug.name} ${drug.totalDosage} ${drug.units} ${frequency?.code || ""} for ${drug.duration} days`,
            dose: drug.totalDosage,
            frequency: frequency?.code || "",
        };
    });   
}

const determineFrequency = (drug_id: string) => {
    const NCDMedicationsStore = useNCDMedicationsStore();
    const medication = NCDMedicationsStore.selectedNCDMedicationList.find((med: { drug_id: string }) => med.drug_id === drug_id);

    if (!medication || !medication.dosage) return null;

    const dosesPerDay = ["morning", "afternoon", "evening"].reduce((count, timeOfDay) => {
        return count + (medication.dosage[timeOfDay] ? 1 : 0);
    }, 0);

    switch (dosesPerDay) {
        case 1:
            if (medication.dosage.morning) return DRUG_FREQUENCIES.find((f) => f.code === "QAM");
            if (medication.dosage.afternoon) return DRUG_FREQUENCIES.find((f) => f.code === "QNOON");
            if (medication.dosage.evening) return DRUG_FREQUENCIES.find((f) => f.code === "QPM");
            return DRUG_FREQUENCIES.find((f) => f.code === "OD");

        case 2:
            return DRUG_FREQUENCIES.find((f) => f.code === "BD");

        case 3:
            return DRUG_FREQUENCIES.find((f) => f.code === "TDS");

        default:
            return DRUG_FREQUENCIES.find((f) => f.code === "Unknown");
    }
};

const calculateExpireDate = (startDate: string | Date, duration: any) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(duration));
    return HisDate.toStandardHisFormat(date);
}
