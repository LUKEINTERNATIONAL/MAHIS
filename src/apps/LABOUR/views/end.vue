<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar />
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
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Accordion from "@/apps/LABOUR/components/Accordion.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Toolbar from "@/apps/ANC/components/Toolbar.vue";



export default defineComponent ({
  name : 'end',
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
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      StepperData: [
        {
          'title': 'Labour and delivery end',
          'componet': 'end',
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