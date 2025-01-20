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
import { saveOfflinePatientData } from "@/services/offline_service";
import { getOfflineRecords } from "@/services/offline_service";
import { useStatusStore } from "@/stores/StatusStore";

export async function saveVaccineAdministeredDrugs(patientData: any) {
    const patient = JSON.parse(JSON.stringify(patientData));
    const store = useAdministerVaccineStore();
    if (!isEmpty(store.getAdministeredVaccines())) {
        const drugOrders = mapToOrders();
        const obs = await createObForEachDrugAdminstred();
        let vaccines = patient?.vaccineAdministration;
        vaccines.orders = [...vaccines?.orders, ...drugOrders];
        vaccines.voided = vaccines.voided.filter((drug: any) => drug.drug_name !== drugOrders[0]?.drug_name);
        vaccines.obs = [...vaccines?.obs, ...obs];
        store.setVaccineReload(!store.getVaccineReload());
        if (vaccines.orders.length > 0) {
            store.setLastVaccineAdminstredOnschedule(vaccines.orders);
        }
        updateVaccineStatus(patient, drugOrders[0]?.drug_name, "administered", obs[0]?.obs_datetime);
        await saveOfflinePatientData(patient);
        toastSuccess("Saved successful");
        await checkIfLastVaccineAdministered(patient);
    }
}
function updateVaccineStatus(patient: any, drugName: any, newStatus: any, date: any) {
    patient.vaccineSchedule.vaccine_schedule.forEach((visit: any) => {
        visit.antigens.forEach((antigen: any) => {
            if (antigen.drug_name === drugName) {
                antigen.status = newStatus;
                antigen.date_administered = date;
            }
        });
    });
}
export async function getOfflineVaccineSchedule(gender: string, birthdate: string) {
    const genericVaccineSchedule = await getGenericVaccineSchedule(gender);
    return await updateMilestoneStatus(new Date(birthdate), genericVaccineSchedule);
}

async function getGenericVaccineSchedule(gender: string) {
    try {
        let genericVaccineSchedule: any = await getOfflineRecords("genericVaccineSchedule");
        if (genericVaccineSchedule.length > 0) {
            if (gender == "M") {
                return genericVaccineSchedule[0].genericVaccineSchedule.male_schedule;
            } else if (gender == "F") {
                return genericVaccineSchedule[0].genericVaccineSchedule.female_schedule;
            }
        } else if (useStatusStore().apiStatus) {
            genericVaccineSchedule = await Service.getJson("eir/schedule/generic", { paginate: false });
            if (gender == "M") {
                return genericVaccineSchedule.male_schedule;
            } else if (gender == "F") {
                return genericVaccineSchedule.female_schedule;
            }
        }
    } catch (error) {
        console.error("Error getting offline generic vaccine schedule", error);
        return [];
    }
}
async function updateMilestoneStatus(birthdate: Date, schedule: any[]) {
    const today = new Date();

    schedule.forEach((visit) => {
        const milestoneAge = visit.age.toLowerCase();

        // Determine the target date for this milestone
        let targetDate: Date | null = null;

        if (milestoneAge === "at birth") {
            targetDate = new Date(birthdate); // At birth means the same day as birthdate
        } else if (milestoneAge.includes("weeks")) {
            const weeks = parseInt(milestoneAge.split(" ")[0], 10);
            targetDate = new Date(birthdate);
            targetDate.setDate(birthdate.getDate() + weeks * 7); // Add weeks to birthdate
        } else if (milestoneAge.includes("months")) {
            const months = parseInt(milestoneAge.split(" ")[0], 10);
            targetDate = new Date(birthdate);
            targetDate.setMonth(birthdate.getMonth() + months); // Add months to birthdate
        } else if (milestoneAge.includes("years")) {
            const years = parseInt(milestoneAge.split(" ")[0], 10);
            targetDate = new Date(birthdate);
            targetDate.setFullYear(birthdate.getFullYear() + years); // Add years to birthdate
        }

        // Determine the milestone status based on the target date
        if (targetDate) {
            if (targetDate > today) {
                visit.milestone_status = "upcoming";
            } else if (
                targetDate.toDateString() === today.toDateString() // Same date as today
            ) {
                visit.milestone_status = "current";
            } else {
                visit.milestone_status = "passed";
            }
        } else {
            visit.milestone_status = "unknown"; // In case no valid age is parsed
        }
    });

    return { vaccine_schedule: schedule };
}

function mapToOrders(): any[] {
    const store = useAdministerVaccineStore();
    return store.getAdministeredVaccines().map((drug: any) => {
        return {
            drug_name: drug?.drug_?.drug?.drug_name || drug?.drug_?.drug_name,
            drug_inventory_id: drug.drug_id,
            equivalent_daily_dose: 1,
            start_date: drug.date_administered,
            auto_expire_date: calculateExpireDate(drug.date_administered, 1),
            units: "ml",
            instructions: "",
            dose: 1,
            frequency: "Unknown",
            batch_number: drug.batch_number || "Unknown",
            prn: 0,
        };
    });
}

async function createObForEachDrugAdminstred() {
    const store = useAdministerVaccineStore();
    const administeredVaccines = store.getAdministeredVaccines();

    const observations = await Promise.all(
        administeredVaccines.map(async (drug: any) => {
            return {
                concept_id: 2876,
                value_text: drug?.drug_?.drug?.drug_name || drug?.drug_?.drug_name,
                obs_datetime: drug.date_administered,
            };
        })
    );

    return observations;
}

