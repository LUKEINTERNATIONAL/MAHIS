import { NotesService } from '@/services/notes_service'
import { DrugAllergyService } from '@/services/drug_allargy_service'
import { isEmpty } from 'lodash'
import { previousDay } from 'date-fns'
import { EncounterService } from '@/services/encounter_service'
import { ObservationService, ObsValue } from '@/services/observation_service'
import { Encounter } from '@/interfaces/encounter'
import { ConceptService } from '@/services/concept_service'
import { Service } from '@/services/service'
import { useDemographicsStore } from '@/stores/DemographicStore'
import { Patientservice } from "@/services/patient_service"
import { ProgramService } from "@/services/program_service"
import { DrugOrderService } from "@/services/drug_order_service"
import HisDate from "@/utils/Date"

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

export class PreviousTreatment {
  programID: number;
  providerID: number;
  patientID: number;
  date: string;
  demographics: any
  previousDrugPrescriptions: any[] = []

  constructor() {
      const store = useDemographicsStore()
      this.demographics = store.demographics
      this.patientID = this.demographics.patient_id
      this.date = ObservationService.getSessionDate()
      this.providerID = Service.getUserID() as number
      this.programID = ObservationService.getProgramID()
  }

  async getPatientEncounters() {
    const date = this.date
    EncounterService.getEncounters(this.patientID, {date})
    .then(async (encounters) => {
      console.log(encounters)

      const patientVisits = await this.getPatientVisitDates()
      patientVisits.forEach((patientVisit: any) => {

        DrugOrderService.getOrderByPatient(this.patientID, {'start_date': patientVisit.value})
        .then((medications) => {
          if (!isEmpty(medications)) {
            const previousPrescriptions = medications.map((medication: any) => ({
              label: medication.drug.name,
              value: HisDate.toStandardHisTimeFormat(medication.order.start_date),
              other: medication
            }))
  
            this.previousDrugPrescriptions.push(
              {
                prescriptionDate: HisDate.toStandardHisDisplayFormat( patientVisit.value),
                previousPrescriptions: previousPrescriptions
              }
              )
          }
        }).catch(() => {})


      })

      

      // return encounters.map((encounter: Encounter,  index: number) => {

      //   console.log("INDEX: ", index)
      //   const { observations } = encounter

      //   console.log( encounter.type.name)
      //   console.log(HisDate.toStandardHisTimeFormat(encounter.encounter_datetime))

      //   console.log( observations)
      // })
    })
  }

  async getPatientVisitDates() {
      return (await Patientservice.getPatientVisits(this.patientID, false))
          .map((date: string) => ({
              label: HisDate.toStandardHisDisplayFormat(date), 
              value: date,
              other: {
                  isActive: date === ProgramService.getSessionDate()
              }
          }))
  }
}