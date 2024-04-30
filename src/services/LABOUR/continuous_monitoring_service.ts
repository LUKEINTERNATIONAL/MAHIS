import { AppEncounterService } from "@/services/app_encounter_service";

export class ContinuousMonitoringVitalsService extends AppEncounterService{
  constructor(patientID: number, providerID: number) {
    super(patientID,6, providerID);  
   
  }

}
export class OtherExamsService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID,30, providerID);  // place holder for other exams
  }
}

