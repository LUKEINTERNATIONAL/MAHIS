<template>
    <ion-page>
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
    modalController,
    AccordionGroupCustomEvent,
} from "@ionic/vue";

import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import {createModal, toastSuccess} from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/components/Stepper.vue";
import { defineComponent } from "vue";
import { useDispensationStore } from "@/apps/OPD/stores/DispensationStore";
import {PatientOpdList} from "@/services/patient_opd_list";
import dates from "@/utils/Date";
import {getUserLocation} from "@/services/userService";
import {usePatientList} from "@/apps/OPD/stores/patientListStore";
import {useDemographicsStore} from "@/stores/DemographicStore";

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
    },
    computed: {
        ...mapState(useDispensationStore, ["StepperData"]),
      ...mapState(useDemographicsStore,["demographics"])
    },
    data() {
        return {
          checkedIn: false as Boolean,
          dispositions: "" as any,
            showUndispensedMedication: false,
            wizardData: [
                {
                    title: "Dispense Medications",
                    class: "common_step",
                    checked: false,
                    disabled: false,

                    number: 1,
                    last_step: "last_step",
                },
            ],
            isOpen: false,
            iconsContent: icons,
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
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
     async getSaveFunction(){
        try {
          const visit = await PatientOpdList.getCheckInStatus(
              this.demographics.patient_id
          );
          await PatientOpdList.checkOutPatient(
              visit[0].id,
              dates.todayDateFormatted()
          );
          const location = await getUserLocation();
          const locationId = location ? location.location_id : null;
          await usePatientList().refresh(locationId);
          this.checkedIn = false;
          toastSuccess("The patient's visit is now closed");

        } catch (e) {}
        this.$router.push("/home");
      },
        saveData() {
            this.$router.push("/pharmacy");
        },
    },
});
</script>
