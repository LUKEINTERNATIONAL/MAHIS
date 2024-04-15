<template>
<div class="container">
  <ion-card  class="section">
            <ion-card-content>
              <basic-form :contentData="lmnp"
                          @update:selected="handleInputData"
                          @update:inputValue="handleInputData"
                          :initialData="initialData"
              ></basic-form>
              <basic-form :contentData="ultrasound"
                          @update:selected="handleInputData"
                          @update:inputValue="handleInputData"
                          :initialData="initialData1"
              ></basic-form>
              <basic-form :contentData="palpation" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
              <basic-form :contentData="tetanus"
                          @update:selected="handleInputData"
                          @update:inputValue="handleInputData"
                          :initialData="initialData2"
              ></basic-form>

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
          initialData:[] as any,
          initialData1:[] as any,
          initialData2:[] as any,
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
          lmnpDate(){ return getFieldValue(this.lmnp, 'lmnpDate','value')},
          //edd(){return getFieldValue(this.lmnp,'edd',"value")}

  
      },
      mounted(){
        const palpation = useCurrentPregnanciesStore()
        const lnmp=useCurrentPregnanciesStore()
        const ultrasound=useCurrentPregnanciesStore()
        const tetanus=useCurrentPregnanciesStore()
        this.initialData = lnmp.getInitial();
        this.initialData1 = ultrasound.getInitial1();
        this.initialData2 = tetanus.getInitial2();
        this.handleLMNP()
        this.handleUltrasound()
        this.handleTetanus()
        this.calculateEDD
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
       lmnp:{
         handler( event){
           this.handleInputData(event)
           this.handleLMNP()
           this.calculateEDD(event)
          },
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
          this.calculateEDD(event)
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
        calculateEDD(event: any) {
            if (event.name === "lmnpDate") {
              const lmnpDateValue = Date.parse(getFieldValue(this.lmnp, 'lmnpDate', 'value'));
              if (!isNaN(lmnpDateValue)) {
                const currentDate = new Date().getTime();
                const gestationWeeks = Math.floor((currentDate - lmnpDateValue) / (1000 * 60 * 60 * 24 * 7)); 
                const estimatedDueDate = new Date(lmnpDateValue + gestationWeeks * 7 * 24 * 60 * 60 * 1000); 
                modifyFieldValue(this.lmnp, 'Estimated date of delivery', 'value', estimatedDueDate);
              } else {
                modifyFieldValue(this.lmnp, 'Estimated date of delivery', 'value', null);
              }
            }

          },

        handleLMNP(){
        },

        handleUltrasound(){
        },

        handleTetanus(){
          if(getRadioSelectedValue(this.tetanus, 'The woman received tetanus doses for immunization?')=='fully immunised'){
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

          if(getRadioSelectedValue(this.tetanus, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyFieldValue(this.tetanus,'immunised doses','displayNone', false)
          }   else {modifyFieldValue(this.tetanus,'immunised doses','displayNone', true)}


          if(getRadioSelectedValue(this.tetanus,'The woman received tetanus doses for immunization?') == 'no doses'){
            modifyRadioValue(this.tetanus,'Reason Tetanus toxoid (TT) was not conducted','displayNone',false)
            if(getRadioSelectedValue(this.tetanus, 'Reason Tetanus toxoid (TT) was not conducted')=='other'){
              modifyFieldValue(this.tetanus,'Other','displayNone', false)
            }   else {modifyFieldValue(this.tetanus,'Other','displayNone', true)}
          }else{
            modifyRadioValue(this.tetanus,'Reason Tetanus toxoid (TT) was not conducted','displayNone',true)
          }

        },
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
  