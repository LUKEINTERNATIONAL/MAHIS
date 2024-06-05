import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
import { DRUG_FREQUENCIES, DrugPrescriptionForImmunizationService } from "../../../services/drug_prescription_for_immunization_service";
import { isEmpty } from "lodash";
import { Service } from "@/services/service";
import { PatientService } from "@/services/patient_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

export async function getVaccinesData() {
    // const patient = new PatientService();
    // const data = await Service.getJson("eir/followup");
    // return data;
}
