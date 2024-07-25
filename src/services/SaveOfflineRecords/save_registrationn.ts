import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { useWebWorkerFn } from "@vueuse/core";

export class SaveRegistrationRecordsService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 7, providerID);
    }

    async getNextAppointment() {
        const registration: any = new PatientRegistrationService();
        // await registration.registerPatient(this.personInformation[0].selectedData, []);
        // const patientID = registration.getPersonID();
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
}
