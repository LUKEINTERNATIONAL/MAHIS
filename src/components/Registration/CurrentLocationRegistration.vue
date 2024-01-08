<template>
    <div class="demographics">
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Curent Location
                </div>
                <div class="input_fields">
                    <BasicInputField
                        :icon="iconsContent.search"
                        inputHeader="Current district"
                    />
                    <BasicInputField
                        inputHeader="Current village"
                        :icon="iconsContent.search"
                    />
                    <BasicInputField
                        :icon="iconsContent.search"
                        inputHeader="Current traditional authority"
                    />
                    <BasicInputField
                        inputHeader="Closest landmark/Plotnumber"
                        :icon="iconsContent.search"
                    />
                </div>
            </div>
        </ion-card>
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
import { icons } from '@/utils/svg';

import DispositionModal from '@/components/ProfileModal/DispositionModal.vue'
import { createModal } from '@/utils/Alerts'
import BasicInputField from '../BasicInputField.vue';

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
  BasicInputField    },
  data() {
return {
  iconsContent: icons,
};
},
methods:{
    openModal(){
        createModal(DispositionModal)
    }
}
});
</script>

<style scoped>

</style>



