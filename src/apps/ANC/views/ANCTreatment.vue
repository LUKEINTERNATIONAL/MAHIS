
<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <DemographicBar />
      <Stepper stepperTitle="Treatment" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData" />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonItem, IonPage, IonList, IonTitle, IonToolbar, IonMenu } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import { defineComponent } from 'vue';
import BasicInputField from '@/components/BasicInputField.vue';
import Stepper from "@/apps/ANC/components/Stepper.vue";
import ANCMedicationDispensed from "@/apps/ANC/components/ANCtreatment/ANCMedicationDispensed.vue";
import { icons } from '@/utils/svg';
import { chevronBackOutline, checkmark } from 'ionicons/icons';
import { formatCheckBoxData, formatInputFiledData, formatRadioButtonData } from '@/services/formatServerData';
import { mapState } from 'pinia';
import ANCDiagnosis from "@/apps/ANC/components/ANCtreatment/ANCDiagnosis.vue";
import ANCDiagnosisCounselling from "@/apps/ANC/components/ANCtreatment/ANCDiagnosisCounselling.vue";
import ANCImmunization from "@/apps/ANC/components/ANCtreatment/ANCImmunization.vue";
import ANCIntimatePartner from "@/apps/ANC/components/ANCtreatment/ANCIntimatePartner.vue";
import ANCDeworming from "@/apps/ANC/components/ANCtreatment/ANCDeworming.vue";
import ANCTreatment from "@/apps/ANC/components/ANCtreatment/ANCTreatment.vue";


export default defineComponent({
    name: "ANCTreatment",
    components: {
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
        ANCMedicationDispensed,
        ANCDiagnosis,
        ANCDiagnosisCounselling,
        ANCImmunization,
        ANCIntimatePartner,
        ANCDeworming,
      ANCTreatment

    },
   data(){
    return {
  iconsContent: icons,
  isOpen: false,
  wizardData: [
               {
                    'title': 'Diagnosis and Treatment',
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
                    title: 'Diagnosis and Treatment',
                    component: 'ANCDiagnosis',
                    value: '1'
                },
                {
                    title: 'Medication dispensed',
                    component: 'ANCMedicationDispensed',
                    value: '2'
                },
                {
                    title: 'Counselling',
                    component: 'ANCDiagnosisCounselling',
                    value: '3'
                },
                {
                    title: 'Immunization',
                    component: 'ANCImmunization',
                    value: '4'
                },
                {
                    title: 'Intimate partner',
                    component: 'ANCIntimatePartner',
                    value: '5'
                },
                {
                    title: 'Deworming and malaria prophylaxis',
                    component: 'ANCDeworming',
                    value: '6'
                },
  ],

    }
   },
setup () {
  return {chevronBackOutline, checkmark}
},
computed:{
},

methods: {
  markWizard(){},
 saveData(){

 }
}
})

</script>

<!-- <style scoped></style> -->
