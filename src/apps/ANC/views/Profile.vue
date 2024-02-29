<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Profile" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" @update:inputValue="validateProfileData($event)"  :StepperData="StepperData"/>
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
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import ToolbarSearch from "@/apps/ANC/components/ToolbarSearch.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
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
import MedicalHistory from "@/apps/ANC/components/profile/MedicalHistory.vue"
import WomanBehaviour from '../components/profile/WomanBehaviour.vue';
import {getCheckboxSelectedValue} from "@/services/data_helpers";
import {useMedicalHistoryStore} from "@/apps/ANC/store/profile/medicalHistoryStore";
import {useObstreticHistoryStore} from "@/apps/ANC/store/profile/PastObstreticHistoryStore";
import {useCurrentPregnanciesStore} from "@/apps/ANC/store/profile/CurrentPreganciesStore";
import {useMedicationsStore} from "@/apps/ANC/store/profile/MedicationsStore";
import {useWomanBehaviourStore} from "@/apps/ANC/store/profile/womanBehaviourStore";

// function someChecked(options, errorMassage) {
//   if (!options.filter(v => v.checkboxBtnContent).some(v => v.checkboxBtnContent.data.some(d => d.checked))) {
//     return errorMassage
//   }
// }
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
          'value': '1'
        },
        {
          'title': 'Past Medical history',
          'componet': 'MedicalHistory',
          'value': '2',
          // validation: {
          //   medicalHistory: (data) => someChecked(data, "Medical history is required"), 
          //   allegy: (data) => someChecked(data, "Allergy is required"), 
          //   //existingChronicHealthConditions: (data)=>someChecked(data, "Existing chronic conditions is required"),
          //   hivTest: (data)=>someChecked(data, "HIV test required"),
          //   syphilisTest: (data)=>someChecked(data, "Syphilis test is required")
            
          // }
        },
        {
          'title': 'Current Pregnancy',
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
  watch: {
    medicalHistory(change) {
      console.log(change)
    }
  },
  computed:{
    ...mapState(useMedicalHistoryStore,["medicalHistory", "allegy", "existingChronicHealthConditions","hivTest","syphilisTest"]),
    ...mapState(useObstreticHistoryStore, ["prevPregnancies","preterm","abnormalities","modeOfDelivery","Complications"]),
    ...mapState(useCurrentPregnanciesStore, ["currentPregnancies","deliveryDate","lmnp","gestation","tetanus","ultrasound"]),
    ...mapState(useMedicationsStore,["Medication"]),
    ...mapState(useWomanBehaviourStore,["dailyCaffeineIntake","Tobacco"])

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

     },
  mounted(){
    // this.markWizard()

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
      // const errors = []
      // this.StepperData.forEach((stepper)=> {
      //   if (!stepper.validation) return
      //   Object.keys(stepper.validation).forEach((validationName) => {
      //     if (typeof stepper.validation[validationName] === 'function') {
      //       const state = stepper.validation[validationName](this[validationName])
      //       if (state) errors.push(state)
      //     }
      //   })
      // })
      // if (errors.length) {
      //   return alert(errors.join(','))
      // }
       this.$router.push('QuickCheck');
     },

    openModal(){
      createModal(SaveProgressModal)
    }
  }
})
</script>

<style scoped>

</style>
