<template>
    <div class="demographics">
        <div class="demographics_title">Demographics</div>
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Personal information
                </div>
                <div class="input_fields">
                    <BasicInputField
                        :icon="iconsContent.nationalID"
                        inputHeader="National ID"
                        :iconRight="iconsContent.scannerIcon"
                        placeholder="__-__-__-__"
                    />
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        inputHeader="First name*"
                        placeholder="eg. Jeoffrey"
                    />
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        inputHeader="Last name*"
                        placeholder="eg. Banda"
                    />
                    <BasicInputField
                        :icon="iconsContent.calenderPrimary"
                        inputHeader="Middle name"
                        placeholder="eg. Baratheon"
                    />
                    <BasicInputField
                        :icon="iconsContent.calenderPrimary"
                        inputHeader="Phone number"
                        placeholder="+265 __-__-___"
                    />
                    <BasicInputField
                        :icon="iconsContent.calenderPrimary"
                        inputHeader="Date of birth/Estimated age*"
                        placeholder="Pick the date"
                    />
                    <div style="margin-top:20px">
                        <ion-label >
                            <span class="gender_title"> Gender*</span>
                        </ion-label>
                        <ion-radio-group value="custom-checked" class="gender">
                            <ion-radio value="custom" aria-label="Custom checkbox" label-placement="end">Male</ion-radio>
                            <ion-radio value="custom-checked" label-placement="end" aria-label="Custom checkbox that is checked">Female</ion-radio>
                        </ion-radio-group>
                    </div>
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
.demographics_title{
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 20px;
}
.gender{
    display: flex;
    justify-content: space-between;
    max-width: 170px;
    padding-top: 10px;
}
.gender_title{
    margin-top: 30px;
}

</style>



