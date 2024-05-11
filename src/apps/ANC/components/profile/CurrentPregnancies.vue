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
import {validateField} from "@/services/ANC/profile_validation_service"
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
          LNMPKnown(){ return getRadioSelectedValue(this.lmnp, 'LNMP Known?')},
          UltrasoundDone(){ return getRadioSelectedValue(this.ultrasound, 'Ultrasound done?')},
          UltrasoundDate(){ return getFieldValue(this.ultrasound, 'Ultrasound','value')},
         UltrasoundGestationAge(){ return getFieldValue(this.ultrasound, 'specify','value')},
      GestationAgeByPalpationKnown(){ return getRadioSelectedValue(this.palpation, 'Gestation')},
      GestationAgeByPalpation(){ return getFieldValue(this.palpation, 'Gestation age by palpation','value')},
      GestationAgeUsed(){ return getRadioSelectedValue(this.palpation, 'Gestation age to be used')},
      TetanusDosesForImmunisation(){ return getRadioSelectedValue(this.tetanus, 'The woman received tetanus doses for immunization?')},
      NumberOfUnderImmunisedDoses(){ return getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')},
      tt1Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt2Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt3Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt4Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt5Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt6Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt7Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt8Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt9Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt10Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt11Date(){ return getFieldValue(this.tetanus, 'tt1Date','value')},
      tt12Date(){ return getFieldValue(this.tetanus, '12','value')},
      tt13Date(){ return getFieldValue(this.tetanus, '13','value')},
      tt14Date(){ return getFieldValue(this.tetanus, '14','value')},
      tt15Date(){ return getFieldValue(this.tetanus, '15','value')},
      ReasonTTVnotConducted(){ return getRadioSelectedValue(this.tetanus, 'Reason Tetanus toxoid (TT) was not conducted')},



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
        //this.handleLMNP()
        //this.handleUltrasound()
        this.handleTetanus()
        this.calculateEDD
        this.handlettv1()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
       lmnp:{
         handler( event){
           this.handleInputData(event)
           //this.handleLMNP()
           this.calculateEDD(event)
           this.lmnp
          },
         deep:true

       },
        ultrasound:{
         handler(){
         },
          deep:true
        },
        tetanus:{
          handler(){
            this.handleTetanus()
            this.handlettv1()
          },
          deep:true
        },
      },
      methods:{
        validationLNMPRules(event: any) {
          return validateField(this.lmnp,event.name, (this as any)[event.name]);
        },
        validationUltraSoundRules(event: any) {
          return validateField(this.ultrasound,event.name, (this as any)[event.name]);
        },
        validationPalpationRules(event: any) {
          return validateField(this.palpation,event.name, (this as any)[event.name]);
        },
        validationTetanusRules(event: any) {
          return validateField(this.tetanus,event.name, (this as any)[event.name]);
        },
        async handleInputData(event: any) {
          this.validationLNMPRules(event)
          this.validationTetanusRules(event)
          this.validationPalpationRules(event)
          this.validationUltraSoundRules(event)
          this.calculateGestationAgefromLNMP(event)
          this.calculateEDD(event)
          this.calculateEDDFromGestationAge(event)
          this.calculateLNMPdatefromAge(event)
          this.calculateEDDFromPalpation(event)
        },
        calculateGestationAgefromLNMP(event: any) {
              if (event.name == "lmnpDate") {
                  const lmnpDateValue = Date.parse(getFieldValue(this.lmnp, 'lmnpDate', 'value'));
                  if (!isNaN(lmnpDateValue)) {
                      const currentDate = new Date().getTime();
                      const gestationalAgeInDays = (currentDate - lmnpDateValue) / (1000 * 60 * 60 * 24);
                      const gestationalAgeInWeeks = Math.floor(gestationalAgeInDays / 7);
                      modifyFieldValue(this.lmnp, 'lmnpGestationAge', 'value', gestationalAgeInWeeks);
                  } else {
                      modifyFieldValue(this.lmnp, 'lmnpGestationAge', 'value', null);
                  }
              }
        },
        calculateEDD(event: any) {
                if (event.name === "lmnpDate") {
                    const lmnpDateValue = Date.parse(getFieldValue(this.lmnp, 'lmnpDate', 'value'));
                    if (!isNaN(lmnpDateValue)) {
                        const eddDateValue = new Date(lmnpDateValue + 40 * 7 * 24 * 60 * 60 * 1000); 
                        modifyFieldValue(this.lmnp, 'Estimated date of delivery', 'value', eddDateValue);
                    } else {
                        modifyFieldValue(this.lmnp, 'Estimated date of delivery', 'value', null);
                    }
                }
       
          },
          calculateEDDFromGestationAge(event: any) {
              if (event.name === "specify") {
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.ultrasound, 'specify', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const conceptionDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      const edd = new Date(conceptionDate.getTime() + (280 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.ultrasound, 'Estimated date of delivery', 'value', edd);
                  } else {
                      modifyFieldValue(this.ultrasound, 'Estimated date of delivery', 'value', null);
                  }
              }
          },

          calculateLNMPdatefromAge(event: any) {
              if (event.name === "specify") {
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.ultrasound, 'specify', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const lnmpDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.ultrasound, 'ultrasound lmnp date', 'value', lnmpDate);
                  } else {
                      modifyFieldValue(this.ultrasound, 'ultrasound lmnp date', 'value', null);
                  }
              }
          },
          calculateEDDFromPalpation(event: any) {
              if (event.name === "Gestation age to be used") {
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.ultrasound, 'Gestation age to be used', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const conceptionDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      const edd = new Date(conceptionDate.getTime() + (280 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.ultrasound, 'date of delivery', 'value', edd);
                  } else {
                      modifyFieldValue(this.ultrasound, 'date of delivery', 'value', null);
                  }
              }
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
            modifyRadioValue(this.tetanus,'Number of tetanus doses','displayNone', false)
          }   else {
            modifyRadioValue(this.tetanus,'Number of tetanus doses','displayNone', true)
          }

          if(getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')=='one dose'){
            modifyFieldValue(this.tetanus,'tt6Date','displayNone', false)
          }   else {
            modifyFieldValue(this.tetanus,'tt6Date','displayNone', true)
          }
          if(getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')=='two doses'){
            modifyFieldValue(this.tetanus,'tt7Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt8Date','displayNone', false)
          }   else {
            modifyFieldValue(this.tetanus,'tt7Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt8Date','displayNone', true)
          }
          if(getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')=='three doses'){
            modifyFieldValue(this.tetanus,'tt9Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt10Date','displayNone', false)
            modifyFieldValue(this.tetanus,'tt11Date','displayNone', false)
          }   else {
            modifyFieldValue(this.tetanus,'tt9Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt10Date','displayNone', true)
            modifyFieldValue(this.tetanus,'tt11Date','displayNone', true)
          }
          if(getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')=='four doses'){
            modifyFieldValue(this.tetanus,'12','displayNone', false)
            modifyFieldValue(this.tetanus,'13','displayNone', false)
            modifyFieldValue(this.tetanus,'14','displayNone', false)
            modifyFieldValue(this.tetanus,'15','displayNone', false)
          }   else {
            modifyFieldValue(this.tetanus,'12','displayNone', true)
            modifyFieldValue(this.tetanus,'13','displayNone', true)
            modifyFieldValue(this.tetanus,'14','displayNone', true)
            modifyFieldValue(this.tetanus,'15','displayNone', true)
          }
          

          if(getRadioSelectedValue(this.tetanus,'The woman received tetanus doses for immunization?') == 'no doses'){
            modifyRadioValue(this.tetanus,'Reason Tetanus toxoid (TT) was not conducted','displayNone',false)
            if(getRadioSelectedValue(this.tetanus, 'Reason Tetanus toxoid (TT) was not conducted')=='other'){
              modifyFieldValue(this.tetanus,'Other','displayNone', false)
            }   else {modifyFieldValue(this.tetanus,'Other','displayNone', true)}
          }else{
            modifyRadioValue(this.tetanus,'Reason Tetanus toxoid (TT) was not conducted','displayNone',true)
          }

        },
       handlettv1(){
          // if(getRadioSelectedValue(this.tetanus, 'Number of tetanus doses')=='1'){
          //   modifyFieldValue(this.tetanus,'tt1Date','displayNone', false)
          // }   else {
          //   modifyFieldValue(this.tetanus,'tt1Date','displayNone', true)
          // }
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
  