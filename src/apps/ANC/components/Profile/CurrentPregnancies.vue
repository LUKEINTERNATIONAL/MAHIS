<template>
    <ion-list>
        <div>
          
            
              <ion-row>
                <ion-col>
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px;">LNMP known</ion-label>
                        <ion-radio style="margin-bottom: 10px;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px;">No</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                        <ion-col>
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px;">Ultrasound done</ion-label>
                        <ion-radio style="margin-bottom: 10px;">Yes</ion-radio>
                        <ion-radio style="margin-bottom: 10px;">No</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                    </ion-col>
                      </ion-row>
       

                      <BasicForm :content-data="currentPregnancies"></BasicForm>
                     
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px;">Source of gestation age</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">LMNP</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">Ultrasound</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">Fundal height</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                     
                     <BasicForm :content-data="deliveryDate"></BasicForm>
                     
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold; margin-bottom: 15px;">Tetanus dose</ion-label>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">Fully immunised</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 49%;"> Under immunised</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">No doses</ion-radio>
                        <ion-radio style="margin-bottom: 10px; width: 49%;">Unknown</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                     
        </div>
    </ion-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
IonRadioGroup,
        } from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { icons } from '../../../../utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { checkmark, pulseOutline } from 'ionicons/icons';
import {useCurrentPregnanciesStore} from '../../store/CurrentPreganciesStore';
export default defineComponent({
    name: "Current",
    components:{
      IonContent,
      IonHeader,
      IonItem,
      IonList,
      IonMenu,
      IonTitle,
      IonToolbar,
      IonToggle,
      IonSelect,
      IonSelectOption,
      IonInput,
      BasicInputField,
      BasicForm,
      IonRadio,
      IonRadioGroup
  },
  
          data() {
      return {
          iconsContent: icons,
          currentPregnanciesInstance: {} as any,
         
      };
    },
    computed:{
        ...mapState(useCurrentPregnanciesStore,["currentPregnancies"]),
        ...mapState(useCurrentPregnanciesStore,["deliveryDate"]),
       
  
      },
      mounted(){
        const currentPregnancies = useCurrentPregnanciesStore()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      methods:{
  
        saveStateValuesState() {
              const obstreticHistoryStore = useCurrentPregnanciesStore()
             
              
          },
  
        addPreEclampsia(ev: any) {
              const checked = ev.detail.checked
              const obstreticHistoryStore = useCurrentPregnanciesStore()
            //   obstreticHistoryStore.setPreEclampsia(checked as boolean)
              this.saveStateValuesState()
          },
   
          },
      

      });
  
  </script>

<style scoped>


.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
h5{
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.radio {
        display: flex;
        flex-direction: column;
        /* border-bottom: 2px dotted var(--ion-color-medium); */
        --inner-border-width:0;
        padding: 10px;
  
    }




.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.checkboxesDisplay{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
  