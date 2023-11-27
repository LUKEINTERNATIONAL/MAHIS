<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <DemographicBar />
        <ion-row>
            <ion-col size="1" size-lg="1"></ion-col>
            <ion-col size="3" size-lg="3">
                <ion-card style="max-width: 300px; background-color: #fff;">
                    <div class="p_name_image">
                        <div class="first_letter">
                            G
                        </div>
                        <div class="p_name"> Godfrey Banda  </div>
                    </div>
                    <ion-card-content>
                          <ion-row>
                              <ion-col size="4">MRN</ion-col>
                              <ion-col >10773807-00-00</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Gendar</ion-col>
                              <ion-col >Male</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4" >Age</ion-col>
                              <ion-col >21y (08 June, 1996)</ion-col>
                          </ion-row>
                          <ion-row>
                              <ion-col size="4">Allergies</ion-col>
                              <ion-col >mmm</ion-col>
                          </ion-row>
                    </ion-card-content>
                </ion-card>
                <ion-card style="max-width: 300px; background-color: #fff;">
                    <ion-accordion-group :value="['first']">
                        <ion-accordion value="first" style="background-color: #fff;">
                            <ion-item slot="header" color="white">
                                <ion-label>Consultation plan</ion-label>
                            </ion-item>
                            <ion-card-content slot="content">
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
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
                <ion-card style="max-width: 300px; background-color: #fff;">
                    <ion-accordion-group>
                        <ion-accordion value="first" style="background-color: #fff;">
                            <ion-item slot="header" color="white">
                                <ion-label>Templates/Forms</ion-label>
                            </ion-item>
                            <ion-card-content slot="content">
                                
                            </ion-card-content>
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
                <ion-card style="max-width: 300px; background-color: #fff;">
                    <ion-accordion-group>
                        <ion-accordion value="first" style="background-color: #fff;">
                            <ion-item slot="header" color="white">
                                <ion-label>AETC Clerking Sheet</ion-label>
                            </ion-item>
                            <ion-card-content slot="content">
                               
                            </ion-card-content>
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card>
            </ion-col>
        
            <ion-col size="7" size-lg="7">
                <ion-card style="background-color: #fff;">
                    <div class="p_dash_header">
                        <div class="p_title">Consultation Overview</div>
                        <div>6 Oct,2023</div>
                    </div>
                    <ion-grid class="grid">
                        <ion-row>
                            <ion-col class="col" style="border-top-left-radius: 4px;">
                            <div class="c_header">
                                Clinical Notes
                            </div>
                            <div style="font-size: 14px; color: #636363;">
                                Vitals
                            </div>
                            <div class="v_result">
                                <div class="obese">
                                    <div><span v-html="iconsContent.pulse" class="selectedPatient"></span> </div>
                                    <div>obese</div>
                                </div>
                                <div class="bmi">
                                    110/70
                                </div>
                            </div>
                            <div>
                                Notes
                                <ul>
                                    <li>The patient presents today with concerns related to diabetes 
                                        management and seeks guidance on optimizing</li>
                                    <li>The patient appears well-nourished and in no acute distress</li>
                                    <li>The patient appears well-nourished and in no acute distress .....</li>
                                </ul>
                            </div>
                            
                            </ion-col>
                            <ion-col class="col" style="border-top-right-radius: 4px;">
                               <div>
                                Investigations
                               </div>
                               <div>
                                RBG (laboratory)
                               </div>
                               <div>
                                    <div>RBG (manual)</div>
                                    <div>Result displays here</div>
                               </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class="col" style="border-bottom-left-radius: 4px;">
                                <div>
                                    Medications
                                </div>
                                <div>
                                    Metformin Extended
                                </div>
                                <div>
                                    750mg / Twice/daily / 30days/ until 2023-09-23
                                </div>
                                <div>
                                    Metformin Extended
                                </div>
                                <div>
                                    750mg / Twice/daily / 30days/ until 2023-09-23
                                </div>
                                <div>
                                    Metformin Extended
                                </div>
                                <div>
                                    750mg / Twice/daily / 30days/ until 2023-09-23
                                </div>
                            </ion-col>
                            <ion-col class="col" style="border-bottom-right-radius: 4px;">
                                <div>
                                    Disposition
                                </div>
                                <div>
                                    Facility 1
                                </div>
                                <div>
                                    Internal / 2023-11-16 / some reason typing.
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card>
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
    IonLabel
     } from '@ionic/vue';
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
  import { icons } from '@/utils/svg.ts'
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
        iconsContent: icons,
        };
    },
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
      methods:{
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

 
  .first_letter{
    background-color: #E6E6E6;
    padding: 20px;
    margin-right: 20px;
    font-size: 24px;
    border-radius:4px;
    color:#636363 !important;
  }
  .p_name_image{
    font-size: 24px;
    padding: 0px;
    margin-left: 15px;
    color: #00190E;
    display: flex;
    font-weight: 700;
    height: 64px;
    margin-top: 15px;
    overflow: hidden;
  }
  .p_name{
    max-width: 180px;
  }
  .p_dash_header{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom:solid #cccccc 1px;
  }
  .p_title{
    font-weight: 700;
    font-size: 24px;
    color: #00190E;
  }
  .col{
    border: solid 1px #ccc ;
  }
  .row{
    border-radius: 4px;
    border: solid 1px #ccc ;
  }
  .grid{
    padding: 20px;
  }
  .c_header{
    color:#00190E;
    font-size: 16px;
  }
  .v_result{
    display: flex;
    justify-content: space-between;
  }
  .obese{
    background-color:#DDEEDD;
    padding: 20px;
    border-radius: 8px;
    padding-right: 50px;
    display: flex;
 }
</style>
  