import { LabourAssessmentService } from "@/services/ANC/labour_assessment"


export class QuickCheckInstance {
  async push(patientID: any,providerID: any, quickCheckData: any){
    const quickCheckService = new LabourAssessmentService(patientID, providerID)
    await quickCheckService.createEncounter()
    await quickCheckService.saveObservationList(quickCheckData)

  }

};

export class PhysicalExamInstance { 
    async push(patientID: any,providerID: any, physicalExamData: any){
      const physicalExamService = new LabourAssessmentService(patientID, providerID)
      await physicalExamService.createEncounter()
      await physicalExamService.saveObservationList(physicalExamData)
  
    }
  
  };

  export class VaginalExamInstance {
    async push(patientID: any,providerID: any, vaginalExamData: any){
      const vaginalExamService = new LabourAssessmentService(patientID, providerID)
      await vaginalExamService.createEncounter()
      await vaginalExamService.saveObservationList(vaginalExamData)
  
    }
  
  };

  export class PelvicAssessmentInstance {
    async push(patientID: any,providerID: any, assessmentData: any){
      const pelvicAssessmentService = new LabourAssessmentService(patientID, providerID)
      await pelvicAssessmentService.createEncounter()
      await pelvicAssessmentService.saveObservationList(assessmentData)
  
    }
  
  }
