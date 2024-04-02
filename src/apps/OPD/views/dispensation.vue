<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Dispensation" :wizardData="wizardData" @updateStatus="markWizard"
                @finishBtn="saveData()" :StepperData="StepperData" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import dispensedMedication from "@/apps/OPD/components/dispensedMedication.vue";
import dispensationSummary from "@/apps/OPD/components/dispensationSummary.vue";

import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import {checkmark, chevronBackOutline} from "ionicons/icons";
import {icons} from "@/utils/svg";
import Stepper from "../components/Stepper.vue";
import {defineComponent} from "vue";

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
    data() {
        return {
            dispositions: "" as any,
            showUndispensedMedication: false,
            wizardData: [
                {
                    title: "Dispense Medications",
                    class: "common_step",
                    checked: false,
                    disabled: false,

                    number: 1,
                    last_step: "",
                },
                {
                    title: "Dispensation Summary",
                    class: "common_step",
                    checked: "",
                    icon: false,

                    disabled: false,
                    number: 2,
                    last_step: "last_step",
                },
            ],
            unprescribedLis: [],
            prescribedList: [
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
                {
                    drugName: "Albendazol",
                    dose: 5,
                    frequency: "2TimesPerDay",
                    duration: 5,
                    prescription: "",
                    drug_id: 1,
                    units: 10,
                    dispensed: true,
                    index: 0
                },
            ],
            StepperData: [
                {
                    title: "Dispense Medications",
                    componet: "dispensedMedication",
                    value: "1",
                },
                {
                    title: "Dispensation Summary",
                    componet: "dispensationSummary",
                    value: "2",
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
        markWizard() {

        },
        saveData() {
            this.$router.push('/pharmacy');
        },
    },
});
</script>

<style scoped></style>
