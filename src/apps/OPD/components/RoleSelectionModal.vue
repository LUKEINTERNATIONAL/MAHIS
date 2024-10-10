<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <b>Select role</b>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">
            <ion-icon slot="icon-only" :icon="closeOutline()"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="button-container">
        <DynamicButton
            expand="block"
            color="primary"
            @click="navigateTo('dispensation')"
            name="Go to pharmacy"
            fill="clear"
            :style="buttonStyle"
        />
        <DynamicButton
            expand="block"
            color="primary"
            @click="navigateTo('OPDConsultationPlan')"
            name="Go to laboratory"
            fill="clear"
            :style="buttonStyle"
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
  name: 'RoleSelectionModal',
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
      required: true
    }
  },
  data() {
    return {
      buttonStyle: {
        background: 'rgba(224, 255, 255, 0.3)',
        backdropFilter: 'blur(5px)',
        color: 'white',
        borderRadius: '5px',
        padding: '10px',
        width: '80%',
        margin: '10px auto',
        display: 'block',
        textAlign: 'center',
      }
    };
  },
  methods: {
    closeOutline() {
      return closeOutline;
    },
    closeModal() {
      this.$emit('update:isOpen', false);
    },
    navigateTo(route: string) {
      this.closeModal();
      this.$router.push(route);
    }
  }
});
</script>

<style scoped>
ion-modal {
  --background: rgba(0, 0, 0, 0.9);
  --width: 90%;
  --height: 94%;
  --max-width: 500px;
  --max-height: 300px;
}

ion-header {
  --background: var(--ion-color-primary);
}

ion-title {
  color: var(--ion-color-light);
}

ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
