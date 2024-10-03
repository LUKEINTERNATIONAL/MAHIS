<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Obstetric Details"
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
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import SaveProgressModal from "@/components/SaveProgressModal.vue";
import { createModal } from "@/utils/Alerts";
import { icons } from "@/utils/svg";
import Stepper from "@/components/Stepper.vue";
import { mapState } from "pinia";
import { getCheckboxSelectedValue } from "@/services/data_helpers";
import { resetPatientData } from "@/services/reset_data";
import BasicFooter from "@/components/BasicFooter.vue";
import SetUserRole from "@/views/Mixin/SetUserRole.vue";
import SetEncounter from "@/views/Mixin/SetEncounter.vue";

export default defineComponent({
    name: "obstetricDetails",
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
                    title: "Obstetric",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Pregnancy/Labour",
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
                    title: "Obstetric",
                    component: "Obstetric",
                    value: "1",
                },
                {
                    title: "Pregnancy/Labour",
                    component: "Labour",
                    value: "2",
                },
            ],
            isOpen: false,
            iconsContent: icons,
        };
    },
    watch: {
        medicalHistory(change) {
            console.log(change);
        },
    },
    computed: {},
    saveData() {
        const medicalConditions = [
            "Auto immune desease",
            "Asthma",
            "Diabetes",
            "Sickle cell",
            "Anaemia",
            "Thalassemia",
            "Gynaecological",
            "CCF",
            "RHD",
            "Gestational diabetes",
            "pre-existing type 1",
            "pre-existing type 2",
            "Epilepsy",
            "Hypertension",
            "Kidney",
            "TB",
            "Mental  illiness",
        ];
    },
    mounted() {
        // this.markWizard()
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
            const errors: any = [];
            // this.StepperData.forEach((stepper)=> {
            //   if (!stepper.validation) return
            //   Object.keys(stepper.validation).forEach((validationName) => {
            //     if (typeof stepper.validation[validationName] === 'function') {
            //       const state = stepper.validation[validationName](this[validationName])
            //       if (state) errors.push(state)
            //     }
            //   })
            // })
            // if (errors.length) {
            //     return alert(errors.join(","));
            // }
          resetPatientData();
          this.$router.push("labourHome");

        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
