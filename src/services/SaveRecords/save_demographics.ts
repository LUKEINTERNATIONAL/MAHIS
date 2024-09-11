import { PatientRegistrationService } from "@/services/patient_registration_service";
import { PatientService } from "@/services/patient_service";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import { RelationsService } from "@/services/relations_service";
import { Service } from "@/services/service";
import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientProgramService } from "@/services/patient_program_service";
import { toastDanger, toastSuccess, toastWarning } from "@/utils/Alerts";
import db from "@/db";
export async function saveDemographicsRecord(record: any) {
    if (!(await validateID(record.otherPersonInformation))) return;

    const patientID = await savePersonInformation(record);
    if (!patientID) return;

    await Promise.all([createGuardian(patientID, record), saveBirthdayData(patientID, record)]);
}

async function validateID({ nationalID, birthID }: any) {
    return (await validateNationalID(nationalID)) && (await validateBirthID(birthID));
}

async function savePersonInformation(record: any) {
    if (record.personInformation && record.saveStatusPersonInformation === "pending") {
        try {
            const registration = new PatientRegistrationService();
            await registration.registerPatient(record.personInformation, []);
            const patientID = registration.getPersonID();
            await updateSaveStatus(record, {
                saveStatusPersonInformation: "complete",
                serverPatientID: patientID,
            });
            createIDs(record.otherPersonInformation, patientID);
            enrollProgram(patientID);
            createRegistrationEncounter(patientID);
            return patientID;
        } catch (error) {
            toastDanger("Failed to save person information");
        }
    }
    return record.serverPatientID;
}

async function createIDs({ nationalID, birthID }: any, patientID: any) {
    const patient = new PatientService();
    if (nationalID) await patient.updateMWNationalId(nationalID, patientID);
    if (birthID) await patient.updateBirthId(birthID, patientID);
}

async function createGuardian(patientID: any, record: any) {
    if (record.saveStatusGuardianInformation === "pending") {
        if (record.guardianInformation.given_name && record.guardianInformation.family_name && record.otherPersonInformation.relationshipID) {
            try {
                const guardian = new PatientRegistrationService();
                await guardian.registerGuardian(record.guardianInformation);
                const guardianID = guardian.getPersonID();
                await RelationsService.createRelation(patientID, guardianID, record.otherPersonInformation.relationshipID);
            } catch (error) {
                toastDanger("Failed to save guardian information");
            }
        }
        await updateSaveStatus(record, { saveStatusGuardianInformation: "complete" });
    }
}

async function saveBirthdayData(patientID: any, record: any) {
    if (record.saveStatusBirthRegistration === "pending" && record.birthRegistration.length > 0) {
        try {
            const userID: any = Service.getUserID();
            const registration = new AppEncounterService(patientID, 5, userID);
            await registration.createEncounter();
            await registration.saveObservationList(record.birthRegistration);
        } catch (error) {
            toastDanger("Failed to save birth information");
        }
        await updateSaveStatus(record, { saveStatusBirthRegistration: "complete" });
    }
}

async function enrollProgram(patientId: any) {
    const program = new PatientProgramService(patientId);
    await program.enrollProgram();
}

async function createRegistrationEncounter(patientId: any) {
    const encounter = new AppEncounterService(patientId, 5);
    await encounter.createEncounter();
    await encounter.saveValueCodedObs("Type of patient", "New Patient");
}

async function updateSaveStatus(record: any, saveStatus: any) {
    await db.collection("patientRecords").doc({ offlinePatientID: record.offlinePatientID }).update(saveStatus);
}

async function validateNationalID(nationalID: any) {
    return (
        nationalID === "" ||
        !(await checkIDExistence(28, nationalID)) ||
        (toastWarning("The national ID is already assigned to another person"), false)
    );
}

async function validateBirthID(birthID: any) {
    return birthID === "" || !(await checkIDExistence(23, birthID)) || (toastWarning("The Birth ID is already assigned to another person"), false);
}

async function checkIDExistence(nid: any, identifierId: any) {
    return nid ? (await PatientService.findByOtherID(nid, identifierId)).length > 0 : false;
}
