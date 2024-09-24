<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form
            :contentData="secondStageDetails"
            :initialData="initialData"
        ></basic-form>
        
        <BabyDetailsModal  
        :closeModalFunc="closeBabyModal"
        :onYes="handleBabyYes"
        :onNo="handleBabyNo"
        :isOpen="babyModalOpen"
        :title="``" />

        <div v-if="arrayOfBabies.length>0">
          <div v-for="n in  arrayOfBabies" :key="n">
            <ion-button v-if="!checkIfSubmitted(n)" @click="handleAddBabyDetails(n)">Add Baby {{ n + 1 }}</ion-button>
            <ion-button v-if="checkIfSubmitted(n)" @click="selectBaby(n)">View Baby {{ n + 1 }}</ion-button>
          </div>
        </div>
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
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
  IonRadio,
  IonRadioGroup,
  IonButton
} from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { icons } from '../../../../utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { checkmark, pulseOutline } from 'ionicons/icons';
import BasicCard from "@/components/BasicCard.vue";
import { useSecondStageOfLabourStore } from "@/apps/LABOUR/stores/delivery details/secondStageDelivery";
import { modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
    // modifyCheckboxHeaderValue,
    modifyCheckboxInputField,
  modifyCheckboxHeader,
} from '@/services/data_helpers'
import BabyDetailsModal from './BabyDetailsModal.vue';
import _ from "lodash";

