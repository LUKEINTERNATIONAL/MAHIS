<template>
  <div class="container">
    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form 
              :contentData="iron"
               @update:selected="handleInputData" 
               @update:inputValue="handleInputData"></basic-form>
              <basic-form :contentData="folicAcid" @update:selected="handleInputData" @update:inputValue="handleInputData"></basic-form>
              <!-- <basic-form :contentData="folicAcid"></basic-form> -->
              <!-- <basic-form :contentData="folicAcidReason"></basic-form> -->
              <basic-form :contentData="vitaminA"   @update:selected="handleVitamin" 
               @update:inputValue="handleVitamin"></basic-form>
              <!-- <basic-form :contentData="calcium"></basic-form> -->
            </ion-card-content>
    </ion-card>

  </div>
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
import { mapState } from 'pinia';
import BasicForm from '../../../../components/BasicForm.vue';
import { checkmark, pulseOutline } from 'ionicons/icons';
import { icons } from '../../../../utils/svg'; 
import { useMedicationDispensedStore, vitaminValidationSchema } from '../../store/medicationDispensed';
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
import { validateField } from '@/services/ANC/treatement_validation_service';
import StandardValidations from '@/validations/StandardValidations';
import { YupValidateField } from '@/services/validation_service';



export default defineComponent ({
    name: "medicationDispensed",
    components: {
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
            IonRadioGroup,
    },
    data() {
        return {
          currentSection: 0, // Initialize currentSection to 0
        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
        ...mapState(useMedicationDispensedStore, ["iron"]),
        ...mapState(useMedicationDispensedStore, ["folicAcid"]),
       // ...mapState(useMedicationDispensedStore, ["folicAcidReason"]),
        ...mapState(useMedicationDispensedStore, ["vitaminA"]),
       // ...mapState(useMedicationDispensedStore, ["calcium"]),
       "iron Amount"(){return getFieldValue(this.iron,'iron Amount','value')},
       "Amount of Folic acid"(){return getFieldValue(this.folicAcid,'Amount of Folic acid','value')},


    },
    mounted(){
      // this.handleIron()
      this.handleTypeIron()
      this.handleAcid()
      this.handleFolicIron()
      // this.handleCalcium()
      this.handleVitaminA()
      this.handleVitaminNo()
      this.handleVitaminOther()
      // this.handleNoCalcium()
      // this.handleOtherCalcium()
      this.handleNoFolic()
      this.handleNoIron()
      this.handleNoIronOther()
      this.handleIronDailyWeekly()
      this.handleVitaminDailyWeekly()
      this.validaterowData({})

      
    },
    watch:{
      iron:{
        handler(){
          // this.handleIron()
          this.handleTypeIron()
          this.handleNoIron()
          this.handleNoIronOther()
          this.handleIronDailyWeekly()
        },
        deep:true
      },
      folicAcid:{
        handler(){
          this.handleAcid()
          this.handleNoFolic()
          this.handleFolicIron()
        },
        deep:true
      },
      folicAcidReason:{
        handler(){
          this.handleFolicIron()
        },
        deep:true
      },
      // calcium:{
      //   handler(){
      //     this.handleCalcium()
      //     this.handleNoCalcium()
      //     this.handleOtherCalcium()
      //   },
      //   deep:true
      // },
      vitaminA:{
        handler(){
           this.handleVitaminA()
           this.handleVitaminNo()
           this.handleVitaminOther()
           this.handleVitaminDailyWeekly()
        },
        deep:true
      }
    },
    methods :{
      handleVitamin(event:any){
        YupValidateField(
          this.vitaminA,
          vitaminValidationSchema,
          event.name,
          event.value

        )
      },
      handleInputData(data: any){
            this.validationRules(data)
      },
      // Validations
      validaterowData(event: any) {
           this.validationRules(event)
      },

      validationRules(event: any) {
         return validateField(this.folicAcid,event.name, (this as any)[event.name]) || validateField(this.iron,event.name, (this as any)[event.name]);  
         // return fields.every((fieldName:string)=>validateField(data,fieldName,(this as any)[fieldName]))     
     },
    // handleIron(){
    //   if(getRadioSelectedValue(this.iron,'Iron prescription')=='Yes'){
    //     modifyFieldValue(this.iron,'iron Amount','displayNone',false)
    //   }else{
    //     modifyFieldValue(this.iron,'iron Amount','displayNone',true)
    //   }
    // },
    handleTypeIron(){
      if(getRadioSelectedValue(this.iron,'Iron prescription')=='yes'){
        modifyRadioValue(this.iron,'Type of Iron supplement dosage','displayNone',false)
      }else{
        modifyRadioValue(this.iron,'Type of Iron supplement dosage','displayNone',true)
      }
    },
        handleIronDailyWeekly() {
              const ironDosageType = getRadioSelectedValue(this.iron, 'Type of Iron supplement dosage');

              if (ironDosageType === 'daily' && getRadioSelectedValue(this.iron,'Iron prescription')=='yes' || ironDosageType === 'weekly' && getRadioSelectedValue(this.iron,'Iron prescription')=='yes') {
                modifyFieldValue(this.iron, 'iron Amount', 'displayNone', false); 
              } else {
                modifyFieldValue(this.iron, 'iron Amount', 'displayNone', true); 
              }
        },
      handleVitaminDailyWeekly() {
              const vitaminDosageType = getRadioSelectedValue(this.vitaminA, 'Type of Vitamin A dosage');

              if (vitaminDosageType === 'daily' || vitaminDosageType === 'weekly') {
                modifyFieldValue(this.vitaminA, 'Vitamin Amount', 'displayNone', false); 
              } else {
                modifyFieldValue(this.vitaminA, 'Vitamin Amount', 'displayNone', true); 
              }
        },
      handleNoIron(){
      if(getRadioSelectedValue(this.iron,'Iron prescription')=='no'){
        modifyRadioValue(this.iron,'Iron and folic acid not prescribed','displayNone',false)
      }else{
         modifyRadioValue(this.iron,'Iron and folic acid not prescribed','displayNone',true)
      }
    },
    handleNoIronOther(){
      if(getRadioSelectedValue(this.iron,'Iron and folic acid not prescribed')=='other' && getRadioSelectedValue(this.iron,'Iron prescription')=='no'){
        modifyFieldValue(this.iron,'Other','displayNone',false)
      }else{
         modifyFieldValue(this.iron,'Other','displayNone',true)
      }
    },
  
    handleAcid(){
      if(getRadioSelectedValue(this.folicAcid,'Folic acid')=='yes'){
        modifyFieldValue(this.folicAcid,'Amount of Folic acid','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcid,'Amount of Folic acid','displayNone',true)
      }
    },
    handleNoFolic(){
      if(getRadioSelectedValue(this.folicAcid,'Folic acid')=='no'){
        modifyRadioValue(this.folicAcid,'Iron and folic acid not prescribed','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcid,'Iron and folic acid not prescribed','displayNone',true)
      }
    },
    handleFolicIron(){
      if(getRadioSelectedValue(this.folicAcid,'Iron and folic acid not prescribed')=='other'){
        modifyFieldValue(this.folicAcid,'Other','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcid,'Other','displayNone',true)
      }
    },
    // handleCalcium(){
    //   if(getRadioSelectedValue(this.calcium,'Daily calcium prescription')=='yes'){
    //     modifyFieldValue(this.calcium,'calcium supplements','displayNone',false)
    //   }else{
    //     modifyFieldValue(this.calcium,'calcium supplements','displayNone',true)
    //   }
    // },
    // handleNoCalcium(){
    //   if(getRadioSelectedValue(this.calcium,'Daily calcium prescription')=='no'){
    //     modifyRadioValue(this.calcium,'calcium supplements not prescribed','displayNone',false)
    //   }else{
    //     modifyRadioValue(this.calcium,'calcium supplements not prescribed','displayNone',true)
    //   }
    // },
    //   handleOtherCalcium(){
    //   if(getRadioSelectedValue(this.calcium,'calcium supplements not prescribed')=='other'){
    //     modifyFieldValue(this.calcium,'Other','displayNone',false)
    //   }else{
    //     modifyFieldValue(this.calcium,'Other','displayNone',true)
    //   }
    // },
    handleVitaminA(){
      if(getRadioSelectedValue(this.vitaminA,'Vitamin A prescription')=='yes'){
        modifyRadioValue(this.vitaminA,'Type of Vitamin A dosage','displayNone',false)
      }else{
        modifyRadioValue(this.vitaminA,'Type of Vitamin A dosage','displayNone',true)
      }
      
    },
    handleVitaminNo(){
      if(getRadioSelectedValue(this.vitaminA,'Vitamin A prescription')=='no'){
        modifyRadioValue(this.vitaminA,'vitamin A not prescribed','displayNone',false)
      }else{
        modifyRadioValue(this.vitaminA,'vitamin A not prescribed','displayNone',true)
      }
    },
    handleVitaminOther(){
      if(getRadioSelectedValue(this.vitaminA,'vitamin A not prescribed')=='other'){
        modifyFieldValue(this.vitaminA,'Other','displayNone',false)
      }else{
        modifyFieldValue(this.vitaminA,'Other','displayNone',true)
      }
    }

    }

})



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
  margin-bottom: 20px;
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