
<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Profile" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()"  :StepperData="StepperData"/>
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
  modalController,
  AccordionGroupCustomEvent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from '@/components/ToolbarSearch.vue'
import DemographicBar from "@/components/DemographicBar.vue";
import { chevronBackOutline,checkmark } from 'ionicons/icons';
import SaveProgressModal from '@/components/SaveProgressModal.vue'
import { createModal } from '@/utils/Alerts'
import { icons } from '@/utils/svg';
import { mapState } from 'pinia';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
import PastObstreticHistory from '../components/profile/PastObstreticHistory.vue';
import CurrentPregnancies from '../components/profile/CurrentPregnancies.vue';
import Medications from '../components/profile/Medications.vue';
import MedicalHistory from '../components/profile/MedicalHistory.vue';
import WomanBehaviour from '../components/profile/WomanBehaviour.vue';
import {getCheckboxSelectedValue} from "@/services/data_helpers";
import { useMedicalHistoryStore } from '../store/profile/medicalHistoryStore';



export default defineComponent({
  name: "Home",
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
    Stepper,
    PastObstreticHistory,
    WomanBehaviour,
    CurrentPregnancies,
    Medications,
    MedicalHistory
  },
  data(){
    return {
      wizardData: [
        {
          'title': 'Past Obstetric History',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 1,
          'last_step': ''
        },
        {
          'title': 'Medical History',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 2,
          'last_step': ''
        },
        {
          'title': 'Current Pregnancy',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 3,
          'last_step': ''
        },
        {
          'title': 'Medications',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 4,
          'last_step': ''
        },

        {
          'title': 'Woman behaviour',
          'class': 'common_step',
          'checked':'',
          'icon': false,
          'disabled':false,
          'number': 5,
          'last_step': 'last_step'
        },
      ],
      StepperData:[
        {
          'title': 'Past Obstetric History',
          'componet': 'PastObstetricHistory',
          'value': '1',
        },
        {
          'title': 'Past Medical history',
          'componet': 'MedicalHistory',
          'value': '2',
        },
        {
          'title': 'Current Pregancy',
          'componet': 'CurrentPregnancies',
          'value': '3',
        },
        {
          'title': 'Medications',
          'componet': 'Medications',
          'value': '4',
        },
        {
          'title': 'Woman behaviour',
          'componet': 'WomanBehaviour',
          'value': '5',
        }
      ],
      isOpen: false,
      iconsContent: icons,
    };
  },
  computed:{

    ...mapState(useMedicalHistoryStore, ["exisitingChronicHealthConditions"]),
  
  },
      saveData(){

      const medicalConditions = [
        'Auto immune desease',
        'Asthma',
        'Diabetes',
        'Sickle cell',
        'Anaemia',
        'Thalassemia',
        'Gynaecological',
        'CCF',
        'RHD',
        'Gestational diabetes',
        'pre-existing type 1',
        'pre-existing type 2',
        'Epilepsy',
        'Hypertension',
        'Kidney',
        'TB',
        'Mental  illiness',
      ];
      for (const condition of medicalConditions) {
        const selectedValue = getCheckboxSelectedValue(this.exisitingChronicHealthConditions, condition);
        console.log(selectedValue);
      }

         // this.$router.push('symptomsFollowUp');

     },
  mounted(){
    // this.markWizard()

  },
  watch: {

    vitals: {
    //   handler(){
    //     this.markWizard()
    //   },
    //   deep: true
    // },
    // investigations: {
    //   handler(){
    //     this.markWizard()
    //   },
    //   deep: true
    // },
    // diagnosis: {
    //   handler(){
    //     this.markWizard()
    //   },
      deep: true
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
    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
