<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
        <ion-buttons slot="start" >
          <ion-title style="color: #0c0c0c">{{ title }}</ion-title>
          <ion-button @click="closeModal">
            <ion-icon slot="icon-only" :icon="closeOutline()" style="color: #b02a37"></ion-icon>
          </ion-button>
        </ion-buttons>
    <ion-content>
      <div v-if="isCheckInPrompt" style="display:flex;">
        <DynamicButton
            expand="block"
            @click="onYes()"
            name="Create visit"
            :style="`flex:1`"
        />
        <DynamicButton
            expand="block"
            @click="onNo()"
            :style="`flex:1`"
            name="View profile"
            fill="clear"
        />
      </div>
      <div v-else style="display:flex;">
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
  name: 'CheckInConfirmationModal',
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
  computed: {
    isCheckInPrompt() {
      return this.title === "Do you want to create visit or view profile?";
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
  --height: 20%;
  --max-width: 550px;
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
