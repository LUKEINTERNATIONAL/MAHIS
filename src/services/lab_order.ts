import { OrderService } from "@/services/order_service";
import { LabOrderService } from "@/services/lab_order_service";
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { PatientLabResultService } from "@/services/patient_lab_result_service";

export class LabOrder extends OrderService {
    constructor() {
        super();
    }

    async postActivities(patientID: any, finalOrders: any) {
        const orders = new LabOrderService(parseInt(patientID), -1); //TODO: get selected provider for this encounter
        const encounter = await orders.createEncounter();

        if (encounter) {
            const formattedOrders = await OrderService.buildLabOrders(encounter, finalOrders);
            const d = await OrderService.saveOrdersArray(encounter.encounter_id, formattedOrders);

            if (!d) return toastWarning("Unable to save lab orders");
        }
    }
    // async postLabResults(patientID: any,measures: any){
    //   const patientLabResultService = new PatientLabResultService(patientID);
    //   patientLabResultService.setTestID(this.selectedTest.value)
    //   patientLabResultService.setResultDate(c.result_date)
    //   await patientLabResultService.createEncounter()
    //   await patientLabResultService.createLabResult(measures)
    // }
}

// measures = {
//   "indicator": {
//     "concept_id": 679
//   },
//   "value": 8,
//   "value_modifier": "=",
//   "value_type": "numeric"
// }
