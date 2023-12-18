<template>
    <div class="demographics">
        <div class="demographics_title">Demographics</div>
        <ion-card>
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
                    inputHeader="Full name"
                    placeholder="eg. Jeoffrey Banda"
                />
                <BasicInputField
                    :icon="iconsContent.calenderPrimary"
                    inputHeader="Date of birth"
                    placeholder="Pick the date of birth"
                />
                <div style="margin-top:20px">
                    <ion-label >
                        <span class="gender_title"> Gender</span>
                    </ion-label>
                    <ion-radio-group value="custom-checked" class="gender">
                        <ion-radio value="custom" aria-label="Custom checkbox" label-placement="end">Male</ion-radio>
                        <ion-radio value="custom-checked" label-placement="end" aria-label="Custom checkbox that is checked">Female</ion-radio>
                    </ion-radio-group>
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
.demographics{
    display: block;
    width: 40vw;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px ;
}
.demographics_title{
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 20px;
}
.sub_title{
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    margin: 10px 0px 30px;
    padding-top: 20px ;
    line-height: 25px;
}
.card_hearder{
    font-weight: 600;
    color: #00190E;
    font-size: 16px;
    padding-top: 50px ;
}
.input_fields{
    padding: 10px 100px 70px 100px;
    text-align: left;
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



