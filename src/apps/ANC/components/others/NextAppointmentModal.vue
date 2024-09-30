<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-row>
    <ion-col style="margin-left: -3px">
      <div class="om" style="font-weight: 600; color: #8d8686">Set Next Appointment Date</div>
    </ion-col>
    <ion-col size="6" style="text-align: right">
      <ion-label class="lbl-tl" style="font-size: 13px">
        Todays Date: <span class="lbl-ct">{{ sessionDate }}</span></ion-label
      >
    </ion-col>
    </ion-row>
    <ion-content>
          <basic-form
              :contentData="nextAppointmentDate"
              :initialData="initialData"
              @update:selected="handleInputData"
              @update:inputValue="handleInputData"
          ></basic-form>

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
  IonIcon, IonCol, IonLabel,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { mapState } from "pinia";
import { YupValidateField } from "@/services/validation_service";
import { FetusDetailsValidationSchema, useFetalAssessment } from "@/apps/ANC/store/physical exam/FetalAssessmentStore";
import {
  NextAppointmentValidationSchema,
  useScheduleNextAppointmentStore
} from "@/apps/ANC/store/others/scheduleNextAppointment";
import {modifyFieldValue} from "@/services/data_helpers";
import HisDate from "@/utils/Date";
import {Service} from "@/services/service";

const sessionDate = HisDate.toStandardHisDisplayFormat(Service.getSessionDate());

export default defineComponent({
  name: "BabyDetailsModal",
  components: {
    IonLabel, IonCol,
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
    sessionDate() {
      return sessionDate
    },
    ...mapState(useScheduleNextAppointmentStore, ["nextAppointmentDate"]),
  },
  mounted() {
    const nextAppointmentDate = useScheduleNextAppointmentStore();
    this.initialData = nextAppointmentDate.getInitialNextAppointmentDate()
  },
  methods: {
    handleInputData(event: any) {
      YupValidateField(
          this.nextAppointmentDate,
          NextAppointmentValidationSchema,
          event.name,
          event.value
      );

      this.handleDateOfScheduledAppointmentRange(event)
    },
    closeOutline() {
      return closeOutline;
    },
    handleDateOfScheduledAppointmentRange(event: any) {
      const currentDate = new Date();

      const minDate = new Date(currentDate);
      minDate.setDate(minDate.getDate() + 1);
      const formattedMinDate = minDate.toISOString().split('T')[0];

      // Set maximum date to 32 days from today
      const maxDate = new Date(currentDate);
      maxDate.setDate(maxDate.getDate() + 32);
      const formattedMaxDate = maxDate.toISOString().split('T')[0];

      // Set the minDate and maxDate
      modifyFieldValue(this.nextAppointmentDate, 'Appointment date', 'minDate', formattedMinDate);
      modifyFieldValue(this.nextAppointmentDate, 'Appointment date', 'maxDate', formattedMaxDate);
    },

    closeModal() {
      this.closeModalFunc();
    },
    confirm() {
      this.onYes();
      this.nextAppointmentDate = [];
      this.closeModal();
    },
  },
});
</script>

<style scoped>
ion-modal {
  --background: rgba(0, 0, 0, 0.9);
  --width: 80%;
  --height: 40%;
  --max-width: 500px;
  --max-height: 250px;
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
