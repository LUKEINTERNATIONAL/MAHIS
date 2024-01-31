<template>
    <ion-item>
        <div>
           
            <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">LNMP known</ion-label>
                        <ion-radio>Yes</ion-radio>
                        <ion-radio>No</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                        
                      <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">Ultrasound done</ion-label>
                        <ion-radio>Yes</ion-radio>
                        <ion-radio>No</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
            </div>
                      <BasicForm :content-data="currentPregnancies"></BasicForm>
                      <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">Source of gestation age</ion-label>
                        <ion-radio>LMNP</ion-radio>
                        <ion-radio>Ultrasound</ion-radio>
                        <ion-radio>Fundal height</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                     </div>
                     <BasicForm :content-data="deliveryDate"></BasicForm>
                     <div class="radioContainer">
                        <IonRadioGroup>
                          <div class="radio">
                          <ion-label style="font-weight: bold;">Tetanus dose</ion-label>
                        <ion-radio>Fully immunised</ion-radio>
                        <ion-radio>Under immunised</ion-radio>
                        <ion-radio>No doses</ion-radio>
                        <ion-radio>Unknown</ion-radio>
                        
                      </div>
                      </IonRadioGroup>
                     </div>
        </div>
    </ion-item>
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
.vitals_title{
    border-bottom: 1px solid #B3B3B3;
    margin-bottom: 50px ;
}
.input-with-icon {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: gray; /* Adjust the color as needed */
}
ion-col{
    padding-bottom:15px ;
}
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

ion-checkbox {
  width: 100%;
}
.radioContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


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
  