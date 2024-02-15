<template>
  <ion-page>
    <Toolbar />

    <ion-content :fullscreen="true">
      <DemographicBar />
      <div class="ion-padding">
        <p>Add custom styles and compose with other elements.</p>

        <h1 class="ion-text-center">What are you interested in?</h1>
        <p class="ion-text-center">Pick whatever catches your eye. You can always fine-tune things later.</p>

        <ion-row>
          <ion-col size="3">
            <div class="checkbox-content" :style="{ backgroundImage: 'url(https://images.pexels.com/photos/220911/pexels-photo-220911.jpeg?auto=compress&cs=tinysrgb)' }">
              <ion-label class="checkbox-title">Profile</ion-label>
              <ion-checkbox class="checkbox-item" value="profile" checked></ion-checkbox>
            </div>
          </ion-col>
          <ion-col size="3">
            <div class="checkbox-content">
              <ion-label class="checkbox-title">Quick Check</ion-label>
              <ion-checkbox class="checkbox-item" value="quickCheck"></ion-checkbox>
            </div>
          </ion-col>
          <ion-col size="3">
            <div class="checkbox-content">
              <ion-label class="checkbox-title">Symptoms and follow Up</ion-label>
              <ion-checkbox class="checkbox-item" value="symptoms"></ion-checkbox>
            </div>
          </ion-col>
          <ion-col size="3">
            <div class="checkbox-content">
              <ion-label class="checkbox-title">Physical exam</ion-label>
              <ion-checkbox class="checkbox-item" checked value="exam"></ion-checkbox>
            </div>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>

    <!-- Sidebar -->
      <ion-list lines="full" class="sidebar" slot="start">>
        <ion-item @click="navigateTo('Dashboard')">
          <ion-icon slot="start" name="apps-outline"></ion-icon>
          Dashboard
        </ion-item>
        <ion-item @click="navigateTo('ANC clients')">
          <ion-icon slot="start" name="person-circle-outline"></ion-icon>
          ANC clients
        </ion-item>
        <ion-item @click="navigateTo('Referral')">
          <ion-icon slot="start" name="arrow-forward-outline"></ion-icon>
          Referral
        </ion-item>
      </ion-list>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";

export default defineComponent({
  components: { DemographicBar, IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol, Toolbar, IonList, IonItem },
  methods: {
    navigateTo(page: string) {
      // Define your navigation logic here
      console.log('Navigating to', page);
    }
  }
});
</script>

<style scoped>
.checkbox-content {
  background-size: cover;
  background-blend-mode: overlay;
  border-radius: 10px;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.checkbox-title {
  color: var(--ion-color-light);
  font-weight: bold;
  font-size: 20px;
  margin: 8px;
}

.checkbox-item {
  --background: transparent;
  --border-color: var(--ion-color-light);
  --size: 32px;
  margin: 8px;
}

.sidebar {
  width: 20%;
  background-color: #f0f0f0;
  padding: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow-y: auto;
  margin-right: 90%;
}

.sidebar ion-list {
  margin-top: 20px;
}

.sidebar ion-item {
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sidebar ion-item:hover {
  background-color: #e0e0e0;
}

.sidebar ion-icon {
  margin-right: 8px;
}

.sidebar p {
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
