import { DrugOrderService } from "../drug_order_service";

export async function print_prescription(label: any, patient: any, visitsDate: any) {
    const lastVaccine = await DrugOrderService.findProgramDrugOrdersAwaitingDispensation(patient.patientID, visitsDate);
    const drugNames = lastVaccine.map((item: any) => item.dosage_struct.drug_name).join(", ");
    label.drawText(`Prescription:${drugNames}`, { fontSize: 3 });
    label.drawText(`${drugNames}`, { fontSize: 2 });
    label.drawText("___________________________________________________", { fontSize: 2 });
    console.log("🚀 ~ print_prescription ~ drugNames:", drugNames);
    return label;
}
