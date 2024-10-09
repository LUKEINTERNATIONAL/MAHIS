<template>
  <ion-page>
    <NavigationMenu/>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="10" size-lg="8" offset-md="1" offset-lg="2">
            <h2 class="ion-padding" style="font-size: large;">Client Deduplication</h2>
            <ion-card>
              <ion-card-content>
                <ion-searchbar
                  placeholder="Search clients"
                  v-model="searchQuery"
                  @ionInput="filterClients"
                ></ion-searchbar>
                <ion-list>
                  <div v-for="client in filteredClients" :key="client.primary_patient_id" class="client-container">
                    <div class="sticky-header">
                      <ion-item button @click="toggleClientDetails(client)" 
                                :class="{ 'selected-client': selectedPrimaryClient === client }">
                        <ion-avatar slot="start">
                          <ion-icon :icon="personCircle" size="large" :color="selectedPrimaryClient === client ? 'primary' : 'medium'"></ion-icon>
                        </ion-avatar>
                        <ion-label>
                          <h2>{{ client.primary_given_name }} {{ client.primary_family_name }}</h2>
                          <p>ID: {{ client.primary_patient_id }}</p>
                        </ion-label>
                        <ion-badge color="warning" slot="end">
                          {{ client.duplicates.length }}
                        </ion-badge>
                        <ion-icon :icon="selectedPrimaryClient === client ? chevronUp : chevronDown" slot="end"></ion-icon>
                      </ion-item>
                    </div>
                    
                    <div v-if="selectedPrimaryClient === client" class="client-details">
                      <ion-card>
                        <ion-card-header color="light">
                          <ion-card-subtitle>Primary Client Details</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                          <ion-grid>
                            <ion-row>
                              <ion-col size="12" size-md="6">
                                <ion-item lines="none">
                                  <ion-icon :icon="calendar" slot="start" color="primary"></ion-icon>
                                  <ion-label>Birth Date: {{ client.primary_birthdate }}</ion-label>
                                </ion-item>
                              </ion-col>
                              <ion-col size="12" size-md="6">
                                <ion-item lines="none">
                                  <ion-icon :icon="getGenderIcon(client.primary_gender)" slot="start" color="primary"></ion-icon>
                                  <ion-label>Gender: {{ client.primary_gender }}</ion-label>
                                </ion-item>
                              </ion-col>
                            </ion-row>
                            <ion-row>
                              <ion-col size="12">
                                <ion-item lines="none">
                                  <ion-icon :icon="location" slot="start" color="primary"></ion-icon>
                                  <ion-label class="ion-text-wrap">
                                    Address: {{ client.primary_home_village }}, {{ client.primary_home_ta }}, {{ client.primary_home_district }}
                                  </ion-label>
                                </ion-item>
                              </ion-col>
                            </ion-row>
                          </ion-grid>
                        </ion-card-content>
                      </ion-card>

                      <ion-card>
                        <ion-card-header color="light">
                          <ion-card-subtitle>Potential Duplicates</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                          <ion-list>
                            <ion-item-sliding v-for="duplicate in client.duplicates" :key="duplicate.secondary_patient_id">
                              <ion-item>
                                <ion-checkbox slot="start" v-model="duplicate.selected"></ion-checkbox>
                                <ion-label>
                                  <h2>{{duplicate.secondary_given_name}} {{duplicate.secondary_family_name}}</h2>
                                  <ion-badge color="primary">Match: {{ duplicate.match_percentage }}%</ion-badge>
                                  <p>ID: {{ duplicate.secondary_patient_id }}</p>
                                  <p>Birth Date: {{ duplicate.secondary_birthdate }} | Gender: {{ duplicate.secondary_gender }}</p>
                                  <p>
                                    Address: {{ duplicate.secondary_home_village }}, {{ duplicate.secondary_home_ta }}, {{ duplicate.secondary_home_district }}
                                  </p>
                                </ion-label>
                              </ion-item>
                              <ion-item-options side="end">
                                <ion-item-option color="primary" @click="viewDetails(duplicate)">View</ion-item-option>
                              </ion-item-options>
                            </ion-item-sliding>
                          </ion-list>
                        </ion-card-content>
                      </ion-card>

                      <ion-button expand="block" @click="mergeSelected(client)" :disabled="!hasSelectedDuplicates(client)" class="ion-margin-top">
                        <ion-icon :icon="linkOutline" slot="start"></ion-icon>
                        Merge Selected
                      </ion-button>
                    </div>
                  </div>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox, IonButton, IonIcon, IonAvatar, IonBadge, IonCardSubtitle, IonSearchbar, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/vue";
