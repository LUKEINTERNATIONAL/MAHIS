<template>
      <ion-card-header>
        <ion-card-title class="ion-text-center">{{ message }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-row class="ion-justify-content-center ion-margin-top">
          <ion-col>
            <ion-button @click="onCancel" color="medium" class="ion-margin-end" style="float: left;">
              <ion-icon :icon="close" slot="start"></ion-icon>
              No
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="onConfirm" color="primary" style="float: right;">
              <ion-icon :icon="checkmark" slot="start"></ion-icon>
              Yes
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-card-content>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonRow, IonCol, IonText, modalController } from '@ionic/vue';
  import { checkmark, close } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'ConfirmComponent',
    components: {
      IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonRow, IonCol, IonText
    },
    props: {
      title: {
        type: String,
        default: 'Confirmation'
      },
      message: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }) {
      const onCancel = async () => {
        emit('cancel');
        try {
        const modal = await modalController.getTop();
            if (modal) {
            modal.dispatchEvent(new CustomEvent('cancel', { detail: true }));
            }
        } catch (error) {
            console.error('Error viewing patient profile:', error);
        }
        modalController.dismiss("dismiss");
      };
  
      const onConfirm = async () => {
        emit('confirm');
        try {
        const modal = await modalController.getTop();
            if (modal) {
            modal.dispatchEvent(new CustomEvent('confirm', { detail: true }));
            }
        } catch (error) {
            console.error('Error viewing patient profile:', error);
        }
        modalController.dismiss("dismiss");
      };
  
      return {
        onCancel,
        onConfirm,
        checkmark,
        close
      };
    }
  });
  </script>
  
  <style scoped>
  ion-card {
    margin: 0;
    max-width: 400px;
    width: 100%;
  }
  </style>