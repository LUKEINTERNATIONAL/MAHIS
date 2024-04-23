<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header">Referral</ion-card-title></ion-card-header>
      <ion-card-content>
        <basic-form :contentData="labourReferral"></basic-form>
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
} from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { icons } from '../../../../utils/svg';
import BasicInputField from '../../../../components/BasicInputField.vue';
import { mapState } from 'pinia';
import { checkmark, pulseOutline } from 'ionicons/icons';
import {
  dynamicValue,
  getCheckboxSelectedValue,
  getFieldValue,
getRadioSelectedValue,
modifyCheckboxValue,
modifyFieldValue,
} from '@/services/data_helpers';
import BasicCard from "@/components/BasicCard.vue";
import {useLabourReferralStore} from "@/apps/LABOUR/stores/repeatable things/referral";
export default defineComponent({
  name: "FirstVaginalExamination",
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
      vValidations: '' as any,
      hasValidationErrors: [] as any,
      inputField: '' as any,

    };
  },
  computed:{
    ...mapState(useLabourReferralStore,["labourReferral"]),
  },
  mounted(){
     this.handleMother()
     this.handleOtherMother()
  },
  watch:{
    labourReferral:{
      handler(){
        this.handleMother()
        this.handleOtherMother()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
  handleMother(){
      if(getRadioSelectedValue(this.labourReferral,'referred')=='mother'){
         modifyCheckboxValue(this.labourReferral, "Danger sign present" ,'displayNone',false);
         modifyCheckboxValue(this.labourReferral, "Antepartum haemorrhage" ,'displayNone',false);

          modifyCheckboxValue(this.labourReferral, "pre-eclampsia" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Sepsis" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Retained placenta" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Perineal tear (2nd, 3rd or 4th degree" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Obstructed/prolonged labour" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Premature labour" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Placenta previa" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Severe anaemia" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Placenta abruption" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Symphysiotomy" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Other" ,'displayNone',false);
          modifyFieldValue(this.labourReferral,"treatment given before referral" ,'displayNone',false)

      }else{
         modifyCheckboxValue(this.labourReferral, "Danger sign present" ,'displayNone',true);
         modifyCheckboxValue(this.labourReferral, "Antepartum haemorrhage" ,'displayNone',true);

         modifyCheckboxValue(this.labourReferral, "pre-eclampsia" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Sepsis" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Retained placenta" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Perineal tear (2nd, 3rd or 4th degree" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Obstructed/prolonged labour" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Premature labour" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Placenta previa" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Severe anaemia" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Placenta abruption" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Symphysiotomy" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "others" ,'displayNone',true);
          modifyFieldValue(this.labourReferral,"treatment given before referral" ,'displayNone',true)
      }
    },
    handleOtherMother(){
      if(getCheckboxSelectedValue(this.labourReferral,"Other")?.value =='others'){
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',false)
      }else{
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',true)
      }
    },
 handleBaby(){
          if(getRadioSelectedValue(this.labourReferral,'referred')=='mother'){
          modifyCheckboxValue(this.labourReferral, "Premature labour" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Placenta previa" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Severe anaemia" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Placenta abruption" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Symphysiotomy" ,'displayNone',false);
          modifyCheckboxValue(this.labourReferral, "Other" ,'displayNone',false);
          modifyFieldValue(this.labourReferral,"treatment given to baby before referral" ,'displayNone',false)

      }else{
         modifyCheckboxValue(this.labourReferral, "Danger sign present" ,'displayNone',true);
         modifyCheckboxValue(this.labourReferral, "Antepartum haemorrhage" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Severe anaemia" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Placenta abruption" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Symphysiotomy" ,'displayNone',true);
          modifyCheckboxValue(this.labourReferral, "Others" ,'displayNone',true);
          modifyFieldValue(this.labourReferral,"treatment given to baby before referral" ,'displayNone',true)
      }
    },
  handleOtherBaby(){
      if(getCheckboxSelectedValue(this.labourReferral,"Other reason")?.value =='other reason'){
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',false)
      }else{
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',true)
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