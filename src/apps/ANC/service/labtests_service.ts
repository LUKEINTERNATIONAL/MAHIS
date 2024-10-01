import {AppEncounterService} from "@/services/app_encounter_service";

export class LabTestsService extends AppEncounterService {
  constructor(patientID: number, providerID: number) {
    super(patientID, 151, providerID)
  }

}
export class UltrasoundInstance {
  async push(patientID: any,providerID: any, ultrasoundData: any){
    const labTestService = new LabTestsService(patientID, providerID)
    await labTestService.createEncounter()
    await labTestService.saveObservationList(ultrasoundData)

  }

}

export class UrineTestInstance {
    async push(patientID: any,providerID: any, urineTestData: any){
      const urineTestService = new LabTestsService(patientID, providerID)
      await urineTestService.createEncounter()
      await urineTestService.saveObservationList(urineTestData)
  
    }
  
  }

  export class TBScreeningInstance {
    async push(patientID: any,providerID: any, tbScreeningData: any){
      const tbScreeningService = new LabTestsService(patientID, providerID)
      await tbScreeningService.createEncounter()
      await tbScreeningService.saveObservationList(tbScreeningData)
  
    }
  
  }