import { AppEncounterService } from "@/services/app_encounter_service";

export class ReferralService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID,114, providerID);
  }
}
