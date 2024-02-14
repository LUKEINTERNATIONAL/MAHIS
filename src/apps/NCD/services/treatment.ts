import { NotesService } from '@/services/notes_service'
import { DrugAllergyService } from '@/services/drug_allargy_service'
import { isEmpty } from 'lodash'

export class Treatment {
    async onSubmitNotes(patientID: any,providerID: any, treatmentNotesData: any){
        const notesService = new NotesService(patientID, providerID)
        await notesService.createEncounter()
        await notesService.saveObservationList(treatmentNotesData)
      }

    async onSubmitAllergies(patientID: any, providerID: any, allergiesDataObs: any) {
      const drug_allergy_service = new DrugAllergyService(patientID, providerID)
      await drug_allergy_service.createEncounter()
      await drug_allergy_service.saveObservationList(allergiesDataObs)
    }
}