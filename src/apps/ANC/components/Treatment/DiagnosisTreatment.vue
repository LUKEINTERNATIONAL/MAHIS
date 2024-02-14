<template>
    <div class="container">
        <ion-card v-if="currentSection === 0" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="diagnoses"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 1" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hypertension"> </basic-form>
                <basic-form :contentData="preEclampsia"> </basic-form>
                <basic-form :contentData="hyper"> </basic-form>
                <basic-form :contentData="hypertensionReason"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 2" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hiv"> </basic-form>
                <basic-form :contentData="hivReason"> </basic-form>
                <basic-form :contentData="hepatitisB"> </basic-form>
                <basic-form :contentData="hepatitisReason"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 3" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="hepatitisC"> </basic-form>
                <basic-form :contentData="syphilis"> </basic-form>
                <basic-form :contentData="syphilisTesting"> </basic-form>
                <basic-form :contentData="tbScreening"> </basic-form>
            </ion-card-content>
    </ion-card>

    <ion-card v-if="currentSection === 4" class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>  
                <basic-form :contentData="ASB"> </basic-form>
                <basic-form :contentData="asbReason"> </basic-form>
                <basic-form :contentData="GDM"> </basic-form>
                <basic-form :contentData="diabetes"> </basic-form>
                <basic-form :contentData="anaemia"> </basic-form>
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
import {useDiagnosisStore} from '../../store/diagnosisStore';
export default defineComponent ({
    name: "diagnosisTreatment",
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
        ...mapState(useDiagnosisStore, ["diagnoses"]),
        ...mapState(useDiagnosisStore, ["hypertensionReason"]),
        ...mapState(useDiagnosisStore, ["hivReason"]),
        ...mapState(useDiagnosisStore, ["hepatitisReason"]),
        ...mapState(useDiagnosisStore, ["asbReason"]),
        ...mapState(useDiagnosisStore, ["hypertension"]),
        ...mapState(useDiagnosisStore, ["preEclampsia"]),
        ...mapState(useDiagnosisStore, ["hyper"]),
        ...mapState(useDiagnosisStore, ["hiv"]),
        ...mapState(useDiagnosisStore, ["hepatitisB"]),
        ...mapState(useDiagnosisStore, ["hepatitisC"]),
        ...mapState(useDiagnosisStore, ["syphilis"]),
        ...mapState(useDiagnosisStore, ["syphilisTesting"]),
        ...mapState(useDiagnosisStore, ["tbScreening"]),
        ...mapState(useDiagnosisStore, ["ASB"]),
        ...mapState(useDiagnosisStore, ["GDM"]),
        ...mapState(useDiagnosisStore, ["diabetes"]),
        ...mapState(useDiagnosisStore, ["anaemia"]),

    },
    methods :{
        goToNextSection() {
      if (this.currentSection < 4) {
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