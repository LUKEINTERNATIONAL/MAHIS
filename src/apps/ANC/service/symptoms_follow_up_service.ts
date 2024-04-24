import { SymptomsFollowUpService } from "@/services/ANC/symptoms_follow_up_service"

export class MedicalFollowUpInstance {
  async push(patientID: any,providerID: any, followUpData: any){
    const medicalFollowUpService = new SymptomsFollowUpService(patientID, providerID)
    await medicalFollowUpService.createEncounter()
    await medicalFollowUpService.saveObservationList(followUpData)

  }

}

export class PersistentBehavioursInstance {
    async push(patientID: any,providerID: any, persistentBehaviourData: any){
      const persistentBehavioursService = new SymptomsFollowUpService(patientID, providerID)
      await persistentBehavioursService.createEncounter()
      await persistentBehavioursService.saveObservationList(persistentBehaviourData)
  
    }
  
  }

  export class PersistentSymptomsInstance {
    async push(patientID: any,providerID: any, persistentSymptomsData: any){
      const persistentSymptomService = new SymptomsFollowUpService(patientID, providerID)
      await persistentSymptomService.createEncounter()
      await persistentSymptomService.saveObservationList(persistentSymptomsData)
  
    }
  
  }

  export class CurrentPhysiologicalSymptomsInstance {
    async push(patientID: any,providerID: any, currentPhysiologicalSymptomData: any){
      const currentPhysiologicalSymptomsService = new SymptomsFollowUpService(patientID, providerID)
      await currentPhysiologicalSymptomsService.createEncounter()
      await currentPhysiologicalSymptomsService.saveObservationList(currentPhysiologicalSymptomData)
  
    }
  
  }

  export class IntimatePartnerInstance {
    async push(patientID: any,providerID: any, intimatePartnerData: any){
      const intimatePartnerService = new SymptomsFollowUpService(patientID, providerID)
      await intimatePartnerService.createEncounter()
      await intimatePartnerService.saveObservationList(intimatePartnerData)
  
    }
  
  }

  export class FetalMovementInstance {
    async push(patientID: any,providerID: any, fetalMovementData: any){
      const fetalMovementService = new SymptomsFollowUpService(patientID, providerID)
      await fetalMovementService.createEncounter()
      await fetalMovementService.saveObservationList(fetalMovementData)
  
    }
  
  }