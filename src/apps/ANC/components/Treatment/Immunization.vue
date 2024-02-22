<template>
    <div class="container">
    <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="HepB1"></basic-form>
                <basic-form :contentData="HepB2"></basic-form>
                <basic-form :contentData="HepB3"></basic-form>
                <basic-form :contentData="hepBReason"></basic-form>
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
import { useImmunizationStore } from '../../store/immunizationStore';



export default defineComponent ({
    name: "Immunization",
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
        ...mapState(useImmunizationStore, ["ttDoses"]),
        ...mapState(useImmunizationStore, ["tt1"]),
        ...mapState(useImmunizationStore, ["tt2"]),
        ...mapState(useImmunizationStore, ["tt3"]),
        ...mapState(useImmunizationStore, ["tt4"]),
        ...mapState(useImmunizationStore, ["tt5"]),
        ...mapState(useImmunizationStore, ["ttReason"]),
        ...mapState(useImmunizationStore, ["HepB1"]),
        ...mapState(useImmunizationStore, ["HepB2"]),
        ...mapState(useImmunizationStore, ["HepB3"]),
        ...mapState(useImmunizationStore, ["hepBReason"]),
   

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