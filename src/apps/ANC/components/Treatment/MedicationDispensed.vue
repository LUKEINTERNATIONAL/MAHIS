<template>
  <div class="container">
    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="iron"></basic-form>
              <basic-form :contentData="folicAcid"></basic-form>
              <basic-form :contentData="folicAcidReason"></basic-form>
              <basic-form :contentData="vitaminA"></basic-form>
              <basic-form :contentData="calcium"></basic-form>
              <basic-form :contentData="calciumReason"></basic-form>
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
import { useMedicationDispensedStore } from '../../store/medicationDispensed';
import { getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';



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
        ...mapState(useMedicationDispensedStore, ["folicAcidReason"]),
        ...mapState(useMedicationDispensedStore, ["vitaminA"]),
        ...mapState(useMedicationDispensedStore, ["calcium"]),

    },
    mounted(){
      this.handleIron()
      this.handleTypeIron()
      this.handleAcid()
      this.handleFolicIron()
      this.handleCalcium()
      this.handleVitaminA()
      this.handleVitaminNo()
      this.handleVitaminOther()
      this.handleNoCalcium()
      this.handleOtherCalcium()
      
    },
    watch:{
      iron:{
        handler(){
          this.handleIron()
          this.handleTypeIron()
        },
        deep:true
      },
      folicAcid:{
        handler(){
          this.handleAcid()
        },
        deep:true
      },
      folicAcidReason:{
        handler(){
          this.handleFolicIron()
        },
        deep:true
      },
      calcium:{
        handler(){
          this.handleCalcium()
          this.handleNoCalcium()
          this.handleOtherCalcium()
        },
        deep:true
      },
      vitaminA:{
        handler(){
           this.handleVitaminA()
           this.handleVitaminNo()
           this.handleVitaminOther()
        },
        deep:true
      }
    },
    methods :{
    handleIron(){
      if(getRadioSelectedValue(this.iron,'Iron prescription')=='yes'){
        modifyFieldValue(this.iron,'iron Amount','displayNone',false)
      }else{
        modifyFieldValue(this.iron,'iron Amount','displayNone',true)
      }
    },
    handleTypeIron(){
      if(getRadioSelectedValue(this.iron,'Iron prescription')=='yes'){
        modifyRadioValue(this.iron,'Type of Iron supplement dosage','displayNone',false)
      }else{
        modifyRadioValue(this.iron,'Type of Iron supplement dosage','displayNone',true)
      }
    },
    handleAcid(){
      if(getRadioSelectedValue(this.folicAcid,'Folic acid')=='yes'){
        modifyFieldValue(this.folicAcid,'Amount of Folic acid','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcid,'Amount of Folic acid','displayNone',true)
      }
    },
    handleFolicIron(){
      if(getRadioSelectedValue(this.folicAcidReason,'Iron and folic acid not prescribed')=='other'){
        modifyFieldValue(this.folicAcidReason,'Other','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcidReason,'Other','displayNone',true)
      }
    },
    handleCalcium(){
      if(getRadioSelectedValue(this.calcium,'Daily calcium prescription')=='yes'){
        modifyFieldValue(this.calcium,'calcium supplements','displayNone',false)
      }else{
        modifyFieldValue(this.calcium,'calcium supplements','displayNone',true)
      }
    },
    handleNoCalcium(){
      if(getRadioSelectedValue(this.calcium,'Daily calcium prescription')=='no'){
        modifyRadioValue(this.calcium,'calcium supplements not prescribed','displayNone',false)
      }else{
        modifyRadioValue(this.calcium,'calcium supplements not prescribed','displayNone',true)
      }
    },
      handleOtherCalcium(){
      if(getRadioSelectedValue(this.calcium,'calcium supplements not prescribed')=='other'){
        modifyFieldValue(this.calcium,'Other','displayNone',false)
      }else{
        modifyFieldValue(this.calcium,'Other','displayNone',true)
      }
    },
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