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
            <div class="checkbox-content" style="background-color: ghostwhite;box-shadow: 2px">
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
    <SideBar />
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import SideBar from "@/apps/ANC/components/SideBar.vue";

export default defineComponent({
  components: { SideBar, DemographicBar, IonPage, IonIcon, IonLabel, IonCheckbox, IonContent, IonToolbar, IonHeader, IonRow, IonCol, Toolbar }
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
</style>
