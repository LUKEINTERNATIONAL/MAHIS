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
  previousClinicalNotes: any[] = []
  previousDrugAllergies: any

  constructor() {
      const store = useDemographicsStore()
      this.demographics = store.demographics
      this.patientID = this.demographics.patient_id
      this.date = ObservationService.getSessionDate()
      this.providerID = Service.getUserID() as number
      this.programID = ObservationService.getProgramID()
      this.previousDrugAllergies = {}
  }

  async getPatientEncounters() {
    const patientVisits = await this.getPatientVisitDates()
    patientVisits.forEach((patientVisit: any) => {
      const date = patientVisit.value
      EncounterService.getEncounters(this.patientID, {date})
      .then(async (encounters) => {
        //console.log(encounters)
        encounters.map(async (encounter: Encounter,  index: number) => {
          if ( encounter.type.name == 'NOTES') {
            const { observations } = encounter
            if (!isEmpty(observations)) {
              observations.forEach((observation: any) => {
                if (observation.concept_id == '2688') {
                  const notes = {
                    notes_date: HisDate.toStandardHisDisplayFormat(observation.obs_datetime),
                    notes: observation.value_text
                  }
                  this.previousClinicalNotes.push(notes)
                }
              })
            }
          }

          if (encounter.type.name == 'TREATMENT') {
            const { observations } = encounter
            if (!isEmpty(observations)) {
              for(const _index in observations) {
                let concept = '<UNKNOWN CONCEPT>'
                const obs =  observations[_index]
                try {
                    if (obs?.concept?.concept_names) {
                        concept = obs.concept.concept_names[0].name
                    } else {
                        concept = await ConceptService.getConceptName(obs.concept_id)
                    }
                } catch (e) {
                    console.error(obs, e)
                }
                const value = await ObservationService.resolvePrimaryValue(obs)
                const time = HisDate.toStandardHisDisplayFormat(obs.date_created)

                if (concept == 'Allergic') {
                  if ( isEmpty(this.previousDrugAllergies.hasOwnProperty(time))) {
                      this.previousDrugAllergies[time] = []
                  }
                  this.previousDrugAllergies[time].push({ date: time, value })
                }
            }
            }
          }
        })
      })

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