<template>
    <div class="demographics">
        <div class="demographics_title">Enrollment</div>
        <ion-card>
            <div class="card_hearder">
                Substance use / Consumption            
            </div>
            <div class="input_fields" style="width: 70%; margin:0 auto;">
                <div style="margin-top:20px">
                    <ion-label >
                        <span class="sub_title"> Smoking</span>
                    </ion-label>
                    <ion-radio-group value="stopped" class="diplay_space_between">
                        <ion-radio  value="smoking" label-placement="end">Smoking</ion-radio>
                        <ion-radio  value="never" label-placement="end">Never</ion-radio>
                        <ion-radio  value="stopped" label-placement="end">Stopped</ion-radio> 
                    </ion-radio-group>
                </div>
                <div style="margin-top:20px">
                    <ion-label >
                        <span class="sub_title"> Drinking alcohol</span>
                    </ion-label>
                    <ion-radio-group value="stopped" class="diplay_space_between">
                        <ion-radio  value="drinking" label-placement="end">Drinking</ion-radio>
                        <ion-radio  value="never" label-placement="end">Never</ion-radio>
                        <ion-radio  value="stopped" label-placement="end">Stopped</ion-radio> 
                    </ion-radio-group>
                </div>
            </div>
        </ion-card>
        <br />
        <ion-card>
            <div class="card_hearder">
                Family history           
            </div>
            <div class="input_fields" style="width: 70%; margin:0 auto;">
                <div style="margin-top:20px">
                    <ion-label >
                        <span class="sub_title"> Diabetes</span>
                    </ion-label>
                    <ion-radio-group value="unknown" class="diplay_space_between">
                        <ion-radio  value="yes" label-placement="end">Yes</ion-radio>
                        <ion-radio  value="no" label-placement="end">No</ion-radio>
                        <ion-radio  value="unknown" label-placement="end">Unknown</ion-radio> 
                    </ion-radio-group>
                </div>
                <div style="margin-top:20px">
                    <ion-label >    
                        <span class="sub_title"> Hypertension</span>
                    </ion-label>
                    <ion-radio-group value="unknown" class="diplay_space_between">
                        <ion-radio  value="yes" label-placement="end">Yes</ion-radio>
                        <ion-radio  value="no" label-placement="end">No</ion-radio>
                        <ion-radio  value="unknown" label-placement="end">Unknown</ion-radio> 
                    </ion-radio-group>
                </div>
            </div>
        </ion-card>
        <br/>
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
.sub_title{
    line-height: 40px;
}
.marital_status{
    display: flex;
    justify-content: space-between;
}
.diplay_space_between{
    color: var(--text_color, #00190E);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
    
}
ion-radio {
   margin-right: 35px;
}

</style>



