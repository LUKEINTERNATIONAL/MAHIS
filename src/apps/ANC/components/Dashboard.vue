<template>
    <h3 class="ion-text-center bold">Dashboard</h3>
    <p class="ion-text-center">*ANC dashboard for this client.*</p>
    <hr/>
    <ion-row>
      <ion-col size="6">
        <ion-card>
          <ion-card-header>
            Number of contacts
          </ion-card-header>
          <ion-card-content>
           3
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-header>
            BMI
          </ion-card-header>
          <ion-card-content>
            34
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
</template>

<script lang="ts">
import { IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import SideBar from "@/apps/ANC/components/SideBar.vue";
import Counselling from "@/apps/ANC/components/Treatment/Deworming.vue";

export default defineComponent({
  components: {Counselling, SideBar, DemographicBar, IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol, Toolbar }
});
</script>

<style scoped>

</style>
