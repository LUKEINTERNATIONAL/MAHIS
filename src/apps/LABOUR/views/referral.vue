<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Patient Referral"
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
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline, checkmark, checkbox } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastWarning } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { useLabourReferralStore } from "@/apps/LABOUR/stores/repeatable things/referral";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import {
    getCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyCheckboxInputField,
    modifyCheckboxValue,
    modifyFieldValue,
} from "@/services/data_helpers";
import { Service } from "@/services/service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { ReferralService } from "@/services/LABOUR/referral_service";
import { resetPatientData } from "@/services/reset_data";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";
export default defineComponent({
    name: "referral",
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
                    title: "Referral",
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
                    title: "Referral",
                    component: "PatientReferral",
                    value: "1",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useLabourReferralStore, ["labourReferral"]),
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
            this.saveReferal();
            toastSuccess("Patient referral saved successfully");
            await resetPatientData();
        },
        async saveReferal() {
            if (this.labourReferral.length > 0) {
                const userID: any = Service.getUserID();
                const Referal = new ReferralService(this.patient.patientID, userID);
                const encounter = await Referal.createEncounter();
                if (!encounter) return toastWarning("Unable to create Referal encounter");
                const patientStatus = await Referal.saveObservationList(await this.buildReferal());
                if (!patientStatus) return toastWarning("Unable to create Referal !");
                toastSuccess("Referal has been created");
            }
            console.log(await this.buildReferal());
        },
        async buildReferal() {
            return [
                ...(await formatRadioButtonData(this.labourReferral)),
                ...(await formatCheckBoxData(this.labourReferral)),
                ...(await formatInputFiledData(this.labourReferral)),
            ];
        },
        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
