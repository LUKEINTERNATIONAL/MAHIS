<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>Capture Fetal details</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="onNo()">
              <ion-icon :icon="closeOutline()"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-content>
          <basic-form
              :contentData="fetalDetails"
              :initialData="initialData"
              @update:selected="handleInputData"
              @update:inputValue="handleInputData"
          ></basic-form>
        </ion-card-content>
      </ion-card>

      <div class="button-container">
        <DynamicButton
            expand="block"
            @click="confirm()"
            name="Save"
            class="action-button"
        />
        <DynamicButton
            expand="block"
            @click="onNo()"
            name="Cancel"
            fill="clear"
            class="action-button"
        />
      </div>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { mapState } from "pinia";
import { YupValidateField } from "@/services/validation_service";
import { FetusDetailsValidationSchema, useFetalAssessment } from "@/apps/ANC/store/physical exam/FetalAssessmentStore";

export default defineComponent({
  name: "BabyDetailsModal",
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
    IonCard,
    IonCardContent,
    BasicForm,
  },
  data() {
    return {
      initialData: [] as any,
    };
  },
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
    closeModalFunc: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onYes: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onNo: {
      type: Function as PropType<() => void>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    ...mapState(useFetalAssessment, ["fetalDetails", "fetalAssessment"]),
  },
  mounted() {
    const fetalDetails = useFetalAssessment();
    this.initialData = fetalDetails.getInitialFetalDetails();
  },
  methods: {
    handleInputData(event: any) {
      YupValidateField(
          this.fetalDetails,
          FetusDetailsValidationSchema,
          event.name,
          event.value
      );
    },
    closeOutline() {
      return closeOutline;
    },
    closeModal() {
      this.closeModalFunc();
    },
    confirm() {
      this.onYes();
      this.fetalDetails = [];
      this.closeModal();
    },
  },
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
  flex-direction: column;
}

ion-card {
  background-color: white;
  padding: 16px;
  margin: 20px;
  border-radius: 8px;
}

ion-card-content {
  padding: 16px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0 20px;
}

.action-button {
  flex: 1;
  margin: 0 8px;
}

ion-button {
  --background: var(--ion-color-danger);
}
</style>
