<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-content>
      <ion-title style="color:black">{{ title }}</ion-title>
      <basic-form :contentData="babyDetails" :initialData="initialData" @update:selected="handleInputData"
        @update:inputValue="handleInputData"></basic-form>

         <!-- Resuscitation attempt section -->
      <div v-if="!getFieldDisplayNone('Resuscitation attempt')">
        <basic-form 
          :contentData="babyDetails" 
          section="Resuscitation attempt"
          @update:selected="handleInputData"
        ></basic-form>
      </div>

      <!-- Type of resuscitation section -->
      <div v-if="!getFieldDisplayNone('Type of resuscitation')">
        <basic-form 
          :contentData="babyDetails" 
          section="Type of resuscitation"
          @update:selected="handleInputData"
        ></basic-form>
      </div>
      <div style="display:flex;">
        <DynamicButton expand="block" @click="confirm()" name="Save" :style="`flex:1`" />
        <DynamicButton expand="block" @click="onNo()" :style="`flex:1`" name="Cancel" fill="clear" />
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
import { BabyDetailsValidationSchema, useDeliveryDetailsStore } from '../../stores/postnatal details/DeliveryDetails';
import { mapState } from 'pinia';
import {
  getRadioSelectedValue,
  modifyCheckboxHeader,
  modifyFieldValue,
  modifyRadioValue,
  getCheckboxSelectedValue,
  modifyCheckboxValue
} from '@/services/data_helpers';
import { YupValidateField } from '@/services/validation_service';

export default defineComponent({
  name: 'BabyModal',
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
      initialData: [] as any
    };
  },
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false
    },
    closeModalFunc: {
      type: Function as PropType<() => void>,
      required: true
    },
    onYes: {
      type: Function as PropType<() => void>,
      required: true
    },
    onNo: {
      type: Function as PropType<() => void>,
      required: true
    },
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  computed: {
    ...mapState(useDeliveryDetailsStore, ["babyDetails"]),
    ...mapState(useDeliveryDetailsStore, ["deliveryDetails"]),
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
        const complications = ['Prematurity', 'Sepsis', 'Congenital abnormalities', 'Asphyxia', 'Other complications', "Low birthweight"];
        const managementNewborn = ['Kangaroo mother care', 'Antibiotics', 'Other'];
        this.handleNone(complications, 'None');
        this.handleNone(managementNewborn, 'Nothing');
        this.handleCongenitalCheck();
        this.handleAsphyxia();
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
    onNo() {
      this.babyDetails = []; 
      this.closeModal(); 
    },
    handleChangeDisplay() {
      const babyGeneralCondition = getRadioSelectedValue(this.deliveryDetails, 'Baby general condition at birth');
      this.babyDetailsDisplayNone(babyGeneralCondition == "Macerated stillbirth" || babyGeneralCondition == "Fresh stillbirth");
    },
    getFieldDisplayNone(sectionName: string) {
      const section = this.babyDetails.find((item: { childName: string; }) => item.childName === sectionName);
      return section?.radioBtnContent?.header?.displayNone || true;
    },
    babyDetailsDisplayNone(visibility: boolean) {
      modifyFieldValue(this.babyDetails, "First name", "displayNone", visibility);
      modifyFieldValue(this.babyDetails, "Last name", "displayNone", visibility);
      modifyFieldValue(this.babyDetails, "Apgar score at 1 minute", "displayNone", visibility);
      modifyFieldValue(this.babyDetails, "Apgar score at 5 minute", "displayNone", visibility);
    },
    handleNone(checkBoxes: Array<any>, noneConcept: string) {
        if (getCheckboxSelectedValue(this.babyDetails, noneConcept)?.checked) {
          console.log("this is checked: ");

        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.babyDetails, checkbox, 'checked', false);
          modifyCheckboxValue(this.babyDetails, checkbox, 'disabled', true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.babyDetails, checkbox, 'disabled', false);
        });
      }
    },
    handleAsphyxia() {
      const asphyxiaChecked = getCheckboxSelectedValue(this.babyDetails, "Asphyxia")?.checked;
      
      if (asphyxiaChecked) {
        modifyRadioValue(this.babyDetails, "Resuscitation attempt", "displayNone", false);

        const resuscitationAttempt = getRadioSelectedValue(this.babyDetails, "Resuscitation attempt");
        modifyRadioValue(this.babyDetails, "Type of resuscitation", "displayNone", resuscitationAttempt !== 'Yes');

      } else {
        modifyFieldValue(this.babyDetails, "Resuscitation attempt", "displayNone", true);
        modifyFieldValue(this.babyDetails, "Type of resuscitation", "displayNone", true);
      }
  },
    handleCongenitalCheck() {
      const checked = getCheckboxSelectedValue(this.babyDetails, "Congenital abnormalities")?.checked;
      modifyFieldValue(this.babyDetails, "Specify", "displayNone", !checked);
    }
  }
});
</script>

<style scoped>
ion-modal {
  --background: rgba(255, 255, 255, 0.95); /* Lighter background */
  --width: 95vw; /* 95% of the viewport width for better responsiveness */
  --height: 85vh; /* 85% of the viewport height */
  --max-width: 700px;
  --max-height: 900px;
}

ion-header {
  --background: var(--ion-color-primary);
}

ion-title {
  color: var(--ion-color-light);
}

ion-content {
  display: flex;
}
</style>
