import { AppEncounterService } from "@/services/app_encounter_service";

export class SymptomsFollowUpService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 57, providerID);  
   
  }


};