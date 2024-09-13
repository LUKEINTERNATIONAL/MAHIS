<template>
    <ion-modal  :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
     <ion-content>
        <ion-title style="color:black">{{title}}</ion-title>
         <basic-form
            :contentData="babyDetails"
            :initialData="initialData"
             @update:selected="handleInputData" 
             @update:inputValue="handleInputData"
            ></basic-form>
        <div style="display:flex;">
          <DynamicButton
              expand="block"
              @click="confirm()"
              name="Save"
              :style="`flex:1`"
          />
          <DynamicButton
              expand="block"
              @click="onNo()"
              :style="`flex:1`"
              name="Cancel"
              fill="clear"
          />
        </div>
      </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon
  } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from '@/components/BasicForm.vue';
import { BabyDetailsValidationSchema, useSecondStageOfLabourStore } from '../../stores/delivery details/secondStageDelivery';
import { mapState } from 'pinia';
import { getRadioSelectedValue, modifyCheckboxHeader, modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
import { YupValidateField } from '@/services/validation_service';


  export default defineComponent({
    name: 'BabyDetailsModal',
    components: {
      DynamicButton,
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonContent,
      IonIcon,
      BasicForm
      },
      data() {
          return {    
              initialData:[]as any  
        }
    },
    props: {
      isOpen: {
        type: Boolean as PropType<boolean>,
        required: true,
        default: false
      },
      closeModalFunc : {
          type: Function as PropType<()=>void>,
          required: true
          
      },
      onYes : {
          type: Function as PropType<()=>void>,
          required: true
          
      },
      onNo : {  
          type: Function as PropType<()=>void>,
          required: true
          
      },
      title:{
          type: String as PropType<string>,
          required: true
      }
      },
      computed: {
        ...mapState(useSecondStageOfLabourStore, ["babyDetails"]),
        ...mapState(useSecondStageOfLabourStore, ["secondStageDetails"]),
   
    },
  
    watch: {
    secondStageDetails: {
       async handler() {
        this.handleChangeDisplay();
      },
      deep: true,
    },
    babyDetails: {
      handler() {
        this.handleChangeDisplay();
      },
      deep: true,
    },
  },
    methods: {
      async handleInputData(event: any) {
        YupValidateField(this.babyDetails, BabyDetailsValidationSchema, event.name, event.value);
      },
      closeOutline() {
        return closeOutline;
      },
      closeModal() {
        this.closeModalFunc();
      },
    confirm() {
        this.onYes();
        this.babyDetails = [];
        this.closeModal();
      },
      handleChangeDisplay() {
        const babyGeneralCondition = getRadioSelectedValue(this.secondStageDetails, 'Baby general condition at birth');
        this.babyDetailsDisplayNone(babyGeneralCondition == "Macerated stillbirth" || babyGeneralCondition == "Fresh stillbirth")
      
      },
      babyDetailsDisplayNone(visibility:boolean) {
      modifyFieldValue(this.babyDetails,"First name","displayNone", visibility)
      modifyFieldValue(this.babyDetails,"Last name","displayNone", visibility)
      modifyFieldValue(this.babyDetails,"Apgar score at 1 minute","displayNone", visibility)
      modifyFieldValue(this.babyDetails, "Apgar score at 5 minute", "displayNone", visibility)
      modifyRadioValue(this.babyDetails, 'Tetracycline eye ointment given', 'displayNone', visibility);
      modifyRadioValue(this.babyDetails, 'Chlorhexidine', 'displayNone', visibility);
      modifyCheckboxHeader(this.babyDetails,'Newborn baby complications','displayNone', visibility)
      modifyCheckboxHeader(this.babyDetails,'Management to newborn','displayNone', visibility)
      modifyRadioValue(this.babyDetails,'Oxytocin 10 UI given','displayNone', visibility)
      modifyRadioValue(this.babyDetails,'Vitamin K given','displayNone', visibility)
    }
    }
  });
  </script>
  
  <style scoped>
  ion-modal {
    --background: rgba(0, 0, 0, 0.9);
    --width: 100%;
    --height: 90%;
    --max-width: 700px;
    --max-height: 1000px;
  }
  
  ion-header {
    --background: var(--ion-color-primary);
  }
  
  ion-title {
    color: var(--ion-color-light);
  
  }
  
  ion-content {
    display: flex;
    /* flex-direction: column; */
    /* border: black solid 8px; */
  
  }
  </style>
  