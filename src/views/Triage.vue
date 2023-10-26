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
                            <li  class="last_step">
                                <a href="#step-11" class="done" isdone="1" rel="1">
                                    <span class="common_step open_step">
                                        <span  class="">1 </span>
                                        <span class="wizard_text">Vitals and other measures</span> 
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </ion-card-content>
            </ion-card>
            <ion-card style="max-width: 300px; background-color: #fff;">
                <div class="wizard_title"><strong > Community screening</strong></div>
                <ion-card-content>
                    <div id="wizard_verticle" class="form_wizard wizard_verticle">
                        <ion-row class="position_center_vetical">
                          <ion-col>Result:</ion-col>
                          <ion-col> <ion-button class="orange_background">High risk</ion-button></ion-col>
                        </ion-row>
                        <ion-row>
                          <ion-col>Date:</ion-col>
                          <ion-col>2023-06-17</ion-col>
                        </ion-row>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-col>
        <ion-col size="7" size-lg="7">
          <span> <ion-icon :icon="chevronBackOutline"></ion-icon>  Back to all Triage</span>
          <History />
          <div class="vitals_title">
            Vitals and other measures
          </div>
          <Vitals />
          <br/>
          <br/>
          <ion-button class="primary_btn" @click="navigation('triageSummary')">Finish and Save</ion-button>
        </ion-col>
      </ion-row>
    </ion-content>


    <ion-modal id="example-modal" :is-open="isOpen">
      <div class="wrapper">
        <span v-html="iconsContent.triageWarning" class="selectedPatient"></span>
        <div>
          <h4><b>Current triage won't be saved!</b></h4>
          <p>If you'll come back to the triage history page, the current triage <br /><b>won't be saved.</b></p>
          <p>If you want to save current triage, complete it and click  <b>"Finish  <br />and save" at the bottom of the page.</b></p>
        </div>
        <div class="triage_modal_btn">
          <ion-button class="primary_btn" @click="dismissModal()">I want to process</ion-button>
          <span @click="navigation('startTriage')"> I know it and will start again</span>
        </div>
      </div>
    </ion-modal>
  </ion-page>
</template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonModal,modalController } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import Vitals from '@/components/ConsultationPlan/Vitals.vue'
  import { icons } from '@/utils/svg.ts';
  import History from '@/components/HealthEducation.vue'
  import DemographicBar from '@/components/DemographicBar.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
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
        Vitals,
        History,
        DemographicBar,
        IonModal
      },
      data() {
      return {
        isOpen: true,
        iconsContent: icons,
      };
    },
      setup() {
        return { chevronBackOutline,checkmark };
    },
    methods: {
      navigation(url: any){
        this.isOpen =false
        this.$router.push(url)
      },
      dismissModal(){
        this.isOpen =false
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
  .vitals_title{
    font-weight: 700;
    font-size: 24px;
    border-bottom: 1px solid #B3B3B3;
    border-top: 1px solid #B3B3B3;
    border-top-style:dashed;
    padding: 15px;
    margin-bottom: 30px;
  }

  ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }

  ion-modal#example-modal .wrapper {
    text-align: center;
    padding: 50px;
  }
  .triage_modal_btn{
    display: flex;
    justify-content: center;
  }
  .triage_modal_btn span{
    color: #006401;
    padding-top: 10px;
    padding-left: 10px;
  }
  </style>
  