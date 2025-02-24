<template>
  <ion-page>
    <!-- Spinner -->
    <div v-if="isLoading" class="spinner-overlay">
      <ion-spinner name="bubbles"></ion-spinner>
      <div class="loading-text">Please wait...</div>
    </div>
    <ion-loading
        :is-open="isLoadingPrinter"
        message="Printing consultation summary..."
        spinner="circles"
    ></ion-loading>
    <OPDPrintingModal
        :onYes="printYes"
        :onNo="printNo"
        :isOpen="printModalOpen"
        :title="`Do you want to print the consultation summary?`"
    />
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper
          stepperTitle="Dispensation"
          :wizardData="wizardData"
          @updateStatus="markWizard"
          @finishBtn="saveData()"
          :StepperData="StepperData"
          :getSaveFunction="getSaveFunction"
          :showSteeper="2"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonModal,
  IonLoading,
} from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastDanger } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { defineComponent, ref } from "vue";
import { useDispensationStore } from "@/apps/OPD/stores/DispensationStore";
import { PatientOpdList } from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import { getUserLocation } from "@/services/userService";
import { usePatientList } from "@/apps/OPD/stores/patientListStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import OPDPrintingModal from "@/apps/OPD/components/ConsultationPlan/Modals/OPDPrintingModal.vue";
import { usePatientProfile } from "@/composables/usePatientProfile";
import Router from "@/router";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Toolbar,
    ToolbarSearch,
    DemographicBar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    Stepper,
    OPDPrintingModal,
    IonLoading,
  },
  computed: {
    ...mapState(useDispensationStore, ["StepperData"]),
    ...mapState(useDemographicsStore, ["patient"]),
  },
  setup() {
    const router = useRouter();
    const { printVisitSummary } = usePatientProfile();
    const printModalOpen = ref(false);
    const isLoadingPrinter = ref(false);

    const togglePrintModal = () => {
      printModalOpen.value = !printModalOpen.value;
    };

    const printYes = async () => {
      isLoadingPrinter.value = true;
      try {
        await printVisitSummary();
        toastSuccess("Consultation summary printed successfully!");
        setTimeout(() => {
          router.push("home");
          }, 3500);
      } catch (error) {
        toastDanger("Failed to print consultation summary.");
      } finally {
        isLoadingPrinter.value = false;
      }
    };

    const printNo = () => {
      toastSuccess("Patient has finished consultation!");
      router.push("home");
    };

    return {
      chevronBackOutline,
      checkmark,
      printModalOpen,
      togglePrintModal,
      printNo,
      printYes,
      isLoadingPrinter,
    };
  },
  data() {
    return {
      checkedIn: false as Boolean,
      outcomes: "" as any,
      showUndispensedMedication: false,
      wizardData: [
        {
          title: "Dispensation",
          class: "common_step",
          checked: false,
          disabled: false,
          number: 1,
          last_step: "last_step",
        },
      ],
      isOpen: false,
      iconsContent: icons,
      isLoading: false,
    };
  },
  mounted() {
    this.markWizard();
  },
  watch: {
    vitals: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    investigations: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    diagnosis: {
      handler() {
        this.markWizard();
      },
      deep: true,
    },
    selectedMedicalDrugsList: {
      handler() {
        this.markWizard();
      },
    },
  },
  methods: {
    markWizard() {},
    async getSaveFunction() {
      try {
        const visit = await PatientOpdList.getCheckInStatus(this.patient.patientID);
        await PatientOpdList.checkOutPatient(visit[0].id, dates.todayDateFormatted());
        const location = await getUserLocation();
        const locationId = location ? location.code : null;
        await usePatientList().refresh(locationId);
        this.checkedIn = false;
        toastSuccess("The patient's visit is now closed");
      } catch (e) {
        console.error(e);
      }
      this.togglePrintModal();
    },
    saveData() {
      this.$router.push("/pharmacy");
    },
  },
});
</script>
