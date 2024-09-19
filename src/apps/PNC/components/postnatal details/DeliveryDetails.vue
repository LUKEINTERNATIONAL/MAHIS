<template>
  <div class="container">
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Delivery Details</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form
          :contentData="deliveryDetails"
          :initialData="initialData"
          @update:selected="handleInputData"
          @update:inputValue="handleInputData"
        ></basic-form>

        <!-- Baby Modal for adding baby details -->
        <BabyModal  
          :closeModalFunc="closeBabyModal"
          :onYes="handleBabyYes"
          :onNo="handleBabyNo"
          :isOpen="babyModalOpen"
          :title="``"
        />

        <!-- Loop to add/view baby details -->
        <div v-if="arrayOfBabies.length > 0">
          <div v-for="n in arrayOfBabies" :key="n">
            <ion-button v-if="!checkIfSubmitted(n)" @click="handleAddBabyDetails(n)">
              Add Baby {{ n + 1 }}
            </ion-button>
            <ion-button v-if="checkIfSubmitted(n)" @click="selectBaby(n)">
              View Baby {{ n + 1 }}
            </ion-button>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton
} from '@ionic/vue';
import BasicForm from '../../../../components/BasicForm.vue';
import { useDeliveryDetailsStore } from "@/apps/PNC/stores/postnatal details/DeliveryDetails";
import BabyModal from './BabyModal.vue';
import { getRadioSelectedValue, modifyRadioValue, modifyCheckboxValue, getFieldValue } from "@/services/data_helpers";
import { validateField } from "@/services/PNC/obstetric_details_validation_service";

export default defineComponent({
  name: "DeliveryDetails",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonButton,
    BasicForm,
    BabyModal,
  },

  data() {
    return {
      initialData: [] as any,
      arrayOfBabies: [] as any,
      babyModalOpen: false,
      selectedBaby: 0,
      babiesDetails: [] as any,
      showSection: false,
    };
  },

  computed: {
    deliveryDetails() {
      return useDeliveryDetailsStore().deliveryDetails;
    }
  },

  mounted() {
    this.initialData = useDeliveryDetailsStore().getInitial();
    this.handleDeliveryDetails();
    this.handlePastProblems();
  },

  watch: {
    deliveryDetails: {
      handler() {
        this.handleDeliveryDetails();
        this.handlePastProblems();
        this.handleNumberOfBabies();
        this.handleSelectedStillBirth();
      },
      deep: true,
    },
  },

  methods: {
    handleNumberOfBabies() {
      const numberOfBabies = getFieldValue(this.deliveryDetails, 'Number of babies', 'value');
      this.arrayOfBabies = [...Array(Number(numberOfBabies)).keys()];
    },

    closeBabyModal() {
      this.babyModalOpen = false;
    },

    handleSelectedStillBirth() {
      const babyGeneralCondition = getRadioSelectedValue(this.deliveryDetails, 'Baby general condition at birth');

      if (babyGeneralCondition === "Macerated stillbirth" || babyGeneralCondition === "Fresh stillbirth") {
        this.showSection = false;
        this.babyDetailsDisplayNone(true);
        return;
      }
      this.babyDetailsDisplayNone(false);
      this.showSection = true;
    },

    selectBaby(n: any) {
      this.selectedBaby = n;
      const baby = this.babiesDetails.find((b: any) => b.baby == n);
      const deliveryDetails = useDeliveryDetailsStore();
      deliveryDetails.setBabyDetails(baby?.details || []);
      this.toggleBabyModal();
    },

    checkIfSubmitted(n: any) {
      return !!this.babiesDetails.find((b: any) => b.baby == n);
    },

    handleBabyYes() {
      this.toggleBabyModal();
      const deliveryDetails = useDeliveryDetailsStore();
      const index = this.babiesDetails.findIndex((b: any) => b.baby == this.selectedBaby);
      if (index < 0) {
        this.babiesDetails.push({ baby: this.selectedBaby, details: [...deliveryDetails.babyDetails] });
      } else {
        this.babiesDetails[index].details = [...deliveryDetails.babyDetails];
      }
      deliveryDetails.setBabyDetails();
    },

    handleBabyNo() {
      this.toggleBabyModal();
      useDeliveryDetailsStore().setBabyDetails([]);
    },

    toggleBabyModal() {
      this.babyModalOpen = !this.babyModalOpen;
    },

    handleAddBabyDetails(babyNumber: number) {
      this.selectedBaby = babyNumber;
      this.toggleBabyModal();
    },

    babyDetailsDisplayNone(visibility: boolean) {
      modifyRadioValue(this.babiesDetails, "First name", "displayNone", visibility);
      modifyRadioValue(this.babiesDetails, "Last name", "displayNone", visibility);
    },

    handlePastProblems() {
      const checkBoxes = ['Prematurity', 'Sepsis', 'Congenital abnormalities', 'Asphyxia', 'Other complications'];
      const noneSelected = getRadioSelectedValue(this.deliveryDetails, 'None');

      checkBoxes.forEach((checkbox) => {
        modifyCheckboxValue(this.deliveryDetails, checkbox, 'disabled', !!noneSelected?.checked);
      });
    },

    handleDeliveryDetails() {
      const outcome = getRadioSelectedValue(this.deliveryDetails, 'Outcome of the delivery');
      const resuscitationAttempt = getRadioSelectedValue(this.deliveryDetails, 'Was resuscitation attempted?');

      if (outcome === 'Stillbirths') {
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'displayNone', false);
      } else {
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'displayNone', true);
        modifyRadioValue(this.deliveryDetails, 'Type of still birth', 'selectedValue', '');
      }

      if (resuscitationAttempt === 'Yes') {
        modifyRadioValue(this.deliveryDetails, 'Type of resuscitation', 'displayNone', true);
      } else {
        modifyRadioValue(this.deliveryDetails, 'Type of resuscitation', 'displayNone', true);
        modifyRadioValue(this.deliveryDetails, 'Type of resuscitation', 'selectedValue', '');
      }
    },

    validationRules(event: any) {
      return validateField(this.deliveryDetails, event.name, this[event.name]);
    },

    async handleInputData(event: any) {
      this.validationRules(event);
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

@media (max-width: 1500px) {
  .container {
    width: 100%;
  }
}
</style>