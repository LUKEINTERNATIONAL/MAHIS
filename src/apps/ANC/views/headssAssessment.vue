<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <Accordion  :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
} from '@ionic/vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Accordion from "@/apps/ANC/components/Accordion.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import headAssessment from "@/apps/ANC/components/others/headAssessment.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";



export default defineComponent ({
  name : 'treatment',
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
    Accordion,
    headAssessment
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      wizardData: [

        {
          'title': 'HEADSS assessment',
          'class': 'common_step',
          'checked':false,
          'disabled':false,
          'number':1,
          'last_step': 'last_step'
        },

      ],
      StepperData: [
        {
          'title': 'HEADSS assessment',
          'componet': 'headAssessment',
          'value': '1'
        },

      ],

    }
  },
  setup () {
    return {chevronBackOutline, checkmark}
  },

  methods: {
    markWizard(){},
    saveData(){

      this.$router.push('counselling');

    },
  }
})

</script>


<style scoped>

</style>