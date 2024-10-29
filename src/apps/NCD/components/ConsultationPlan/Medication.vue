<template>
    <div class="table-container">
        <table class="prescription-table">
          <thead>
            <tr>
              <th class="checkbox-col">Select</th>
              <th>Medication</th>
              <th><ion-icon :icon="sunny"></ion-icon> Morning</th>
              <th><ion-icon :icon="partlySunny"></ion-icon> Afternoon</th>
              <th><ion-icon :icon="moon"></ion-icon> Evening</th>
              <th><ion-icon :icon="timeOutline"></ion-icon> Frequency</th>
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonInput, IonIcon, IonCheckbox, IonCol, IonRow,
  IonButton
} from '@ionic/vue';
import VueMultiselect from "vue-multiselect";
import { 
  medkit, sunny, partlySunny, moon, timeOutline,
} from 'ionicons/icons';
import { DRUG_FREQUENCIES } from "@/services/drug_prescription_service";
import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";
import { mapState } from "pinia";

export default defineComponent({
    name: 'medication',
    components: {
        IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent,
        IonInput, IonIcon, IonCol, IonRow, IonCheckbox, VueMultiselect,
    },
    computed: {
        ...mapState(useNCDMedicationsStore, ["medications", "frequency_selections"]),
    },
    setup() {
        const NCDmedicationsStore = useNCDMedicationsStore();
        NCDmedicationsStore.initMedications();
        const selected_NCD_Medication_List = computed(() => NCDmedicationsStore.selectedNCDMedicationList);
        const frequency_options = ref(DRUG_FREQUENCIES);

        const updateDosage = (medicationName: string, timeOfDay: string, event: any) => {
            const value = event.target.value;
            const medicationIndex = selected_NCD_Medication_List.value.findIndex(
                (med: { medication: string; }) => med.medication === medicationName
            );
            
            if (medicationIndex > -1) {
                const updatedMedication = { ...selected_NCD_Medication_List.value[medicationIndex] };
                updatedMedication.dosage = { ...updatedMedication.dosage, [timeOfDay]: value };
                selected_NCD_Medication_List.value[medicationIndex] = updatedMedication;
            }
        };

        const getFrequency = (medicationName: string) => {
            return NCDmedicationsStore.frequency_selections.value[medicationName] || null;
        }

        const updateFrequencySelection = (medicationName: string, data: any) => {
            NCDmedicationsStore.frequency_selections.value = {
                ...NCDmedicationsStore.frequency_selections.value,
                [medicationName]: data
            }
        }

        const isActive = (medicationName: string) => {
            return selected_NCD_Medication_List.value.some((med: any) => med.medication === medicationName);
        };

        const toggleMedication = (medicationName: string) => {
            if (isActive(medicationName)) {
                const index = selected_NCD_Medication_List.value.findIndex(
                (          med: { medication: string; }) => med.medication === medicationName
                );
                if (index > -1) {
                selected_NCD_Medication_List.value.splice(index, 1);
                }
            } else {
                const newMedication = {
                medication: medicationName,
                dosage: {
                    morning: null,
                    afternoon: null,
                    evening: null
                }
                };
                NCDmedicationsStore.setSelectedNCDMedicationList(newMedication);
            }
        };

        const getDosage = (medicationName: string, timeOfDay: string) => {
            const medication = selected_NCD_Medication_List.value.find(
                (        med: { medication: string; }) => med.medication === medicationName
            );
            return medication?.dosage[timeOfDay] || '';
        };

        return {
            medkit,
            sunny,
            partlySunny,
            moon,
            timeOutline,
            frequency_options,
            updateFrequencySelection,
            getFrequency,
            updateDosage,
            getDosage,
            isActive,
            toggleMedication,
        };
    }
})
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