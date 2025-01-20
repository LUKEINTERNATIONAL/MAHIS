<template>
  <ion-grid class="ion-grid">
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <ion-col v-for="(card, index) in cardsData" :key="index"
               size-xs="6"
               size-sm="6"
               size-md="4"
               size-lg="4"
               size-xl="4">
        <ion-card color="secondary" class="card" @click="navigateTo(card.path)">
          <ion-card-header>
            <ion-card-title class="ion-title" style="color:#0f5132">{{ card.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-icon :icon="card.icon" :style="{ color: card.color, fontSize: '40px' }"></ion-icon>
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
import { people, bed } from "ionicons/icons";

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
    const cardsData = [
      { title: "Referral", path: "/ANCreferral", icon: people, color:"grey" },
      { title: "Pregnancy Outcome", path: "/ancEnd", icon: bed, color: "grey" },
    ];

    return {
      navigateTo,
      cardsData
    };
  },
});
</script>

<style scoped>
.card {
  width: 264px;
  margin: 5px;
  transition: transform 0.3s ease;
}
.ion-grid {
  padding-left: 15%;
  padding-right: 14%;
}

.card:hover {
  transform: scale(1.05);
}

ion-icon {
  width: 50px;
}
ion-card-title {
  font-size: 16px;
}

@media (max-width: 768px) {
  ion-icon {
    width: 40px;
    height: 40px;
  }

  ion-card-title {
    font-size: 14px;
  }
  .ion-grid {
    padding-left: 5%;
    padding-right: 5%;
  }


  .card {
    margin: 5px;
    width: 200px;
  }
}
</style>
