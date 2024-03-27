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

import dispensedMedication from "@/apps/OPD/components/dispensedMedication.vue";
import undispensedMedication from "@/apps/OPD/components/undispensedMedication.vue";

import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "../components/Stepper.vue";
import { Service } from "@/services/service";
import { LabOrder } from "@/apps/NCD/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { useDispositionStore } from "@/stores/OutcomeStore";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { Treatment } from "@/apps/NCD/services/treatment";
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date";
import { defineComponent } from "vue";
import { DRUG_FREQUENCIES, DrugPrescriptionService } from "../../../services/drug_prescription_service";

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
                    title: "Undispensed Medications",
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
                    prescribedMedsdata: this.prescribedList,
                    unprescribedMedsdata: this.unprescribedList,
                    value: "1",
                },
                {
                    title: "Undispensed Medications",
                    componet: "undispensedMedication",

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

        },
    },
});
</script>

<style scoped></style>
