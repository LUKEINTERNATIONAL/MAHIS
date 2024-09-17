<template>
<div class="container">
  <ion-card  class="section">
            <ion-card-content>
              <basic-form :contentData="lmnp" @update:selected="handleInputData" @update:inputValue="handleInputData"
                          :initialData="initialData"
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
        ...mapState(useCurrentPregnanciesStore,["lmnp"]),
        ...mapState(useCurrentPregnanciesStore,["tetanus"]),
        ...mapState(useCurrentPregnanciesStore,["tetanus"]),
        ...mapState(useCurrentPregnanciesStore,["ultrasound"]),
          lmnpGestationAge(){ return getFieldValue(this.lmnp, 'lmnpGestationAge','value')},
          lmnpDate(){ return getFieldValue(this.lmnp, 'lmnpDate','value')},
          UltrasoundDate(){ return getFieldValue(this.lmnp, 'Ultrasound','value')},
      specify(){ return getFieldValue(this.lmnp, 'specify','value')},
      "Gestation age by palpation"(){ return getFieldValue(this.lmnp, 'Gestation age by palpation','value')},
          tt1Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt2Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt3Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt4Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt5Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt6Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt7Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt8Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt9Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt10Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt11Date(){ return getFieldValue(this.lmnp, 'tt1Date','value')},
          tt12Date(){ return getFieldValue(this.lmnp, '12','value')},
          tt13Date(){ return getFieldValue(this.lmnp, '13','value')},
          tt14Date(){ return getFieldValue(this.lmnp, '14','value')},
          tt15Date(){ return getFieldValue(this.lmnp, '15','value')},

  
      },
      mounted(){
        const palpation = useCurrentPregnanciesStore()
        const lnmp=useCurrentPregnanciesStore()
        const ultrasound=useCurrentPregnanciesStore()
        const tetanus=useCurrentPregnanciesStore()
        this.initialData = lnmp.getInitial();
        this.initialData1 = ultrasound.getInitial1();
        this.initialData2 = tetanus.getInitial2();
        this.handleTetanus()
        this.calculateEDD
        this.validaterowData({})
       // this.handlettv1()

        this.handleUnderImmunised()
        this. handleOneDose()
        this.handleTwoDose()
        this.handleThreeDose()
        this.handleFourDose()
        this.handleNodoses()
        this.handleOtherDoses()

       // this.resetDoseFields()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
       lmnp:{
         handler( event){
           this.handleInputData(event)
           this.calculateEDD(event)
           this.lmnp
           this.handleTetanus()
          // this.handlettv1()

           this.handleUnderImmunised()
           this. handleOneDose()
           this.handleTwoDose()
           this.handleThreeDose()
           this.handleFourDose()
           this.handleNodoses()
           this.handleOtherDoses()

           //this.resetDoseFields()
          },
         deep:true

       },
        // ultrasound:{
        //  handler(event){
        //    this.handleInputData(event)
        //    this.ultrasound
        //
        //  },
        //   deep:true
        // },
        // lmnp:{
        //   handler(){
        //     this.handleTetanus()
        //     this.handlettv1()
        //   },
        //   deep:true
        // },
      },
      methods:{
        validationRules(event: any) {
          return validateField(this.lmnp,event.name, (this as any)[event.name]);
        },


        // Validations
        validaterowData(event: any) {
          this.validationRules(event)
        },

        async handleInputData(event: any) {
          this.validaterowData(event)
          this.calculateGestationAgefromLNMP(event)
          this.calculateEDD(event)
          this.calculateEDDFromGestationAge(event)
          this.calculateLNMPdatefromAge(event)
          this.calculateEDDFromPalpation(event)
          this.handleLMNPDateRange(event)
          this.handleUltraSoundDateRange(event)
        },

        handleLMNPDateRange(event: any) {
          // Get the current date
          const currentDate = new Date();
          // Calculate the date 36 weeks before the current date
          const minDate = new Date(currentDate);
          minDate.setDate(currentDate.getDate() - (36 * 7));
          // Format the minDate and maxDate to a string in the desired format (e.g., YYYY-MM-DD)
          const formattedMinDate = minDate.toISOString().split('T')[0];
          const formattedMaxDate = currentDate.toISOString().split('T')[0];
          // Set the minDate and maxDate
          modifyFieldValue(this.lmnp, 'lmnpDate', 'minDate', formattedMinDate);
          modifyFieldValue(this.lmnp, 'lmnpDate', 'maxDate', formattedMaxDate);
        },
        handleUltraSoundDateRange(event: any) {
          // Get the current date
          const currentDate = new Date();
          // Calculate the date 36 weeks before the current date
          const minDate = new Date(currentDate);
          minDate.setDate(currentDate.getDate() - (36 * 7));
          // Format the minDate and maxDate to a string in the desired format (e.g., YYYY-MM-DD)
          const formattedMinDate = minDate.toISOString().split('T')[0];
          const formattedMaxDate = currentDate.toISOString().split('T')[0];
          // Set the minDate and maxDate
          modifyFieldValue(this.lmnp, 'Ultrasound', 'minDate', formattedMinDate);
          modifyFieldValue(this.lmnp, 'Ultrasound', 'maxDate', formattedMaxDate);
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
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.lmnp, 'specify', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const conceptionDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      const edd = new Date(conceptionDate.getTime() + (280 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.lmnp, 'Estimated date of delivery from ultrasound', 'value', edd);
                  } else {
                      modifyFieldValue(this.lmnp, 'Estimated date of delivery from ultrasound', 'value', null);
                  }
              }
          },

          calculateLNMPdatefromAge(event: any) {
              if (event.name === "specify") {
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.lmnp, 'specify', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const lnmpDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.lmnp, 'ultrasound lmnp date', 'value', lnmpDate);
                  } else {
                      modifyFieldValue(this.lmnp, 'ultrasound lmnp date', 'value', null);
                  }
              }
          },
          calculateEDDFromPalpation(event: any) {
              if (event.name === "Gestation age by palpation") {
                  const gestationalAgeInWeeks = parseInt(getFieldValue(this.lmnp, 'Gestation age by palpation', 'value'));
                  if (!isNaN(gestationalAgeInWeeks)) {
                      const currentDate = new Date();
                      const conceptionDate = new Date(currentDate.getTime() - (gestationalAgeInWeeks * 7 * 24 * 60 * 60 * 1000));
                      const edd = new Date(conceptionDate.getTime() + (280 * 24 * 60 * 60 * 1000));
                      modifyFieldValue(this.lmnp, 'date of delivery', 'value', edd);
                  } else {
                      modifyFieldValue(this.lmnp, 'date of delivery', 'value', null);
                  }
              }
          },
          // handleReset(){
          //   modifyFieldValue(this.lmnp, 'tt6Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt6Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt7Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt8Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt9Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt10Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, 'tt11Date', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, '12', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, '13', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, '14', 'displayNone', true);
          //   modifyFieldValue(this.lmnp, '15', 'displayNone', true);
          // },
        handleTetanus(){
          //this.handleReset()
          if(getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='fully immunised'){
            modifyFieldValue(this.lmnp,'tt1Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt2Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt3Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt4Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt5Date','displayNone', false)
          }
          else
          {
            modifyFieldValue(this.lmnp,'tt1Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt2Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt3Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt4Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt5Date','displayNone', true)
          }
        },
        handleUnderImmunised(){
          //this.handleReset()
          if(getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyRadioValue(this.lmnp,'Number of tetanus doses','displayNone', false)
          }   else {
            modifyRadioValue(this.lmnp,'Number of tetanus doses','displayNone', true)
          }
        },
        handleOneDose(){
          if(getRadioSelectedValue(this.lmnp, 'Number of tetanus doses')=='one dose' && getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyFieldValue(this.lmnp,'tt6Date','displayNone', false)
          }   else {
            modifyFieldValue(this.lmnp,'tt6Date','displayNone', true)
          }
        },
        handleTwoDose(){
          if(getRadioSelectedValue(this.lmnp, 'Number of tetanus doses')=='two doses' && getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyFieldValue(this.lmnp,'tt7Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt8Date','displayNone', false)
          }   else {
            modifyFieldValue(this.lmnp,'tt7Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt8Date','displayNone', true)
          }
        },
         handleThreeDose(){
          if(getRadioSelectedValue(this.lmnp, 'Number of tetanus doses')=='three doses' && getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyFieldValue(this.lmnp,'tt9Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt10Date','displayNone', false)
            modifyFieldValue(this.lmnp,'tt11Date','displayNone', false)
          }   else {
            modifyFieldValue(this.lmnp,'tt9Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt10Date','displayNone', true)
            modifyFieldValue(this.lmnp,'tt11Date','displayNone', true)
          }
         },
         handleFourDose(){
          if(getRadioSelectedValue(this.lmnp, 'Number of tetanus doses')=='four doses' && getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
            modifyFieldValue(this.lmnp,'12','displayNone', false)
            modifyFieldValue(this.lmnp,'13','displayNone', false)
            modifyFieldValue(this.lmnp,'14','displayNone', false)
            modifyFieldValue(this.lmnp,'15','displayNone', false)
          }   else {
            modifyFieldValue(this.lmnp,'12','displayNone', true)
            modifyFieldValue(this.lmnp,'13','displayNone', true)
            modifyFieldValue(this.lmnp,'14','displayNone', true)
            modifyFieldValue(this.lmnp,'15','displayNone', true)
          }
         },
         handleNodoses(){
          //this.handleReset()
          if(getRadioSelectedValue(this.lmnp,'The woman received tetanus doses for immunization?') == 'no doses'){
            modifyRadioValue(this.lmnp,'Reason Tetanus toxoid (TT) was not conducted','displayNone',false)

          }else{
            modifyRadioValue(this.lmnp,'Reason Tetanus toxoid (TT) was not conducted','displayNone',true)
          }
         },
         handleOtherDoses(){            
           if(getRadioSelectedValue(this.lmnp, 'Reason Tetanus toxoid (TT) was not conducted')=='other' && getRadioSelectedValue(this.lmnp, 'The woman received tetanus doses for immunization?')=='under immunised'){
              modifyFieldValue(this.lmnp,'Other','displayNone', false)
            }   else {
              modifyFieldValue(this.lmnp,'Other','displayNone', true)
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
  