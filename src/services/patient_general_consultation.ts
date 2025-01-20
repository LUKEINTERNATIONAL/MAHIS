import { AppEncounterService } from "@/services/app_encounter_service";

export class PatientGeneralConsultationService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 111, providerID);
    }
}
