import { PatientService } from "../patient_service";

export function print_barcode(label: any) {
    const patientService = new PatientService();
    label.drawBarcode(50, 180, patientService.getNationalID());
    label.drawText(patientService.getFullName(), { fontSize: 2, fontHorizontalMultiplier: 2, fontVerticalMultiplier: 2 });
    label.drawText(`${patientService.getNationalID()} ${patientService.getBirthdate()}(${patientService.getGender()})`, {
        fontSize: 2,
        fontHorizontalMultiplier: 2,
        fontVerticalMultiplier: 2,
    });
    label.drawText(patientService.getCurrentAddress(), { fontSize: 2, fontHorizontalMultiplier: 2, fontVerticalMultiplier: 2 });
    return label;
}
