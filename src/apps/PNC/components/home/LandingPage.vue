<template>
  <ion-grid class="container">
    <ion-row class="section">
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/postnatalDetails">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Postnatal details</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/checkup.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/postnatalWardMonitoring">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Postnatal ward monitoring for mother</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/bed.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/babyStatus">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Postnatal ward monitoring for baby</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/hospital.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/dischargeWoman">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Discharge woman</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/checkup.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/postnatalVisit">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Postnatal visit</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/icons8-physical-therapy-48.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/pnc/pncEnd">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>End PNC program</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/bed.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { icons } from '../../../../utils/svg';

export default defineComponent({
  name: "Home",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },
  data() {
    return {
      iconsContent: icons,
    }
  },
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 90%; /* Adjusted width for responsiveness */
  max-width: 300px;
  margin: 20px auto; /* Centering and consistent top margin */
}

.card:hover {
  animation: bounce 0.3s ease-in-out;
  cursor: pointer;
}

@keyframes bounce {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

img {
  width: 70%;
  max-width: 70px;
  height: auto;
}

@media (max-width: 768px) {
  .card {
    width: 90%;
  }
}
</style>
