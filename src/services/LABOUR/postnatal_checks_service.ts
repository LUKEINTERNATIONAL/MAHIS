import { AppEncounterService } from "../app_encounter_service";

export class MotherService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID); //place holder for Mother encounter type
  }
}

export class ChildService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID); //place holder for Baby encounter type
  }
}
