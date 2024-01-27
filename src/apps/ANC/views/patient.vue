
import { calendar } from 'ionicons/icons';

<template>
      <ion-page>
        <ion-content :fullscreen="true">
            <ion-card>
               <!-- <div style="width:400px">

                    <BasicInputField inputHeader="Height" :icon="iconsContent.calendar" unit="cm" />
                </div> -->
                <div>
                    <MedicalHistory/>
                </div> 

                <!-- <div>
                    <Trial/>
                </div>  -->

            </ion-card>

        </ion-content>
    </ion-page>



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
import BasicInputField from '@/components/BasicInputField.vue'
import MedicalHistory from '@/apps/ANC/profile/MedicalHistory.vue';
import womanBehaviour from "@/apps/ANC/components/profile/WomanBehaviour.vue";
// import Trial from '@/apps/ANC/profile/Trial.vue';
import { icons } from '@/utils/svg';
export default defineComponent({
name: 'Menu',
components:{
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  BasicInputField,
  MedicalHistory,
  womanBehaviour
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