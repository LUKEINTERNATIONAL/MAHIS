
import { Service } from "@/services/service";
import { ObservationService } from "@/services/observation_service"

export class SmsService extends Service { 

  programID: number;
  providerID: number;


  constructor() {
      super();
      this.providerID = Service.getUserID() as number;
      this.programID = ObservationService.getProgramID();
  }

   static async appointment(patientID: number, AppointmentDate: Date) { 
      return super.postJson('send_sms', {
        "person_id": patientID,
        "appointment_date": AppointmentDate,
    })
  }



}
