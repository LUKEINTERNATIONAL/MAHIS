<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-content>
        <basic-form :contentData="ReasonForVisit"
                    :initialData="initialData"
                    @update:selected="handleInputData"
                    @update:inputValue="handleInputData"
        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
  <ion-modal :is-open="isReferralModalOpen" @didDismiss="closeReferralModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Referral Details</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeReferralModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header>I am the header of the sample modal</ion-header>
      <!-- Your referral form or additional content goes here -->
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonModal,
  IonMenu,
  menuController,
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { icons } from '@/utils/svg';
import BasicInputField from '@/components/BasicInputField.vue';
import { mapState } from 'pinia';
import BasicForm from '@/components/BasicForm.vue'
import {useReasonForVisitStore} from "@/apps/ANC/store/quickCheck/reasonForVisit";
import {usePastMedicalHistoryStore} from "@/apps/OPD/stores/PastMedicalHistoryStore";
import {
  getCheckboxSelectedValue,
  getRadioSelectedValue,
  modifyCheckboxHeader, modifyCheckboxValue,
  modifyFieldValue,
  modifyGroupedRadioValue,
  modifyRadioValue
} from "@/services/data_helpers";
import { validateField } from '@/services/ANC/quickCheck_validation_service';

export default defineComponent({
  name: 'Menu',
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
    IonModal
  },
  data() {
    return {
      iconsContent: icons,
      initialData:[] as any,
      isReferralModalOpen: false,
      ReferralDetails: []

    };
  },
  computed: {
    ...mapState(useReasonForVisitStore, ["ReasonForVisit","ReasonForSubsequentVisit"]),
    reasonVisitFacility(){return getRadioSelectedValue(this.ReasonForVisit,'Reason for visit')}
  },
  mounted() {
    const ReasonForVisit = useReasonForVisitStore();
    this.initialData = ReasonForVisit.getInitial();
    this.handleFirstAntenalVisit();
    this.handleSpecificConcernsVisit()
    this.handleReferralQuestionResponse()
  },
  watch:{
    ReasonForVisit:{
      handler(){
        this.handleFirstAntenalVisit()
        this.handleSpecificConcernsVisit()
        this.handleReferralQuestionResponse();
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    validationRules(event: any) {
            return validateField(this.ReasonForVisit, event.name, (this as any)[event.name]);
     },
   async handleInputData(event:any){
     this.validationRules(event)
   },
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    //   if (getRadioSelectedValue(this.ReasonForVisit, 'Action for danger signs') == 'No') {
    //     modifyCheckboxHeader(this.ReasonForVisit, 'Specific health concerns', 'displayNone', false);
    //     modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'displayNone', false);
    //     // modifyCheckboxHeader(this.ReasonForVisit, 'Previous visits', 'selectedValue', '');


handleFirstAntenalVisit() {
  if (getCheckboxSelectedValue(this.ReasonForVisit, 'Other danger signs')?.value == 'other danger signs') {
    modifyFieldValue(this.ReasonForVisit, 'Other notes', 'displayNone', false);
  } else {
    modifyFieldValue(this.ReasonForVisit, 'Other notes', 'displayNone', true);  
  }

  const checkBoxes = [
    'Preterm labour', 'Central cyanosis', 'Unconscious', 'Fever', 'Imminent delivery',
    'Severe headache', 'Severe vomiting', 'Severe abdominal pain', 'Draining liquor',
    'Respiratory problems', 'Convulsion history', 'Vomiting', 'Edema', 'Epigastric pain', 'Bleeding vaginally', 'Other danger signs'

    ,'Abnormal vaginal discharge','Change in blood pressure-up','Diarrhea','Vomiting','Genital ulcers','Change in blood pressure-down',
    'Constipation','Contractions','Vaginal bleeding','Intimate partner violence','Flu symptoms','Painful urination','Headache','Dyspepsia','Frequent urination/Polyuria',
    'Injury','Jaundice','Mental health-Depression','Genital warts','Itchy vulva','Painful intercourse','No health concerns','Other'
  ];

 if(getCheckboxSelectedValue(this.ReasonForVisit, 'None')?.checked){
  
    checkBoxes.forEach((checkbox) => {
      modifyCheckboxValue(this.ReasonForVisit, checkbox, 'checked', false);
      modifyCheckboxValue(this.ReasonForVisit, checkbox, 'disabled', true);
    });

    // Reset and hide 
    modifyRadioValue(this.ReasonForVisit, 'Intervention on danger signs', 'selectedValue', '');
    modifyRadioValue(this.ReasonForVisit, 'Intervention on danger signs', 'displayNone', true);
    modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'displayNone', true);
    
    //ReasonForSubsequentVisit
    modifyFieldValue(this.ReasonForVisit, 'notes', 'displayNone', true);
    modifyFieldValue(this.ReasonForVisit, 'Number of previous visits', 'displayNone', true);

  } else {
    let anyCheckboxSelected = false;

    checkBoxes.forEach((checkbox) => {
      if (getCheckboxSelectedValue(this.ReasonForVisit, checkbox)?.checked) {
        anyCheckboxSelected = true;
      }
      modifyCheckboxValue(this.ReasonForVisit, checkbox, 'disabled', false);
    });

    

    modifyRadioValue(this.ReasonForVisit, 'Intervention on danger signs', 'displayNone', !anyCheckboxSelected);
  }

  if (getRadioSelectedValue(this.ReasonForVisit, 'Intervention on danger signs') == 'No') {
    modifyCheckboxHeader(this.ReasonForVisit, 'Specific health concerns', 'displayNone', false);
    modifyRadioValue(this.ReasonForVisit, 'Previous visits', 'displayNone', false);
  } else {
    modifyCheckboxHeader(this.ReasonForVisit, 'Specific health concerns', 'displayNone', true);
    modifyRadioValue(this.ReasonForVisit, 'Specific health concerns', 'displayNone', true);
  }
}


,
    handleSpecificConcernsVisit(){
      // if (getRadioSelectedValue(this.ReasonForVisit, 'Reason for visit') == 'Specific complaint related to antenatal care') {
      //   modifyCheckboxHeader(this.ReasonForVisit, 'Specific health concerns', 'displayNone', false);
      //   // modifyCheckboxHeader(this.ReasonForVisit, 'Previous visits', 'selectedValue', '');
      //
      // } else {
      //   modifyCheckboxHeader(this.ReasonForVisit, 'Specific health concerns', 'displayNone', true);
      //   modifyCheckboxValue(this.ReasonForVisit, 'Specific health concerns', 'selectedValue', '');
      //
      // }
    },
    closeReferralModal() {
      this.isReferralModalOpen = false;
    },
    handleReferralQuestionResponse() {
      if (getRadioSelectedValue(this.ReasonForVisit, 'Intervention on danger signs')== 'Yes') {
        this.isReferralModalOpen = true;
      } else {
        this.isReferralModalOpen = false;
      }
    },

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
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
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
ion-card {

  width: 100%;
  color: black;
}
</style>
