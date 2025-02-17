import { ref } from "vue";
import { Capacitor } from "@capacitor/core";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { PatientPrintoutService } from "@/services/patient_printout_service";
import { createModal } from "@/utils/Alerts";
import { PatientService } from "@/services/patient_service";
import { toastWarning } from "@/utils/Alerts";
import personalInformationModal from "@/apps/Immunization/components/Modals/personalInformationModal.vue";
import Outcome from "@/components/Outcome.vue";

export function usePatientProfile() {
    const isMobile = ref(Capacitor.isNativePlatform());
    const visits = ref<any[]>([]);
    const event = ref<Event | null>(null);
    const popoverOpen = ref(false);
    const program = ref<any>(null);

    const demographicsStore = useDemographicsStore();
    const patient = demographicsStore.patient;

    const openPopover = (e: Event) => {
        event.value = e;
        popoverOpen.value = true;
    };

    const openPIM = () => {
        createModal(personalInformationModal, { class: "otherVitalsModal largeModal" });
    };

    const openOutCome = () => {
        createModal(Outcome, { class: "otherVitalsModal largeModal" });
    };

    const printVisitSummary = async () => {
        visits.value = await PatientService.getPatientVisits(patient.patientID, false);
        if (visits.value.length) {
            const lbl = new PatientPrintoutService(patient.patientID);
            return lbl.printVisitSummaryLbl(visits.value[0]);
        } else {
            toastWarning("No visits available");
        }
    };

    const printID = () => {
        new PatientPrintoutService(patient.patientID).printNidLbl();
    };

    const formatCurrentAddress = (data: any) => {
        const addressComponents = [
            data?.personInformation?.current_district,
            data?.personInformation?.current_traditional_authority,
            data?.personInformation?.current_village,
        ];
        return addressComponents.filter(Boolean).join(",");
    };

    return {
        isMobile,
        visits,
        event,
        popoverOpen,
        program,
        patient,
        openPopover,
        openPIM,
        openOutCome,
        printVisitSummary,
        printID,
        formatCurrentAddress,
    };
}
