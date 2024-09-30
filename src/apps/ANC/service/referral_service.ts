import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';

export class ReferralService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 114, providerID)
  }

}
