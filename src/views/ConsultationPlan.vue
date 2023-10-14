<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <ion-card  class="second_bar ">
            <ul class="second_bar_list position_content">
                <li>Fullname: <b>Petros Kayange</b></li>
                <li>MRN: <b>102323</b></li>
                <li>Birthday: <b>20 June 1997 </b></li>
                <li>Category: <b>Referal</b></li>
                <li>Sex: <b>Male</b></li>
            </ul>
        </ion-card>
        <ion-row>
            <ion-col size="1" size-lg="1"></ion-col>
            <ion-col size="3" size-lg="3">
            <ion-card style="max-width: 300px; background-color: #fff;">
                <div class="wizard_title"><strong > The consultation plan</strong></div>
                <ion-card-content>
                        <div id="wizard_verticle" class="form_wizard wizard_verticle">
                        <ul class="list-unstyled wizard_steps anchor">
                    <li>
                        <a href="#step-11" class="done" isdone="1" rel="1">
                        <span class="checked_step_border step_no step_done">
                            <ion-icon :icon="checkmark" class="checked_step color_white"></ion-icon>  
                            <span class="wizard_text">Vitals and other measures</span> 
                        </span>
                        
                        </a>
                    </li>
                    <li>
                        <a href="#step-22" class="selected" isdone="1" rel="2">
                        <span class="checked_step_border step_no step_done">
                            <span class="color_white">2 </span>
                            <span class="wizard_text">Provisional diagnosis</span> 
                        </span>
                        </a>
                    </li>
                    <li>
                        <a href="#step-33" class="disabled" isdone="0" rel="3">
                        <span class="step_no">3 <span class="wizard_text">Investigations</span> </span>
                        </a>
                    </li>
                    <li>
                        <a href="#step-44" class="disabled" isdone="0" rel="4">
                        <span class="step_no">4 <span class="wizard_text">Confirm diagnosis</span> </span>
                        </a>
                    </li>
                    <li>
                        <a href="#step-44" class="disabled" isdone="0" rel="5">
                        <span class="step_no">5 <span class="wizard_text">Complications</span> </span>
                        </a>
                    </li>
                    <li>
                        <a href="#step-44" class="disabled" isdone="0" rel="6">
                        <span class="step_no">6 <span class="wizard_text">Treatment</span> </span>
                        </a>
                    </li>
                    <li class="last_step">
                        <a href="#step-44" class="disabled" isdone="0" rel="7">
                        <span class="step_no">7 <span class="wizard_text">Disposition</span> </span>
                        </a>
                    </li>
                </ul>
            </div>
                   
                </ion-card-content>
            </ion-card>
        </ion-col>
        
        <ion-col size="7" size-lg="7">
            <span> <ion-icon :icon="chevronBackOutline"></ion-icon>  Back to all consultations</span>
            <ion-accordion-group>
                <ion-accordion value="first">
                    <ion-item slot="header">
                        <ion-label>Vitals and other measures</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">Vitals</div>
                </ion-accordion>
                <ion-accordion value="second">
                    <ion-item slot="header">
                        <ion-label>Provisional diagnosis</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">diagnosis</div>
                </ion-accordion>
                <ion-accordion value="third">
                    <ion-item slot="header">
                        <ion-label>Investigations</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">Investigations</div>
                </ion-accordion>
                <ion-accordion value="fourth">
                    <ion-item slot="header">
                        <ion-label>Confirm diagnosis</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">diagnosis</div>
                </ion-accordion>
                <ion-accordion value="fifth">
                    <ion-item slot="header">
                        <ion-label>Complications</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">Complications</div>
                </ion-accordion>
                <ion-accordion value="sixth">
                    <ion-item slot="header">
                        <ion-label>Treatment plan</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">Treatment</div>
                </ion-accordion>
                <ion-accordion value="seventh">
                    <ion-item slot="header">
                        <ion-label>Disposition</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">Disposition</div>
                </ion-accordion>
            </ion-accordion-group>
            <hr style="background: rgba(0, 0, 0, 0.13);">
            <ion-button style="--background: var(--ion-toolbar-background); font-size: var(--ion-button-font);"><b>Finish and Save</b></ion-button>
        </ion-col>
        </ion-row>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle,
     IonToolbar,IonButton, IonCard, IonCardContent, IonCardHeader,
      IonCardSubtitle, IonCardTitle, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
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
        IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
        IonAccordion,
      IonAccordionGroup,
      IonItem,
      IonLabel
      },
      setup() {
      return { chevronBackOutline,checkmark };
    },
      methods:{
        stepIcon(step: any) {
      // Define icons for each step here
      const icons = {
        step1: "ellipse-outline",
        step2: "ellipse-outline",
        step3: "ellipse-outline",
      };
      return icons[step];
    },
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

  ion-accordion {
    margin: 0 auto;
    
  }

  ion-accordion.accordion-expanding,
  ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
  } 

  ion-item[slot='header']{
    font-size: 20px;
    padding-top:25px;
    font-weight: 600;
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

  .checked_step{
    font-size: 17px;
    font-weight: 700;
    margin-top: 1px;
    margin-left: -8px;
    position: absolute;
    }
    .checked_step_border{
        border: 2px solid var(--ion-toolbar-background) !important;
    }
    .step_done{
        background-color: var(--ion-toolbar-background);
    }
    .color_white{
        color: #fff !important;
    }
  .wizard_verticle ul.wizard_steps li a .step_no {
    width: 25px;
    height: 25px;
    line-height: 21px;
    border: 2px solid #B4B4B4;
    border-radius: 100px;
    display: block;
    margin: 0 auto 5px;
    font-size: 13px;
    text-align: center;
    position: relative;
    color: #B4B4B4;
    z-index: 5;
}


.wizard_verticle ul.wizard_steps {
    display: table;
    list-style: none;
    position: relative;
    width: 20%;
    float: left;
    margin: 0 0 20px;
}
.list-unstyled {
    padding-left: 0;
}




.wizard_verticle ul.wizard_steps li a:before {
    content: "";
    position: absolute;
    height: 40%;
    background: #B4B4B4;
    top: 27px;
    width: 2px;
    z-index: 4;
    left: 49%;
}
.wizard_verticle ul.wizard_steps {
    display: table;
    list-style: none;
}
.wizard_verticle ul.wizard_steps li a {
    height: 80px;
}
a {
    text-decoration: none;
}


.wizard_verticle ul.wizard_steps li a, .wizard_verticle ul.wizard_steps li:hover {
    display: block;
    position: relative;
    -moz-opacity: 1;
    filter: alpha(opacity=100);
    opacity: 1;
    color: #666;
}

.wizard_verticle ul.wizard_steps li a {
    height: 30px;
}
.wizard_verticle ul.wizard_steps li a:first-child {
    margin-top: 12px;
}

.wizard_verticle ul.wizard_steps li a, .wizard_verticle ul.wizard_steps li:hover {
    display: block;
    position: relative;
    -moz-opacity: 1;
    filter: alpha(opacity=100);
    opacity: 1;
    color: #666;
}
.wizard_text{
    position: absolute;
    width: 14vw;
    font-size: 16px;
    text-align: left;
    margin-left: 20px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #636363;
    
}
.wizard_title{
    color:#00190E;
    text-align: center;
    width: inherit;
    font-size: 18px;
    padding-top: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.last_step ::before{
    display: none;
}
.second_bar{
    background-color: rgb(255, 255, 255);
    margin: 0;
    border-radius: unset;
    margin-bottom: 30px;
}
.second_bar_list{
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    padding: 18px;
}

</style>
  