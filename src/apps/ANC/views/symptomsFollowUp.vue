<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Symptoms  and follow up"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
                :getSaveFunction="getSaveFunction"
            />
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
import { useMedicalFollowUpStore } from "../store/symptomsFollowUp/medicalFollowUp";
import { usePersistentBehaviourStore } from "../store/symptomsFollowUp/persistentBehaviourStore";
import { useIpvStore } from "../store/symptomsFollowUp/ipvStore";
import { useCurrentPhysiologicalSymptomsStore } from "../store/symptomsFollowUp/currentPhysiologicalSymptomsStore";
import { useFatalMovementStore } from "../store/symptomsFollowUp/fatalMovementStore";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import {
    CurrentPhysiologicalSymptomsInstance,
    FetalMovementInstance,
    IntimatePartnerInstance,
    MedicalFollowUpInstance,
    PersistentBehavioursInstance,
    PersistentSymptomsInstance,
} from "@/apps/ANC/service/symptoms_follow_up_service";
import { resetPatientData } from "@/services/reset_data";
import { validateField } from "@/services/ANC/symptoms_validation";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
import { LabTestsService } from "@/apps/ANC/service/labtests_service";
import { PersistentBehaviourService, SymptomsFollowUpService } from "@/services/ANC/symptoms_follow_up_service";
export default defineComponent({
    name: "Home",
    mixins: [SetUserRole, SetEncounter],
    components: {
        BasicFooter,
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
                    title: "Persistent behaviours and symptoms",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },

                {
                    title: "Intimate partner violence(IPV)",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
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
                    title: "Persistent behaviours and symptoms",
                    component: "PersistentBehaviour",
                    value: "2",
                },
                {
                    title: "Intimate partner violence(IPV)",
                    component: "Ipv",
                    value: "3",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useMedicalFollowUpStore, ["medicalFollowUp"]),
        ...mapState(usePersistentBehaviourStore, ["persistentBehaviour"]),
        ...mapState(useCurrentPhysiologicalSymptomsStore, ["physiologicalSymptoms"]),
        ...mapState(useIpvStore, [
            "ipv",
            "ipv1",
            "additionalCare",
            "safety_assessment",
            "physical_violence",
            "beaten_pregnant",
            "strangling",
            "murder_threat",
            "referrals",
            "constant_jealous",
            "woman_threatened",
        ]),
        ...mapState(useFatalMovementStore, ["fatalMovement"]),
        ...mapState(useDemographicsStore, ["patient"]),
    },
    mounted() {
        this.markWizard();
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        getSaveFunction() {},
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data;
            });
        },
        async saveData() {
            this.saveMedicalFollowUp();
            this.savePersistentBehaviours();
            this.saveIPV();
            await resetPatientData();
            this.$router.push("contact");
        },

        async buildMedicalFollowUp() {
            return [
                ...(await formatRadioButtonData(this.medicalFollowUp)),
                ...(await formatCheckBoxData(this.medicalFollowUp)),
                ...(await formatInputFiledData(this.medicalFollowUp)),
            ];
        },
        async validations(data: any, fields: any) {
            return fields.every((fieldName: string) => validateField(data, fieldName, (this as any)[fieldName]));
        },
        async buildPersistentBehaviours() {
            return [
                ...(await formatRadioButtonData(this.persistentBehaviour)),
                ...(await formatCheckBoxData(this.persistentBehaviour)),
                ...(await formatInputFiledData(this.persistentBehaviour)),
            ];
        },
        async buildCurrentPhysiologicalSymptoms() {
            return [...(await formatCheckBoxData(this.physiologicalSymptoms))];
        },
        async buildIPV() {
            return [...(await formatCheckBoxData(this.ipv)), ...(await formatInputFiledData(this.ipv))];
        },
        async buildFetalMovement() {
            return [...(await formatRadioButtonData(this.fatalMovement))];
        },

        async saveMedicalFollowUp() {
            if (this.medicalFollowUp.length > 0) {
                const userID: any = Service.getUserID();
                const medicalFollowUp = new SymptomsFollowUpService(this.patient.patientID, userID);
                const encounter = await medicalFollowUp.createEncounter();
                if (!encounter) return toastWarning("Unable to create medical follow up encounter");
                const patientStatus = await medicalFollowUp.saveObservationList(await this.buildMedicalFollowUp());
                if (!patientStatus) return toastWarning("Unable to create patient Medical follow up details!");
                toastSuccess("Medical follow up has been created");
            }
            console.log(await this.buildMedicalFollowUp());
        },

        async savePersistentBehaviours() {
            if (this.medicalFollowUp.length > 0) {
                const userID: any = Service.getUserID();
                const persistentBehaviour = new PersistentBehaviourService(this.patient.patientID, userID);
                const encounter = await persistentBehaviour.createEncounter();
                if (!encounter) return toastWarning("Unable to create persistent behaviour encounter");
                const patientStatus = await persistentBehaviour.saveObservationList(await this.buildPersistentBehaviours());
                if (!patientStatus) return toastWarning("Unable to create patient persistent behaviour details!");
                toastSuccess("Persistent behaviour details have been created");
            }
            console.log(await this.buildPersistentBehaviours());
        },
        async saveIPV() {
            if (this.medicalFollowUp.length > 0) {
                const userID: any = Service.getUserID();
                const IPV = new PersistentBehaviourService(this.patient.patientID, userID);
                const encounter = await IPV.createEncounter();
                if (!encounter) return toastWarning("Unable to create IPV encounter");
                const patientStatus = await IPV.saveObservationList(await this.buildIPV());
                if (!patientStatus) return toastWarning("Unable to create patient IPV details!");
                toastSuccess("IPV details have been created");
            }
            console.log(await this.buildIPV());
        },
    },
});
</script>

<style scoped></style>
