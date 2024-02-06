<template>
     <ion-page>
      <Toolbar />
            <ion-content >
                <div class="container">
                    <div class="title">
                        <div class="demographics_title">Enrollment</div>
                    </div>
                    <div class="icon_div">
                        <ion-icon :class="iconListStatus" :icon="list"
                        @click="setDisplayType('list')"></ion-icon>
                        <ion-icon :class="iconGridStatus" style="font-size: 21px; margin-top: 1.5px;" :icon="grid"
                        @click="setDisplayType('grid')"></ion-icon>
                    </div>
                </div>
                <div v-if="enrollmentDisplayType=='grid'" >
                    <div v-if="currentStep =='Enrollment'">
                        <ion-row class="card_row" v-if="enrollmentDisplayType=='grid'">
                                <ion-col size="6">
                                <PatientHistory  />
                            </ion-col>
                            <ion-col size="6">
                                <SubstanceDiagnosis  />
                                <FamilyHistoryNCDNumber  />
                            </ion-col>
                        </ion-row>
                    </div>
                    <div v-if="currentStep =='Next Appointment'">
                        <NextAppointment />
                    </div>
                </div>
                <div v-if=" enrollmentDisplayType=='list'">
                    <div v-if="currentStep =='Substance & Diagnosis'">
                        <SubstanceDiagnosis  />
                    </div>
                    <div v-if="currentStep =='Patient History'">
                        <div style="display: flex; justify-content: center;">
                            <div><PatientHistory /></div>
                        </div>
                    </div>
                    <div v-if="currentStep =='Family History and NCDNumber'">
                        <FamilyHistoryNCDNumber />
                    </div>
                    <div v-if="currentStep =='Next Appointment'">
                        <NextAppointment />
                    </div>
                </div>
            </ion-content>
            <ion-footer v-if="enrollmentDisplayType=='grid'" >
                <div class="footer position_content">
                    <DynamicButton name="Previous" :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
                    <ion-breadcrumbs class="breadcrumbs">
                        <ion-breadcrumb @click="setCurrentStep('Enrollment')" :class="{ 'active': currentStep === 'Enrollment' }">
                            <span class="breadcrumb-text">Enrollment</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                        <ion-breadcrumb @click="setCurrentStep('Next Appointment')" :class="{ 'active': currentStep === 'Next Appointment' }">
                            <span class="breadcrumb-text">Next Appointment</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                    </ion-breadcrumbs>
                    <DynamicButton v-if="currentStep =='Next Appointment'" name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
                    <DynamicButton v-else name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
                </div>
            </ion-footer>
            <ion-footer v-if="enrollmentDisplayType=='list'" >
                <div class="footer position_content">
                    <DynamicButton name="Previous" :icon="iconsContent.arrowLeftWhite" color="medium" @click="previousStep" />
                    <ion-breadcrumbs class="breadcrumbs">
                        <ion-breadcrumb @click="setCurrentStep('Substance & Diagnosis')" :class="{ 'active': currentStep === 'Substance & Diagnosis' }">
                            <span class="breadcrumb-text">Substance & Diagnosis</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                        <ion-breadcrumb @click="setCurrentStep('Patient History')" :class="{ 'active': currentStep === 'Patient History' }">
                            <span class="breadcrumb-text">Patient History</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                        <ion-breadcrumb @click="setCurrentStep('Family History and NCDNumber')" :class="{ 'active': currentStep === 'Family History and NCDNumber' }">
                            <span class="breadcrumb-text">Family History and NCDNumber</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                        <ion-breadcrumb @click="setCurrentStep('Next Appointment')" :class="{ 'active': currentStep === 'Next Appointment' }">
                            <span class="breadcrumb-text">Next Appointment</span>
                            <ion-icon slot="separator" size="large" :icon="iconsContent.arrowRight"></ion-icon>
                        </ion-breadcrumb>
                    </ion-breadcrumbs>
                    <DynamicButton v-if="currentStep =='Next Appointment'" name="Save" iconSlot="end" :icon="iconsContent.saveWhite" @click="saveData()" />
                    <DynamicButton v-else name="Next" iconSlot="end" :icon="iconsContent.arrowRightWhite" @click="nextStep" />
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
  import DynamicButton from '@/components/DynamicButton.vue';
  import { useConfigurationStore } from '@/stores/ConfigurationStore'
  import { arrowForwardCircle, grid,list  } from 'ionicons/icons';
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
    },
    data(){
        return {
            iconsContent: icons,
            demographic: true,
            currentStep: 'Substance & Diagnosis',
            scanner: false,
            steps: ['Substance & Diagnosis', 'Patient History','Family History and NCDNumber','Next Appointment'],
            isOpen: false,
            iconListStatus: 'active_icon',
            iconGridStatus: 'inactive_icon'
        };
    },
    computed:{
      ...mapState(useDemographicsStore,["demographics"]),
      ...mapState(useVitalsStore,["vitals"]),
      ...mapState(useInvestigationStore,["investigations"]),
      ...mapState(useDiagnosisStore,["diagnosis"]),
      ...mapState(useGeneralStore,["saveProgressStatus"]),
      ...mapState(useConfigurationStore,["enrollmentDisplayType"]),
    },
    mounted(){
    },
    
    setup() {
        return { chevronBackOutline,checkmark,arrowForwardCircle,grid,list };
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
        },
        nav(url: any){
                this.$router.push(url);
            },
        setDisplayType(type: any){
            if(type=='grid'){
                this.currentStep ='Enrollment'
            }else{
                this.currentStep ='Substance & Diagnosis'
            }
            const demographicsStore = useConfigurationStore()
            demographicsStore.setEnrollmentDisplayType(type)
            this.setIconClass()
        },
        setIconClass(){
            this.iconListStatus = 'inactive_icon'
            this.iconGridStatus = 'inactive_icon'
            if(this.enrollmentDisplayType=='list'){
                this.iconListStatus = 'active_icon'
            }else if(this.enrollmentDisplayType=='grid'){
                this.iconGridStatus = 'active_icon'
            }
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
  .footer2{
    color: #000;
    display: flex;
    justify-content: right;
    padding: 5px 0px 5px 0px;
    margin-right: 40px;
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
}

.icon_div{
    display: flex;
  justify-content: space-between;
  width: 70px;
  position: absolute;
            right: 70px;
            top: 20px; 
}
.active_icon{
    font-size: 25px; 
    background-color: #DDEEDD; 
    color: #6fbd70; 
    border-radius: 5px;
}
.inactive_icon{
    font-size: 25px; 
    color: #ccc;
}

.container {
    position: relative;
}

.title {
    text-align: center;
    margin-bottom: 10px; 
}
.demographics_title{
    font-weight: 700;
    font-size: 24px;                    
    padding-top: 20px ;
}
.demographics{
    display: flex; 
    width: unset;
    justify-content: center;
}
  </style>
  