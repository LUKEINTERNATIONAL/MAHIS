import { ConceptName } from "@/interfaces/conceptName";
import { DrugInterface } from "@/interfaces/Drug";
import { AppEncounterService } from "@/services/app_encounter_service"
import { DrugOrderService } from "@/services/drug_order_service";
import { OrderService } from "@/services/order_service";
import { DrugService } from './drug_service';
import { ConceptService } from "@/services/concept_service"

export const DRUG_FREQUENCIES: Array<{label: string; code: string; value: number; [x: string]: any}> = [
    { label : "ONCE A DAY (OD)", code : "OD", value : 1 },
    { label : "TWICE A DAY (BD)", code : "BD", value : 2 },
    { label : "THREE TIMES A DAY (TDS)", code : "TDS", value : 3 },
    { label : "FOUR TIMES A DAY (QID)", code : "QID", value : 4 },
    { label : "FIVE TIMES A DAY (5X/D)", code : "5X/D", value : 5 },
    { label : "SIX TIMES A DAY (Q4HRS)", code : "Q4HRS", value : 6 },
    { label : "IN THE MORNING (QAM)", code : "QAM", value : 1 },
    { label : "ONCE A DAY AT NOON (QNOON)", code : "QNOON", value : 1 },
    { label : "IN THE EVENING (QPM)", code : "QPM", value : 1 },
    { label : "ONCE A DAY AT NIGHT (QHS)", code : "QHS", value : 1 },
    { label : "EVERY OTHER DAY (QOD)", code : "QOD", value : 0.5 },
    { label : "ONCE A WEEK (QWK)", code : "QWK", value : 0.14 },
    { label : "ONCE A MONTH", code : "ONCE A MONTH", value : 0.03 },
    { label : "TWICE A MONTH", code : "TWICE A MONTH", value : 0.071 },
    { label : "STAT", code : "STAT", value : 0},
    { label : "Unknown", code : "Unknown", value : 0 }
  ]

  export class DrugPrescriptionService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
      super(patientID, 25, providerID) 
    }
  
    async loadDrugs(filter = '', page=1, limit=10): Promise<any[]> {
      const drugs: ConceptName[] = await DrugService.getOPDDrugs({ 
        "name": filter, 
        "page": page,
        "page_size": limit,
      })
      return drugs.map(drug => ({
        label: drug.name, value: drug.name, other: drug
      }))
    }
  
    createDrugOrder(drugOrders: Array<DrugInterface>){
      return DrugOrderService.create({
        'encounter_id': this.encounterID,
        'drug_orders': drugOrders
      })
    }

    createDrugOrderForImmunization(drugOrders: Array<DrugInterface>, programId: number){
      return DrugOrderService.create_for_immunization({
        'encounter_id': this.encounterID,
        'drug_orders': drugOrders,
        'program_id': programId
      } as any)
    }
  }

  export function getFrequencyLabelOrCheckCode(codeOrLabel: string): string | undefined {
    const upperCaseInput = codeOrLabel.toUpperCase()
    const labelExists = DRUG_FREQUENCIES.some(freq => freq.label.toUpperCase() === upperCaseInput)
    if (labelExists) {
        return codeOrLabel
    }
    const frequency = DRUG_FREQUENCIES.find(freq => freq.code === upperCaseInput)
    if (frequency) {
        return frequency.label
    }
    return undefined
  }

  export async function getDrugRouteList() {
    const data = await ConceptService.getConceptSet('Method of drug administration');


    //TODO: this is temporary fix for removing bleeding vaginally as i am waiting for concepts to be updated
    return data.filter((concept:any)=>concept.name!=="Bleeding vaginally")
  }