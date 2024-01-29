
<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <CurrentPregnancies/>
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
import MedicalHistory from '@/apps/ANC/profile/MedicalHistory.vue';
import PastObstreticHistory from '../profile/PastObstreticHistory.vue'
import CurrentPregnancies from '../profile/CurrentPregnancies.vue'
// import Trial from '@/apps/ANC/profile/Trial.vue';
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
  MedicalHistory,
  PastObstreticHistory,
  CurrentPregnancies
  // Trial,
  },
  data() {
return {
  iconsContent: icons,
  
};
},
methods:{
}
});
</script>

<style scoped>
</style>