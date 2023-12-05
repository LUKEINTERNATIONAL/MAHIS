<template>
    <div class="" style="cursor: pointer;padding-bottom:5px" @click="openModal()">
        <div class="text_header_16">
            Investigations
        </div>
        <div class="laboratory">
            <div>RBG (laboratory)</div>
            <div><ion-button color="medium" > Open</ion-button></div>
        </div>
        <div class="laboratory">
            <div>RBG (manual)</div>
            <div>Result displays here</div>
        </div>
    </div>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
      modalController 
  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg.ts';

import InvestigationsModal from '@/components/ProfileModal/InvestigationsModal.vue'
import { createModal } from '@/utils/Alerts'

export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar    },
  data() {
return {
  iconsContent: icons,
};
},
methods:{
    openModal(){
        createModal(InvestigationsModal)
    }
}
});
</script>

<style scoped>


</style>
