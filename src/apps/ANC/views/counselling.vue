<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <Stepper stepperTitle="Counselling" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import DemographicBar from '@/components/DemographicBar.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  import SaveProgressModal from '@/components/SaveProgressModal.vue'
  import { createModal } from '@/utils/Alerts'
  import { icons } from '@/utils/svg';
  import { useVitalsStore } from '@/stores/VitalsStore'
  import { useDemographicsStore } from '@/stores/DemographicStore'
  import { useInvestigationStore } from '@/stores/InvestigationStore'
  import { useDiagnosisStore } from '@/stores/DiagnosisStore'
  import { mapState } from 'pinia';
  import Stepper from "@/apps/ANC/components/Stepper.vue";
  import { Service } from "@/services/service";
  import { LabOrder } from "@/apps/NCD/services/lab_order"
  import { VitalsService } from "@/services/vitals_service";
  import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
  import { Diagnosis } from '@/apps/NCD/services/diagnosis'
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
        Stepper
    },
    data(){
        return {
            wizardData: [
                {
                    'title': 'Behavior counselling',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Physiological counselling',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Diet counselling',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 3,
                    'last_step': 'last_step'
                },
            ],
            StepperData:[
                {
                    'title': 'Behavior counselling',
                    'componet': 'BehaviourCounselling',
                    'value': '1',
                },
                {
                    'title': 'Physiological counselling',
                    'componet': 'PhysiologicalCounseling',
                    'value': '2',
                },
                {
                    'title': 'Diet counselling',
                    'componet': 'DietCounselling',
                    'value': '3',
                },
            ],
        isOpen: false,
        iconsContent: icons,
        };
    },
    mounted(){
        this.markWizard() 
    },
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
      methods:{
        markWizard(){  },
        getFormatedData(data: any){
          return  data.map((item: any) => {
                return item?.data;
            });
        },
        saveData(){


        },
      }
    })
  </script>
  
  <style scoped>

  </style>
  