import { AppEncounterService } from "@/services/app_encounter_service";

export class PastObstetricHistoryService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 82, providerID);  //encounter type 82
   
  }

}