function calculateExpireDate(startDate: string | Date, duration: any) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(duration));
    return HisDate.toStandardHisFormat(date);
}

function openNextVaccineAppoinment() {
    createModal(nextAppointMent, { class: "otherVitalsModal", id: "nextAppointment" }, false);
}

function validateBatchString(input: any) {
    // const stringWithoutNumbers = input.replace(/\d+/g, '')
    // const lowerCaseString = stringWithoutNumbers.toLowerCase()
    // const targetPhrase = "batch number  does not exist"
    // return lowerCaseString.includes(targetPhrase)
    return true;
}

export async function checkIfLastVaccineAdministered(patient: any) {
    const store = useAdministerVaccineStore();
    const lastVaccineAdminstredOnschedule = store.getLastVaccineAdminstredOnschedule();
    if (lastVaccineAdminstredOnschedule.length > 0) {
        patient?.vaccineSchedule?.vaccine_schedule?.forEach((vaccineSchudule: any) => {
            if (checkIfAllVaccinesAdministeredOnSchedule(vaccineSchudule.antigens) == true) {
                vaccineSchudule.antigens.forEach((antigen: any) => {
                    if (antigen.drug_id == lastVaccineAdminstredOnschedule[0].drug_inventory_id) {
                        openNextVaccineAppoinment();
                    }
                });
            }
        });
    }
    store.setLastVaccineAdminstredOnschedule([]);
}

function checkIfAllVaccinesAdministeredOnSchedule(antigens: any[]): boolean {
    return antigens.every((antigen: any) => antigen.status === "administered");
}

export async function voidVaccine(patientData: any, vaccine: any, reason: string) {
    const patient = JSON.parse(JSON.stringify(patientData));
    let vaccines = patient?.vaccineAdministration;
    const drugExists = vaccines.orders.some((drug: any) => drug.drug_name === vaccine.drug.drug_name);
    if (drugExists) {
        vaccines.orders = vaccines.orders.filter((drug: any) => drug.drug_name !== vaccine.drug.drug_name);
        vaccines.obs = vaccines.obs.filter((drug: any) => drug.value_text !== vaccine.drug.drug_name);
    } else {
        vaccines.voided = [...vaccines?.voided, { reason: reason, order_id: vaccine.drug.order_id, drug_name: vaccine.drug.drug_name }];
    }
    updateVaccineStatus(patient, vaccine.drug.drug_name, "pending", "");
    await saveOfflinePatientData(patient);
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
    const nameList = ["Vit", "Albendazole"];
    const nameParts = name.toLowerCase().split(/[\s,()]+/); // Split the input name into parts

    return nameList.some((listedName) => {
        const listedNameParts = listedName.toLowerCase().split(/[\s,()]+/); // Split each listed name into parts

        // Check if any part of the input name matches any part of the listed name
        return listedNameParts.some((listedPart) => nameParts.some((namePart) => namePart.includes(listedPart) || listedPart.includes(namePart)));
    });
}

export async function getMonthsList(): Promise<any> {
    const data = await Service.getJson("immunization/months_picker");
    return data;
}

export async function getVaccinesAdministered(start_date: string, end_date: string): Promise<any> {
    const data = await Service.getJson(`immunization/vaccines_administered`, { start_date: start_date, end_date: end_date });
    return data;
}

export async function getAefiReport(start_date: string, end_date: string): Promise<any> {
    const data = await Service.getJson(`immunization/aefi_report`, { start_date: start_date, end_date: end_date });
    return data;
}

export async function getunderfiveImmunizationsDrugs() {
    const data = await Service.getJson(`immunization/under_five_immunizations_drugs`);
    return data;
}

export async function getImmunizationVaccineNames(): Promise<any> {
    const data = await Service.getJson(`/immunization/vaccine_names`);
    return data;
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
        const store = EIRreportsStore();
        const user_store = useUserStore();
        const { activePlatformProfile } = platform();

        let CSVString = generateCSVStringForImmunizationMonthly(store.$state.immunizationMonthlyRepoartData as any);
        CSVString += "\n";
        CSVString += generateCSVStringForAEFIMonthly(store.$state.AEFIReportData as any);
        CSVString += "\n";
        CSVString += `
        Date Created: ${new Date().toISOString().split("T")[0]}
        Report Period: ${store.$state.navigationPayload.subTxt}
        Site: ${user_store.$state.userFacilityName}`;

        const csvData = new Blob([CSVString], { type: "text/csv;charset=utf-8;" });
        const reportTitle = `${user_store.$state.userFacilityName}_${store.$state.navigationPayload.subTxt}_${store.$state.navigationPayload.title}`;

        if (activePlatformProfile.value.fileExport === FileExportType.WEB) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(csvData);
            link.setAttribute("download", `${reportTitle}.csv`);
            link.style.display = "none";
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
            record.outreach.moreThan1y,
        ].join(",");
        CSVString += row + "\n";
    }
    return CSVString;
}

function generateCSVStringForAEFIMonthly(data: AEFIData): string {
    let CSVString = "Cases," + data.vaccines.map((v) => escapeCSV(v.name)).join(",") + "\n";
    for (const category of data.categories) {
        CSVString += escapeCSV(category.name) + "\n";
        for (const caseItem of category.cases) {
            const rowData = [escapeCSV(caseItem.name), ...caseItem.data.map((d) => d.count)];
            CSVString += rowData.join(",") + "\n";
        }
    }
    return CSVString;
}
