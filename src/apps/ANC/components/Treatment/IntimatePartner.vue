<template>
    <div class="container"> 
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="ipv"></basic-form>
                <basic-form :contentData="ipvReason"></basic-form>
            </ion-card-content>
        </ion-card>

       
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="additionalCare"></basic-form>
                <basic-form :contentData="safety_assessment"></basic-form>
            </ion-card-content>
        </ion-card>

        
        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="physical_violence"></basic-form>
                <basic-form :contentData="beaten_pregnant"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="woman_threatened"></basic-form>
                <basic-form :contentData="constant_jealous"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="strangling"></basic-form>
                <basic-form :contentData="murder_threat"></basic-form>
            </ion-card-content>
        </ion-card>

        <ion-card  class="section">
            <ion-card-header> <ion-card-title class="sub_item_header">Referrals made as part of first-line support</ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="referrals"></basic-form>
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
import {useIntimatePartnerStore } from '../../store/intimatePartnerStore';



export default defineComponent ({
    name: "intimatePartner",
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
            currentSection: 0,
        }
    },
    setup(){
        return { checkmark,pulseOutline };
    },
    computed:{
         ...mapState(useIntimatePartnerStore, ["ipv"]),
         ...mapState(useIntimatePartnerStore, ["ipvReason"]),
         ...mapState(useIntimatePartnerStore, ["additionalCare"]),
         ...mapState(useIntimatePartnerStore, ["safety_assessment"]),
         ...mapState(useIntimatePartnerStore, ["physical_violence"]),
         ...mapState(useIntimatePartnerStore, ["beaten_pregnant"]),
         ...mapState(useIntimatePartnerStore, ["woman_threatened"]),
         ...mapState(useIntimatePartnerStore, ["constant_jealous"]),
         ...mapState(useIntimatePartnerStore, ["strangling"]),
         ...mapState(useIntimatePartnerStore, ["murder_threat"]),
         ...mapState(useIntimatePartnerStore, ["referrals"]),
      
   

    },
    methods :{
        goToNextSection() {
      if (this.currentSection < 5) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
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

    