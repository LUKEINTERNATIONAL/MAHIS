<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Physical examination"
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
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import { useInvestigationStore } from "@/stores/InvestigationStore";
import { useDiagnosisStore } from "@/stores/DiagnosisStore";
import { mapState } from "pinia";
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { Service } from "@/services/service";
import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
export default defineComponent({
    name: "PhysicalExam",
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
                    title: "Vitals",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Maternal exam",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "Fetal assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Fetal presentation",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "",
                },
                {
                    title: "Presenting signs for IPV",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 5,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Vitals",
                    componet: "vitals",
                    value: "1",
                },
                {
                    title: "Maternal exam",
                    componet: "MaternalExam",
                    value: "2",
                },
                {
                    title: "Fetal assessment",
                    componet: "FetalAssessment",
                    value: "3",
                },
                {
                    title: "Fetal presentation",
                    componet: "FetalPresentation",
                    value: "4",
                },
                {
                    title: "Presenting signs or conditions for IPV ",
                    componet: "PresentingSigns",
                    value: "5",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        //  ...mapState(useAncVitalsStore,["vitals"]),
        ...mapState(useInvestigationStore, ["investigations"]),
        ...mapState(useDiagnosisStore, ["diagnosis"]),
    },
    mounted() {
        this.markWizard();
    },
    watch: {
        DangerSigns: {
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
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
            // if(this.vitals.validationStatus){
            this.wizardData[0].checked = true;
            this.wizardData[0].class = "open_step common_step";
            // }else{
            //   this.wizardData[0].checked = false;
            // }

            // if(this.DangerSigns[0].selectdData.length > 0){
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = 'open_step common_step'
            // }else{
            //   this.wizardData[1].checked = false;
            // }

            if (this.diagnosis[0].selectdData.length > 0) {
                this.wizardData[2].checked = true;
                this.wizardData[2].class = "open_step common_step";
            } else {
                this.wizardData[2].checked = false;
            }
        },
        // deleteDisplayData(data: any){
        //   return  data.map((item: any) => {
        //     delete item?.display;
        //     return item?.data;
        //   });
        // },
        saveData() {
            this.$router.push("LabTests");
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
