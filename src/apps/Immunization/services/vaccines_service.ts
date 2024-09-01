import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { DRUG_FREQUENCIES, DrugPrescriptionForImmunizationService } from "../../../services/drug_prescription_for_immunization_service";
import { isEmpty } from "lodash";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { createModal } from "@/utils/Alerts";
import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue";

export async function getVaccinesSchedule() {
    const patient = new PatientService();
    if (patient.getID()) {
        const data = await Service.getJson("eir/schedule", { patient_id: patient.getID() });
        return data;
    }
}

export async function saveVaccineAdministeredDrugs() {
    const store = useAdministerVaccineStore();
    const userId: any = Service.getUserID();
    const programId: any = Service.getProgramID();
    const patient = new PatientService();
    if (!isEmpty(store.getAdministeredVaccines())) {
        try {
            const drugOrders = mapToOrders();
            const prescriptionService = new DrugPrescriptionForImmunizationService(patient.getID(), userId);
            const encounter = await prescriptionService.createEncounter();
            if (!encounter) return toastWarning("Unable to create immunization encounter");
            const drugOrder = await prescriptionService.createDrugOrderForImmunization(drugOrders, programId);
            if (!drugOrder) return toastWarning("Unable register vaccine!");
            toastSuccess("Vaccine registred successfully");
            store.setVaccineReload(!store.getVaccineReload());
            if(drugOrder) {
                store.setLastVaccineAdminstredOnschedule(drugOrder)
            }
        } catch (error: any) {
            if (validateBatchString(error.errors) == true) {
                toastWarning(error.errors);
            }
        }
    }
}

function mapToOrders(): any[] {
    const store = useAdministerVaccineStore();
    return store.getAdministeredVaccines().map((drug: any) => {
        const startDate = DrugPrescriptionForImmunizationService.getSessionDate();
        const frequency = DRUG_FREQUENCIES.find((f) => f.label === drug.frequency) || ({} as (typeof DRUG_FREQUENCIES)[0]);
        return {
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: 1,
            start_date: drug.date_administered,
            auto_expire_date: calculateExpireDate(drug.date_administered, 1),
            units: "ml",
            instructions: "",
            dose: 1,
            frequency: "Unknown",
            batch_number:drug.batch_number || 'Unknown',
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
    createModal(nextAppointMent, { class: "otherVitalsModal" }, false);
}

function validateBatchString(input: any) {
    // const stringWithoutNumbers = input.replace(/\d+/g, '')
    // const lowerCaseString = stringWithoutNumbers.toLowerCase()
    // const targetPhrase = "batch number  does not exist"
    // return lowerCaseString.includes(targetPhrase)
    return true;
}

export async function checkIfLastVaccineAdministered() {
    const store = useAdministerVaccineStore();
    const lastVaccineAdminstredOnschedule = store.getLastVaccineAdminstredOnschedule()
    if (lastVaccineAdminstredOnschedule.length > 0) {
        store.getVaccineSchedule()?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
            if(checkIfAllVaccinesAdministeredOnSchedule(vaccineSchudule.antigens) == true) {
                vaccineSchudule.antigens.forEach((antigen: any) => {
                    if (antigen.drug_id == lastVaccineAdminstredOnschedule[0].drug_inventory_id) {
                        openNextVaccineAppoinment();
                    }
                })
            }
        })
    }
    store.setLastVaccineAdminstredOnschedule([]);
}

function checkIfAllVaccinesAdministeredOnSchedule(antigens: any[]): boolean {
    return antigens.every((antigen: any) => antigen.status === 'administered');
}

export async function voidVaccine(orderId: number, reason: string) {
    return Service.void(`orders/${orderId}?reason=${JSON.stringify(reason)}`, { reason });
}

export async function voidVaccineEncounter(encounterId: number, reason: string) {
    return Service.void(`/encounters/${encounterId}`, { reason });
} 

export function checkDrugName(drug: any) {
    if (isNameInList(drug.drug_name) == true) {
        return true;
    } else {
        return false;
    }
}

function isNameInList(name: string): boolean {
    const nameList = ['Vit A', 'Albendazole (400mg tablet)', 'Albendazole (200mg tablet)'];
    return nameList.some(listedName => listedName.toLowerCase().includes(name.toLowerCase()));
}

export async function getMonthsList(): Promise<any> {
    const data = await Service.getJson("immunization/months_picker");
    return data
}

export async function getVaccinesAdministered(start_date: string, end_date: string): Promise<any> {
    const data = await Service.getJson(`immunization/vaccines_administered`, {start_date: start_date, end_date: end_date})
    return data
}

export async function getAefiReport(start_date: string, end_date: string): Promise<any> {
    const data = await Service.getJson(`immunization/aefi_report`, {start_date: start_date, end_date: end_date})
    return data
}

export async function getunderfiveImmunizationsDrugs() {
    const data = await Service.getJson(`immunization/under_five_immunizations_drugs`)
    return data
}

export async function getImmunizationDrugs(): Promise<any> {
    const data = await Service.getJson(`/immunization/drugs`)
    return data
}