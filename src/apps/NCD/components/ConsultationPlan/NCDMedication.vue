<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        <ion-icon :icon="medkit" class="ion-margin-end"></ion-icon>
        Prescription List
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="table-container">
        <table class="prescription-table">
          <thead>
            <tr>
              <th class="checkbox-col">Select</th>
              <th>Medication</th>
              <th><ion-icon :icon="sunny"></ion-icon> Morning</th>
              <th><ion-icon :icon="partlySunny"></ion-icon> Afternoon</th>
              <th><ion-icon :icon="moon"></ion-icon> Evening</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="med in medications" :key="med.id" :class="{ 'active-row': isActive(med.name) }">
              <td class="checkbox-col">
                <ion-checkbox
                  :checked="isActive(med.name)"
                  @ion-change="toggleMedication(med.name)"
                ></ion-checkbox>
              </td>
              <td>{{ med.name }}</td>
              <td>
                <ion-input
                  type="number"
                  class="dose-input"
                  :disabled="!isActive(med.name)"
                  :value="getDosage(med.name, 'morning')"
                  @ion-input="updateDosage(med.name, 'morning', $event)"
                  placeholder="0"
                ></ion-input>
              </td>
              <td>
                <ion-input
                  type="number"
                  class="dose-input"
                  :disabled="!isActive(med.name)"
                  :value="getDosage(med.name, 'afternoon')"
                  @ion-input="updateDosage(med.name, 'afternoon', $event)"
                  placeholder="0"
                ></ion-input>
              </td>
              <td>
                <ion-input
                  type="number"
                  class="dose-input"
                  :disabled="!isActive(med.name)"
                  :value="getDosage(med.name, 'evening')"
                  @ion-input="updateDosage(med.name, 'evening', $event)"
                  placeholder="0"
                ></ion-input>
              </td>
              <td>
                <VueMultiselect
                  :disabled="!isActive(med.name)"
                  v-model="frequency_selections[med.name]"
                  @update:model-value="(event: any) => updateFrequencySelection(med.name, event)"
                  :multiple="false"
                  :taggable="false"
                  :hide-selected="false"
                  :close-on-select="true"
                  openDirection="bottom"
                  tag-placeholder="select frequency"
                  placeholder="select frequency"
                  selectLabel=""
                  label="label"
                  @search-change="$emit('search-change', $event)"
                  track-by="label"
                  :options="frequency_options"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonInput, IonIcon, IonCheckbox
} from '@ionic/vue';
import VueMultiselect from "vue-multiselect";
import { 
  medkit, sunny, partlySunny, moon
} from 'ionicons/icons';
import { useTreatmentPlanStore } from "@/stores/TreatmentPlanStore";
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import { mapState } from "pinia";

export default defineComponent({
  name: 'PrescriptionTable',
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonInput, IonIcon, IonCheckbox, VueMultiselect
  },
  setup() {
    const treatmentPlanStore = useTreatmentPlanStore();
    const selected_NCD_Medication_List = computed(() => treatmentPlanStore.selectedNCDMedicationList);

    // Predefined list of all possible medications
    const medications = ref([
      // Diabetes medications
      { id: 1, name: 'Long acting Insulin', category: 'Diabetes' },
      { id: 2, name: 'Short Acting Insulin', category: 'Diabetes' },
      { id: 3, name: 'Metformin', category: 'Diabetes' },
      { id: 4, name: 'Glibenclamide', category: 'Diabetes' },
      // Anti-hypertensives
      { id: 5, name: 'Diuretic', category: 'Anti-hypertensives' },
      { id: 6, name: 'CCB', category: 'Anti-hypertensives' },
      { id: 7, name: 'ACE-I', category: 'Anti-hypertensives' },
      { id: 8, name: 'BB', category: 'Anti-hypertensives' },
      // Other medications
      { id: 9, name: 'Aspirin', category: 'Other' },
      { id: 10, name: 'Statin', category: 'Other' },
      { id: 11, name: 'Other', category: 'Other' },
    ]);

    const frequency_options = ref(DRUG_FREQUENCIES)

    const isActive = (medicationName: string) => {
      return selected_NCD_Medication_List.value.some((med: any) => med.medication === medicationName);
    };

    const getDosage = (medicationName: string, timeOfDay: string) => {
      const medication = selected_NCD_Medication_List.value.find(
        (        med: { medication: string; }) => med.medication === medicationName
      );
      return medication?.dosage[timeOfDay] || '';
    };

    const toggleMedication = (medicationName: string) => {
      if (isActive(medicationName)) {
        // Remove medication
        const index = selected_NCD_Medication_List.value.findIndex(
          (          med: { medication: string; }) => med.medication === medicationName
        );
        if (index > -1) {
          selected_NCD_Medication_List.value.splice(index, 1);
        }
      } else {
        // Add medication with empty dosages
        const newMedication = {
          medication: medicationName,
          dosage: {
            morning: null,
            afternoon: null,
            evening: null
          }
        };
        treatmentPlanStore.setSelectedNCDMedicationList(newMedication);
      }
    };

    const updateDosage = (medicationName: string, timeOfDay: string, event: any) => {
      const value = event.target.value;
      const medicationIndex = selected_NCD_Medication_List.value.findIndex(
        (        med: { medication: string; }) => med.medication === medicationName
      );
      
      if (medicationIndex > -1) {
        const updatedMedication = { ...selected_NCD_Medication_List.value[medicationIndex] };
        updatedMedication.dosage = { ...updatedMedication.dosage, [timeOfDay]: value };
        selected_NCD_Medication_List.value[medicationIndex] = updatedMedication;
      }
    };

    const frequency_selections = ref<{ [key: string]: any }>({});

    const getFrequency = (medicationName: string) => {
      return frequency_selections.value[medicationName] || null;
    }

    const updateFrequencySelection = (medicationName: string, data: any) => {
      frequency_selections.value = {
        ...frequency_selections.value,
        [medicationName]: data
      }
    }

    return {
      medications,
      isActive,
      getDosage,
      toggleMedication,
      updateDosage,
      medkit,
      sunny,
      partlySunny,
      moon,
      selected_NCD_Medication_List,
      frequency_selections,
      frequency_options,
      updateFrequencySelection,
      getFrequency,
    };
  }
});
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.prescription-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.prescription-table th,
.prescription-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid var(--ion-color-light);
  vertical-align: middle;
}

.prescription-table th {
  background-color: var(--ion-color-light);
  font-weight: bold;
}

.checkbox-col {
  width: 60px;
  text-align: center;
}

.active-row {
  background-color: var(--ion-color-light-tint);
}

.dose-input {
  --padding-start: 8px;
  --padding-end: 8px;
  max-width: 80px;
  margin: 0 auto;
}

.dose-input.ion-disabled {
  opacity: 0.5;
}

ion-checkbox {
  margin: 0 auto;
}

.prescription-table ion-icon {
  vertical-align: middle;
}
</style>