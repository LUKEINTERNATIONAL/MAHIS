import { AppEncounterService } from "@/services/app_encounter_service";

export class LabTestsService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID);  
   
  }


};