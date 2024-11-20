<template>
    <div>
        <div>
            <ion-card>
              <BasicInputField
                placeholder="Filter medication list by name"
                :icon="searchOutline"
                :inputValue="searchText"
                @update:inputValue="searchTextUpdated"
                :minHeight="50"
              />
            </ion-card>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonIcon, IonCard } from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';
import BasicInputField from "@/components/BasicInputField.vue"
import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";

export default defineComponent({
  name: 'MedicationSearch',
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    BasicInputField,
    IonCard
  },
  setup() {
    const searchText = ref('');
    const NCDMedicationsStore = useNCDMedicationsStore()
    const searchTextUpdated = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchText.value = target.value;
      const filteredMedications = NCDMedicationsStore.medications.filter((med: any) => 
        med.name.toLowerCase().includes(searchText.value.toLowerCase())
      );
      NCDMedicationsStore.setFilteredMedications(filteredMedications)
    };

    return {
      searchText,
      searchTextUpdated,
      searchOutline
    };
  },
});
</script>