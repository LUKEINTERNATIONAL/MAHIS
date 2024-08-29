
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


  static async setConfigurations(Configdata: any) { 
    return super.postJson('sms_configuration', {
      "sms_gateway_url": Configdata.url,
      "sms_api_key": Configdata.apiKey,
      "sms_reminder": Configdata.smsReminder,
      "next_appointment_message": Configdata.reminderMessage,
      "cancel_appointment_message": Configdata.cancelMessage,
      "next_appointment_reminder_period": Configdata.reminderPeriod,
      "sms_activation": Configdata.smsActivation,
      "show_sms_popup": Configdata.smsPopup
  })
}

static async getConfigurations() {
     return super.getJson('configurations')
}

static async fetchphone(patientID: any) { 
  return super.getJson('patient_phone', { "person_id": patientID })
}

}
