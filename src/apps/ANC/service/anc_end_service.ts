import { AncEndService } from "@/services/ANC/anc_end_service"


export class AncEndInstance {
  async push(patientID: any,providerID: any, ancEndData: any){
    const ancEndService = new AncEndService(patientID, providerID)
    await ancEndService.createEncounter()
    await ancEndService.saveObservationList(ancEndData)

  }

}