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
import { AppointmentService } from "@/services/appointment_service";
import HisDate from "@/utils/Date";
import SetDemographics from "@/views/Mixin/SetDemographics.vue";
import {
    medkit,
    chevronBackOutline,
    checkmark,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
    clipboard,
    thermometer,
    people,
} from "ionicons/icons";
export default defineComponent({
    name: "Menu",
    mixins: [SetDemographics],
    data() {
        return {
            isMobile: false as any,
            appointments: [] as any,
        };
    },
    setup() {
        return {
            chevronBackOutline,
            checkmark,
            grid,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            medkit,
            add,
            person,
            people,
            thermometer,
            clipboard,
        };
    },
    async mounted() {
        await this.setAppointments();
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    watch: {
        $route: {
            async handler(data) {
                await this.setAppointments();
            },
            deep: true,
        },
    },
    methods: {
        async setAppointments() {
            this.appointments = await AppointmentService.getDailiyAppointments(HisDate.currentDate());
            if (this.appointments) this.appointments = this.appointments.sort((a: any, b: any) => a.given_name.localeCompare(b.given_name));
        },
        formatBirthdate(birthdate: any) {
            return HisDate.getBirthdateAge(birthdate);
        },
    },
});
</script>
