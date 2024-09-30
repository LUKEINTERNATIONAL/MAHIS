import { Service } from "./service";

export class PatientOpdList extends Service {
    constructor() {
        super();
    }
    static checkInPatient(patientId: number, startDate: Date){
        return super.postJson('/visits', {
            patientId,
            startDate
        })
    }
    static checkOutPatient(visitId:number, closedDateTime:Date){
        return super.patchJson(`/visits/${visitId}/close`,{
            visit: { closedDateTime}
        })
    }
    static getCheckInStatus(patientId:number){
        return super.getJson(`/check_patient_status/${patientId}`)
    }

    static addPatientToStage(patient_id:number, arrivalTime: Date, stage: 'VITALS' | 'CONSULTATION'|'DISPENSATION'){
        return super.postJson('/visits', {
            patient_id,
            arrivalTime,
            stage
        })
    }

    static getPatientList(stage: 'VITALS' | 'CONSULTATION'|'DISPENSATION'){
        return super.getJson(`/stages?stage=${stage}`)
    }


}