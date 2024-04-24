import { ReferralService } from "@/services/ANC/referral_service"


export class ReferralInstance {
  async push(patientID: any,providerID: any, referralData: any){
    const referralService = new ReferralService(patientID, providerID)
    await referralService.createEncounter()
    await referralService.saveObservationList(referralData)

  }

}