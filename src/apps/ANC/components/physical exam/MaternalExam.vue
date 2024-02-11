<template>
  <div class="container">
    <!-- Pallor -->
    <ion-card v-if="currentSection === 0" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Is Pallor present?</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="pallor"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Breast exam Section -->
    <ion-card v-if="currentSection === 1" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Breast exam result</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="breastExam"></basic-form>
      </ion-card-content>
    </ion-card>
    <!-- vaginal inspection Section -->
    <ion-card v-if="currentSection === 2" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header"> Vaginal inspection</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="vaginalInspection"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Cervical exam -->
    <ion-card v-if="currentSection === 3" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">Cervical exam conducted?</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="cervicalExam"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- oedema exam Section -->
    <ion-card v-if="currentSection === 4" class="section">
      <ion-card-header>
        <ion-card-title class="dashed_bottom_border sub_item_header">oedema</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <basic-form :contentData="oedemaPresence"></basic-form>
      </ion-card-content>
    </ion-card>

    <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <ion-button @click="goToPreviousSection" expand="block" color="medium" size="large">Previous</ion-button>
      <ion-button @click="goToNextSection" expand="block" color="primary" size="large">Next</ion-button>
    </div>
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
import { useMaternalExamStore} from "@/apps/ANC/store/physical exam/MaternalExamStore";
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

    ...mapState(useMaternalExamStore,["pallor"]),
    ...mapState(useMaternalExamStore,["breastExam"]),
    ...mapState(useMaternalExamStore,["vaginalInspection"]),
    ...mapState(useMaternalExamStore,["cervicalExam"]),
    ...mapState(useMaternalExamStore,["oedemaPresence"]),
  },
  mounted(){
    const userID: any  = Service.getUserID()
    this.vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
    this.updateVitalsStores()
    this.validaterowData({})
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
      if (this.currentSection < 4) {
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
  padding: 20px;
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
</style>
