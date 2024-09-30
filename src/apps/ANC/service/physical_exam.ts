import { VitalsService } from "@/services/ANC/anc_vitals_service"
import {AppEncounterService} from "@/services/app_encounter_service";


export class VitalsInstance {
  async push(patientID: any,providerID: any, vitalsData: any){
    const vitalsService = new VitalsService(patientID, providerID)
    await vitalsService.createEncounter()
    await vitalsService.saveObservationList(vitalsData)

  }

}

export class MaternalExamService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 95, providerID)
  }

}

export class AbdominalAssessmentService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 116, providerID)
  }

}
export class PresentingSignsService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 210, providerID)
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
