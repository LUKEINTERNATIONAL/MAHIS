
import { calendar } from 'ionicons/icons';

<template>
      <ion-page>
        <ion-content :fullscreen="true">
            <div>
                Hello 
            </div>
            <ion-card>
                <div style="width:400px">

                    <BasicInputField inputHeader="Height" :icon="iconsContent.calendar" unit="cm" />
                </div>
            </ion-card>
        </ion-content>
    </ion-page>

</template>
<script>
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
  BasicInputField
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