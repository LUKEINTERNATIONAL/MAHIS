import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore"
import { DRUG_FREQUENCIES, DrugPrescriptionForImmunizationService } from "../../../services/drug_prescription_for_immunization_service"
import { isEmpty } from "lodash"
import { Service } from "@/services/service"
import { PatientService } from "@/services/patient_service"
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts"
import HisDate from "@/utils/Date"
import { createModal } from "@/utils/Alerts"
import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue"

export async function getVaccinesSchedule() {
    const patient = new PatientService()
    const data = await Service.getJson('eir/schedule', { patient_id: patient.getID() })
    return data
}

export async function saveVaccineAdministeredDrugs() {
    openNextVaccineAppoinment()
    // const store = useAdministerVaccineStore()
    // const userId: any = Service.getUserID();
    // const programId: any = Service.getProgramID();
    // const patient = new PatientService();
    // if (!isEmpty(store.getAdministeredVaccines())) {
    //     const drugOrders = mapToOrders()
    //     const prescriptionService = new DrugPrescriptionForImmunizationService(patient.getID(), userId)
    //     const encounter = await prescriptionService.createEncounter()
    //     if (!encounter) return toastWarning("Unable to create immunization encounter")
    //     const drugOrder = await prescriptionService.createDrugOrderForImmunization(drugOrders, programId)
    //     if (!drugOrder) return toastWarning("Unable register vaccine!")
    //     toastSuccess("Vaccine registred successfully")
    //     store.setVaccineReload(!store.getVaccineReload())

    // }
}

function mapToOrders(): any[] {
    const store = useAdministerVaccineStore()
    return store.getAdministeredVaccines().map((drug: any) => {
        const startDate = DrugPrescriptionForImmunizationService.getSessionDate();
        const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
        return {
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: 1,
            start_date: drug.date_administered,
            auto_expire_date: calculateExpireDate(drug.date_administered, 1),
            units: 'ml',
            instructions: '',
            dose: 1,
            frequency: "Unknown",
            batch_number: drug.batch_number,
            prn: 0,
        };
    });
}

function calculateExpireDate(startDate: string | Date, duration: any) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(duration));
    return HisDate.toStandardHisFormat(date);
}

function openNextVaccineAppoinment() {
    createModal(nextAppointMent, { class: "otherVitalsModal" }, false)
}