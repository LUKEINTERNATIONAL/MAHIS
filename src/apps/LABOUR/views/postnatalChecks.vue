<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Immediate postnatal checks"
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
import { Service } from "@/services/service";
import { DangerSignsService } from "@/apps/ANC/service/danger_signs_service";
import { ReasonForVisitService } from "@/apps/ANC/service/reason_for_visit_service";
import { ConfirmPregnancyService } from "@/apps/ANC/service/confirm_pregnancy_service";
import { SpecificHealthConcernsService } from "@/apps/ANC/service/specific_health_concerns_service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useImmediatePostnatalChecksForChildStore } from "@/apps/LABOUR/stores/delivery details/immediatepostnatalChecksForChild";
import { useImmediatePostnatalChecksForMotherStore } from "@/apps/LABOUR/stores/delivery details/immediatepostnatalChecksForMother";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { ImmediatePostnatalChecksForChildService } from "@/apps/LABOUR/services/immediate_postnatal_checks_for_child";
import { resetPatientData } from "@/services/reset_data";
export default defineComponent({
    name: "postnatalChecks",
    components: {
        IonContent,
      BasicFooter,
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
                    title: "For mother",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "For child",
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
                    title: "Immediate postnatal check for mother",
                    component: "ImmidiatePostnatalChecksForMother",
                    value: "1",
                },
                {
                    title: "Immediate postnatal check for child",
                    component: "ImmidiatePostnatalChecksForChild",
                    value: "2",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },

    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useImmediatePostnatalChecksForChildStore, ["examsAfterDeliveryForChild"]),
        ...mapState(useImmediatePostnatalChecksForMotherStore, ["examsAfterDelivery"]),
    },
    mounted() {
        this.markWizard();
    },
    watch: {},
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
        getFormatedData(data: any) {
            return data.map((item: any) => {
                return item?.data[0] || item?.data;
            });
        },
        async saveData() {
            await this.savePostnatalChecks();
            toastSuccess("Immediate postnatal checks data saved successfully");
            resetPatientData();
            // this.$router.push("labourHome");
        },

        async savePostnatalChecks() {
            if (this.examsAfterDeliveryForChild.length > 0 && this.examsAfterDelivery.length > 0) {
                const userID: any = Service.getUserID();
                const examsAfterDelivery = new ImmediatePostnatalChecksForChildService(this.demographics.patient_id, userID);
                const encounter = await examsAfterDelivery.createEncounter();
                if (!encounter) return toastWarning("Unable to create immediate checks for mother and child encounter");
                const patientStatus = await examsAfterDelivery.saveObservationList(await this.buildPostnatalChecks());
                if (!patientStatus) return toastWarning("Unable to create immediate checks for mother and child  !");
                toastSuccess("Immediate checks after delivery for mother and child have been created");
            }
            console.log(await this.buildPostnatalChecks());
        },

        openModal() {
            createModal(SaveProgressModal);
        },

        async buildPostnatalChecks() {
            return [
                ...(await formatCheckBoxData(this.examsAfterDeliveryForChild)),
                ...(await formatRadioButtonData(this.examsAfterDeliveryForChild)),
                ...(await formatInputFiledData(this.examsAfterDeliveryForChild)),
                ...(await formatCheckBoxData(this.examsAfterDelivery)),
                ...(await formatRadioButtonData(this.examsAfterDelivery)),
                ...(await formatInputFiledData(this.examsAfterDelivery)),
            ];
        },
    },
});
</script>

<style scoped></style>
