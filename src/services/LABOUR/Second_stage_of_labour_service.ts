import { AppEncounterService } from "../app_encounter_service";

export class SecondStageService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID); //place holder for Second stage of labour encounter type
  }
}

export class ThirdStageService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID); //place holder for Third stage of labour encounter type
  }
}
