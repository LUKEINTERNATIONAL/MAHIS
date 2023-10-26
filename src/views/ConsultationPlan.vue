<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <ion-row>
            <ion-col size="1" size-lg="1"></ion-col>
            <ion-col size="3" size-lg="3">
                <ion-card style="max-width: 300px; background-color: #fff;">
                    <div class="wizard_title"><strong > The consultation plan</strong></div>
                    <ion-card-content>
                        <div id="wizard_verticle" class="form_wizard wizard_verticle">
                            <ul class="list-unstyled wizard_steps anchor">
                                <li v-for="(item, index) in wizardData" :key="index" :class="item.last_step">
                                    <a href="#step-11" class="done" isdone="1" rel="1">
                                        <span :class="item.class">
                                            <ion-icon v-if="item.checked" :icon="checkmark" class="checked_step"></ion-icon>  
                                            <span v-if="!item.checked" class="">{{ item.number }} </span>
                                            <span class="wizard_text">{{ item.title }}</span> 
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        
            <ion-col size="7" size-lg="7">
                <span> <ion-icon :icon="chevronBackOutline"></ion-icon>  Back to all consultations</span>
                <ion-accordion-group @ionChange="accordionGroupChange($event)">
                    <ion-accordion value="1">
                        <ion-item slot="header">
                            <ion-label>Vitals and other measures</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Vitals />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="2">
                        <ion-item slot="header">
                            <ion-label>Provisional diagnosis</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Diagnosis />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="3">
                        <ion-item slot="header">
                            <ion-label>Investigations</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Investigations />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="4">
                        <ion-item slot="header">
                            <ion-label>Confirm diagnosis</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Diagnosis />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="5">
                        <ion-item slot="header">
                            <ion-label>Complications</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Complications />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="6">
                        <ion-item slot="header">
                            <ion-label>Treatment plan</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <TreatmentPlan />
                        </div>
                    </ion-accordion>
                    <ion-accordion value="7">
                        <ion-item slot="header">
                            <ion-label>Disposition</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <Disposition />
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
                <hr style="background: rgba(0, 0, 0, 0.13);">
                <ion-button class="primary_btn">Finish and Save</ion-button>
            </ion-col>
        </ion-row>
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
    AccordionGroupCustomEvent } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import DemographicBar from '@/components/DemographicBar.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  import Vitals from '@/components/ConsultationPlan/Vitals.vue'
  import Diagnosis from '@/components/ConsultationPlan/Diagnosis.vue'
  import Complications from '@/components/ConsultationPlan/Complications.vue'
  import ConfirmDiagnosis from '@/components/ConsultationPlan/ConfirmDiagnosis.vue'
  import Disposition from '@/components/ConsultationPlan/Disposition.vue'
  import Investigations from '@/components/ConsultationPlan/Investigations.vue'
  import TreatmentPlan from '@/components/ConsultationPlan/TreatmentPlan.vue'
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
        Vitals,
        Diagnosis,
        Complications,
        ConfirmDiagnosis,
        Disposition,
        Investigations,
        TreatmentPlan
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
                    'title': 'Provisional diagnosis',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 2,
                    'last_step': ''
                },
                {
                    'title': 'Investigations',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 3,
                    'last_step': ''
                },
                {
                    'title': 'Confirm diagnosis',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 4,
                    'last_step': ''
                },
                {
                    'title': 'Complications',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 5,
                    'last_step': ''
                },
                {
                    'title': 'Treatment',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 6,
                    'last_step': ''
                },
                {
                    'title': 'Disposition',
                    'class': 'common_step',
                    'checked':'',
                    'icon': false,
                    'disabled':false,
                    'number': 7,
                    'last_step': 'last_step'
                },
        ],
        };
    },
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
      methods:{
        accordionGroupChange(ev: AccordionGroupCustomEvent){
            if(ev.target.className == "md accordion-group-expand-compact"){
                this.wizardData.forEach(item => {
                item.checked = false;
                item.class = "common_step"
                if (item.number == ev.detail.value) {
                    // item.checked = true;
                    item.class = 'open_step common_step';
                }

            });
            }
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
</style>
  