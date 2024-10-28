import { AppEncounterService } from "@/services/app_encounter_service";

export class PatientRegistrationEncounterType extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 104, providerID);
    }
}
export class PatientHistoryEncounterType extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 139, providerID);
    }
}