export default defineComponent({
  name: "SecondStageDelivery",
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
    IonRadioGroup,
    IonButton,
    BabyDetailsModal
  },

  data() {
    return {
      iconsContent: icons,
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      inputField: '' as any,
      initialData:[] as any,
      arrayOfBabies: [] as any,
      babyModalOpen: false,
      selectedBaby: 0,
      // babiesDetails: [] as any,
      showSection: false
    };
  },
  computed:{
    ...mapState(useSecondStageOfLabourStore,["secondStageDetails"]),
    ...mapState(useSecondStageOfLabourStore,["babyDetails"]),
    ...mapState(useSecondStageOfLabourStore,["babiesDetails"]),

  },
  mounted(){
    const secondStageDetails=useSecondStageOfLabourStore()
    this.initialData = secondStageDetails.getInitial()
  

  },
  watch: {
    secondStageDetails: {
      handler() {
        this.handleBabyCondition()
        this.handleNumberOfBabies()
        this.handleSelectedStillBirth()
      },
      deep: true,
     
    },
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
    handleNumberOfBabies() { 
      const numberOfBabies = getFieldValue(this.secondStageDetails, 'Number of babies', 'value');
      this.arrayOfBabies = [...Array(Number(numberOfBabies)).keys()]
      
    },
    closeBabyModal() {
    },
    handleSelectedStillBirth() {
      const babyGeneralCondition = getRadioSelectedValue(this.secondStageDetails, 'Baby general condition at birth');

      if (babyGeneralCondition == "Macerated stillbirth" || babyGeneralCondition == "Fresh stillbirth") {
        this.showSection = false;
        this.babyDetailsDisplayNone(true)
        // modifyRadioValue(this.secondStageDetails, 'Sex', 'displayNone', false);
        // modifyFieldValue(this.secondStageDetails, 'Weight', 'displayNone', false);
        // modifyFieldValue(this.secondStageDetails, 'Height', 'displayNone', false);
        return
      }
      this.babyDetailsDisplayNone(false)
      // modifyRadioValue(this.secondStageDetails, 'Sex', 'displayNone', true);
      //   modifyFieldValue(this.secondStageDetails, 'Weight', 'displayNone', true);
      //   modifyFieldValue(this.secondStageDetails, 'Height', 'displayNone', true);
      this.showSection = true;
    },

    selectBaby(n: any) {
      this.selectedBaby = n;
      const baby = this.babiesDetails.find((b: any) => b.baby == n);
      const secondStageDetails = useSecondStageOfLabourStore();
      secondStageDetails.setBabyDetails(baby.details);
      this.toggleBabyModal();

    },
    checkIfSubmitted(n: any) {
      return this.babiesDetails.find((b: any) => b.baby == n);
    },

    handleBabyYes() {
      this.toggleBabyModal()   
      const secondStageDetails = useSecondStageOfLabourStore()
      const index =this.babiesDetails.findIndex((b: any) => b.baby == this.selectedBaby);
      if (index < 0) {
        this.babiesDetails.push({baby: this.selectedBaby, details: [..._.cloneDeep(secondStageDetails.babyDetails)]})
      } else {
        this.babiesDetails[index].details = [..._.cloneDeep(secondStageDetails.babyDetails)];
      }
      secondStageDetails.setBabyDetails()
    },
    handleBabyNo() {
      this.toggleBabyModal();
      useSecondStageOfLabourStore().secondStageDetails.setBabyDetails()
    },
    toggleBabyModal() {
      this.babyModalOpen=!this.babyModalOpen 
    },

    handleAddBabyDetails(babyNumber: number) {
      const secondStageDetails = useSecondStageOfLabourStore();
      secondStageDetails.setBabyDetails()

      this.selectedBaby = babyNumber;
      this.toggleBabyModal()
    },
    handleBabyCondition() {
      const babyGeneralCondition = getRadioSelectedValue(this.secondStageDetails, 'Baby general condition at birth');
      if (babyGeneralCondition == 'Live full term' || babyGeneralCondition == "Live preterm") {
        this.babyDisplayNone(false)
      } else {
        this.babyDisplayNone(true)
      
     }
    },
    babyDisplayNone(visibility:boolean) {
        modifyFieldValue(this.secondStageDetails, 'First name', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Last name', 'displayNone', visibility);
        // modifyFieldValue(this.secondStageDetails, 'Number of babies', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Apgar score at 1 minute', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Apgar score at 5 minutes', 'displayNone', visibility);
        modifyRadioValue(this.secondStageDetails, 'Sex', 'displayNone', visibility);
        modifyRadioValue(this.secondStageDetails, 'vitals', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Weight', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Height', 'displayNone', visibility);
        modifyFieldValue(this.secondStageDetails, 'Circumference', 'displayNone', visibility);
        modifyRadioValue(this.secondStageDetails, 'Tetracycline eye ointment given', 'displayNone', visibility);
       modifyRadioValue(this.secondStageDetails, 'Chlorhexidine', 'displayNone', visibility);
       modifyCheckboxHeader(this.secondStageDetails,'Newborn baby complications','displayNone', visibility)
       modifyCheckboxHeader(this.secondStageDetails,'Management to newborn','displayNone', visibility)
       modifyRadioValue(this.secondStageDetails, 'Oxytocin 10 UI given', 'displayNone', visibility);
       modifyRadioValue(this.secondStageDetails, 'bold', 'displayNone', visibility);
       modifyRadioValue(this.secondStageDetails, 'babyDetails', 'displayNone', visibility);
    },
    babyDetailsDisplayNone(visibility:boolean) {
      modifyFieldValue(this.babyDetails,"First name","displayNone", visibility)
      modifyFieldValue(this.babyDetails,"Last name","displayNone", visibility)
      modifyFieldValue(this.babyDetails,"Apgar score at 1 minute","displayNone", visibility)
      modifyFieldValue(this.babyDetails, "Apgar score at 5 minute", "displayNone", visibility)
      modifyRadioValue(this.babyDetails, 'Tetracycline eye ointment given', 'displayNone', visibility);
      modifyRadioValue(this.babyDetails, 'Chlorhexidine', 'displayNone', visibility);
      modifyCheckboxHeader(this.babyDetails,'Newborn baby complications','displayNone', visibility)
      // modifyCheckboxHeader(this.babyDetails,'Management to newborn','displayNone', visibility)
      modifyRadioValue(this.babyDetails,'Oxytocin 10 UI given','displayNone', visibility)
      modifyRadioValue(this.babyDetails,'Vitamin K given','displayNone', visibility)
    }
  }
});

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
  font-size: 14px;
}

</style>