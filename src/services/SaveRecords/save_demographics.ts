import { PatientRegistrationService } from "@/services/patient_registration_service";
import { PatientService } from "@/services/patient_service";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import { Service } from "@/services/service";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientProgramService } from "@/services/patient_program_service";
import Localbase from "localbase";
let db = new Localbase("db");
export async function saveDemographicsRecord(record: any) {
    if (record.personInformation) {
        const registration: any = new PatientRegistrationService();
        await registration.registerPatient(record.personInformation, []);
        const patientID = registration.getPersonID();
        await db
            .collection("patientRecords")
            .doc({ offlinePatientID: record.offlinePatientID })
            .update({
                serverPatientID: patientID,
                saveStatus: {
                    personInformation: "complete",
                },
            });
        if (patientID) {
            createNationID(record.otherPersonInformation.nationalID);
            createBirthID(record.otherPersonInformation.birthID);
            createGuardian(patientID, record.guardianInformation, record.otherPersonInformation.relationshipID);
            await saveBirthdayData(patientID, record.birthRegistration);
            await enrollProgram(patientID);
            await CreateRegistrationEncounter(patientID);
            return patientID;
        } else {
            return "";
        }
    } else {
        return "";
    }
}
async function createNationID(nationalID: any) {
    if (nationalID) {
        const patient = new PatientService();
        await patient.updateMWNationalId(nationalID);
    }
}
async function createBirthID(birthID: any) {
    if (birthID) {
        const patient = new PatientService();
        await patient.updateBirthId(birthID);
    }
}

async function createGuardian(patientID: any, guardianInformation: any, relationshipID: any) {
    if (Object.keys(guardianInformation).length === 0) return;
    const guardian: any = new PatientRegistrationService();
    await guardian.registerGuardian(guardianInformation);
    const guardianID = guardian.getPersonID();
    if (relationshipID) await RelationsService.createRelation(patientID, guardianID, relationshipID);
}
async function saveBirthdayData(patientID: any, birthRegistration: any) {
    if (birthRegistration.length > 0) {
        const userID: any = Service.getUserID();
        const registration = new AppEncounterService(patientID, 5, userID);
        await registration.createEncounter();
        await registration.saveObservationList(birthRegistration);
    }
}
async function enrollProgram(patientId: any) {
    const program = new PatientProgramService(patientId);
    await program.enrollProgram();
}
async function CreateRegistrationEncounter(patientId: any) {
    const encounter = new AppEncounterService(patientId, 5);
    await encounter.createEncounter();
    await encounter.saveValueCodedObs("Type of patient", "New Patient");
}
