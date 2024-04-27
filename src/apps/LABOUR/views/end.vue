<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepper-title="End labour and delivery" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
import Stepper from "@/apps/LABOUR/components/Stepper.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import end from "@/apps/LABOUR/components/repeatable things/end.vue";



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
    Stepper,
    end
  },
  data(){
    return {
      iconsContent: icons,
      isOpen: false,
      wizardData: [
        {
          'title': 'End labour',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': 'last_step'
        },

      ],
      StepperData: [
        {
          title: 'Labour and delivery end',
          component: 'end',
          value: '1'
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

      this.$router.push("labourHome");


    },
  }
})

</script>


<style scoped>

</style>