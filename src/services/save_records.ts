import { saveDemographicsRecord } from "@/services/SaveRecords/save_demographics";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useWebWorkerFn } from "@vueuse/core";
import Localbase from "localbase";
let db = new Localbase("db");
export async function savePatientRecord() {
    await db
        .collection("patientRecords")
        .get()
        .then(async (patientRecords: any) => {
            await Promise.all(
                patientRecords.map(async (record: any) => {
                    await saveData(record);
                })
            );
        });
}

async function saveData(record: any) {
    let patientID = "";
    if (record.personInformation && record.saveStatus.personInformation == "pending") {
        patientID = await saveDemographicsRecord(record);
        if (patientID) {
            await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).update({
                syncStatus: true,
            });
        }
    } else {
        patientID = "";
    }
    await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).delete();

    return patientID;
}
