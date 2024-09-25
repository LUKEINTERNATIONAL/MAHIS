<template>
  <ion-grid class="ion-grid">
    <ion-row>
      <ion-col v-for="(card, index) in cardsData" :key="index" size-md="4" size-lg="4" size-xl="3">
        <ion-card color="secondary" @click="navigateTo(card.path)">
          <ion-card-header>
            <ion-card-title class="ion-title">{{ card.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-icon :icon="card.icon" :style="{ color: card.color, fontSize: '30px' }"></ion-icon>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { checkmarkCircle, personCircle, alertCircle, heart, flask, medkit, chatbubbles, people, bed } from "ionicons/icons"; // Importing the icons

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
    IonIcon,
  },
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push({ path });
    };
    const cardsData = [
      { title: "Quick Check", path: "/quickCheck", icon: checkmarkCircle, color: "green" },
      { title: "Profile", path: "/profile", icon: personCircle, color: "blue" },
      { title: "Symptoms and Follow Up", path: "/symptomsFollowUp", icon: alertCircle, color: "orange" },
      { title: "Physical Examination", path: "/physicalExamination", icon: heart, color: "red" },
      { title: "Lab Tests and Imaging", path: "/labTests", icon: flask, color: "purple" },
      { title: "Treatment and Prevention", path: "/ANCtreatment", icon: medkit, color: "teal" },
      { title: "Counselling", path: "/counselling", icon: chatbubbles, color: "darkblue" },
      { title: "Referral", path: "/ANCreferral", icon: people, color: "darkgreen" },
      { title: "Pregnancy Outcome", path: "/ancEnd", icon: bed, color: "pink" },
    ];

    return {
      navigateTo,
      cardsData,
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

ion-card {
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

ion-icon {
  width: 40px; /* Set a fixed size for icons */
  height: 40px; /* Set a fixed height for icons */
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
    align-items: center;
    .ion-grid {
      top:7000%;
    }
  }

  .ion-grid {
    top:70%;
  }

  .card {
    width: 90%;
  }
}
</style>

