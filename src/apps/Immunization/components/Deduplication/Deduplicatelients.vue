<template>
  <ion-page>
    <NavigationMenu/>
    <ion-content>
      <ion-grid>
        <ion-row>
          <!-- Left Panel: Primary Clients -->
          <ion-col size="12" size-md="4">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Duplicate Clients</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item v-for="client in clients" :key="client.primary_patient_id" 
                            button @click="selectPrimaryClient(client)" 
                            :class="{ 'selected-client': selectedPrimaryClient === client }">
                    <ion-avatar slot="start">
                      <ion-icon :icon="personCircle" size="large" :color="selectedPrimaryClient === client ? 'primary' : 'medium'"></ion-icon>
                    </ion-avatar>
                    <ion-label>
                      <h2>{{ client.primary_given_name }} {{ client.primary_family_name }}</h2>
                      <p>ID: {{ client.primary_patient_id }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <!-- Middle and Right Panels -->
          <ion-col size="12" size-md="8">
            <!-- Middle Panel: Selected Primary Client Details -->
            <ion-card v-if="selectedPrimaryClient">
              <ion-card-header color="primary">
                <ion-card-title>{{ selectedPrimaryClient.primary_given_name }} {{ selectedPrimaryClient.primary_family_name }}</ion-card-title>
                <ion-card-subtitle>Primary Client Details</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-list lines="none">
                  <ion-item>
                    <ion-icon :icon="calendar" slot="start" color="primary"></ion-icon>
                    <ion-label>Birth Date: {{ selectedPrimaryClient.primary_birthdate }}</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon :icon="male" slot="start" color="primary"></ion-icon>
                    <ion-label>Gender: {{ selectedPrimaryClient.primary_gender }}</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon :icon="fingerPrint" slot="start" color="primary"></ion-icon>
                    <ion-label>ID: {{ selectedPrimaryClient.primary_patient_id }}</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon :icon="location" slot="start" color="primary"></ion-icon>
                    <ion-label>
                      <h3>Home District: {{ selectedPrimaryClient.primary_home_district }}</h3>
                      <p>TA: {{ selectedPrimaryClient.primary_home_ta }}</p>
                      <p>Village: {{ selectedPrimaryClient.primary_home_village }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>

            <!-- Right Panel: Duplicates -->
            <ion-card v-if="selectedPrimaryClient">
              <ion-card-header>
                <ion-card-title>Potential Duplicates</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item v-for="duplicate in selectedPrimaryClient.duplicates" :key="duplicate.secondary_patient_id">
                    <ion-checkbox slot="start" v-model="duplicate.selected"></ion-checkbox>
                    <ion-label>
                      <h2>{{duplicate.secondary_given_name}} {{duplicate.secondary_family_name}}</h2>
                      <ion-badge color="primary">Match: {{ duplicate.match_percentage }}%</ion-badge>
                      <p>ID: {{ duplicate.secondary_patient_id }}</p>
                      <p>Birth Date: {{ duplicate.secondary_birthdate }}</p>
                      <p>Gender: {{ duplicate.secondary_gender }}</p>
                      <p>District: {{ duplicate.secondary_home_district }} | TA: {{ duplicate.secondary_home_ta }} | Village: {{ duplicate.secondary_home_village }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
            <ion-button expand="block" @click="mergeSelected" :disabled="!hasSelectedDuplicates" class="ion-margin-top">
              <ion-icon :icon="linkOutline" slot="start"></ion-icon>
              Merge Selected
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox, IonButton, IonIcon, IonAvatar, IonBadge, IonCardSubtitle } from "@ionic/vue";
import { personCircle, calendar, male, fingerPrint, location, linkOutline } from 'ionicons/icons';
import NavigationMenu from "@/apps/Immunization/components/Reports/NavigationMenu.vue";
import { PatientService } from "@/services/patient_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";

export default defineComponent({
  name: 'ClientDeduplication',
  components: {
    IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, 
    IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCheckbox, IonButton, 
    IonIcon, IonAvatar, IonBadge, NavigationMenu, IonCardSubtitle
  },
  setup() {
    const clients = ref([]) as any;
    const selectedPrimaryClient = ref(null) as any;
    const programId = ref(33);

    const selectPrimaryClient = (client: any) => {
      // Reset all selections before setting the new primary client
      resetSelections();
      selectedPrimaryClient.value = client;
    };

    const hasSelectedDuplicates = computed(() => {
      return selectedPrimaryClient.value && 
             selectedPrimaryClient.value.duplicates.some((d: any) => d.selected);
    });

    const resetSelections = () => {
      if (selectedPrimaryClient.value) {
        selectedPrimaryClient.value.duplicates.forEach((duplicate: any) => {
          duplicate.selected = false;
        });
      }
    };

    const mergeSelected = async () => {
      if (selectedPrimaryClient.value) {
        const selectedDuplicates = selectedPrimaryClient.value.duplicates.filter((d: any) => d.selected);
        
        const mergePayload = {
          primary: {
            patient_id: selectedPrimaryClient.value.primary_patient_id
          },
          secondary: selectedDuplicates.map((d: any) => ({ patient_id: d.secondary_patient_id })),
          program_id: programId.value
        };

        console.log('Merge Payload:', mergePayload);
        await PatientService.mergePatients(mergePayload);
        
        resetSelections();
        await initNavData();
      }
    };

    const initNavData = async () => {
      const store = EIRreportsStore();
      store.setNavigationPayload('Clients De-Duplication', true, false, '/', 'home', '');
      const duplicateClients = await PatientService.getCachedClientProfileDuplicates();
      clients.value = duplicateClients.map((client: any[]) => client[0]);
    };

    return {
      clients,
      selectedPrimaryClient,
      selectPrimaryClient,
      hasSelectedDuplicates,
      mergeSelected,
      programId,
      initNavData,
      personCircle,
      calendar,
      male,
      fingerPrint,
      location,
      linkOutline
    };
  },
  watch: {
    $route: {
      handler(to) {
        if (to.name === "Deduplicateclients") {
          this.initNavData();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initNavData();
  }
});
</script>

<style scoped>
.selected-client {
  --background: var(--ion-color-primary-tint);
  --color: var(--ion-color-primary-contrast);
}

.selected-client ion-label h2 {
  font-weight: bold;
}

@media (max-width: 768px) {
  ion-col {
    margin-bottom: 1rem;
  }
}

ion-badge {
  margin-right: 8px;
}

/* Styles for primary client details icons */
ion-card-content ion-icon {
  font-size: 1.2em;
  margin-right: 8px;
}
</style>