<template>
    <div class="demographics">
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Home Location
                </div>
                <div class="input_fields">
                    <BasicInputField
                        :icon="iconsContent.search"
                        inputHeader="Home district"
                    />
                    <BasicInputField
                        inputHeader="Home village"
                        :icon="iconsContent.search"
                    />
                    <BasicInputField
                        :icon="iconsContent.search"
                        inputHeader="Home traditional authority"
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



