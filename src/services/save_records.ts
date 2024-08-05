import { saveDemographicsRecord } from "@/services/SaveRecords/save_demographics";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useWebWorkerFn } from "@vueuse/core";
import db from "@/db";
export async function savePatientRecord() {
    await db
        .collection("patientRecords")
        .get()
        .then(async (patientRecords: any) => {
            await Promise.all(
                patientRecords.map(async (record: any) => {
                    await saveDemographicsRecord(record);
                })
            );
        });
}
