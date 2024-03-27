
import { PatientDiagnosisService } from "@/services/patient_diagnosis_service"

export class Diagnosis {
  async onSubmit(patientID: any,providerID: any, diagnosisData: any){
    const diagnosisService = new PatientDiagnosisService(patientID, providerID)
    await diagnosisService.createEncounter()
    await diagnosisService.saveObservationList(diagnosisData)

  }

}

