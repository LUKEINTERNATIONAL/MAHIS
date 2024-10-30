<template>
  <div v-if="activeMedications.length > 0">
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
        <tr v-for="med in activeMedications" :key="med.id" :class="{ 'active-row': isActive(med.drug_id) }">
          <td class="checkbox-col">
            <ion-checkbox
              :checked="isActive(med.drug_id)"
              @ion-change="toggleMedication(med.drug_id)"
            ></ion-checkbox>
          </td>
          <td>{{ med.name }}</td>
          <td>
            <ion-input
              type="text"
              class="dose-input bordered-input"
              :disabled="!isActive(med.drug_id)"
              :value="getDosage(med.drug_id, 'morning')"
              @ion-input="updateDosage(med.drug_id, 'morning', $event)"
              placeholder="0"
            ></ion-input>
          </td>
          <td>
            <ion-input
              type="text"
              class="dose-input bordered-input"
              :disabled="!isActive(med.drug_id)"
              :value="getDosage(med.drug_id, 'afternoon')"
              @ion-input="updateDosage(med.drug_id, 'afternoon', $event)"
              placeholder="0"
            ></ion-input>
          </td>
          <td>
            <ion-input
              type="text"
              class="dose-input bordered-input"
              :disabled="!isActive(med.drug_id)"
              :value="getDosage(med.drug_id, 'evening')"
              @ion-input="updateDosage(med.drug_id, 'evening', $event)"
              placeholder="0"
            ></ion-input>
          </td>
          <td>
            <VueMultiselect
              :disabled="!isActive(med.drug_id)"
              v-model="frequency_selections[med.drug_id]"
              @update:model-value="(event: any) => updateFrequencySelection(med.drud_id, event)"
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
import { useNCDMedicationsStore, useOtherNCDMedicationStore } from "@/stores/NCDMedicationStore";
import { mapState } from "pinia";

interface Props {
  useDefaultStores: boolean
}

export default defineComponent({
    name: 'medication',
    components: {
        IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardContent,
        IonInput, IonIcon, IonCol, IonRow, IonCheckbox, VueMultiselect,
    },
    computed: {
      ...mapState(useNCDMedicationsStore, ["medications", "frequency_selections"]),
      ...mapState(useOtherNCDMedicationStore, ["otherNCDMedications"]),

      activeMedications() {
        return this.useDefaultStores 
          ? this.medications 
          : this.otherNCDMedications
      }
    },
    props: {
      useDefaultStores: {
        type: Boolean,
        default: true
      }
    },
    setup(props: Props) {
      const NCDmedicationsStore = useNCDMedicationsStore();
      NCDmedicationsStore.initMedications();
      const selected_NCD_Medication_List = computed(() => NCDmedicationsStore.selectedNCDMedicationList);

      const OtherNCDmedicationsStore = useOtherNCDMedicationStore()
      const selected_Other_NCD_Medication_List = computed(() => OtherNCDmedicationsStore.selectedOtherNCDMedicationList);

      const frequency_options = ref(DRUG_FREQUENCIES);

      const current_set_Medication_List = computed(() => 
        props.useDefaultStores 
          ? selected_NCD_Medication_List.value 
          : selected_Other_NCD_Medication_List.value
      )

        const updateDosage = (drug_id: string, timeOfDay: string, event: any) => {
            const value = event.target.value;
            const medicationIndex = current_set_Medication_List.value.findIndex(
                (med: { drug_id: string; }) => med.drug_id === drug_id
            );
            
            if (medicationIndex > -1) {
                const updatedMedication = { ...current_set_Medication_List.value[medicationIndex] };
                updatedMedication.dosage = { ...updatedMedication.dosage, [timeOfDay]: value };
                current_set_Medication_List.value[medicationIndex] = updatedMedication;
            }
        };

        const updateFrequencySelection = (drug_id: string, data: any) => {
            NCDmedicationsStore.frequency_selections.value = {
                ...NCDmedicationsStore.frequency_selections.value,
                [drug_id]: data
            }
        }

        const isActive = (drug_id: string) => {
            return current_set_Medication_List.value.some((med: any) => med.drug_id === drug_id);
        };

        const toggleMedication = (drug_id: string) => {
          if (isActive(drug_id)) {
              const index = current_set_Medication_List.value.findIndex(
              (          med: { drug_id: string; }) => med.drug_id === drug_id
              );
              if (index > -1) {
              current_set_Medication_List.value.splice(index, 1);
              }
          } else {
              const newMedication = {
              drug_id: drug_id,
              dosage: {
                  morning: null,
                  afternoon: null,
                  evening: null
              }
              };

            if (props.useDefaultStores == false) {
              OtherNCDmedicationsStore.setSelectedNCDMedicationList(newMedication);
            } else {
              NCDmedicationsStore.setSelectedNCDMedicationList(newMedication);
            }
          }
        };

        const getDosage = (drug_id: string, timeOfDay: string) => {
          const medication = current_set_Medication_List.value.find(
              (        med: { drug_id: string; }) => med.drug_id === drug_id
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
            updateDosage,
            getDosage,
            isActive,
            toggleMedication,
        };
      }
})
</script>

<style scoped>
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

.bordered-input {
  border: 2px solid #ccc; /* Customize the color */
  border-radius: 4px; /* Optional: adds rounded corners */
  padding: 4px; /* Optional: adjusts padding within the input */
}
</style>