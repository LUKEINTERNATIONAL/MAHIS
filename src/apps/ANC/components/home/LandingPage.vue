<template>
  <ion-grid class="ion-grid">
    <ion-row>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/quickCheck')">
          <ion-card-header>
            <ion-card-title class="ion-title">Quick Check</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/checkup.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/profile')">
          <ion-card-header>
            <ion-card-title class="ion-title">Profile</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/checkup.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/symptomsFollowUp')">
          <ion-card-header>
            <ion-card-title class="ion-title">Symptoms and follow up</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/symptom.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/physicalExamination')">
          <ion-card-header>
            <ion-card-title class="ion-title">Physical Examination</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/heart.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/labTests')">
          <ion-card-header>
            <ion-card-title class="ion-title">Lab tests and imaging</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/candidate.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>

      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/ANCtreatment')">
          <ion-card-header>
            <ion-card-title class="ion-title">Treatment and prevention</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/patient.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/counselling')">
          <ion-card-header>
            <ion-card-title class="ion-title">Counselling</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/conversation.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>

      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/ANCreferral')">
          <ion-card-header>
            <ion-card-title class="ion-title">Referral</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/hospital.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>

      <ion-col>
        <ion-card color="secondary" @click="navigateTo('/ancEnd')">
          <ion-card-header>
            <ion-card-title class="ion-title">Pregnancy outcome</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img src="../../public/icons/bed.png" alt="Profile Icon" />
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push({ path });
    };

    return {
      navigateTo,
    };
  },
});
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
ion-card-title {
    font-size: 16px;
}

ion-card  {
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
  width: 50%;
  max-width: 50px;
  height: auto;
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
    align-items: center;
  }
  .ion-grid {
    top:70%;
  }


  .card {
    width: 90%;
  }
}
</style>