import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';

export class ConsciousnessService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 141, providerID)
    }

    //   static async getComplaintsList(complaintType: string, filter = '') {
    //     return ConceptService.getConceptSet(complaintType, filter) 
    //   }
    //   async fetchLatestTriageEncounter() { 
    //    return await ConsciousnessService.getObs({
    //         'concept_id': ConceptService.getConceptID("History of COVID-19 contact") ,
    //         'start_date': this.date,
    //         'end_date': this.date,
    //         'person_id': this.patientID,
    //     })
    //   }
}
