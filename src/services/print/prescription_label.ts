import { DrugOrderService } from "../drug_order_service";

export async function print_prescription(label: any, patient: any, visitsDate: any) {
    const lastVaccine = await DrugOrderService.findProgramDrugOrdersAwaitingDispensation(patient.patientID, visitsDate);
    const drugNames = lastVaccine.map((item: any) => item.dosage_struct.drug_name).join(", ");
    label.drawText(`Prescription: ${drugNames} `, { fontSize: 1 });
    label.drawText("___________________________________________________", { fontSize: 3 });
    return label;
}
