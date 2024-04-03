import { PatientDiagnosisService } from "@/services/patient_diagnosis_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

export class Diagnosis {
    async onSubmit(patientID: any, providerID: any, diagnosisData: any) {
        const diagnosisService = new PatientDiagnosisService(patientID, providerID);
        const encounter = await diagnosisService.createEncounter();
        if (!encounter) return toastWarning("Unable to create diagnosis encounter");
        const saveDiagnosis = await diagnosisService.saveObservationList(diagnosisData);
        if (!saveDiagnosis) return toastWarning("Unable to create diagnosis !");
        toastSuccess("Diagnosis has been created");
    }
}
