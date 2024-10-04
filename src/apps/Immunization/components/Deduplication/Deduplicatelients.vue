<template>
  <ion-page>
    <NavigationMenu/>
    <ion-content>
      <ion-grid>
        <ion-row>
          <!-- Left Panel: Primary Clients -->
          <ion-col size="12" size-md="4">
            <ion-list>
              <ion-list-header>
                <ion-label style="font-size: 18px; font-weight: 600;">Duplicate Clients</ion-label>
              </ion-list-header>
              <ion-item v-for="client in clients" :key="client.primary_patient_id" 
                        button @click="selectPrimaryClient(client)" 
                        :class="{ 'selected': selectedPrimaryClient === client }">
                <ion-label>{{ client.primary_given_name }} {{ client.primary_family_name }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>

          <!-- Middle and Right Panels -->
          <ion-col size="12" size-md="8">
            <!-- Middle Panel: Selected Primary Client Details -->
            <ion-card v-if="selectedPrimaryClient">
              <ion-card-header>
                <ion-card-title>{{ selectedPrimaryClient.primary_given_name }} {{ selectedPrimaryClient.primary_family_name }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>Birth Date: {{ selectedPrimaryClient.primary_birthdate }}</p>
                <p>Gender: {{ selectedPrimaryClient.primary_gender }}</p>
                <p>ID: {{ selectedPrimaryClient.primary_patient_id }}</p>
                <p>Home District: {{ selectedPrimaryClient.primary_home_district}}</p>
                <p>TA: {{ selectedPrimaryClient.primary_home_ta	 }}</p>
                <p>Home Village: {{ selectedPrimaryClient.primary_home_village}}</p>
              </ion-card-content>
            </ion-card>

            <!-- Right Panel: Duplicates -->
            <ion-list v-if="selectedPrimaryClient">
              <ion-list-header>
                <ion-label style="font-weight: 600;">Potential Duplicates</ion-label>
              </ion-list-header>
              <ion-item v-for="duplicate in selectedPrimaryClient.duplicates" :key="duplicate.secondary_patient_id">
                <ion-checkbox slot="start" v-model="duplicate.selected"></ion-checkbox>
                <ion-label>
                  <h3>{{duplicate.secondary_given_name}} {{duplicate.secondary_family_name	}}</h3>
                  <p>ID: {{ duplicate.secondary_patient_id }}</p>
                  <p>Match: {{ duplicate.match_percentage }}%</p>
                  <p>Birth Date: {{ duplicate.secondary_birthdate }}</p>
                  <p>Home District: {{ duplicate.secondary_home_district}}</p>
                  <p>TA: {{ duplicate.secondary_home_ta	 }}</p>	
                  <p>Home Village: {{ duplicate.secondary_home_village}}</p>
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
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonList, IonListHeader, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCheckbox, IonButton } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import NavigationMenu from "@/apps/Immunization/components/Reports/NavigationMenu.vue";
import { PatientService } from "@/services/patient_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";

export default defineComponent({
  name: 'ClientDeduplication',
  components: {
    IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonItem, IonLabel, 
    IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCheckbox, IonButton, NavigationMenu
  },
  setup() {
    const clients = ref([]) as any;
    const selectedPrimaryClient = ref(null) as any;
    const programId = ref(33);

    const selectPrimaryClient = (client: any) => {
      selectedPrimaryClient.value = client;
    };

    const hasSelectedDuplicates = computed(() => {
      return selectedPrimaryClient.value && 
             selectedPrimaryClient.value.duplicates.some((d: any) => d.selected);
    });

    const resetSelections = () => {
      selectedPrimaryClient.value = null;
      clients.value.forEach((client: any) => {
        client.duplicates.forEach((duplicate: any) => {
          duplicate.selected = false;
        });
      });
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
        
        // Reset selections and reload data
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
      initNavData
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
.selected {
  --background: var(--ion-color-light);
}

@media (max-width: 768px) {
  ion-col {
    margin-bottom: 1rem;
  }
}
</style>