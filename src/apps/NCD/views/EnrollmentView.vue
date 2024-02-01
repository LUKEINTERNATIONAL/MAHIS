<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
       
        <div>
            <div>
                <Enrollment  />
            </div>
        </div>
    </ion-content>
    <ion-footer>
        <div class="footer position_content">
            <DynamicButton  name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
        </div>
  </ion-footer>
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
  import { useGeneralStore } from '@/stores/GeneralStore'
  import { useInvestigationStore } from '@/stores/InvestigationStore'
  import { useDiagnosisStore } from '@/stores/DiagnosisStore'
  import { mapState } from 'pinia';
  import Stepper from '@/components/Stepper.vue'
  import { Service } from "@/services/service";
  import { LabOrder } from "@/apps/NCD/services/lab_order"
  import { VitalsService } from "@/services/vitals_service";
  import { toastWarning,popoverConfirmation, toastSuccess } from '@/utils/Alerts';
  import { Diagnosis } from '@/apps/NCD/services/diagnosis'
  import PatientHistory from '@/apps/NCD/components/Enrollment/PatientHistory.vue'
  import SubstanceDiagnosis from '@/apps/NCD/components/Enrollment/SubstanceDiagnosis.vue'
  import FamilyHistoryNCDNumber from '@/apps/NCD/components/Enrollment/FamilyHistoryNCDNumber.vue'
  import NextAppointment from '@/apps/NCD/components/NextAppointment.vue'
  import Enrollment from '@/apps/NCD/components/Enrollment.vue'
  import DynamicButton from '@/components/DynamicButton.vue';
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
        PatientHistory,
        SubstanceDiagnosis,
        FamilyHistoryNCDNumber,
        NextAppointment,
        DynamicButton,
        Enrollment
    },
    data(){
        return {
            iconsContent: icons,
            demographic: true,
            currentStep: 'Substance & Diagnosis',
            scanner: false,
            steps: ['Substance & Diagnosis', 'Patient History','Family History and NCDNumber','Next Appointment'],
            isOpen: false,
        };
    },
    computed:{
      ...mapState(useDemographicsStore,["demographics"]),
      ...mapState(useVitalsStore,["vitals"]),
      ...mapState(useInvestigationStore,["investigations"]),
      ...mapState(useDiagnosisStore,["diagnosis"]),
      ...mapState(useGeneralStore,["saveProgressStatus"]),
    },
    mounted(){
    },
    
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
    
      methods:{
        setCurrentStep(name: any){
                this.currentStep = name
        },
        nextStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex < this.steps.length - 1) {
                this.currentStep = this.steps[currentIndex + 1];
            }
        },
        previousStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex > 0) {
                this.currentStep = this.steps[currentIndex - 1];
            }
        },
        saveData(){
          this.$router.push('consultationPlan');
        },
        openModal(){
            createModal(SaveProgressModal)
        }
      }
    })
  </script>
  
  <style scoped>
    .breadcrumbs{
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}
ion-toolbar {
    --opacity: 0.5;
    --background:var(--ion-background-color, #fff);
  }
  .header{
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
  }
  .footer{
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px 0px;
  }
  ion-breadcrumb ion-icon{
    margin-inline: 30px;
  }
  .breadcrumb-active{
    color: var(--color);
    }
.active {
    color: #00190E; 
    display: flex;
    height: 40px;
    padding: 0px 16px;
    align-items: center;
    gap: 8px;
}
.active .breadcrumb-text {
  border-bottom: 1px solid #00190E; /* Set the desired color for the underline */
}
ion-footer{
    border-top: 1px solid #E6E6E6;
    display: block;
  position: relative;
  -ms-flex-order: 1;
  order: 1;
  width: 100%;
  background: #f4f4f4f4;
}
  </style>
  