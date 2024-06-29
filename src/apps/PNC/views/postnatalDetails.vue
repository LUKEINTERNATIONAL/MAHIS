<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Postnatal details"
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
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal, toastSuccess, toastWarning } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { Service } from "@/services/service";
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from "@/services/formatServerData";
import { useObstetricDetailsStore } from "@/apps/PNC/stores/postnatal details/ObstetricDetails";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { PostnatalDetailsService } from "@/apps/PNC/Services/postnatal_details_service";
import { useDeliveryDetailsStore } from "@/apps/PNC/stores/postnatal details/DeliveryDetails";
import { useHIVStatusAndTreatmentStore } from "@/apps/PNC/stores/postnatal details/HIVStatusAndTreatment";
import { modifyWizardData } from "@/services/data_helpers";
import { resetPatientData } from "@/services/reset_data";
export default defineComponent({
    name: "postnatalDetails",
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
                    title: "Obstetric details",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Delivery details",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "HIV status and treatment",
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
                    title: "Obstetric details",
                    component: "ObstetricDetails",
                    value: "1",
                },
                {
                    title: "Delivery details",
                    component: "DeliveryDetails",
                    value: "2",
                },
                {
                    title: "HIV status and treatment",
                    component: "HIVStatusAndTreatment",
                    value: "3",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        obstetricDetails: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
        deliveryDetails: {
            handler() {
                this.markWizard();
            },
            deep: true,
        },
    },
    getFormatedData(data: any) {
        return data.map((item: any) => {
            return item?.data;
        });
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
        ...mapState(useObstetricDetailsStore, ["obstetricDetails"]),
        ...mapState(useDeliveryDetailsStore, ["deliveryDetails"]),
        ...mapState(useHIVStatusAndTreatmentStore, ["hivStatusAndTreatment"]),
    },

    mounted() {
        this.markWizard();
    },

    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard: function () {
            // if (this.obstetricDetails[0].selectedData.length > 0) {
            //   modifyWizardData(this.wizardData, "Obstetric details",{
            //     checked:true,
            //     class:'open_step common_step'
            //       });
            // } else {
            //   modifyWizardData(this.wizardData, "Obstetric details", {
            //     checked: false,
            //   });
            // }
            // if (this.deliveryDetails[0].selectedData.length > 0) {
            //   modifyWizardData(this.wizardData, "Obstetric details",{
            //     checked:true,
            //     class:'open_step common_step'
            //   });
            // } else {
            //   modifyWizardData(this.wizardData, "Obstetric details", {
            //     checked: false,
            //   });
            // }
            // if(this.deliveryDetails[0].selectdData.length > 0){
            //   this.wizardData[1].checked = true;
            //   this.wizardData[1].class = 'open_step common_step'
            // }else{
            //   this.wizardData[1].checked = false;
            // }
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
            await this.savePostnatalDetails();
            //toastSuccess("Postnatal details data saved successfully")
            resetPatientData();
            this.$router.push("home");
        },

        async savePostnatalDetails() {
            if (this.obstetricDetails.length > 0 && this.deliveryDetails.length > 0 && this.hivStatusAndTreatment.length > 0) {
                const userID: any = Service.getUserID();
                const postnatalDetails = new PostnatalDetailsService(this.demographics.patient_id, userID);
                const encounter = await postnatalDetails.createEncounter();
                if (!encounter) return toastWarning("Unable to create patient postnatal details  encounter");
                const patientStatus = await postnatalDetails.saveObservationList(await this.buildPostnatalDetails());
                if (!patientStatus) return toastWarning("Unable to create patient obstetric, delivery and HIV status details!");
                toastSuccess("Obstetric, delivery and HIV status details have been created");
            }
            console.log(await this.buildPostnatalDetails());
        },

        async buildPostnatalDetails() {
            return [
                ...(await formatCheckBoxData(this.obstetricDetails)),
                ...(await formatRadioButtonData(this.obstetricDetails)),
                ...(await formatInputFiledData(this.obstetricDetails)),
                ...(await formatCheckBoxData(this.deliveryDetails)),
                ...(await formatRadioButtonData(this.deliveryDetails)),
                ...(await formatInputFiledData(this.deliveryDetails)),
                ...(await formatCheckBoxData(this.hivStatusAndTreatment)),
                ...(await formatRadioButtonData(this.hivStatusAndTreatment)),
                ...(await formatInputFiledData(this.hivStatusAndTreatment)),
            ];
        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
