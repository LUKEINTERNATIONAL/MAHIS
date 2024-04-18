<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper
          stepper-title="Lab test and imaging"
          :wizardData="wizardData"
          @updateStatus="markWizard"
          @finishBtn="saveData()"
          :StepperData="StepperData"
      ></Stepper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Referral from "@/apps/ANC/components/referral/Referral.vue";
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonMenu, IonTitle,IonToolbar } from "@ionic/vue";
import Toolbar from "../components/Toolbar.vue";



export default defineComponent ({
  name : "Home",
  components : {
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
    Referral
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      wizardData: [
        {
          title: 'Referral',
          class: 'common_step',
          checked:"",
          disabled:false,
          number:1,
          last_step: 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'Referral',
          component: 'Referral',
          value: '1'
        },

      ],

    }
  },
  setup () {
    return {chevronBackOutline, checkmark}
  },
  methods: {
    markWizard() {},
    saveData() {
      // // Simulate saving data
      // this.loading = true; // Show the spinner while data is being saved
      // setTimeout(() => {
      //   // After some time (simulating a server request), hide the spinner
      //   this.loading = false;
      //   // Redirect to counselling page
      //   this.$router.push('counselling');
      // }, 8000); // Simulate a 2-second delay
      this.$router.push("Treatment");
    },
  },
});
</script>

<style scoped></style>
