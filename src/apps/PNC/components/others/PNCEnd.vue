<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title
          class="dashed_bottom_border sub_item_header"
        ></ion-card-title
      ></ion-card-header>
      <ion-card-content>
        <basic-form
          :contentData="pncEnd"
          :initialData="initialData"
        ></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonToggle,
  IonSelectOption,
  IonInput,
  IonSelect,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import BasicForm from "../../../../components/BasicForm.vue";
import { icons } from "../../../../utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { checkmark, pulseOutline } from "ionicons/icons";
import BasicCard from "@/components/BasicCard.vue";
import { useDeliveryDetailsStore } from "@/apps/PNC/stores/postnatal details/DeliveryDetails";
import { usePNCEndStore } from "@/apps/PNC/stores/others/pncEnd";
import PncEnd from "../../views/pncEnd.vue";
import {
  getRadioSelectedValue,
  modifyCheckboxInputField,
  modifyFieldValue,
} from "@/services/data_helpers";
export default defineComponent({
  name: "PNCEnd",
  components: {
    BasicCard,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonInput,
    BasicInputField,
    BasicForm,
    IonRadio,
    IonRadioGroup,
  },

  data() {
    return {
      iconsContent: icons,
      vValidations: "" as any,
      hasValidationErrors: [] as any,
      inputField: "" as any,
      initialData: [] as any,
    };
  },
  computed: {
    ...mapState(usePNCEndStore, ["pncEnd"]),
  },
  mounted() {
    const pncEnd = usePNCEndStore();
    this.initialData = pncEnd.getInitial();
    this.handleSelection();
  },
  watch: {
    pncEnd: {
      handler(col) {
        this.handleSelection();
      },
      deep: true,
    },
  },
  setup() {
    return { checkmark, pulseOutline };
  },
  methods: {
    handleSelection() {
      if (
        getRadioSelectedValue(this.pncEnd, "Reason for ending PNC") == "Refer"
      ) {
        modifyFieldValue(this.pncEnd, "facility for art", "displayNone", false);
      } else {
        modifyFieldValue(this.pncEnd, "facility for art", "displayNone", true);
      }

      if (
        getRadioSelectedValue(this.pncEnd, "Reason for ending PNC") == "Death"
      ) {
        modifyFieldValue(this.pncEnd, "Date of Death", "displayNone", false);
      } else {
        modifyFieldValue(this.pncEnd, "Date of Death", "displayNone", true);
      }
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 1300px;
  margin-bottom: 20px;
}

ion-card {
  width: 100%;
  color: black;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header {
  font-weight: bold;
  font-size: 14px;
}
</style>
yle>
