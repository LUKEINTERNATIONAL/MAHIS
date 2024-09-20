<template>
  <div class="container">
    <ion-card class="section">
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
modifyCheckboxHeader,
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
  watch:{
    labourReferral:{
      handler(){
        this.handleMother()
        this.handleOtherMother()
        this. handleOtherBaby()
      },
      deep:true
    }
  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods: {
  handleMother(){
    const value =getRadioSelectedValue(this.labourReferral,'referred')

    modifyCheckboxHeader(this.labourReferral, "referring mother" ,'displayNone',!(value=='mother'));
    modifyCheckboxHeader(this.labourReferral, "Baby identifier" ,'displayNone', !(value=='baby'));
    modifyFieldValue(this.labourReferral,"treatment given to baby before referral" ,'displayNone',!(value=='baby'))
    modifyFieldValue(this.labourReferral,"Time of referral" ,'displayNone',!(value=='baby'))
    modifyFieldValue(this.labourReferral,"Date of referral" ,'displayNone',!(value=='baby'))
    modifyFieldValue(this.labourReferral,"Provider who made referral" ,'displayNone',!(value=='baby'))
    modifyFieldValue(this.labourReferral,"Phone number for provider" ,'displayNone',!(value=='baby'))
     
    },
    handleOtherMother(){
      if(getCheckboxSelectedValue(this.labourReferral,"Other")?.value =='others'){
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',false)
      }else{
        modifyFieldValue(this.labourReferral,"specify" ,'displayNone',true)
      }
    },
 handleBaby(){
      //     if(getRadioSelectedValue(this.labourReferral,'referred')=='baby'){
      //     modifyCheckboxValue(this.labourReferral, "Asphyxia" ,'displayNone',false);
      //     modifyCheckboxValue(this.labourReferral, "Preterm" ,'displayNone',false);
      //     modifyCheckboxValue(this.labourReferral, "Under weight" ,'displayNone',false);
      //     modifyCheckboxValue(this.labourReferral, "Congenital abnormalities" ,'displayNone',false);
      //     modifyCheckboxValue(this.labourReferral, "Sepsi" ,'displayNone',false);
      //     modifyCheckboxValue(this.labourReferral, "Other reason" ,'displayNone',false);
      //     modifyFieldValue(this.labourReferral,"treatment given to baby before referral" ,'displayNone',false)
      //     modifyFieldValue(this.labourReferral,"Time of referral" ,'displayNone',false)
      //     modifyFieldValue(this.labourReferral,"Date of referral" ,'displayNone',false)
      //     modifyFieldValue(this.labourReferral,"Provider who made referral" ,'displayNone',false)
      //     modifyFieldValue(this.labourReferral,"Phone number for provider" ,'displayNone',false)

      // }else{
      //     modifyCheckboxValue(this.labourReferral, "Asphyxia" ,'displayNone',true);
      //     modifyCheckboxValue(this.labourReferral, "Preterm" ,'displayNone',true);
      //     modifyCheckboxValue(this.labourReferral, "Under weight" ,'displayNone',true);
      //     modifyCheckboxValue(this.labourReferral, "Congenital abnormalities" ,'displayNone',true);
      //     modifyCheckboxValue(this.labourReferral, "Sepsi" ,'displayNone',true);
      //     modifyCheckboxValue(this.labourReferral, "Other reason" ,'displayNone',true);
      //      modifyFieldValue(this.labourReferral,"treatment given to baby before referral" ,'displayNone',true)
      //     modifyFieldValue(this.labourReferral,"Time of referral" ,'displayNone',true)
      //     modifyFieldValue(this.labourReferral,"Date of referral" ,'displayNone',true)
      //     modifyFieldValue(this.labourReferral,"Provider who made referral" ,'displayNone',true)
      //     modifyFieldValue(this.labourReferral,"Phone number for provider" ,'displayNone',true)
      // }
    },
  handleOtherBaby(){
      if(getCheckboxSelectedValue(this.labourReferral,"Other reason")?.value =='other reason'){
        modifyFieldValue(this.labourReferral,"other" ,'displayNone',false)
      }else{
        modifyFieldValue(this.labourReferral,"other" ,'displayNone',true)
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