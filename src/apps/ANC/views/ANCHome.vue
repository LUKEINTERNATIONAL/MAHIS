<template>
  <ion-row class="card-row">
    <ion-col v-for="(card, index) in cards" :key="index" size="4">
      <ion-card :color="card.color" @click="handleCardClick(card.url)">
        <ion-card-header>
          <ion-card-title>{{ card.title }}</ion-card-title>
          <ion-card-subtitle>{{ card.subtitle }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ card.content }}
          <ion-icon v-if="card.submitted" name="checkmark-circle" class="tick-icon"></ion-icon>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
  data() {
    return {
      cards: [
        { color: "primary", title: "Card Title", subtitle: "Card Subtitle", content: "Card Content", url: "/mahis/profile", submitted: false },
        { color: "secondary", title: "Card Title", subtitle: "Card Subtitle", content: "Card Content", url: "https://example.com", submitted: false },
        { color: "tertiary", title: "Card Title", subtitle: "Card Subtitle", content: "Card Content", url: "https://example.com", submitted: false },
        // Add more cards as needed
      ]
    };
  },
  methods: {
    handleCardClick(url: string) {
      window.open(url, "_blank");
      // Optionally, mark the card as submitted
      // Example: this.cards[index].submitted = true;
    }
  }
});
</script>

<style scoped>
.card-row {
  margin-bottom: 20px;
}

ion-card {
  cursor: pointer;
}

.tick-icon {
  color: green;
}
</style>
