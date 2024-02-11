<template>
    <ion-list>
        <div  v-show="showFirstContainer">
        <div class="radioContainer">
            <ion-row>
                <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom:30px;">Select whether:</ion-label>
                        <ion-radio style="margin-bottom: 10px; width:100%;">Ultrasound scan required</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width:100%;">Ultrasound scan ordered</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width:100%;">Ultrasound scan conducted</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width:100%;">Ultrasound scan not done</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>

                    <ion-col style="margin-left: 10px"> <BasicForm :content-data = "ultrasoundDate"></BasicForm> </ion-col> 
                    </ion-row> 
                    <ion-row>
                        <ion-col>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px">Reason ultrasound scan not done</ion-label>
                        <ion-radio class = "ultrasound" style="margin-bottom: 10px; width: 48.2%;">Machine not functioning</ion-radio>
                        <ion-radio class = "ultrasound" style="margin-bottom: 10px; width: 48.2%;">Technician not available</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    
    </ion-row>
    <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Other reason ultrasound scan not done (specify)</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px; margin-bottom: 15px">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea v-model="otherReason"  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea>
            </ion-item>
        </div>
    </div>
    <div class="nextButton">
        <ion-label class="tpStndCls" style="color: green">Click next to continue ultrasound</ion-label>
        <ion-button @click="showSecondContainer = true; showFirstContainer = false">
        Next
      </ion-button>
    </div>
</div>
    
    <div v-show="showSecondContainer">
    <div class="radioContainer">
        <ion-row>
            <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 30px">Amniotic fluid level detected during ultrasound</ion-label>
                        <ion-radio style="margin-bottom: 10px;">Normal amniotic fluid level</ion-radio>
                        <ion-radio style="margin-bottom: 10px;">Reduced amniotic fluid level</ion-radio>
                        <ion-radio style="margin-bottom: 10px;">Increased amniotic fluid level</ion-radio>
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                    </ion-row>

                      </div>
                  
     <ion-row>
        <ion-col>
                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom:30px">Location of the placenta detected during the ultrasound</ion-label>
                        <ion-radio style=" margin-bottom: 10px;">Praevia</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Low</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Anterior</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Posterior</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Right side</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Left side</ion-radio>
                        <ion-radio style="margin-bottom: 10px">Fundal</ion-radio>
                      </div>
                      </IonRadioGroup>
                      </div>
                    </ion-col>
                    </ion-row>
                    <div class="nextButton">
                        <ion-label class="tpStndCls" style="color: green">Click back to go to previous ultrasound page</ion-label>
                        <ion-button @click="showSecondContainer = false; showFirstContainer = true">
        Back
      </ion-button>
                    </div>
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
import {useLabTestsStore} from '../../store/LabTestsStore';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 

export default defineComponent({
    name:"Ultrasound",
    components:{   
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
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
          labTestsInstance: {} as any,
          showFirstContainer: true,
          showSecondContainer: false,
         
        }
    },
    computed:{
        ...mapState(useLabTestsStore, ["ultrasoundDate"]),
        ...mapState(useLabTestsStore, ["otherReason"])
    },
    mounted(){
        const labTests = useLabTestsStore()
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    methods:{
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
    width: 49%
}

ion-checkbox {
  width: 100%;
}
.radioContainer{
  border-bottom: 2px dotted var(--ion-color-medium);
  
}
.ultrasound {
    width: 49%;
}
.nextButton {
    display: flex;
    flex-direction: column;
}
ion-button {
    width: 10%;
}



</style>