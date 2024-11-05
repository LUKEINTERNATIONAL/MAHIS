<template>
  <div class="diagnosis-container">
    <div class="heading">
      <ion-icon :icon="medkitOutline" class="diagnosis-icon"></ion-icon>
      <h2>Diagnosis</h2>
    </div>
    <ion-row class="ion-padding">
      <ion-col>
        <div class="diagnosis-list">
          <ion-chip 
            v-for="diagnosis in diagnoses" 
            :key="diagnosis"
            class="diagnosis-chip"
          >
            <ion-label>{{ diagnosis }}</ion-label>
          </ion-chip>
        </div>
      </ion-col>
    </ion-row>
  </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonChip, IonLabel, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { medkitOutline } from 'ionicons/icons';
import { getNCDDiagnosis } from "@/apps/NCD/services/treatment";
import SetUser from "@/views/Mixin/SetUser.vue";
import { getDiabetesDrugs, getAntiHypertensivesMedication } from "@/stores/NCDMedicationStore";

export default defineComponent({
  name: "Home",
  mixins: [SetUser],
  components: {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonChip,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      diagnoses: [] as string[],
      medkitOutline,
    };
  },
  async mounted() {
    this.diagnoses = await getNCDDiagnosis();
    getDiabetesDrugs()
    getAntiHypertensivesMedication()
  },
});
</script>

<style scoped>
.diagnosis-container {
  width: 100%;
  overflow-x: auto;
}

.heading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 16px 0 16px;
}

.heading h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.diagnosis-icon {
  font-size: 1.4rem;
  color: var(--ion-color-primary);
}

.diagnosis-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: min-content;
}

.diagnosis-chip {
  white-space: nowrap;
}
</style>