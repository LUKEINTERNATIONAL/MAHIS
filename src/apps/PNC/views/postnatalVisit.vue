<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Postnatal Visit"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
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
} from "@ionic/vue";
import BasicFooter from "@/components/BasicFooter.vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/PNC/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastWarning } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useVisitForMotherStore } from "@/apps/PNC/stores/postnatal visits/VisitForMother";
import { useVisitForBabyStore } from "@/apps/PNC/stores/postnatal visits/VisitForBaby";
import { Service } from "@/services/service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { PNCVisitService } from "@/apps/PNC/Services/pnc_visit_service";
export default defineComponent({
    name: "postnatalVisit",
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
                    title: "PNC visit for mother",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "PNC visit for baby",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "PNC visit for mother",
                    component: "VisitForMother",
                    value: "1",
                },
                {
                    title: "PNC visit for baby",
                    component: "VisitForBaby",
                    value: "2",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useVisitForMotherStore, ["visitForMother"]),
        ...mapState(useVisitForBabyStore, ["visitForBaby"]),
    },
    mounted() {
        this.markWizard();
    },
    watch: {},
    getFormatedData(data: any) {
        return data.map((item: any) => {
            return item?.data;
        });
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {
            //   if(this.medications.validationStatus){
            //     this.wizardData[0].checked = true;
            //     this.wizardData[0].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[0].checked = false;
            //   }
            //   if(this.medicalHistory[0].selectdData.length > 0){
            //     this.wizardData[1].checked = true;
            //     this.wizardData[1].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[1].checked = false;
            //   }
            //   if(this.womanBehaviour[0].selectdData.length > 0){
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[2].checked = false;
            //   }
            //   if(this.medications[0].selectdData.length > 0){
            //     this.wizardData[2].checked = true;
            //     this.wizardData[2].class = 'open_step common_step'
            //   }else{
            //     this.wizardData[2].checked = false;
            //   }
        },
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
        async saveData() {
            await this.savePNCVisit();
            this.$router.push("home");
        },

        async savePNCVisit() {
            if (this.visitForMother.length > 0 && this.visitForBaby.length > 0) {
                const userID: any = Service.getUserID();
                const pncVisit = new PNCVisitService(this.demographics.patient_id, userID);
                const encounter = await pncVisit.createEncounter();
                if (!encounter) return toastWarning("Unable to create PNC visit encounter");
                const patientStatus = await pncVisit.saveObservationList(await this.buildPNCVisit());
                if (!patientStatus) return toastWarning("Unable to create patient PNC visit details!");
                toastSuccess("PNC visit details for mother and baby have been created");
            }
            console.log(await this.buildPNCVisit());
        },

        async buildPNCVisit() {
            return [
                ...(await formatCheckBoxData(this.visitForMother)),
                ...(await formatRadioButtonData(this.visitForMother)),
                ...(await formatInputFiledData(this.visitForMother)),
                ...(await formatCheckBoxData(this.visitForBaby)),
                ...(await formatRadioButtonData(this.visitForBaby)),
                ...(await formatInputFiledData(this.visitForBaby)),
            ];
        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