import { personCircle, calendar, male, female, fingerPrint, location, linkOutline, chevronDown, chevronUp } from 'ionicons/icons';
import NavigationMenu from "@/apps/Immunization/components/Reports/NavigationMenu.vue";
import { PatientService } from "@/services/patient_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";

export default defineComponent({
  name: 'ClientDeduplication',
  components: {
    IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, 
    IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCheckbox, IonButton, 
    IonIcon, IonAvatar, IonBadge, NavigationMenu, IonCardSubtitle, IonSearchbar,
    IonItemSliding, IonItemOption, IonItemOptions
  },
  setup() {
    const clients = ref([]);
    const filteredClients = ref([]) as any;
    const selectedPrimaryClient = ref(null);
    const programId = ref(33);
    const searchQuery = ref('');

    const toggleClientDetails = (client: any) => {
      if (selectedPrimaryClient.value === client) {
        selectedPrimaryClient.value = null;
      } else {
        selectedPrimaryClient.value = client;
      }
    };

    const hasSelectedDuplicates = (client: any) => {
      return client.duplicates.some((d: any) => d.selected);
    };

    const mergeSelected = async (client: any) => {
      const selectedDuplicates = client.duplicates.filter((d: any) => d.selected);
      
      const mergePayload = {
        primary: {
          patient_id: client.primary_patient_id
        },
        secondary: selectedDuplicates.map((d: any) => ({ patient_id: d.secondary_patient_id })),
        program_id: programId.value
      };

      console.log('Merge Payload:', mergePayload);
      await PatientService.mergePatients(mergePayload);
      
      selectedPrimaryClient.value = null;
      await initNavData();
    };

    const initNavData = async () => {
      const store = EIRreportsStore();
      store.setNavigationPayload('Client De-Duplication', true, false, '/', 'home', '');
      const duplicateClients = await PatientService.getCachedClientProfileDuplicates();
      clients.value = duplicateClients.map((client: any[]) => client[0]);
      filteredClients.value = clients.value;
    };

    const getGenderIcon = (gender: string) => {
      return gender.toUpperCase() === 'M' ? male : female;
    };

    const filterClients = () => {
      if (!searchQuery.value) {
        filteredClients.value = clients.value;
      } else {
        filteredClients.value = clients.value.filter((client: any) => {
          const fullName = `${client.primary_given_name} ${client.primary_family_name}`.toLowerCase();
          const query = searchQuery.value.toLowerCase();
          const patientId = String(client.primary_patient_id);
          return fullName.includes(query) || patientId.includes(query);
        });
      }
    };

    const viewDetails = (duplicate: any) => {
      // Implement view details functionality
      console.log('View details for:', duplicate);
    };

    return {
      clients,
      filteredClients,
      selectedPrimaryClient,
      toggleClientDetails,
      hasSelectedDuplicates,
      mergeSelected,
      programId,
      initNavData,
      getGenderIcon,
      searchQuery,
      filterClients,
      viewDetails,
      personCircle,
      calendar,
      fingerPrint,
      location,
      linkOutline,
      chevronDown,
      chevronUp
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

.client-container {
  position: relative;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--ion-background-color);
}

.client-details {
  padding-left: 16px;
  padding-right: 16px;
}

ion-badge {
  margin-right: 8px;
}

ion-card-content ion-icon {
  font-size: 1.2em;
  margin-right: 8px;
}

h2 {
  font-size: 1rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}

ion-searchbar {
  --background: var(--ion-color-light);
  --border-radius: 8px;
  margin-bottom: 16px;
}

ion-item-sliding {
  margin-bottom: 8px;
}
</style>