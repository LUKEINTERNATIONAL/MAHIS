<script lang="ts">
import { defineComponent, ref } from "vue";
import { Capacitor } from "@capacitor/core";
import personalInformationModal from "@/apps/Immunization/components/Modals/personalInformationModal.vue";
import Outcome from "@/components/Outcome.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { PatientPrintoutService } from "@/services/patient_printout_service";
import { createModal } from "@/utils/Alerts";
import { PatientService } from "@/services/patient_service";
import { mapState } from "pinia";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";

export default defineComponent({
    name: "Menu",
    data() {
        return {
            isMobile: false as any,
            visits: [] as any,
            event: null as any,
            popoverOpen: false,
            program: null as any,
        };
    },
    mounted() {},
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    methods: {
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        openPIM() {
            createModal(personalInformationModal, { class: "otherVitalsModal largeModal" });
        },
        openOutCome() {
            createModal(Outcome, { class: "otherVitalsModal largeModal" });
        },
        async printVisitSummary() {
            this.visits = await PatientService.getPatientVisits(this.patient.patientID, false);
            if (this.visits.length) {
                const lbl = new PatientPrintoutService(this.patient.patientID);
                return lbl.printVisitSummaryLbl(this.visits[0]);
            } else {
                toastWarning("No visits available");
            }
        },
        printID() {
            new PatientPrintoutService(this.patient.patientID).printNidLbl();
        },
        formatCurrentAddress(data: any) {
            const addressComponents = [
                data?.personInformation?.current_district,
                data?.personInformation?.current_traditional_authority,
                data?.personInformation?.current_village,
            ];
            return addressComponents.filter(Boolean).join(",");
        },
    },
});
</script>
