<template>
    <ion-alert
      :is-open="isOpen"
      header="No Available Batches/Lot Numbers"
      sub-header=""
      :message="messageContent"
      :buttons="alertButtons"
      css-class="my-custom-alert"
      @didDismiss="handleDismiss"
    ></ion-alert>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { IonAlert, modalController } from '@ionic/vue';
  
  export default defineComponent({
    name: 'MyComponent',
    components: {
      IonAlert,
    },
    data() {
      return {
        isOpen: false,
        alertButtons: [
          {
            text: 'Close',
            role: 'cancel',
            cssClass: 'alert-danger-button'
          }
        ],
        messageContent: 'Please Update Stock',
      };
    },
    methods: {
      setOpen(state: boolean) {
        this.isOpen = state;
      },
      handleDismiss() {
        this.setOpen(false);
        this.$emit('alertClosed');
        this.dismiss()
      },
      dismiss() {
        modalController.dismiss();
    },
    },
    mounted() {
      this.setOpen(true);
    }
  });
  </script>
  
  <style scoped>
  /* Custom alert styling */
  .my-custom-alert {
    --background: #ffffff;
    --color: #cf4a4a !important;
  }
  
  /* Ensure styles are applied deeply */
  ::v-deep(.alert-button-group) {
    padding: 8px;
  }
  
  ::v-deep(.alert-danger-button) {
    background-color: #cf4a4a !important;
    color: var(--ion-color-light) !important;
  }
  
  /* Custom styles for alert message */
  .alert-message-red {
    color: #cf4a4a !important;
  }
  </style>
  