import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { DRUG_FREQUENCIES, DrugPrescriptionForImmunizationService } from "../../../services/drug_prescription_for_immunization_service";
import { isEmpty } from "lodash";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import HisDate from "@/utils/Date";
import { createModal } from "@/utils/Alerts";
import nextAppointMent from "@/apps/Immunization/components/Modals/nextAppointMent.vue";
import { ObservationService } from "@/services/observation_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import { useUserStore } from "@/stores/userStore";
import platform, { FileExportType } from "@/composables/usePlatform";
import { exportMobile } from "@/utils/Export";
import db from "@/db";
import workerData from "@/activate_worker";

export async function getVaccinesSchedule(patientID = null) {
    const patient = new PatientService();
    const id = patientID !== null ? patientID : patient.getID();
    
    if (id) {
        const data = await Service.getJson("eir/schedule", { patient_id: id });
        return data;
    }
}

export async function saveVaccineAdministeredDrugs() {
    const store = useAdministerVaccineStore();
    const userId: any = Service.getUserID();
    const programId: any = Service.getProgramID();
    const patient = new PatientService();
    const drugs = [] as any;
    if (!isEmpty(store.getAdministeredVaccines())) {
        try {
            const drugOrders = mapToOrders();
            const prescriptionService = new DrugPrescriptionForImmunizationService(patient.getID(), '' as any);
            const encounter = await prescriptionService.createEncounter();
            if (!encounter) return toastWarning("Unable to create immunization encounter");
            const drugOrder = await prescriptionService.createDrugOrderForImmunization(drugOrders, programId);
            await createObForEachDrugAdminstred(encounter)
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

async function getGenericVaccineSchedule() {
    try {
        const querySnapshot = await db.collection("genericVaccineSchedule").get();

        if (!querySnapshot.empty) {
            const documents: any = []; // Initialize an array to hold document data

            querySnapshot.forEach((doc: any) => {
                documents.push({
                    id: doc.id,     // Include document ID
                    data: doc.data() // Include document data
                });
            });

            await workerData.terminate();
            return documents; // Return all fetched documents
        } else {
            console.warn("No documents found in the genericVaccineSchedule collection.");
            return []; // Return an empty array if no documents exist
        }
    } catch (error) {
        console.error("Error fetching documents or terminating worker:", error);
        return []; // Return an empty array on error
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

async function createObForEachDrugAdminstred(encounter: any) {
    const store = useAdministerVaccineStore();
    store.getAdministeredVaccines().map(async (drug: any) => {
        await ObservationService.saveObs(encounter.encounter_id, {
            concept_id: 2876,
            value_text: drug.drug_.drug.drug_name,
            obs_datetime: encounter.encounter_datetime,
        });
    })
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
    const nameList = ['Vit','Albendazole'];
    const nameParts = name.toLowerCase().split(/[\s,()]+/); // Split the input name into parts
    
    return nameList.some(listedName => {
        const listedNameParts = listedName.toLowerCase().split(/[\s,()]+/); // Split each listed name into parts
        
        // Check if any part of the input name matches any part of the listed name
        return listedNameParts.some(listedPart => 
            nameParts.some(namePart => namePart.includes(listedPart) || listedPart.includes(namePart))
        );
    });
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

export async function getImmunizationVaccineNames(): Promise<any> {
    const data = await Service.getJson(`/immunization/vaccine_names`)
    return data
}


// Define interfaces for better type safety
interface ImmunizationRecord {
    label: string;
    fixed: {
        lessThan1y: number;
        moreThan1y: number;
    };
    outreach: {
        lessThan1y: number;
        moreThan1y: number;
    };
}

interface AEFIVaccine {
    name: string;
}

interface AEFICase {
    name: string;
    data: { count: number }[];
}

interface AEFICategory {
    name: string;
    cases: AEFICase[];
}

interface AEFIData {
    vaccines: AEFIVaccine[];
    categories: AEFICategory[];
}

interface EIRReportsStore {
    immunizationMonthlyReportData: ImmunizationRecord[];
    AEFIReportData: AEFIData;
}

function escapeCSV(str: string): string {
    if (/[,"\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export function exportReportToCSV(): void {
    try {
        const store = EIRreportsStore()
        const user_store = useUserStore()
        const { activePlatformProfile } = platform();

        let CSVString = generateCSVStringForImmunizationMonthly(store.$state.immunizationMonthlyRepoartData as any);
        CSVString += '\n';
        CSVString += generateCSVStringForAEFIMonthly(store.$state.AEFIReportData as any);
        CSVString += '\n';
        CSVString += `
        Date Created: ${new Date().toISOString().split('T')[0]}
        Report Period: ${store.$state.navigationPayload.subTxt}
        Site: ${user_store.$state.userFacilityName}`

        const csvData = new Blob([CSVString], { type: "text/csv;charset=utf-8;" });
        const reportTitle = `${user_store.$state.userFacilityName}_${store.$state.navigationPayload.subTxt}_${store.$state.navigationPayload.title}`;

        if (activePlatformProfile.value.fileExport === FileExportType.WEB) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(csvData);
            link.setAttribute("download", `${reportTitle}.csv`);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (activePlatformProfile.value.fileExport === FileExportType.FILE_SYSTEM) {
            exportMobile(`${reportTitle}.csv`, csvData, "blob");
        } else {
            toastWarning("Platform not supported");
        }
    } catch (error) {
        console.error("Error exporting CSV:", error);
    }
}

function generateCSVStringForImmunizationMonthly(data: ImmunizationRecord[]): string {
    let CSVString = "Category,Static <1y,Static >1y,Outreach <1y,Outreach >1y\n";
    for (const record of data) {
        const row = [
            escapeCSV(record.label),
            record.fixed.lessThan1y,
            record.fixed.moreThan1y,
            record.outreach.lessThan1y,
            record.outreach.moreThan1y
        ].join(',');
        CSVString += row + '\n';
    }
    return CSVString;
}

function generateCSVStringForAEFIMonthly(data: AEFIData): string {
    let CSVString = 'Cases,' + data.vaccines.map(v => escapeCSV(v.name)).join(',') + '\n';
    for (const category of data.categories) {
        CSVString += escapeCSV(category.name) + '\n';
        for (const caseItem of category.cases) {
            const rowData = [escapeCSV(caseItem.name), ...caseItem.data.map(d => d.count)];
            CSVString += rowData.join(',') + '\n';
        }
    }
    return CSVString;
}