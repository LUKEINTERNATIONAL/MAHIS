<template>
  <ion-card>
    <ion-card-header>
      <ion-row>
        <ion-col>
          <ion-card-title>
            <ion-icon :icon="medkit" class="ion-margin-end"></ion-icon>
            Medication List
          </ion-card-title>
        </ion-col>
      </ion-row>
    </ion-card-header>
    <ion-card-content>
      <Medication/>
      <ion-row>
        <ion-col>
          <ion-button @click="openAddOtherOPDMedicationModal" color="primary" style="float: right;">
            <ion-icon :icon="medkit" slot="start"> </ion-icon>
             <span style="margin-left: 10px;"> ADD Other Medication</span>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonInput, IonIcon, IonCheckbox, IonCol, IonRow,
  IonButton
} from '@ionic/vue';
import { medkit } from 'ionicons/icons';
import Medication from "./Medication.vue"
import { createModal, toastDanger, toastSuccess } from "@/utils/Alerts";
import AddOtherOPDMedication from './AddOtherOPDMedication.vue';

export default defineComponent({
  name: 'PrescriptionTable',
  components: {
    IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent,
    IonInput, IonIcon, IonCol, IonRow, IonCheckbox, Medication,
  },
  setup() {
    const openAddOtherOPDMedicationModal = async () => {
      await createModal(AddOtherOPDMedication, { class: "large-modal" }, true, {});
    }

    return {
      openAddOtherOPDMedicationModal,
      medkit
    };
  }
});
</script>

<style scoped>

</style>