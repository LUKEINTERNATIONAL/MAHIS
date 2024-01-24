<template>
    <ion-row>
        <ion-col size="1" size-lg="1"></ion-col>
        <ion-col size="3" size-lg="3">
            <ion-card style="max-width: 300px; background-color: #fff;">
                <div class="wizard_title"><strong > The consultation plan</strong></div>
                <ion-card-content>
                    <div id="wizard_verticle" class="form_wizard wizard_verticle">
                        <ul class="list-unstyled wizard_steps anchor">
                            <li v-for="(item, index) in wizardData" :key="index" :class="item.last_step">
                                <a  class="done" isdone="1" rel="1">
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
            <div class="back_profile" @click="openModal()">
                <ion-icon style="font-size: 20px;" :icon="chevronBackOutline"> </ion-icon> 
                <span style="cursor: pointer;"> Back to profile</span>
            </div>
            
            <ion-accordion-group @ionChange="accordionGroupChange($event)">
                <ion-accordion v-for="(item, index) in StepperData" :key="index"  :value="item.value">
                    <ion-item slot="header">
                        <ion-label>{{ item.title }}</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <component :is="item.componet" > </component>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
            <hr style="background: rgba(0, 0, 0, 0.13);">
            <ion-button class="primary_btn" @click="$emit('finishBtn')">Finish and Save</ion-button>
        </ion-col>
    </ion-row>
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
    AccordionGroupCustomEvent } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  import Vitals from '@/apps/NCD/components/ConsultationPlan/Vitals.vue'
  import Diagnosis from '@/apps/NCD/components/ConsultationPlan/Diagnosis.vue'
  import Complications from '@/apps/NCD/components/ConsultationPlan/Complications.vue'
  import ConfirmDiagnosis from '@/apps/NCD/components/ConsultationPlan/ConfirmDiagnosis.vue'
  import Disposition from '@/apps/NCD/components/ConsultationPlan/Disposition.vue'
  import Investigations from '@/apps/NCD/components/ConsultationPlan/Investigations.vue'
  import TreatmentPlan from '@/apps/NCD/components/ConsultationPlan/TreatmentPlan.vue'
  import Medications from "@/apps/ANC/components/profile/Medications.vue";
  import WomanBehaviour from "@/apps/ANC/components/profile/WomanBehaviour.vue";
  import SaveProgressModal from '@/components/SaveProgressModal.vue'
  import { createModal } from '@/utils/Alerts'
  import { icons } from '@/utils/svg';
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
        TreatmentPlan,
        IonModal,
        Medications,
        WomanBehaviour
    },
    data(){
        return {
            isOpen: false,
            iconsContent: icons,
        };
    },
    props:{
        wizardData: {
            type: Array,
            default: []
        },
        StepperData: {
            type: Array,
            default: []
        },
    },
    setup() {
        return { chevronBackOutline,checkmark };
    },
    
      methods:{
        accordionGroupChange(ev: AccordionGroupCustomEvent){

          this.wizardData.forEach((item: any) => {
            item.class = "common_step"
            if(ev.target.className == "md accordion-group-expand-compact"){
                item.checked = false;
                if (item.number == ev.detail.value) {
                    item.class = 'open_step common_step';
                } 
            }
          });
            this.$emit("updateStatus", ev);
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
  