<template>
<div class="container">
  <ion-card  class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
              <basic-form :contentData="lmnp" @update:selected="handleInputData" @update:inputValue="handleInputData">></basic-form>
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
import {getCheckboxSelectedValue, getFieldValue, getRadioSelectedValue} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {validateField} from "@/services/ANC/validation_service";
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
          currentSection: 0,
         
      };
    },
    computed:{
        ...mapState(useCurrentPregnanciesStore,["currentPregnancies"]),
        ...mapState(useCurrentPregnanciesStore,["deliveryDate"]),
        ...mapState(useCurrentPregnanciesStore,["lmnp"]),
        ...mapState(useCurrentPregnanciesStore,["gestation"]),
        ...mapState(useCurrentPregnanciesStore,["tetanus"]),
        ...mapState(useCurrentPregnanciesStore,["ultrasound"]),
          LMNP(){ return getRadioSelectedValue(this.lmnp, 'LMNP')},
          lmnpEED(){ return getFieldValue(this.lmnp, 'lmnpEED','value')}
       
  
      },
      mounted(){
        const currentPregnancies = useCurrentPregnanciesStore()
  
  
          
         
      },
      setup() {
        return { checkmark,pulseOutline };
      },
      watch:{
       lmnp:{
         handler( event){
           this.handleInputData(event)
           // console.log(this.handleInputData(event))
         },
         deep:true

       }
      },
      methods:{
        validationRules(event: any) {
          return validateField(this.lmnp,event.name, (this as any)[event.name]);
        },
        async handleInputData(event: any) {
          this.validationRules(event)
          // this.calculateEDDFromLNMP(event)
        },
        // calculateEDDFromLNMP(lnmpDate: Date) {
        //   const eddDate = HisDate.addDays(lnmpDate, 280);
        //   return eddDate;
        // },

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
  