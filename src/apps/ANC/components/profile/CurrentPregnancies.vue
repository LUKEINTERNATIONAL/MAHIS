<template>
<div class="container">
  <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="lmnp"></basic-form>
              <basic-form :contentData="ultrasound"></basic-form>
            </ion-card-content>
    </ion-card>
    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="currentPregnancies"></basic-form>
            </ion-card-content>
    </ion-card>
    <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="tetanus"></basic-form>
            </ion-card-content>
    </ion-card>  
<!--           &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
<!--      <div class="navigation-buttons">-->
<!--      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>-->
<!--      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>-->
<!--    </div> -->
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
import { getFieldValue } from '@/services/data_helpers';

export default defineComponent({
    name: "Current",
    components:{
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
          currentSection: 0, // Initialize currentSection to 0

          // lastMenstrualPeriod: null,
          // expectedDate: null,

          //lnmpDate: null,
         
      };
    },
    computed:{
        ...mapState(useCurrentPregnanciesStore,["currentPregnancies"]),
        ...mapState(useCurrentPregnanciesStore,["deliveryDate"]),
        ...mapState(useCurrentPregnanciesStore,["lmnp"]),
        ...mapState(useCurrentPregnanciesStore,["gestation"]),
        ...mapState(useCurrentPregnanciesStore,["tetanus"]),
        ...mapState(useCurrentPregnanciesStore,["ultrasound"]),

       
  
      },
      mounted(){
        const currentPregnancies = useCurrentPregnanciesStore()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      methods:{
          //Method for navigating sections
    goToNextSection() {
      if (this.currentSection < 3) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
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
  