import { PatientRegistrationService } from "@/services/patient_registration_service";
import { PatientService } from "@/services/patient_service";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import { Service } from "@/services/service";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientProgramService } from "@/services/patient_program_service";
import Localbase from "localbase";
import { toastDanger, toastSuccess, toastWarning } from "@/utils/Alerts";
let db = new Localbase("db");
export async function saveDemographicsRecord(record: any) {
    if ((await validateNationalID(record.otherPersonInformation.nationalID)) && (await validateBirthID(record.otherPersonInformation.birthID))) {
        let patientID = "";
        if (record.personInformation && record.saveStatusPersonInformation == "pending") {
            try {
                const registration: any = new PatientRegistrationService();
                await registration.registerPatient(record.personInformation, []);
                patientID = registration.getPersonID();
                await updateSaveStatus(record, {
                    saveStatusPersonInformation: "complete",
                    serverPatientID: patientID,
                });
            } catch (error) {
                toastDanger("Failing to save person information");
            }
        }
        patientID = patientID || record.serverPatientID;
        if (patientID) {
            createNationID(record.otherPersonInformation.nationalID);
            createBirthID(record.otherPersonInformation.birthID);
            createGuardian(patientID, record);
            await saveBirthdayData(patientID, record);
            await enrollProgram(patientID);
            await CreateRegistrationEncounter(patientID);
        }
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

async function createGuardian(patientID: any, record: any) {
    if (record.saveStatusGuardianInformation == "pending") {
        if (Object.keys(record.guardianInformation).length > 0) {
            try {
                const guardian: any = new PatientRegistrationService();
                await guardian.registerGuardian(record.guardianInformation);
                const guardianID = guardian.getPersonID();
                if (record.otherPersonInformation.relationshipID)
                    await RelationsService.createRelation(patientID, guardianID, record.otherPersonInformation.relationshipID);

                await updateSaveStatus(record, {
                    saveStatusGuardianInformation: "complete",
                });
            } catch (error) {
                toastDanger("Failing to save guarding information");
            }
        }
        if (Object.keys(record.guardianInformation).length == 0) {
            await updateSaveStatus(record, {
                saveStatusGuardianInformation: "complete",
            });
        }
    }
}
async function saveBirthdayData(patientID: any, record: any) {
    if (record.saveStatusBirthRegistration == "pending") {
        try {
            if (record.birthRegistration.length > 0) {
                const userID: any = Service.getUserID();
                const registration = new AppEncounterService(patientID, 5, userID);
                await registration.createEncounter();
                await registration.saveObservationList(record.birthRegistration);
                await updateSaveStatus(record, {
                    saveStatusBirthRegistration: "complete",
                });
            }
        } catch (error) {
            toastDanger("Failing to save birth information");
        }
    }
    if (record.birthRegistration.length == 0) {
        await updateSaveStatus(record, {
            saveStatusBirthRegistration: "complete",
        });
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
async function updateSaveStatus(record: any, saveStatus: any) {
    await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).update(saveStatus);
}

async function validateNationalID(nationalID: any) {
    if (nationalID != "") {
        if (await checkIDExistences(28, nationalID)) {
            toastWarning("The national ID is already assigned to another person");
            return false;
        }
    }
    return true;
}

async function validateBirthID(birthID: any) {
    if (birthID != "") {
        if (await checkIDExistences(23, birthID)) {
            toastWarning("The Birth ID is already assigned to another person");
            return false;
        }
    }
    return true;
}
async function checkIDExistences(nid: any, identifierId: any) {
    if (!nid) return false;
    const people = await PatientService.findByOtherID(identifierId, nid);
    if (people.length > 0) return true;
    else return false;
}
