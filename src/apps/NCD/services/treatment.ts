import { NotesService } from '@/services/notes_service'
import { isEmpty } from 'lodash'

export class Treatment {
    async onSubmitNotes(patientID: any,providerID: any, treatmentNotesData: any){
        const notesService = new NotesService(patientID, providerID)
        await notesService.createEncounter()
        await notesService.saveObservationList(treatmentNotesData)
      }
}