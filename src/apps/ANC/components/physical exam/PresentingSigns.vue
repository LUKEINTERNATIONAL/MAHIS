<template>
  <div class="container">
    <!-- Signs of injury -->
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Injuries</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="signsOfInjury"></basic-form>
        <basic-form :contentData="abdominalInjury"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- clinical enquirry -->
    <ion-card  class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header"> Clinical enquiry</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="clinicalEnquiry"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- any form of violence -->
    <ion-card class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Violence to the woman</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="violence"></basic-form>
        <basic-form :contentData="intimateViolence"></basic-form>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  menuController,
  IonInput, IonToggle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmark,pulseOutline } from 'ionicons/icons';
import { icons } from '@/utils/svg';
import {usePresentingSigns} from "@/apps/ANC/store/physical exam/PresentingSignsStore";
import { mapState } from 'pinia';
import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
import { arePropertiesNotEmpty } from "@/utils/Objects";
import HisDate from "@/utils/Date";
import BasicInputField from "@/components/BasicInputField.vue"
import { VitalsService } from "@/services/vitals_service";
import BasicForm from '@/components/BasicForm.vue';
import { Service } from "@/services/service";

export default defineComponent({
  components:{
    IonToggle,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    BasicInputField,
    BasicForm
  },
  data() {
    return {
      iconsContent: icons,
      currentSection: 0, // Initialize currentSection to 0
      vValidations: '' as any,
      hasValidationErrors: [] as any,
    };
  },
  computed:{

    ...mapState(usePresentingSigns,["signsOfInjury"]),
    ...mapState(usePresentingSigns,["abdominalInjury"]),
    ...mapState(usePresentingSigns,["violence"]),
    ...mapState(usePresentingSigns,["clinicalEnquiry"]),
    ...mapState(usePresentingSigns,["intimateViolence"]),
  },
  mounted(){

  },
  watch: {

  },
  setup() {
    return { checkmark,pulseOutline };
  },
  methods:{
    navigationMenu(url: any){
      menuController.close()
      this.$router.push(url);
    },
    //Method for navigating
    goToNextSection() {
      if (this.currentSection < 2) {
        this.currentSection++;
      }
    },
    goToPreviousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
      }
    },

  }
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
  max-width: 1300px; /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
  .container {
    padding: 10px;
  }
}
.sub_item_header{
  font-weight: bold;
  font-size: medium;
}
ion-card {
  box-shadow:none;
  background-color:inherit;
}
</style>
