<template>
    <ion-modal  :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
     <ion-content>
        <ion-title  style="color:black; font-size: 15px">{{title}}</ion-title>
        <div style="display:flex;">
          <DynamicButton
              expand="block"
              @click="onYes()"
              name="Yes"
              :style="`flex:1`"
          />
          <DynamicButton
              expand="block"
              @click="onNo()"
              :style="`flex:1`"
              name="No"
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
  
  export default defineComponent({
    name: 'AncEnrollmentModal',
    components: {
      DynamicButton,
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonContent,
      IonIcon
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
    methods: {
      closeOutline() {
        return closeOutline;
      },
      closeModal() {
        // this.$emit('update:isOpen', false);
        this.closeModalFunc();
      },
      confirm(test:string) {
        this.closeModal();
      }
    }
  });
  </script>
  
  <style scoped>
  ion-modal {
    --background: rgba(0, 0, 0, 0.9);
    --width: 90%;
    --height: 10%;
    --max-width: 500px;
    --max-height: 100px;
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