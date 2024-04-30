<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper
                stepperTitle="Labour assessment"
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

export default defineComponent({
    name: "obstetricDetails",
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
                    title: "Quick Check",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 1,
                    last_step: "",
                },
                {
                    title: "Physical examination",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 2,
                    last_step: "",
                },
                {
                    title: "First vaginal assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 3,
                    last_step: "",
                },
                {
                    title: "Pelvis assessment",
                    class: "common_step",
                    checked: "",
                    icon: false,
                    disabled: false,
                    number: 4,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Quick check",
                    component: "QuickCheck",
                    value: "1",
                },
                {
                    title: "Physical examination",
                    component: "PhysicalExamination",
                    value: "2",
                },
                {
                    title: "First vaginal examination",
                    component: "FirstVaginalExamination",
                    value: "3",
                },
                {
                    title: "Pelvic assessment",
                    component: "PelvicAssessment",
                    value: "4",
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
            // // })
            // if (errors.length) {
            //     return alert(errors.join(","));
            // }
          this.$router.push("labourHome");

        },

        openModal() {
            createModal(SaveProgressModal);
        },
    },
});
</script>

<style scoped></style>
