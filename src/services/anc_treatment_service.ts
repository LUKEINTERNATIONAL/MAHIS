import { AppEncounterService } from "./app_encounter_service";

export class DiagnosisTreatmentService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID);
  }
}

export class MedicationDispensedService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID); //encounter typeplace holder Medication dispensed
  }
}

export class CounsellingService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID); //encounter typeplace holder Counselling
  }
}
export class ImmunizationService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID); //encounter typeplace holder Immunization
  }
}

export class IntimatePartnerService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID); //encounter typeplace holder Intimate Partner
  }
}

export class DewormingService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 25, providerID); //encounter typeplace holder Deworming
  }
}
