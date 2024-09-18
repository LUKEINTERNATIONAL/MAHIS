<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-content>
      <ion-title style="color: black">{{ title }}</ion-title>
      <basic-form
          :contentData="fetalDetails"
          :initialData="initialData"
          @update:selected="handleInputData"
          @update:inputValue="handleInputData"

      ></basic-form>
      <div style="display: flex">
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
import { defineComponent, PropType } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { mapState } from "pinia";
import {
  getRadioSelectedValue,
  modifyCheckboxHeader,
  modifyFieldValue,
  modifyRadioValue,
  getCheckboxSelectedValue,
  modifyCheckboxValue,
} from "@/services/data_helpers";
// import { YupValidateField } from "@/services/validation_service";
import {useFetalAssessment} from "@/apps/ANC/store/physical exam/FetalAssessmentStore";

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
    ...mapState(useFetalAssessment,["fetalDetails","fetalAssessment"]),
  },

  watch: {
    secondStageDetails: {
      async handler() {
      },
      deep: true,
    },
    babyDetails: {
      handler() {
      },
      deep: true,
    },
  },
  methods: {
    async handleInputData(event: any) {
      // YupValidateField(
      //     this.fetalDetails,
      //     BabyDetailsValidationSchema,
      //     event.name,
      //     event.value
      // );
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
  /* flex-direction: column; */
  /* border: black solid 8px; */
}
</style>