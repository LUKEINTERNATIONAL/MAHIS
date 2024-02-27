<template>
  <div class="ion-no-padding">
    <h3 class="ion-text-center bold">Visit number 1</h3>
    <p class="ion-text-center">*Please provide responses for this visit by carefully reviewing each section below and filling in the answers accordingly.*</p>
    <hr/>
    <ion-row>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="font-weight: normal">
              <ion-label class="checkbox-title">Profile</ion-label>
              <ion-checkbox class="checkbox-item" value="profile" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Quick check</ion-label>
              <ion-checkbox class="checkbox-item" value="quick-check" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Symptoms and follow up</ion-label>
              <ion-checkbox class="checkbox-item" value="symptoms-and-follow-up" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Physical exam</ion-label>
              <ion-checkbox class="checkbox-item" value="physical-exam" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Lab / Investigations</ion-label>
              <ion-checkbox class="checkbox-item" value="investigations" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Medications / Treatment</ion-label>
              <ion-checkbox class="checkbox-item" value="treatment" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card>
          <ion-card-content>
            <div class="checkbox-content" style="">
              <ion-label class="checkbox-title">Counselling</ion-label>
              <ion-checkbox class="checkbox-item" value="counselling" unChecked></ion-checkbox>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </div>
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
.ion-padding{
  padding-left: 10px;
  padding-right:10px
}
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
  color: var(--ion-color-dark);
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
