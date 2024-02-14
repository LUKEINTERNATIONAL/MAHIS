<template>
    <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar/>
      <Stepper stepperTitle="Treatment & Prevention" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
      IonContent, 
      IonHeader,
      IonItem,
      IonPage,
      IonList,
      IonTitle, 
      IonToolbar, 
      IonMenu,
  } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue'
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from '@/components/Stepper.vue';
import DiagnosisTreatment from '../components/Treatment/DiagnosisTreatment.vue';
import MedicationDispensed from '@/apps/ANC/components/Treatment/MedicationDispensed.vue'
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import DiagnosisCounselling from '@/apps/ANC/components/Treatment/DiagnosisCounselling.vue'
import Immunization from '@/apps/ANC/components/Treatment/Immunization.vue'
import IntimatePartner from '@/apps/ANC/components/Treatment/IntimatePartner.vue';
import Deworming from '@/apps/ANC/components/Treatment/Deworming.vue';
import UrgentReferral from '@/apps/ANC/components/Treatment/UrgentReferral.vue';


export default defineComponent ({
   name : 'treatment',
   components : {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonList,
  Toolbar,
  DemographicBar,
  IonMenu,
  IonTitle,
  IonToolbar,
  BasicInputField,
  Stepper,
  DiagnosisTreatment,
  MedicationDispensed,
  DiagnosisCounselling,
  Immunization,
  IntimatePartner,
  Deworming,
  UrgentReferral,
   },
   data(){
    return {
  iconsContent: icons,
  isOpen: false,
  wizardData: [
               {
                    'title': 'Diagnosis and treatment',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Medication dispensed',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Counselling',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 3,
                    'last_step': ''
                },
                {
                    'title': 'Immunization',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 4,
                    'last_step': ''
                },
                {
                    'title': 'Intimate Partner',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number':5,
                    'last_step': ''
                },
                {
                    'title': 'Deworming and malaria prophylaxis',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number':6,
                    'last_step': 'last_step'
                },      
  
              ],
  StepperData: [
               {
                    'title': 'Diagnosis and treatment',
                    'componet': 'DiagnosisTreatment',
                    'value': '1'
                },
                {
                    'title': 'Medication dispensed',
                    'componet': 'MedicationDispensed',
                    'value': '2'
                },
                {
                    'title': 'Counselling',
                    'componet': 'DiagnosisCounselling',
                    'value': '3'
                },
                {
                    'title': 'Immunization',
                    'componet': 'Immunization',
                    'value': '4'
                },
                {
                    'title': 'Intimate partner',
                    'componet': 'IntimatePartner',
                    'value': '5'
                },
                {
                    'title': 'Deworming and malaria prophylaxis',
                    'componet': 'Deworming',
                    'value': '6'
                },
  ],

    }
   },
setup () {
  return {chevronBackOutline, checkmark}
},

methods: {
  markWizard(){},
  saveData(){}
}
})

</script>


<style scoped>

</style>