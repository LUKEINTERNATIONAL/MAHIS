<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Postnatal ward stay"
                :wizardData="wizardData"
                @updateStatus="markWizard"
                :StepperData="StepperData"
                :backUrl="userRoleSettings.url"
                :backBtn="userRoleSettings.btnName"
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
import { HIVStatusAndTreatmentService } from "@/apps/PNC/Services/hiv_status_and_treatment_service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useDangerSignsStore } from "@/apps/ANC/store/Tempo";
import { usePostnatalWardStayStore } from "@/apps/PNC/stores/postnatal ward stay/PostnatalWardMonitoring";
import { PostnatalWardStayService } from "@/apps/PNC/Services/postnatal_wardstay_service";
import { resetPatientData } from "@/services/reset_data";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
export default defineComponent({
    name: "postnatalWardMonitoring",
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
                    title: "Routine monitoring",
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
                    title: "Postnatal ward routine monitoring and management",
                    component: "PostnatalWardMonitoring",
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
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(usePostnatalWardStayStore, ["dangerSigns", "vitals", "otherExams"]),
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
        async saveData() {
            await this.saveWardMonitoring();
            toastSuccess("Postnatal ward stay data saved successfully");
            resetPatientData();
            this.$router.push("home");
        },
        async saveWardMonitoring() {
            if (this.dangerSigns.length > 0 && this.vitals.length > 0 && this.otherExams.length > 0) {
                const userID: any = Service.getUserID();
                const wardMonitoring = new PostnatalWardStayService(this.demographics.patient_id, userID);
                const encounter = await wardMonitoring.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient postnatal ward stay encounter");
                const patientStatus = await wardMonitoring.saveObservationList(await this.buildWardStayMonitoring());
                if (!patientStatus) return toastWarning("Unable to create patient routine monitoring details!");
                toastSuccess("Ward  details have been created");
            }
            console.log(await this.buildWardStayMonitoring());
        },
        async buildWardStayMonitoring() {
            return [
                ...(await formatCheckBoxData(this.dangerSigns)),
                ...(await formatCheckBoxData(this.vitals)),
                ...(await formatCheckBoxData(this.otherExams)),
                ...(await formatRadioButtonData(this.dangerSigns)),
                ...(await formatRadioButtonData(this.vitals)),
                ...(await formatRadioButtonData(this.otherExams)),
                ...(await formatInputFiledData(this.dangerSigns)),
                ...(await formatInputFiledData(this.vitals)),
                ...(await formatInputFiledData(this.otherExams)),
            ];
        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
