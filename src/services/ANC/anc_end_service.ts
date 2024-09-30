import { AppEncounterService } from "@/services/app_encounter_service";

export class AncEndService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 76, providerID);
   
  }


};