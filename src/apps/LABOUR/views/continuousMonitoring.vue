<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Continuous monitoring"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                @finishBtn="saveData()"
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
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastWarning } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { getCheckboxSelectedValue } from "@/services/data_helpers";
import { formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
// import { useLabourVitalsStore } from '../stores/repeatable things/vitals';
import { useOtherExamsStore } from "../stores/repeatable things/otherExams";
import { useLabourVitalsStore } from "../stores/repeatable things/vitals";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { ContinuousMonitoringVitalsService, OtherExamsService } from "@/services/LABOUR/continuous_monitoring_service";
import { resetPatientData } from "@/services/reset_data";

export default defineComponent({
    name: "obstetricDetails",
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
                    title: "Vitals",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Other exams",
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
                    title: "Vitals Signs",
                    component: "LabourVitals",
                    value: "1",
                },
                {
                    title: "Other exams",
                    component: "OtherExams",
                    value: "2",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {},
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useLabourVitalsStore, ["vitals"]),
        ...mapState(useOtherExamsStore, ["otherExams", "urine"]),
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
        deleteDisplayData(data: any) {
            return data.map((item: any) => {
                delete item?.display;
                return item?.data;
            });
        },
        saveData() {
            //this.$router.push("labourHome");
            this.saveVitals();
            this.saveOtherExams();
            toastSuccess("Continuous monitoring data saved successfully");
            resetPatientData();
        },
        async saveVitals() {
            if (this.vitals.length > 0) {
                const userID: any = Service.getUserID();
                const Monitoring = new ContinuousMonitoringVitalsService(this.demographics.patient_id, userID);
                const encounter = await Monitoring.createEncounter();
                if (!encounter) return toastWarning("Unable to create Vitals encounter");
                const patientStatus = await Monitoring.saveObservationList(await this.buildVitals());
                if (!patientStatus) return toastWarning("Unable to create Vitals !");
                toastSuccess("Vitals  has been created");
            }
            //console.log( await this.buildVitals())
        },
        async saveOtherExams() {
            if (this.otherExams.length > 0) {
                const userID: any = Service.getUserID();
                const otherExams = new OtherExamsService(this.demographics.patient_id, userID);
                const encounter = await otherExams.createEncounter();
                if (!encounter) return toastWarning("Unable to create Other Exams encounter");
                const patientStatus = await otherExams.saveObservationList(await this.buildOtherExams());
                if (!patientStatus) return toastWarning("Unable to create Other Exams !");
                toastSuccess("Other Exams  has been created");
            }
            // console.log(await this.buildOtherExams())
        },
        async buildVitals() {
            return [...(await formatInputFiledData(this.vitals))];
        },
        async buildOtherExams() {
            return [
                ...(await formatRadioButtonData(this.otherExams)),
                ...(await formatInputFiledData(this.otherExams)),
                ...(await formatRadioButtonData(this.urine)),
                ...(await formatInputFiledData(this.urine)),
            ];
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
