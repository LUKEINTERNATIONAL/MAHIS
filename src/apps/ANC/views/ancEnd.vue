<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Pregnancy outcome" :wizardData="wizardData" @updateStatus="markWizard" :StepperData="StepperData" />
        </ion-content>
        <BasicFooter @finishBtn="saveData()" />
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
import BasicFooter from "@/components/BasicFooter.vue";
import { defineComponent } from "vue";
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
import Stepper from "@/components/Stepper.vue";
import { Service } from "@/services/service";
import { AncEndInstance } from "@/apps/ANC/service/anc_end_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useAncEndStore } from "../store/ancEnd/ancEndStore";
import { resetPatientData } from "@/services/reset_data";
import {ReferralService} from "@/apps/ANC/service/referral_service";
import {AncEndService} from "@/services/ANC/anc_end_service";
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
        BasicFooter,
    },
    data() {
        return {
            wizardData: [
                {
                    title: "Pregnancy outcome",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Pregnancy outcome",
                    component: "AncEnd",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    mounted() {
        this.markWizard();
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useAncEndStore, ["ancInfo"]),
    },

    methods: {
        markWizard() {},
        saveData() {
            this.saveAncEnd();
            resetPatientData();
            this.$router.push("ANCHome");
        },

        async buildAncEnd() {
            return [...(await formatRadioButtonData(this.ancInfo)),
              ...(await formatInputFiledData(this.ancInfo))];
        },

        async saveAncEnd() {
          if (this.ancInfo.length > 0) {
            const userID: any = Service.getUserID();
            const ANCpregnancyOutcome = new AncEndService(this.demographics.patient_id, userID);
            const encounter = await ANCpregnancyOutcome.createEncounter();
            if (!encounter) return toastWarning("Unable to create ANC pregnancy outcome encounter");
            const patientStatus = await ANCpregnancyOutcome.saveObservationList(await this.buildAncEnd());
            if (!patientStatus) return toastWarning("Unable to create pregnancy outcome details for ANC!");
            toastSuccess("ANC pregnancy outcome saved");
          }
          console.log(await this.buildAncEnd())

        },
    },
});
</script>

<style scoped></style>
