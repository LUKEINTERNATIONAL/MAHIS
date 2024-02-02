<template>
<ion-list>
    <div class="radioContainer">
                <ion-row>       
                    <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Select whether</ion-label>
                        <ion-radio style="margin-bottom: 10px">Urine test conducted</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Urine test ordered</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Urine test not done</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                      <ion-col>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Select the urine test conducted:</ion-label>
                        <ion-radio style="margin-bottom: 10px">Midstream urine culture (recommended)</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Midstream urine Gram-staining</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Urine dipstick</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row> 

                    <ion-row>
                     <ion-col>
                        <ion-list>
                            <ion-label style="font-weight: 600; padding: 10px;"> Reason TB screening not done</ion-label>
                        <div>
            <ion-checkbox  @ionChange="" :checked="stockOut" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top:15px;">
                Test stockout
            </ion-checkbox>
               </div>

           <div>
            <ion-checkbox  @ionChange="" :checked="expiredTest" label-placement="start" style="font-size: 16px; font-weight: 400; line-height: 24px;">
                Expired tests
            </ion-checkbox>
            </div>
                        </ion-list>
                     </ion-col>

                     <ion-col>
     
        <BasicForm :content-data="testDate"></BasicForm>
                     </ion-col>

                    </ion-row>
                    <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Other reason Urine test was not done (specify)</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px; margin-bottom: 15px">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea v-model="otherReason"  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea>
            </ion-item>
        </div>
                      </div>
                    
                    
                       
                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Midstream urine culture result</ion-label>
                        <ion-radio style="margin-bottom: 10px">Positive-any agent</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Positive -Group B Streptococcus (GBS)</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Negative</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>
            
                    

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Midstream urine Gram-staining result </ion-label>
                        <ion-radio style="margin-bottom: 10px">Positive</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Negative</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Dipstick test results – nitrites result</ion-label>
                        <ion-radio style="margin-bottom: 10px">None</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++++</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Dipstick test results – leukocytes</ion-label>
                          <ion-radio style="margin-bottom: 10px">None</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++++</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Dipstick test results – protein</ion-label>
                          <ion-radio style="margin-bottom: 10px">Negative</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++++</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>

                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px">Dipstick test results – glucose</ion-label>
                          <ion-radio style="margin-bottom: 10px">Negative</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">+++</ion-radio>
                        <ion-radio style="margin-bottom: 10px">++++</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>
</ion-list>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonRow,
            IonToolbar, 
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            IonRadio,
            IonRadioGroup
        } from '@ionic/vue';
import {useUrineTestStore} from '@/apps/ANC/store/UrineTestStore'
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 

export default defineComponent({
    name:"UrineTest",
    components:{   
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonRow,
            IonMenu,
            menuController,
            IonToggle,
            IonSelectOption,
            IonInput,
            IonSelect,
            BasicForm,
            IonRadio,
            IonRadioGroup,},
    data(){
        return {
            iconsContent: icons,
          urineTestInstance: {} as any,
        }
    },
    computed:{
        ...mapState(useUrineTestStore, ["testDate"]),
        ...mapState(useUrineTestStore, ["otherReason"]),
        ...mapState(useUrineTestStore, ["stockOut"]),
        ...mapState(useUrineTestStore, ["expiredTest"])

    },
    mounted(){
        const urineTests = useUrineTestStore()
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
        saveStateValuesState() {
            const urineTestStore = useUrineTestStore()
            urineTestStore.setStockout(this.stockout)
            urineTestStore.setExpired(this.expiredTest)
            
        },

        addStockout(ev: any) {
            const checked = ev.detail.checked
            const urineTestStore = useUrineTestStore()
            urineTestStore.setStockout(checked as boolean)
            this.saveStateValuesState()
        },

        addExpiredTests(ev: any) {
            const checked = ev.detail.checked
            const urineTestStore = useUrineTestStore()
            urineTestStore.setExpiredTest(checked as boolean)
            this.saveStateValuesState()
        },
    }
})
</script>

<style scoped>
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.radio {
        display: flex;
        flex-direction: column;
        /* border-bottom: 2px dotted var(--ion-color-medium); */
        --inner-border-width:0;
        padding: 10px;
  
    }
ion-radio {
  width: 80%;
}
ion-checkbox {
  width: 40%;
  padding: 10px;
}
.radioContainer{
  border-bottom: 2px dotted var(--ion-color-medium);
  
}



</style>