import { useDemographicsStore } from "@/stores/DemographicStore";
import { Service } from "@/services/service";
import { AppEncounterService } from "@/services/app_encounter_service";
import { useImmunizationAppointMentStore } from "@/stores/immunizationAppointMentStore";
import HisDate from "@/utils/Date";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { saveOfflinePatientData } from "@/services/offline_service";
export class Appointment extends AppEncounterService {
    patientID: number;
    providerID: number;

    constructor();
    constructor(patientID: number);
    constructor(patientID?: number) {
        const actualPatientID = patientID !== undefined ? patientID : Appointment.getPatientID();
        const providerID = Appointment.getProviderID();
        super(actualPatientID, 7, providerID);
        this.patientID = actualPatientID;
        this.providerID = providerID;
    }

    private static getPatientID(): number {
        const store = useDemographicsStore();
        const demographics = store.patient;
        const patientID = demographics.patientID;
        return patientID;
    }

    private static getProviderID(): number {
        const providerID = Service.getUserID() as number;
        return providerID;
    }

    async setPatientID(patientID: string): Promise<void> {
        this.patientID = patientID as any;
    }

    async createAppointment(patientData: any) {
        let patient = JSON.parse(JSON.stringify(patientData));
        const _appointment_ = [] as any;
        const store = useImmunizationAppointMentStore();
        store.selectedAppointmentMent.forEach((appointment: any) => {
            const next_appointment_date = HisDate.toStandardHisFormat(appointment.date);
            _appointment_.push(next_appointment_date);
        });
        const a_obs = (await this.buildValueDate("Appointment date", _appointment_[0])) as any;
        patient?.appointments.unsaved?.push(a_obs);
        await saveOfflinePatientData(patient);
        toastSuccess("next Appointment Set Successfully");
        return _appointment_[0];
    }

    async getNextAppointment() {
        if (this.programID && this.patientID)
            return AppEncounterService.getJson(`/programs/${this.programID}/patients/${this.patientID}/next_appointment_date`, { date: this.date });
    }

    async getDailiyAppointments(date: any) {
        const programID = AppEncounterService.getProgramID();
        return AppEncounterService.getJson(`/programs/${programID}/booked_appointments`, { date: date, paginate: false });
    }
}
