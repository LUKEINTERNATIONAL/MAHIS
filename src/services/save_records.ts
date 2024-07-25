import { saveDemographicsRecord } from "@/services/SaveRecords/save_demographics";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useWebWorkerFn } from "@vueuse/core";
import Localbase from "localbase";
let db = new Localbase("db");
export async function savePatientRecord() {
    db.collection("patientRecords")
        .get()
        .then(async (patientRecord: any) => {
            patientRecord.map(async (record: any) => {
                const patientID = await saveDemographicsRecord(record);
                console.log("🚀 ~ patientRecord.map ~ patientID:", patientID);
                if (patientID) {
                    // this.createNationID();
                    // this.createBirthID();
                    // if (Object.keys(this.guardianInformation[0].selectedData).length != 0) {
                    //     if (await this.validations(this.guardianInformation, ["guardianFirstname", "guardianLastname"])) {
                    //         this.createGuardian(patientID);
                    //     }
                    // }
                    // await this.saveBirthdayData(patientID);
                    // await this.enrollProgram(patientID);
                    // await this.CreateRegistrationEncounter(patientID);
                    // this.findPatient(patientID);
                }
            });
        });
}
//  async createNationID() {
//         if (this.validatedNationalID()) {
//             const patient = new PatientService();
//             await patient.updateMWNationalId(getFieldValue(this.personInformation, "nationalID", "value"));
//         }
//     },
//     async createBirthID() {
//         if (this.validatedBirthID()) {
//             const patient = new PatientService();
//             await patient.updateBirthId(this.birthID);
//         }
//     },
