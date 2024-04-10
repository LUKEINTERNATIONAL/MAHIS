import { AppEncounterService } from "@/services/app_encounter_service";


export class OPDVitalsService extends AppEncounterService {
  private appEncounterServiceInstance: AppEncounterService;
  constructor(patientID: number, providerID: number) {
    super(patientID, 6, providerID);
    this.appEncounterServiceInstance = this;
  }
}
