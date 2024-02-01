<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <Stepper stepperTitle="The consultation plan" :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
  import Stepper from '@/components/Stepper.vue'
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
                    'title': 'Vitals and other measures',
                    'class': 'common_step',
                    'checked':false,
                    'disabled':false,
                    'number': 1,
                    'last_step': ''
                },
                {
                    'title': 'Investigations',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Diagnosis',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 3,
                    'last_step': ''
                },  
                {
                    'title': 'Complications',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 4,
                    'last_step': ''
                },
                {
                    'title': 'Treatment',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 5,
                    'last_step': ''
                },
                {
                    'title': 'Disposition',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 6,
                    'last_step': 'last_step'
                },
            ],
            StepperData:[
                {
                    'title': 'Vitals and other measures',
                    'componet': 'Vitals',
                    'value': '1'
                },
                {
                    'title': 'Investigations',
                    'componet': 'Investigations',
                    'value': '2',
                },
                {
                    'title': 'Diagnosis',
                    'componet': 'Diagnosis',
                    'value': '3',
                },  
                {
                    'title': 'Complications',
                    'componet': 'Complications',
                    'value': '4',
                },
                {
                    'title': 'Treatment plan',
                    'componet': 'TreatmentPlan',
                    'value': '5',
                },
                {
                    'title': 'Disposition',
                    'componet': 'Disposition',
                    'value': '6',
                },
            ],
        isOpen: false,
        iconsContent: icons,
        };
    },
    computed:{
      ...mapState(useDemographicsStore,["demographics"]),
      ...mapState(useVitalsStore,["vitals"]),
      ...mapState(useInvestigationStore,["investigations"]),
      ...mapState(useDiagnosisStore,["diagnosis"]),
    },
    mounted(){
        this.markWizard() 
    },
    watch: {
        vitals: {
            handler(){
                this.markWizard()  
            },
            deep: true
        },
        investigations: {
            handler(){
                this.markWizard()  
            },
            deep: true
        },
        diagnosis: {
            handler(){
                this.markWizard()  
            },
            deep: true
        }
    },
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
      methods:{
        markWizard(){
            if(this.vitals.validationStatus){
                this.wizardData[0].checked = true; 
                this.wizardData[0].class = 'open_step common_step'               
            }else{
                this.wizardData[0].checked = false; 
            }

            if(this.investigations[0].selectdData.length > 0){
                this.wizardData[1].checked = true; 
                this.wizardData[1].class = 'open_step common_step'               
            }else{
                this.wizardData[1].checked = false; 
            }

            if(this.diagnosis[0].selectdData.length > 0){
                this.wizardData[2].checked = true; 
                this.wizardData[2].class = 'open_step common_step'               
            }else{
                this.wizardData[2].checked = false; 
            }
        },
        getFormatedData(data: any){
          return  data.map((item: any) => {
                return item?.data;
            });
        },
        saveData(){
          if(this.vitals.validationStatus && this.investigations[0].selectdData.length > 0 && this.diagnosis[0].selectdData.length > 0){
            this.saveVitals()
            this.saveInvestigation()
            this.saveDiagnosis()
            this.$router.push('patientProfile');
          }else{
            toastWarning("Please complete all required fields")
          }
        },
        saveInvestigation(){
            const investigationInstance = new LabOrder()
            investigationInstance.postActivities(this.demographics.patient_id,this.getFormatedData(this.investigations[0].selectdData))
        },
        saveVitals(){
          const userID: any  = Service.getUserID()
          const vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
          vitalsInstance.onFinish(this.vitals)
        },
        saveDiagnosis(){
          const userID: any  = Service.getUserID()
          const diagnosisInstance = new Diagnosis();
          diagnosisInstance.onSubmit(this.demographics.patient_id,userID,this.getFormatedData(this.diagnosis[0].selectdData))
        },
        openModal(){
            createModal(SaveProgressModal)
        }
      }
    })
  </script>
  
  <style scoped>

  </style>
  