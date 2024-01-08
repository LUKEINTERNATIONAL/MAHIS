<template>
    <div class="demographics">
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Social History
                </div>
                <div class="sub_title">
                    Marital status
                </div>
                <div class="input_fields">
                    <div style="margin-top:20px; line-height: 3;" class="check_box">
                        <ion-radio-group value="custom-checked" class="">
                            <ion-radio  value="single" label-placement="end">Single</ion-radio>
                            <ion-radio  value="married" label-placement="end">Married</ion-radio>
                            <ion-radio  value="window" label-placement="end">Widow</ion-radio> 
                            <ion-radio  value="divorced" label-placement="end">Divorced</ion-radio>
                        </ion-radio-group>
                    </div>
                </div>
                <div class="sub_title">
                    Religion
                </div>
                <div class="input_fields">
                    <div style="margin-top:20px">
                        <BasicInputField
                            :icon="iconsContent.search"
                            placeholder="eg. Christian"
                        />
                    </div>
                </div>
                <div class="sub_title" style="padding: 20px;">
                    Occupation status
                </div>
                <div  style=" display: flex;">
                    <div style="margin-top:20px; width: 130px; line-height: 2;">
                        <ion-radio-group value="custom-checked" class="radio_btns">
                            <ion-radio value="custom" label-placement="end">Employed</ion-radio>
                            <ion-radio value="custom-checked" label-placement="end">Unemployed</ion-radio>
                        </ion-radio-group>
                    </div>
                    <div style="height: 50px; margin-top:10px; ">
                        <BasicInputField
                            :icon="iconsContent.search"
                            placeholder="Select Occupation"
                        />
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


.check_box{
    display: flex;
}

.marital_status{
    display: flex;
    justify-content: space-between;
}
ion-radio {
   margin-right: 35px;
}

</style>



