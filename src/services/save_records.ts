import { saveDemographicsRecord } from "@/services/SaveRecords/save_demographics";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useWebWorkerFn } from "@vueuse/core";
import Localbase from "localbase";
let db = new Localbase("db");
export async function savePatientRecord() {
    const data = await db
        .collection("patientRecords")
        .get()
        .then(async (patientRecords: any) => {
            const patientIDs = await Promise.all(
                patientRecords.map(async (record: any) => {
                    let patientID = "";
                    if (record.personInformation) {
                        patientID = await saveDemographicsRecord(record);
                    } else {
                        patientID = "";
                    }
                    return patientID;
                })
            );
            return patientIDs;
        });
    console.log("🚀 ~ savePatientRecord ~ data:", data);
    return data;
}
