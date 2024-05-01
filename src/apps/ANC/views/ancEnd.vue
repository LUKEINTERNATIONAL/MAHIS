<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="ANC-End" :wizardData="wizardData" @updateStatus="markWizard" :StepperData="StepperData" />
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
import {AncEndInstance} from "@/apps/ANC/service/anc_end_service"
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useAncEndStore } from "../store/ancEnd/ancEndStore";
import { resetPatientData } from "@/services/reset_data";
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
            wizardData: [
                {
                    title: "AncEnd",
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
                    title: "AncEnd",
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
    computed:{
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useAncEndStore,["ancInfo"]),
    },

    methods: {
        markWizard() {},
        async saveData() {
      this.saveAncEnd;
      resetPatientData();
      this.$router.push("ANCHome");
    },

    async buildAncEnd() {
       return [
         ...(await formatRadioButtonData(this.ancInfo)),
         ...(await formatInputFiledData(this.ancInfo))
        ]
    },

    async saveAncEnd () {
        const data: any = await this.buildAncEnd();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const ancEndInstance = new AncEndInstance();
            ancEndInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Anc End data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
    },
});
</script>

<style scoped></style>
