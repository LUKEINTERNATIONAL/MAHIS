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
}