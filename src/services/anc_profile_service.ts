import { AppEncounterService } from "@/services/app_encounter_service";

export class PastObstetricHistoryService extends AppEncounterService{
 
  constructor(patientID: number, providerID: number) {
    super(patientID, 82, providerID);  //encounter type 82
   
  }

}
export class MedicalHistoryService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID,30, providerID); 
  }
}

export class MedicationService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 30, providerID);  //place holder for medication encounter type
  }
}
