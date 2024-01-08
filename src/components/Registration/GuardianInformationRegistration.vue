<template>
    <div class="demographics" style="margin-bottom: 90px;">
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Guardian information
                </div>
                <div class="input_fields">
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        inputHeader="First name"
                    />
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        inputHeader="Last name"
                    />
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        inputHeader="Middle name"
                    />
                    <BasicInputField
                        :icon="iconsContent.phone"
                        inputHeader="Phone number"
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



