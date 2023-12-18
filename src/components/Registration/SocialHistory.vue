<template>
    <div class="demographics">
        <div class="demographics_title">Social History</div>
        <ion-card>
            <div class="card_hearder">
                Marital status
            </div>
            <div class="input_fields">
                <div style="margin-top:20px">
                    <ion-radio-group value="custom-checked" class="radio_btns">
                        <ion-radio  value="single" label-placement="end">Single</ion-radio>
                        <ion-radio  value="married" label-placement="end">Married</ion-radio>
                        <ion-radio  value="window" label-placement="end">Widow</ion-radio> 
                        <ion-radio  value="divorced" label-placement="end">Divorced</ion-radio>
                    </ion-radio-group>
                </div>
            </div>
        </ion-card>
        <br/>
        <ion-card>
            <div class="card_hearder">
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
        </ion-card>
        <br/>
        <ion-card>
            <div class="card_hearder">
                Occupation status
            </div>
            <div class="input_fields" style="width: 70%; margin:0 auto;">
                <div style="margin-top:20px;">
                    <ion-radio-group value="custom-checked" class="radio_btns">
                        <ion-radio value="custom" label-placement="end">Employed</ion-radio>
                        <ion-radio value="custom-checked" label-placement="end">Unemployed</ion-radio>
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
.marital_status{
    display: flex;
    justify-content: space-between;
}
ion-radio {
   margin-right: 35px;
}

</style>



