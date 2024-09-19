import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/rvice';

export class DietCounsellingService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 151, providerID)
    }

}
