import {Service} from "@/services/service"
import { SuspenseProps } from "vue";

export interface NewEncounter {
    encounter_type_id: number;
    patient_id: number;
    program_id?: number;
    encounter_datetime?: string;
    encounter_type_name?: string;
}

export class EncounterService extends Service {
    constructor() {
        super()
    }
    
    static create(encounter: NewEncounter) {
        const data = {...encounter}

        if (!('program_id' in data)) 
            Object.assign(data, {'program_id': this.getProgramID()})

        if (!('encounter_datetime' in data)) 
            Object.assign(data, {'encounter_datetime': this.getSessionDate()})
        
        return Service.postJson('/encounters', data)
    }

    static voidEncounter(encounterId: number, reason='Unknown') {
        return super.void(`/encounters/${encounterId}`, {reason})
    }

    static getSavedEncounters(patientId: number, programId=super.getProgramID()) {
        return super.getJson(`programs/${programId}/patients/${patientId}/saved_encounters`)
    }

    static getEncounters(patientId: number, params={}) {
        return super.getJson('/encounters', {
            'program_id': super.getProgramID(),
            'patient_id': patientId,  
            paginate: false,
            ...params
        })
    }
}
