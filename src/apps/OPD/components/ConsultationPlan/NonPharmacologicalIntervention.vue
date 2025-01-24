<template>
  <div class="checklist-container">
    <ion-item v-for="item in items" :key="item.id" class="no-border">
      <ion-checkbox :id="item.id" v-model="item.checked" slot="start"></ion-checkbox>
      <ion-label>{{ item.label }}</ion-label>
    </ion-item>
  </div>
</template>

<script setup>
import { IonItem, IonCheckbox, IonLabel } from '@ionic/vue';
import { useNonPharmaTherapyStore } from '@/stores/nonPharmaTherapyStore'; // Adjust the path as needed

// Access the Pinia store
const nonPharmaTherapyStore = useNonPharmaTherapyStore();

// Access the items state from the store
const items = nonPharmaTherapyStore.items;
</script>

<style scoped>
.checklist-container {
  padding: 16px;
}

/* Remove the bottom border from ion-item */
.no-border {
  --border-width: 0; /* Removes the border */
  --inner-border-width: 0; /* Removes the inner border (if any) */
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 12px;
}

ion-checkbox {
  margin-right: 12px;
}

ion-label {
  font-size: 16px;
}
</style>