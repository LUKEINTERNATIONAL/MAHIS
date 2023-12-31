<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <Stepper :wizardData="wizardData" @updateStatus="markWizard" @finishBtn="saveData()" :StepperData="StepperData"/>
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
  import { mapState } from 'pinia';
  import Stepper from '@/components/Stepper.vue'
  import { Service } from "@/services/service";
  import { VitalsService } from "@/services/vitals_service";
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
            if(this.investigations[0].db_data.length > 0){
                this.wizardData[1].checked = true; 
                this.wizardData[1].class = 'open_step common_step'               
            }else{
                this.wizardData[1].checked = false; 
            }
        },
        saveData(){
          if(this.vitals.validationStatus){
            const userID: any  = Service.getUserID()
            const vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
            vitalsInstance.onFinish(this.vitals)
            this.$router.push('patientProfile');
          }
        },
        openModal(){
            createModal(SaveProgressModal)
        }
      }
    })
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  .centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ion-item[slot='header']{
    font-size: 20px;
    padding-top:25px;
    font-weight: 600;
  }

  ion-accordion {
    margin: 0 auto;
    
  }

  ion-accordion.accordion-expanding,
  ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
  } 

  ion-accordion.accordion-collapsing ion-item[slot='header'],
  ion-accordion.accordion-collapsed ion-item[slot='header'] {
    --color: var(--ion-color-light-contrast);
  }

  ion-accordion.accordion-expanding ion-item[slot='header'],
  ion-accordion.accordion-expanded ion-item[slot='header'] {
    --background: #8A8A8A;
    --color: var(--ion-color-primary-contrast);
  }
  .back_profile{
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14;
  }
</style>
  