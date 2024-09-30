import { Service } from "./service";

export class PatientOpdList extends Service {
  constructor() {
    super();
  }
  static checkInPatient(patientId: number, startDate: string) {
    // not required at the moment
    const programId = "1";
    return super.postJson("/visits", {
      patientId,
      startDate,
      programId,
    });
  }
  static checkOutPatient(visitId: number, closedDateTime: string) {
    return super.patchJson(`/visits/${visitId}/close`, {
      visit: { closedDateTime },
    });
  }
  static getCheckInStatus(patientId: number) {
    return super.getJson(`/check_patient_status/${patientId}`);
  }

  static addPatientToStage(
    patient_id: number,
    arrivalTime: string,
    stage: "VITALS" | "CONSULTATION" | "DISPENSATION"
  ) {
    return super.postJson("/stages", {
      stage: { patient_id, arrivalTime, stage },
    });
  }
  static getPatientList(stage: "VITALS" | "CONSULTATION" | "DISPENSATION") {
    return super.getJson(`/stages?stage=${stage}`);
  }
}
