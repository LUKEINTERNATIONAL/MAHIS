<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true">
    <ion-buttons slot="start" >
      <ion-title style="color: #0c0c0c">{{ title }}</ion-title>
      <ion-button >
        <ion-icon slot="icon-only"  style="color: #b02a37"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-content>
      <div style="display:flex;">
        <ion-footer collapse="fade" class="ion-no-border">
          <ion-row>
            <ion-col>
              <ion-button id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px" @click="onNo">No </ion-button>
            </ion-col>
            <ion-col>
              <DynamicButton name="Yes" @click="onYes()" fill="solid" style="float: right; margin: 2%; width: 130px" />

            </ion-col>
          </ion-row>
        </ion-footer>
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
  IonIcon, IonFooter, IonRow, IonCol
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons'
import DynamicButton from "@/components/DynamicButton.vue";

export default defineComponent({
  name: 'OPDPrintingModal',
  components: {
    DynamicButton,
    IonCol, IonRow, IonFooter,
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
      required: false

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
ion-footer {
  --ion-toolbar-background: #fff;
}
</style>
