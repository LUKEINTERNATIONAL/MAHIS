<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Postnatal Ward stay"
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
import { Service } from "@/services/service";
import { BabyMonitoringService } from "@/apps/PNC/Services/baby_monitoring_service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useDischargeWomanStore } from "@/apps/PNC/stores/others/DischargeWoman";
import { DischargeWomanService } from "@/apps/PNC/Services/discharge_woman_service";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
export default defineComponent({
    name: "dischargeWoman",
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
                    title: "Discharge woman",
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
                    title: "Discharge woman",
                    component: "DischargeWoman",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {},
    getFormatedData(data: any) {
        return data.map((item: any) => {
            return item?.data;
        });
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useDischargeWomanStore, ["dischargeWoman"]),
    },
    mounted() {
        this.markWizard();
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
        getSaveFunction() {},
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
        async saveData() {
            await this.saveDischargeWoman();
            this.$router.push("home");
        },
        async saveDischargeWoman() {
            if (this.dischargeWoman.length > 0) {
                const userID: any = Service.getUserID();
                const dischargeWoman = new DischargeWomanService(this.patient.patientID, userID);
                const encounter = await dischargeWoman.createEncounter();
                if (!encounter) return toastWarning("Unable to create discharge woman encounter");
                const patientStatus = await dischargeWoman.saveObservationList(await this.buildDischargeWoman());
                if (!patientStatus) return toastWarning("Unable to create discharge woman details!");
                toastSuccess("Discharge woman details have been created");
            }
            console.log(await this.buildDischargeWoman());
        },
        async buildDischargeWoman() {
            return [
                ...(await formatCheckBoxData(this.dischargeWoman)),
                ...(await formatRadioButtonData(this.dischargeWoman)),
                ...(await formatInputFiledData(this.dischargeWoman)),
            ];
        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
