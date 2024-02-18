<template>
  <div class="container">
    <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="iron"></basic-form>
              <basic-form :contentData="ironDosage"></basic-form>
              <basic-form :contentData="folicAcid"></basic-form>
              <basic-form :contentData="folicAcidReason"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="vitaminA"></basic-form>
              <basic-form :contentData="vitaminADosage"></basic-form>
              <basic-form :contentData="vitaminAReason"></basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 2" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="calcium"></basic-form>
              <basic-form :contentData="calciumReason"></basic-form>
            </ion-card-content>
    </ion-card>

          <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>
    </div> 

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
        ...mapState(useMedicationDispensedStore, ["ironDosage"]),
        ...mapState(useMedicationDispensedStore, ["folicAcid"]),
        ...mapState(useMedicationDispensedStore, ["folicAcidReason"]),
        ...mapState(useMedicationDispensedStore, ["vitaminA"]),
        ...mapState(useMedicationDispensedStore, ["vitaminADosage"]),
        ...mapState(useMedicationDispensedStore, ["vitaminAReason"]),
        ...mapState(useMedicationDispensedStore, ["calcium"]),
        ...mapState(useMedicationDispensedStore, ["calciumReason"]),

    },
    mounted(){
      this.handleIron()
      this.handleTypeIron()
      this.handleAcid()
      this.handleFolicIron()
      
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
      }
    },
    methods :{
       //Method for navigating sections
    goToNextSection() {
      if (this.currentSection < 2) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },
    handleIron(){
      if(getRadioSelectedValue(this.iron,'ironInfo')=='yes'){
        modifyFieldValue(this.iron,'ironNum','displayNone',false)
      }else{
        modifyFieldValue(this.iron,'ironNum','displayNone',true)
      }
    },
    handleTypeIron(){
      if(getRadioSelectedValue(this.iron,'ironInfo')=='yes'){
        modifyRadioValue(this.iron,'ironType','displayNone',false)
      }else{
        modifyRadioValue(this.iron,'ironType','displayNone',true)
      }
    },
    handleAcid(){
      if(getRadioSelectedValue(this.folicAcid,'folicAcidInfo')=='yes'){
        modifyFieldValue(this.folicAcid,'iron','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcid,'iron','displayNone',true)
      }
    },
    handleFolicIron(){
      if(getRadioSelectedValue(this.folicAcidReason,'reasonIrobFolic')=='other'){
        modifyFieldValue(this.folicAcidReason,'Other','displayNone',false)
      }else{
         modifyFieldValue(this.folicAcidReason,'Other','displayNone',true)
      }
    },

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