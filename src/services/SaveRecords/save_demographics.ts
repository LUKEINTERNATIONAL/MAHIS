import { PatientRegistrationService } from "@/services/patient_registration_service";

export async function saveDemographicsRecord(record: any) {
    const registration: any = new PatientRegistrationService();
    await registration.registerPatient(record.personInformation, []);
    const patientID = registration.getPersonID();
    console.log("lllll");
    if (patientID) {
        return patientID;
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
    } else {
        return "";
    }
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
