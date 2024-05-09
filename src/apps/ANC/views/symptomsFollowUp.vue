<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Symptoms  and follow up"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
                :StepperData="StepperData"
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
import { LabOrder } from "@/apps/NCD/services/lab_order";
import { VitalsService } from "@/services/vitals_service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
import { Diagnosis } from "@/apps/NCD/services/diagnosis";
import { useMedicalFollowUpStore } from "../store/symptomsFollowUp/medicalFollowUpStore";
import { usePersistentBehaviourStore } from "../store/symptomsFollowUp/persistentBehaviourStore";
import { usePersistentSymptomsStore } from "../store/symptomsFollowUp/persistentSymptomsStore";
import { useIpvStore } from "../store/symptomsFollowUp/ipvStore";
import { useCurrentPhysiologicalSymptomsStore } from "../store/symptomsFollowUp/currentPhysiologicalSymptomsStore";
import { useFatalMovementStore } from "../store/symptomsFollowUp/fatalMovementStore";
import { formatCheckBoxData, formatRadioButtonData } from "@/services/formatServerData";
import {CurrentPhysiologicalSymptomsInstance, FetalMovementInstance, IntimatePartnerInstance, MedicalFollowUpInstance, PersistentBehavioursInstance, PersistentSymptomsInstance} from '@/apps/ANC/service/symptoms_follow_up_service';
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
                    title: "Medical follow-up",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Persistent behaviours",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Persistent symptoms",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Current physiological symptoms",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "Intimate partner violence(IPV)",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "",
                },
                {
                    title: "Fatal Movement",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 6,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Medical follow-up",
                    component: "MedicalFollowUp",
                    value: "1",
                },
                {
                    title: "Persistent behaviours",
                    component: "PersistentBehaviour",
                    value: "2",
                },
                {
                    title: "Persistent symptoms",
                    component: "PersistentSymptoms",
                    value: "3",
                },
                {
                    title: "Current physiological symptoms",
                    component: "CurrentPhysiologicalSymptoms",
                    value: "4",
                },
                {
                    title: "Intimate partner violence(IPV)",
                    component: "Ipv",
                    value: "5", 
                },
                {
                    title: "Fetal Movement",
                    component: "FatalMovement",
                    value: "6",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useMedicalFollowUpStore,["trial"]),
        ...mapState(usePersistentBehaviourStore,["persistentBehaviour"]),
        ...mapState(usePersistentSymptomsStore,["persistentSymptom"]),
        ...mapState(useCurrentPhysiologicalSymptomsStore,["physiologicalSymptoms"]),
        ...mapState(useIpvStore,["ipv"]),
        ...mapState(useFatalMovementStore,["fatalMovement"]),
        ...mapState(useDemographicsStore, ["demographics"]),


    },
    mounted() {
        this.markWizard();
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        saveData() {
            this.saveMedicalFollowUp(),
            this.savePersistentBehaviours(),
            this.savePersistentSymptoms(),
            this.saveCurrentPhysiologicalSymptoms(),
            this.saveIPV(),
            this.saveFetalMovement(),
            resetPatientData();
            this.$router.push("ANChome");
            toastSuccess("Symptoms and follow up data saved successfully");
        },
        async buildMedicalFollowUp() {
       return [
         ...(await formatRadioButtonData(this.trial)),

        ]
    },
    async buildPersistentBehaviours() {
       return [
         ...(await formatRadioButtonData(this.persistentBehaviour)),
   
        ]
    },
    async buildPersistentSymptoms() {
       return [
         ...(await formatCheckBoxData(this.persistentSymptom)),
     
        ]
    },
    async buildCurrentPhysiologicalSymptoms() {
       return [
         ...(await formatCheckBoxData(this.physiologicalSymptoms)),

        ]
    },
    async buildIPV() {
       return [
         ...(await formatCheckBoxData(this.ipv)),
        ]
    },
    async buildFetalMovement() {
       return [
         ...(await formatRadioButtonData(this.fatalMovement)),
        ]
    },

    async saveMedicalFollowUp () {
        const data: any = await this.buildMedicalFollowUp();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const medicalFollowUpInstance = new MedicalFollowUpInstance();
            medicalFollowUpInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Medical follow-up data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },

    async savePersistentBehaviours () {
        const data: any = await this.buildPersistentBehaviours();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const medicalFollowUpInstance = new PersistentBehavioursInstance();
            medicalFollowUpInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Persistent Behaviours data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },

    async savePersistentSymptoms () {
        const data: any = await this.buildPersistentSymptoms();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const persistentSymptomsInstance = new PersistentSymptomsInstance();
            persistentSymptomsInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Persistent Symptoms data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },

    async saveCurrentPhysiologicalSymptoms () {
        const data: any = await this.buildCurrentPhysiologicalSymptoms();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const currentPhysiologicalSymptomsInstance = new CurrentPhysiologicalSymptomsInstance();
            currentPhysiologicalSymptomsInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Current Physiological Symptoms data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },

    async saveIPV () {
        const data: any = await this.buildIPV();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const IPVInstance = new IntimatePartnerInstance();
            IPVInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Current IPV data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    },

    async saveFetalMovement () {
        const data: any = await this.buildFetalMovement();
        if (data.length > 0) {
            const userID: any = Service.getUserID();
            const fetalMovementInstance = new FetalMovementInstance();
            fetalMovementInstance.push(this.demographics.patient_id, userID, data);
            toastSuccess("Current Fetal movement data saved successfully");
        }

        else {
            toastWarning("Could not find all concepts");
        }
    }
    
    },
});
</script>

<style scoped></style>
