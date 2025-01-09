import { Service } from "./service";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { AppEncounterService } from "@/services/app_encounter_service";
import { RelationsService } from "@/services/relations_service";
import { PatientProgramService } from "@/services/patient_program_service";
import { saveEncounterData, EncounterTypeId } from "@/services/encounter_type";

// Interfaces
interface PatientRecord {
    ID: string;
    patientID?: number;
    personInformation?: PersonInformation;
    saveStatusPersonInformation: "pending" | "complete";
    otherPersonInformation: OtherPersonInformation;
    guardianInformation: GuardianInformation;
    saveStatusGuardianInformation: "pending" | "complete" | "Not recorded";
    birthRegistration: any[];
    saveStatusBirthRegistration: "pending" | "complete" | "Not recorded";
    vitals: {
        saved: any[];
        unsaved: any[];
    };
    vaccineAdministration: {
        orders: any[];
        obs: any[];
        voided: VoidedVaccine[];
    };
    vaccineSchedule?: any;
}

interface PersonInformation {
    given_name: string;
    family_name: string;
    [key: string]: any;
}

interface OtherPersonInformation {
    nationalID: string;
    birthID: string;
    relationshipID?: number;
}

interface GuardianInformation {
    saved: PersonInformation[];
    unsaved: PersonInformation;
}

interface VoidedVaccine {
    order_id: number;
    reason: string;
}

interface Observation {
    concept_id: number;
    value_coded: number;
    obs_datetime: string;
}
interface SavePersonResponse {
    patientID?: number;
    ID?: string;
}
export class RegistrationService extends Service {
    private static readonly PROGRAM_ID = Service.getProgramID();
    private static readonly USER_ID = Service.getUserID();
    private static readonly DATE = new Date().toISOString();

    findByOtherID(idType: number, identifier: string) {
        return Service.getJson("search/patients/by_identifier", {
            type_id: idType,
            identifier,
        });
    }

    async savePersonInformation(record: PatientRecord) {
        if (record.personInformation && record.saveStatusPersonInformation === "pending") {
            try {
                const registration: any = new PatientRegistrationService();
                const patient = await registration.registerPatient(record.personInformation, []);
                const patientID = registration.getPersonID();

                await this.createIDs(record.otherPersonInformation, patientID);
                await this.enrollProgram(patientID);
                await this.createRegistrationEncounter(patientID);

                return { patient, patientID };
            } catch (error) {
                console.error("Failed to save person information", error);
            }
        }
        return {};
    }
    async createRegistrationEncounter(patientId: any) {
        const encounter = new AppEncounterService(patientId, 5);
        await encounter.createEncounter();
        await encounter.saveValueCodedObs("Type of patient", "New Patient");
    }
    async enrollProgram(patientId: any) {
        const program = new PatientProgramService(patientId);
        await program.enrollProgram();
    }
    async createIDs({ nationalID, birthID }: any, patientID: any) {
        if (nationalID) await this.create_patient_identifiers(nationalID, 28, patientID);
        if (birthID) await this.create_patient_identifiers(birthID, 23, patientID);
    }
    async create_patient_identifiers(newID: any, type: any, patientID: any) {
        await Service.postJson("patient_identifiers", {
            identifier: newID,
            identifier_type: type,
            patient_id: patientID,
        });
    }

    async createGuardian(patientID: number, record: PatientRecord): Promise<void> {
        if (record.saveStatusGuardianInformation === "pending") {
            if (
                record.guardianInformation.unsaved.given_name &&
                record.guardianInformation.unsaved.family_name &&
                record.otherPersonInformation.relationshipID
            ) {
                try {
                    const guardian: any = new PatientRegistrationService();
                    await guardian.registerGuardian(record.guardianInformation.unsaved);
                    const guardianID = guardian.getPersonID();
                    await RelationsService.createRelation(patientID, guardianID, record.otherPersonInformation.relationshipID);
                } catch (error) {
                    console.error("Failed to save guardian information", error);
                }
            }
        }
    }

    async saveBirthdayData(patientID: number, record: PatientRecord): Promise<void> {
        if (record.saveStatusBirthRegistration === "pending" && record.birthRegistration.length > 0) {
            try {
                const userID: any = Service.getUserID();
                const registration = new AppEncounterService(patientID, 5, userID);
                await registration.createEncounter();
                await registration.saveObservationList(record.birthRegistration);
            } catch (error) {
                console.error("Failed to save birth information", error);
            }
        }
    }

    async saveVitalsData(patientID: number, record: PatientRecord): Promise<void> {
        if (record.vitals.unsaved.length > 0) {
            try {
                await saveEncounterData(patientID, EncounterTypeId.VITALS, "" as any, record.vitals.unsaved);
            } catch (error) {
                console.error("Failed to save vitals information", error);
            }
        }
    }

    async saveDemographicsRecord(record: PatientRecord): Promise<string | undefined> {
        if (!(await this.validateID(record.otherPersonInformation))) return;
        const { patient, patientID } = await this.savePersonInformation(record);
        if (!patientID) return;

        await Promise.all([this.createGuardian(patientID, record), this.saveBirthdayData(patientID, record), this.saveVitalsData(patientID, record)]);

        return patient;
    }

    private async validateID({ nationalID, birthID }: OtherPersonInformation): Promise<boolean> {
        return (await this.validateNationalID(nationalID)) && (await this.validateBirthID(birthID));
    }

    private async validateNationalID(nationalID: string): Promise<boolean> {
        return (
            nationalID === "" ||
            !(await this.checkIDExistence(28, nationalID)) ||
            (console.log("The national ID is already assigned to another person"), false)
        );
    }

    private async validateBirthID(birthID: string): Promise<boolean> {
        return (
            birthID === "" ||
            !(await this.checkIDExistence(23, birthID)) ||
            (console.log("The Birth ID is already assigned to another person"), false)
        );
    }

    private async checkIDExistence(nid: number, identifierId: string): Promise<boolean> {
        return nid ? (await this.findByOtherID(nid, identifierId)).length > 0 : false;
    }
}
