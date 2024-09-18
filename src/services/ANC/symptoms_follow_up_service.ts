import { AppEncounterService } from "@/services/app_encounter_service";

export class SymptomsFollowUpService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 57, providerID);  
   
  }
};
export class PersistentBehaviourService extends AppEncounterService{

  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID);

  }
};
export class IPVService extends AppEncounterService{

  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID);

  }
};