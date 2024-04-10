<template>
    <ion-page>
        <Toolbar />
        <ion-content :fullscreen="true">
            <DemographicBar />
            <Stepper stepperTitle="Referral" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonTitle, IonToolbar, IonMenu } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import Stepper from "@/components/Stepper.vue";
import { icons } from "@/utils/svg";
import { chevronBackOutline, checkmark } from "ionicons/icons";
import Referral from "@/apps/ANC/components/referral/Referral.vue";

export default defineComponent({
    name: "treatment",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonPage,
        IonList,
        Toolbar,
        DemographicBar,
        IonMenu,
        IonTitle,
        IonToolbar,
        BasicInputField,
        Stepper,
        Referral,
    },
    data() {
        return {
            iconsContent: icons,
            isOpen: false,
            wizardData: [
                {
                    title: "Referral",
                    class: "common_step",
                    checked: false,
                    disabled: false,
                    number: 1,
                    last_step: "last_step",
                },
            ],
            StepperData: [
                {
                    title: "Referral",
                    component: "Referral",
                    value: "1",
                },
            ],
        };
    },
    setup() {
        return { chevronBackOutline, checkmark };
    },

    methods: {
        markWizard() {},
        saveData() {
            this.$router.push("counselling");
        },
    },
});
</script>

<style scoped></style>
