import { Service } from "./service";

export class PatientOpdList extends Service {
  constructor() {
    super();
  }
  static checkInPatient(patientId: number, startDate: string, locationId: number) {
    const programId = "14";
    return super.postJson(`/visits`, {
      patientId: String(patientId),
      startDate,
      programId,
      location_id: String(locationId),
    });
  }
  static async getAllPatientsVisitsToday() {
    const response = await super.getJson('/visits');
    return response;
  }
  static checkOutPatient(visitId: number, closedDateTime: string) {
    return super.patchJson(`/visits/${visitId}/close`, {
      visit: { closedDateTime },
    });
  }
  static getCheckInStatus(patientId: number) {
    return super.getJson(`/check_patient_status/${patientId}`);
  }

  static addPatientToStage(patient_id: number, arrivalTime: string, stage: "VITALS" | "CONSULTATION" | "LAB" | "DISPENSATION", locationId: number) {
    return super.postJson(`/stages`, {
      stage: {
        patient_id: patient_id,
        arrivalTime: arrivalTime,
        stage: stage,
        location_id: locationId
      },
    })
  }


  static async getPatientList(stage: "VITALS" | "CONSULTATION" | "LAB" | "DISPENSATION", locationId: number) {
      const apiUrl = `/stages`;
      console.log("Fetching from API:", apiUrl);
      const response = await super.getJson(apiUrl, {location_id:locationId,stage});
      console.log("API response:", response);
      return response;
  }




}
