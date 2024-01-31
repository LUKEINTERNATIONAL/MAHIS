
<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <Stepper :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
      modalController 
  } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue'
import DemographicBar from '@/components/DemographicBar.vue';
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import PastObstreticHistory from '../components/Profile/PastObstreticHistory.vue';
import CurrentPregnancies from '../components/Profile/CurrentPregnancies.vue';
import Stepper from '@/components/Stepper.vue';
import { icons } from '@/utils/svg';
export default defineComponent({
name: 'Menu',
components:{
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
  PastObstreticHistory,
  CurrentPregnancies,
  Stepper
  // Trial,
  },
  data() {
return {
  iconsContent: icons,
  isOpen: false,
  wizardData: [
               {
                    'title': 'Past obstretic history',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Current pregnancies',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 2,
                    'last_step': 'last_step'
                },
              
              
              
              
              
              ],
  StepperData: [
               {
                    'title': 'Past obstretic history',
                    'componet': 'PastObstreticHistory',
                    'value': '1'
                },
                {
                    'title': 'Current pregnancies',
                    'componet': 'CurrentPregnancies',
                    'value': '2'
                },
  ],
        
};
},
methods:{
  markWizard(){},
  saveData(){}
}
});
</script>

<style scoped>
</style>