<template>
    <ion-content>
      <ion-grid>
        <ion-row>
          <!-- Left Panel: Primary Clients -->
          <ion-col size="12" size-md="4">
            <ion-list>
              <ion-list-header>
                <ion-label>Primary Clients</ion-label>
              </ion-list-header>
              <ion-item v-for="client in clients" :key="client.primary_patient_id" 
                        button @click="selectPrimaryClient(client)" 
                        :class="{ 'selected': selectedPrimaryClient === client }">
                <ion-label>{{ client.primary_firstname }} {{ client.primary_sirname }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
  
          <!-- Middle and Right Panels -->
          <ion-col size="12" size-md="8">
            <!-- Middle Panel: Selected Primary Client Details -->
            <ion-card v-if="selectedPrimaryClient">
              <ion-card-header>
                <ion-card-title>{{ selectedPrimaryClient.primary_firstname }} {{ selectedPrimaryClient.primary_sirname }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>Birth Date: {{ selectedPrimaryClient.primary_birthdate }}</p>
                <p>Gender: {{ selectedPrimaryClient.primary_gender }}</p>
                <p>ID: {{ selectedPrimaryClient.primary_patient_id }}</p>
              </ion-card-content>
            </ion-card>
  
            <!-- Right Panel: Duplicates -->
            <ion-list v-if="selectedPrimaryClient">
              <ion-list-header>
                <ion-label>Potential Duplicates</ion-label>
              </ion-list-header>
              <ion-item v-for="duplicate in selectedPrimaryClient.duplicates" :key="duplicate.secondary_patient_id">
                <ion-checkbox slot="start" v-model="duplicate.selected"></ion-checkbox>
                <ion-label>
                  <h3>{{ duplicate.secondary_firstname }} {{ duplicate.secondary_sirname }}</h3>
                  <p>ID: {{ duplicate.secondary_patient_id }}</p>
                  <p>Match: {{ duplicate.match_percentage }}%</p>
                </ion-label>
              </ion-item>
            </ion-list>
            <ion-button expand="block" @click="mergeSelected" :disabled="!hasSelectedDuplicates">
              Merge Selected
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </template>
  
  <script lang="ts">
  import { IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox, IonButton } from "@ionic/vue";
  import { defineComponent, ref, computed } from "vue";
  
  export default defineComponent({
    name: 'ClientDeduplication',
    components: {
      IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonItem, IonLabel, 
      IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox, IonButton
    },
    setup() {
      const clients = ref([
        {
          primary_patient_id: 274964,
          primary_firstname: "Ellen",
          primary_sirname: "Degeneres",
          primary_birthdate: "2024-08-09",
          primary_gender: "F",
          duplicates: [
            {
              secondary_patient_id: 274966,
              secondary_firstname: "James",
              secondary_sirname: "Kamanga",
              match_percentage: 57,
              selected: false
            },
            {
              secondary_patient_id: 274965,
              secondary_firstname: "Hamnna",
              secondary_sirname: "Kamanga",
              match_percentage: 57,
              selected: false
            },
          ]
        },
        {
          primary_patient_id: 274970,
          primary_firstname: "Charles",
          primary_sirname: "Xavier",
          primary_birthdate: "1940-07-13",
          primary_gender: "M",
          duplicates: [
            {
              secondary_patient_id: 274971,
              secondary_firstname: "Charlie",
              secondary_sirname: "Xavier",
              match_percentage: 90,
              selected: false
            },
            {
              secondary_patient_id: 274972,
              secondary_firstname: "Charles",
              secondary_sirname: "Francis",
              match_percentage: 75,
              selected: false
            },
          ]
        },
        {
          primary_patient_id: 274975,
          primary_firstname: "Red",
          primary_sirname: "Hood",
          primary_birthdate: "1995-08-16",
          primary_gender: "M",
          duplicates: [
            {
              secondary_patient_id: 274976,
              secondary_firstname: "Jason",
              secondary_sirname: "Todd",
              match_percentage: 85,
              selected: false
            },
            {
              secondary_patient_id: 274977,
              secondary_firstname: "Red",
              secondary_sirname: "Robin",
              match_percentage: 70,
              selected: false
            },
          ]
        }
      ]);
  
      const selectedPrimaryClient = ref(null);
  
      const selectPrimaryClient = (client) => {
        selectedPrimaryClient.value = client;
      };
  
      const hasSelectedDuplicates = computed(() => {
        return selectedPrimaryClient.value && 
               selectedPrimaryClient.value.duplicates.some(d => d.selected);
      });
  
      const mergeSelected = () => {
        if (selectedPrimaryClient.value) {
          const selectedDuplicates = selectedPrimaryClient.value.duplicates.filter(d => d.selected);
          console.log(`Merging ${selectedDuplicates.length} duplicates into ${selectedPrimaryClient.value.primary_firstname} ${selectedPrimaryClient.value.primary_sirname}`);
          // Implement actual merge logic here
        }
      };
  
      return {
        clients,
        selectedPrimaryClient,
        selectPrimaryClient,
        hasSelectedDuplicates,
        mergeSelected
      };
    }
  });
  </script>
  
  <style scoped>
  .selected {
    --background: var(--ion-color-light);
  }
  
  @media (max-width: 768px) {
    ion-col {
      margin-bottom: 1rem;
    }
  }
  </style>