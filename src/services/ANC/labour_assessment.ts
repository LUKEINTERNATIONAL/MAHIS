import { AppEncounterService } from "@/services/app_encounter_service";

export class LabourAssessmentService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID);  
   
  }


};