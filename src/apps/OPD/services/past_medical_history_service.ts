import { AppEncounterService } from "@/services/app_encounter_service";

export class PastMedicalHistory extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 30, providerID);
    }
}
