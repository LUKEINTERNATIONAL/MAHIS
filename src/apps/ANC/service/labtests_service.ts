import { LabTestsService } from "@/services/ANC/lab_tests_service"

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