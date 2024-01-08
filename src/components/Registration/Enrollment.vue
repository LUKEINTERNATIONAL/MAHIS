<template>
    <div class="demographics">
        <div class="demographics_title">Enrollment</div>
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Substance use / Consumption            
                </div>
                <div class="" style="">
                    <div style=" margin-bottom:30px;">
                        <ion-label >
                            <span class="sub_title"> Smoking</span>
                        </ion-label>
                        <ion-radio-group value="stopped" class="diplay_space_between">
                            <ion-radio  value="smoking" label-placement="end">Smoking</ion-radio>
                            <ion-radio  value="never" label-placement="end">Never</ion-radio>
                            <ion-radio  value="stopped" label-placement="end">Stopped</ion-radio> 
                        </ion-radio-group>
                    </div>
                    <div class="dashed_bottom_border"></div>
                    <div>
                        <ion-label class="sub_title" style="padding-top: 0px;">
                            <span > Drinking alcohol</span>
                        </ion-label>
                        <ion-radio-group value="stopped" class="diplay_space_between">
                            <ion-radio  value="drinking" label-placement="end">Drinking</ion-radio>
                            <ion-radio  value="never" label-placement="end">Never</ion-radio>
                            <ion-radio  value="stopped" label-placement="end">Stopped</ion-radio> 
                        </ion-radio-group>
                    </div>
                </div>
            </div>
        </ion-card>
        <br/>
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Diagnosis           
                </div>
                <ion-row class="diagnosis_content" style="margin-top: 20px;">
                    <ion-col size="4" class="diagnosis_col">
                        <ion-checkbox label-placement="end">Type 1 DM</ion-checkbox>
                    </ion-col>
                    <ion-col>
                        <BasicInputField
                            :icon="iconsContent.calenderPrimary"
                            placeholder="Pick the date"
                        />
                    </ion-col>
                </ion-row>
                <div class="dashed_bottom_border"></div>
                <ion-row>
                    <ion-col size="4" class="diagnosis_col">
                        <ion-checkbox label-placement="end">Type 2 DM</ion-checkbox>
                    </ion-col>
                    <ion-col>
                        <BasicInputField
                            :icon="iconsContent.calenderPrimary"
                            placeholder="Pick the date"
                        />
                    </ion-col>
                </ion-row>
                <div class="dashed_bottom_border"></div>
                <ion-row>
                    <ion-col size="4" class="diagnosis_col">
                        <ion-checkbox label-placement="end">Hypertetion</ion-checkbox>
                    </ion-col>
                    <ion-col>
                        <BasicInputField
                            :icon="iconsContent.calenderPrimary"
                            placeholder="Pick the date"
                        />
                    </ion-col>
                </ion-row>
            </div>
        </ion-card>
        <br />
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Patient history & Complications          
                </div>
                <div>
                    <div style="text-align: left;">HIV</div>
                    <ion-row>
                        <ion-col>
                            <ion-checkbox label-placement="end" > 
                                <span class="checkbox_header">P</span>
                            </ion-checkbox>
                        </ion-col>
                        <ion-col>
                            <ion-checkbox label-placement="end" > 
                                <span class="checkbox_header">NR</span>
                            </ion-checkbox>
                        </ion-col>
                    </ion-row>
                    <div style="text-align: left;">
                        <BasicInputField
                            :icon="iconsContent.calenderPrimary"
                            placeholder="Pick the date"
                            inputHeader="ART Start date:"
                        />
                    </div>
                    <div style="margin-top: 20px; text-align: left;">
                        TB
                    </div>
                    <div class="tb_content">
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Smear pos</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Smear neg</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">EPTB</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Never had TB</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Cardiovascular desease</span><br />
                            <span class="small_font">eg. heart attack, ischemic heart desease, CCF</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Retinopathy</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Renal disease</span>
                            <span>eg. elevated creatinine</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Stroke/TIA</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">PVD</span>
                            <span>eg. ulcers, gangrene</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Neuropathy</span>
                        </ion-checkbox> <br/>
                        <ion-checkbox label-placement="end" > 
                            <span class="checkbox_header">Sexual dysfunction</span>
                        </ion-checkbox> <br/>
                    </div>
                </div>
            </div>
        </ion-card>
        <br/>
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    Family history           
                </div>
                <div class="" style="">
                    <div style="margin-bottom:30px;">
                        <ion-label class="sub_title" >
                            <span> Diabetes</span>
                        </ion-label>
                        <ion-radio-group value="unknown" class="diplay_space_between">
                            <ion-radio  value="yes" label-placement="end">Yes</ion-radio>
                            <ion-radio  value="no" label-placement="end">No</ion-radio>
                            <ion-radio  value="unknown" label-placement="end">Unknown</ion-radio> 
                        </ion-radio-group>
                    </div>
                    <div class="dashed_bottom_border"></div>
                    <div>
                        <ion-label class="sub_title" style="padding-top: 0px;">    
                            <span > Hypertension</span>
                        </ion-label>
                        <ion-radio-group value="unknown" class="diplay_space_between">
                            <ion-radio  value="yes" label-placement="end">Yes</ion-radio>
                            <ion-radio  value="no" label-placement="end">No</ion-radio>
                            <ion-radio  value="unknown" label-placement="end">Unknown</ion-radio> 
                        </ion-radio-group>
                    </div>
                </div>
            </div>
        </ion-card>
        <br/>
        <ion-card class="registration_ion_card">
            <div class="card_content">
                <div class="card_hearder">
                    NCD number           
                </div>
                <div class="" style="margin-top: 20px;">
                    <BasicInputField
                        :icon="iconsContent.fullName"
                        placeholder="__-__-__-__"
                        :iconRight="iconsContent.editStarts"
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
      modalController,
      IonCheckbox
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
  BasicInputField,
  IonCheckbox    },
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

.sub_title{
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    padding-top: 20px ;
    line-height: 25px;
}

.sub_title{
    line-height: 40px;
}
.diagnosis_col{
    display: flex;
    justify-content: center;
    align-items: center;
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
.dashed_bottom_border{
    margin-top: 15px;
    margin-bottom: 15px;
}
.diagnosis_checkbox{
    display: flex;
    justify-content: space-between;
}
.diagnosis_input{
    width: 220px;
    margin-bottom: 20px;
}
.tb_content{
    text-align: left;
    line-height: 3;
}
</style>



