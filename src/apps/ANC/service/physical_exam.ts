import { VitalsService } from "@/services/ANC/anc_vitals_service"

export class VitalsInstance {
  async push(patientID: any,providerID: any, vitalsData: any){
    const vitalsService = new VitalsService(patientID, providerID)
    await vitalsService.createEncounter()
    await vitalsService.saveObservationList(vitalsData)

  }

}

export class MartenalExamInstance {
  async push(patientID: any,providerID: any, examData: any){
    const martenalService = new VitalsService(patientID, providerID)
    await martenalService.createEncounter()
    await martenalService.saveObservationList(examData)
  }

}

export class FetalAssessmentInstance {
  async push(patientID: any,providerID: any, fetalAssessmentData: any){
    const fetalAssessmentService = new VitalsService(patientID, providerID)
    await fetalAssessmentService.createEncounter()
    await fetalAssessmentService.saveObservationList(fetalAssessmentData)
  }

}

export class FetalPresentationInstance {
  async push(patientID: any,providerID: any, fetalPresentationData: any){
    const fetalPresentationService = new VitalsService(patientID, providerID)
    await fetalPresentationService.createEncounter()
    await fetalPresentationService.saveObservationList(fetalPresentationData)
  }

}

export class PresentingSignsInstance {
  async push(patientID: any,providerID: any, PresentingSignsData: any){
    const presentingSignsService = new VitalsService(patientID, providerID)
    await presentingSignsService.createEncounter()
    await presentingSignsService.saveObservationList(PresentingSignsData)
  }

}
