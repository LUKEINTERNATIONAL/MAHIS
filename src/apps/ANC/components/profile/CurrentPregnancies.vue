<template>
<div class="container">
  <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="lmnp" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
              <basic-form :contentData="ultrasound" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
              <basic-form :contentData="palpation" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>

            </ion-card-content>
    </ion-card>
    <ion-card  class="section">
            <ion-card-header> <ion-card-title class=" sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="tetanus"></basic-form>
            </ion-card-content>
    </ion-card>
</div>
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
import {useCurrentPregnanciesStore} from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import {
  getCheckboxSelectedValue,
  getFieldValue,
  getRadioSelectedValue,
  modifyFieldValue, modifyRadioValue
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {validateField} from "@/services/ANC/validation_service";
import StandardValidations from "@/validations/StandardValidations";
import HisDate from "@/utils/Date";


export default defineComponent({
    name: "Current",
    components:{
      BasicCard,
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
          inputField: '' as any,
          setName: '' as any,
          currentSection: 0,
         
      };
    },
    computed:{
        ...mapState(useCurrentPregnanciesStore,["palpation"]),
       // ...mapState(useCurrentPregnanciesStore,["deliveryDate"]),
        ...mapState(useCurrentPregnanciesStore,["lmnp"]),
       // ...mapState(useCurrentPregnanciesStore,["gestation"]),
        ...mapState(useCurrentPregnanciesStore,["tetanus"]),
        ...mapState(useCurrentPregnanciesStore,["ultrasound"]),
          LMNP(){ return getRadioSelectedValue(this.lmnp, 'LMNP')},
          lmnpEED(){ return getFieldValue(this.lmnp, 'lmnpEED','value')},
          lmnpGestationAge(){ return getFieldValue(this.lmnp, 'lmnpGestationAge','value')},
          lmnpDate(){ return getFieldValue(this.lmnp, 'lmnpDate','value')}

  
      },
      mounted(){
        const palpation = useCurrentPregnanciesStore()
        this.handleLMNP()
        this.handleUltrasound()
        this.handleTetanus()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
       lmnp:{
         handler( event){
           this.handleInputData(event)
           this.handleLMNP()},
         deep:true

       },
        ultrasound:{
         handler(){
           this.handleUltrasound()
         },
          deep:true
        },
        tetanus:{
          handler(){
            this.handleTetanus()
          },
          deep:true
        },
      },
      methods:{
        validationRules(event: any) {
          return validateField(this.lmnp,event.name, (this as any)[event.name]);
        },
        async handleInputData(event: any) {
          this.validationRules(event)
          this.calculateGestationAgefromLNMP(event)
        },

        calculateGestationAgefromLNMP(event: any) {
          if (event.name == "lmnpDate") {
            const lmnpDateValue = Date.parse(getFieldValue(this.lmnp, 'lmnpDate', 'value'));
            if (!isNaN(lmnpDateValue)) {
              const currentDate = new Date().getTime(); // current date in milliseconds
              const lmnpGestationAge = Math.floor((currentDate - lmnpDateValue) / (1000 * 60 * 60 * 24 * 7)); // calculate gestation age in weeks
              modifyFieldValue(this.lmnp, 'lmnpGestationAge', 'value', lmnpGestationAge);
            } else {
              modifyFieldValue(this.lmnp, 'lmnpGestationAge', 'value', null);
            }
          }
        },



        handleLMNP(){
          if(getRadioSelectedValue(this.lmnp, 'Yes')=='yes'){
            modifyFieldValue(this.lmnp,'lmnpDate','displayNone', false)
            modifyFieldValue(this.lmnp,'lmnpGestationAge','displayNone', false)
          }   else {
            modifyFieldValue(this.lmnp,'lmnpDate','displayNone', true)
            modifyFieldValue(this.lmnp,'lmnpGestationAge','displayNone', true)
          }
        },

        handleUltrasound(){
          if(getRadioSelectedValue(this.ultrasound, 'Yes')=='yes'){
            modifyFieldValue(this.ultrasound,'ultrasound delivery date','displayNone', false)
            modifyFieldValue(this.ultrasound,'gestation age from ultrasound','displayNone', false)
            modifyFieldValue(this.ultrasound,'ultrasound lmnp date','displayNone', false)
          }
          else
          {
            modifyFieldValue(this.ultrasound,'ultrasound delivery date','displayNone', true)
            modifyFieldValue(this.ultrasound,'gestation age from ultrasound','displayNone', true)
            modifyFieldValue(this.ultrasound,'ultrasound lmnp date','displayNone', true)
          }
        },

        handleTetanus(){
          if(getRadioSelectedValue(this.tetanus, 'Tetanus doses')=='fully immunised'){
            modifyFieldValue(this.tetanus,'tt1Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt2Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt3Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt4Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt5Date','displayNone', false)
          }
          else
          {
            modifyFieldValue(this.tetanus,'tt1Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt2Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt3Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt4Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt5Date','displayNone', true)
          }

          if(getRadioSelectedValue(this.tetanus, 'Tetanus doses')=='under immunised'){
            modifyFieldValue(this.tetanus,'number of under immunised doses','displayNone', false)
          }   else {modifyFieldValue(this.tetanus,'number of under immunised doses','displayNone', true)}

          if(getRadioSelectedValue(this.tetanus, 'Reasons for no tetanus doses')=='other'){
            modifyFieldValue(this.tetanus,'Other','displayNone', false)
          }   else {modifyFieldValue(this.tetanus,'Other','displayNone', true)}

          if(getRadioSelectedValue(this.tetanus,'Tetanus doses') == 'no doses'){
            modifyRadioValue(this.tetanus,'Reasons for no tetanus doses','displayNone',false)
          }else{
            modifyRadioValue(this.tetanus,'Reasons for no tetanus doses','displayNone',true)
          }

        },

    eddCalculation(){
      //   const edd = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      // // Update the EDD value in the store
      // this.expectedDate = edd.toISOString().split('T')[0];

        // if (this.lnmpDate) {
        // const eddDate = new Date(this.lnmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
        // return eddDate.toDateString();
      }
    }
   
      },
      

      );
  
  </script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px; 
  margin-bottom: 6px;
}

ion-card {
 box-shadow:none;
  background-color:inherit;   
  width: 100%;
 color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; 
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}

</style>
  