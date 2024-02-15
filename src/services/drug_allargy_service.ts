import { AppEncounterService } from "@/services/app_encounter_service"
import { ConceptService } from '@/services/concept_service';

export class DrugAllergyService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 25, providerID) 
    }

    static async get_____(filter='', page=1, limit=10) {
        // const conceptSetId = ConceptService.getConceptID('Qech outpatient diagnosis list')
        // return AppEncounterService.getJson('diagnosis', {
        //     id: conceptSetId,
        //     name: filter,
        //     page: page,
        //     'page_size': limit
        // })
    }
}
