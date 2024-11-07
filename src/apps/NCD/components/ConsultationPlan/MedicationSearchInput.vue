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

    const searchTextUpdated = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchText.value = target.value;
    };

    return {
      searchText,
      searchTextUpdated,
      searchOutline
    };
  },
});
</script>