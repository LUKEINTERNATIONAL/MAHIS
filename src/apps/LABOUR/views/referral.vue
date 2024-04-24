<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Patient referral" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonModal,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/apps/LABOUR/components/Toolbar.vue";
import ToolbarSearch from "@/apps/LABOUR/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/LABOUR/components/DemographicBar.vue";
import { chevronBackOutline,checkmark, checkbox } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import Stepper from "@/apps/LABOUR/components/Stepper.vue";
import { mapState } from 'pinia';
import { useLabourReferralStore} from "@/apps/LABOUR/stores/repeatable things/referral"
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { getCheckboxInputField, getCheckboxSelectedValue, getRadioSelectedValue, modifyCheckboxInputField, modifyCheckboxValue, modifyFieldValue } from '@/services/data_helpers';
export default defineComponent({
  name: "referral",
  components:{
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Toolbar,
    ToolbarSearch,
    DemographicBar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonModal,
    Stepper
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'Referral',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': 'last_step'
        },

      ],
      StepperData:[
        {
          title: 'Referral',
          component: 'PatientReferral',
          value: '1'
        },
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  computed:{
          //  ...mapState(useDemographicsStore, ["demographics"]),
      ...mapState(useLabourReferralStore,['labourReferral'])
  },
  mounted(){
     this.markWizard()
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
    return { chevronBackOutline,checkmark };
  },

  methods:{
    markWizard(){
      //   if(this.medications.validationStatus){
      //     this.wizardData[0].checked = true;
      //     this.wizardData[0].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[0].checked = false;
      //   }

      //   if(this.medicalHistory[0].selectdData.length > 0){
      //     this.wizardData[1].checked = true;
      //     this.wizardData[1].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[1].checked = false;
      //   }

      //   if(this.womanBehaviour[0].selectdData.length > 0){
      //     this.wizardData[2].checked = true;
      //     this.wizardData[2].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[2].checked = false;
      //   }
      //   if(this.medications[0].selectdData.length > 0){
      //     this.wizardData[2].checked = true;
      //     this.wizardData[2].class = 'open_step common_step'
      //   }else{
      //     this.wizardData[2].checked = false;
      //   }
    },
    deleteDisplayData(data: any){
      return  data.map((item: any) => {
        delete item?.display;
        return item?.data;
      });
    },
    saveData(){
      this.$router.push("labourHome");
      this.saveReferal();
    },
    async saveReferal(){
      console.log(await this.buildReferal())
    },
    async buildReferal(){
      return[
        ...(await formatRadioButtonData(this.labourReferral)),
        ...(await formatCheckBoxData(this.labourReferral)),
        ...(await formatInputFiledData(this.labourReferral)),
      ]
    },

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
          modifyCheckboxValue(this.labourReferral, "Others" ,'displayNone',true);
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
    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
