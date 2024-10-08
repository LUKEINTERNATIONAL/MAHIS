<template>
  <ion-modal :is-open="isOpen" :show-backdrop="true" @didDismiss="closeModal">
    <ion-content>
      <ion-title style="color: black">{{ title }}</ion-title>
      <basic-form
        :contentData="babyDetails"
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
import {
  BabyDetailsValidationSchema,
  useSecondStageOfLabourStore,
} from "../../stores/delivery details/secondStageDelivery";
import { mapState } from "pinia";
import {
  getRadioSelectedValue,
  modifyCheckboxHeader,
  modifyFieldValue,
  modifyRadioValue,
  getCheckboxSelectedValue,
  modifyCheckboxValue,
} from "@/services/data_helpers";
import { YupValidateField } from "@/services/validation_service";

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
    ...mapState(useSecondStageOfLabourStore, ["babyDetails"]),
    ...mapState(useSecondStageOfLabourStore, ["secondStageDetails"]),
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
        const complications = [
          "Prematurity",
          "Sepsis",
          "Congenital abnormalities",
          "Asphyxia",
          "Other complications",
          "Low birthweight",
          "Nursery"
        ];
        const managementNewborn = [
          "Kangaroo mother care",
          "Antibiotics",
          "Other",
        ];
        this.handleComplicationCheck(complications)
        this.handleNone(complications, "None");
        this.handleNone(managementNewborn, "Routine newborn care");
        this.handleCongenitalCheck();
        this.handleAsphyxiaCheck();
        this.handleResuscitationChange();
      },
      deep: true,
    },
  },
  methods: {
    async handleInputData(event: any) {
      YupValidateField(
        this.babyDetails,
        BabyDetailsValidationSchema,
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
      this.babyDetails = [];
      this.closeModal();
    },
    handleChangeDisplay() {
      const babyGeneralCondition = getRadioSelectedValue(
        this.secondStageDetails,
        "Baby general condition at birth"
      );
      this.babyDetailsDisplayNone(
        babyGeneralCondition == "Macerated stillbirth" ||
          babyGeneralCondition == "Fresh stillbirth"
      );
    },
    babyDetailsDisplayNone(visibility: boolean) {
      modifyFieldValue(
        this.babyDetails,
        "First name",
        "displayNone",
        visibility
      );
      modifyFieldValue(
        this.babyDetails,
        "Last name",
        "displayNone",
        visibility
      );
      modifyFieldValue(
        this.babyDetails,
        "Apgar score at 1 minute",
        "displayNone",
        visibility
      );
      modifyFieldValue(
        this.babyDetails,
        "Apgar score at 5 minute",
        "displayNone",
        visibility
      );
      modifyRadioValue(
        this.babyDetails,
        "Tetracycline eye ointment given",
        "displayNone",
        visibility
      );
      modifyRadioValue(
        this.babyDetails,
        "Chlorhexidine",
        "displayNone",
        visibility
      );
      modifyCheckboxHeader(
        this.babyDetails,
        "Newborn baby complications",
        "displayNone",
        visibility
      );
      // modifyCheckboxHeader(
      //   this.babyDetails,
      //   "Management to newborn",
      //   "displayNone",
      //   visibility
      // );
      modifyRadioValue(
        this.babyDetails,
        "Oxytocin 10 UI given",
        "displayNone",
        visibility
      );
      modifyRadioValue(
        this.babyDetails,
        "Vitamin K given",
        "displayNone",
        visibility
      );
    },
    handleNone(checkBoxes: Array<any>, noneConcept: string) {
      if (getCheckboxSelectedValue(this.babyDetails, noneConcept)?.checked) {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.babyDetails, checkbox, "checked", false);
          modifyCheckboxValue(this.babyDetails, checkbox, "disabled", true);
        });
      } else {
        checkBoxes.forEach((checkbox) => {
          modifyCheckboxValue(this.babyDetails, checkbox, "disabled", false);
        });
      }
    },


    // find another means
    handleComplicationCheck(checkBoxes: any) {
      let checked=false;
      checkBoxes.forEach((checkbox: string) => {
        checked =
          checked ||
          getCheckboxSelectedValue(this.babyDetails, checkbox)?.checked;
      });

      modifyCheckboxHeader(this.babyDetails,"Management to newborn","displayNone", !checked);
    },

    handleCongenitalCheck() {
      const checked = getCheckboxSelectedValue(
        this.babyDetails,
        "Congenital abnormalities"
      )?.checked;

      modifyFieldValue(this.babyDetails, "Specify", "displayNone", !checked);
    },
    handleAsphyxiaCheck() {
      const checked = getCheckboxSelectedValue(
        this.babyDetails,
        "Asphyxia"
      )?.checked;

      modifyRadioValue(
        this.babyDetails,
        "Resuscitation attempt",
        "displayNone",
        !checked
      );
    },

    handleResuscitationChange() {
      const yesValue =
        getRadioSelectedValue(this.babyDetails, "Resuscitation attempt") ==
        "Yes";

      modifyRadioValue(
        this.babyDetails,
        "Type of resuscitation",
        "displayNone",
        !yesValue
      );
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