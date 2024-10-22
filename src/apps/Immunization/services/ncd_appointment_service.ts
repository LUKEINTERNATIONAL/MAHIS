import { useDemographicsStore } from "@/stores/DemographicStore"
import { Service } from "@/services/service"
import { AppEncounterService } from "@/services/app_encounter_service";
import { useClinicalDaysStore } from "@/stores/clinicalDaysStore";
import HisDate from "@/utils/Date";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts"
export class Appointment extends AppEncounterService {
    
    patientID: number
    providerID: number

    constructor()
    constructor(patientID: number)
    constructor(patientID?: number) {
        const actualPatientID = patientID !== undefined ? patientID : Appointment.getPatientID()
        const providerID = Appointment.getProviderID()
        super(actualPatientID, 7, providerID)
        this.patientID = actualPatientID
        this.providerID = providerID
    }

    private static getPatientID(): number {
        const store = useDemographicsStore();
        const demographics = store.demographics
        const patientID = demographics.patient_id
        return patientID;
    }

    private static getProviderID(): number {
        const providerID = Service.getUserID() as number
        return providerID
    }

    async setPatientID(patientID: string): Promise<void> {
        this.patientID = patientID as any
    }

    async createAppointment() {
        const _appointment_ = [] as any
        const store = useClinicalDaysStore()
        store.assignedAppointmentsDates.forEach((appointment: any) => {
            console.log(appointment)
            if (appointment.markedNextApt == true) {
                const next_appointment_date = HisDate.toStandardHisFormat(appointment.date);
                _appointment_.push(next_appointment_date);
            }
        })
        await this.createEncounter()
        // const res = await this.getNextAppointment();
        // const nextAppointmentDate = res.appointment_date;
        // const n_a_obs = await this.buildValueDate("Estimated date", nextAppointmentDate)
        const a_obs = await this.buildValueDate("Appointment date", _appointment_[0]) as any
        const appointment_onbs = await this.saveObservationList([a_obs])        
        if (!appointment_onbs) return toastWarning("Unable set Next Appointment")
        toastSuccess("next Appointment Set Successfully")
        return [this.patientID,_appointment_[0]]
    }

    async getNextAppointment() {
        return AppEncounterService.getJson(`/programs/${this.programID}/patients/${this.patientID}/next_appointment_date`, {date: this.date})
    }
      
    async getDailiyAppointments(date: any) {
        const programID = AppEncounterService.getProgramID();
        return AppEncounterService.getJson(`/programs/${programID}/booked_appointments`, {date: date, paginate: false})
    }
}