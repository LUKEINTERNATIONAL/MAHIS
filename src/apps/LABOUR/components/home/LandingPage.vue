<template>
  <ion-grid class="container">
    <ion-row class="section">
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/labourAssessment">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Labour assessment</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/checkup.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/deliveryDetails">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Delivery details</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/hospital.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
<!--      <ion-col size="12" size-md="6" size-lg="4">-->
<!--        <router-link to="/labour/obstetric">-->
<!--          <ion-card color="secondary" class="card">-->
<!--            <ion-card-header>-->
<!--              <ion-card-title>Obstetric details</ion-card-title>-->
<!--            </ion-card-header>-->
<!--            <ion-card-content>-->
<!--              <img src="../../public/icons/checkup.png" alt="Profile Icon"/>-->
<!--            </ion-card-content>-->
<!--          </ion-card>-->
<!--        </router-link>-->
<!--      </ion-col>-->
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/postnatalChecks">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Immediate postnatal checks</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/icons8-physical-therapy-48.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/continuousMonitoring">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Continuous monitoring</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/heart.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/referral">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>Referral</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <img src="../../public/icons/bed.png" alt="Profile Icon"/>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-col>
      <ion-col size="12" size-md="6" size-lg="4">
        <router-link to="/labour/end">
          <ion-card color="secondary" class="card">
            <ion-card-header>
              <ion-card-title>End labour program</ion-card-title>
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
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  max-width: 300px;
  margin: 10px;
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
  .section {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }
}
</style>
