import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service"
import { isEmpty } from "lodash"
import { Service } from "@/services/service"
import { PatientService } from "@/services/patient_service"
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts"

export async function getVaccinesSchedule() {
    const patient = new PatientService()
    const data = await Service.getJson('eir/schedule', { patient_id: patient.getID() })
    return data
}

export async function saveVaccineAdministeredDrugs() {
    const store = useAdministerVaccineStore()
    const userID: any = Service.getUserID();
    const patient = new PatientService();
    if (!isEmpty(store.getAdministeredVaccines())) {
        const drugOrders = mapToOrders()
        const prescriptionService = new DrugPrescriptionService(patient.getID(), userID)
        const encounter = await prescriptionService.createEncounter()
        if (!encounter) return toastWarning("Unable to create treatment encounter")
        const drugOrder = await prescriptionService.createDrugOrder(drugOrders)
        if (!drugOrder) return toastWarning("Unable to create drug orders!")
        toastSuccess("Drug order has been created")
    }
}

function mapToOrders(): any[] {
    const store = useAdministerVaccineStore()
    return store.getAdministeredVaccines().map((drug: any) => {
        const startDate = DrugPrescriptionService.getSessionDate();
        const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
        return {
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: drug.dose == "Unknown" ? 0 : drug.dose * frequency?.value || 0,
            start_date: drug.date_administered,
            auto_expire_date: startDate,
            units: 'ml',
            instructions: '',
            dose: '',
            frequency: "",
            batch_number: drug.batch_number,
            visit_id: drug.visit_id,
        };
    });
}