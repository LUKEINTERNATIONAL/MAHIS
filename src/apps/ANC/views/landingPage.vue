<template>
  <ion-row>
    <ion-col v-for="(card, index) in cards" :key="index" :size="['auto', 'auto']">
      <ion-card style="width: 300px; height: 200px;">
        <ion-card-header>
          <ion-card-title>{{ card.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <a :href="card.link">Go to {{ card.title }}</a>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol },
  data() {
    return {
      cards: [
        { title: 'Quick Check', link: '', imageUrl: '' },
        { title: 'Dashboard', link: '', imageUrl: '' },
        { title: 'Profile', link: '', imageUrl: '' },
        { title: 'Symptoms Follow Up', link: '', imageUrl: '' },
        { title: 'Lab Test', link: '', imageUrl: '' },
        { title: 'Physical Exam', link: '', imageUrl: '' },
        { title: 'Counseling', link: '', imageUrl: '' },
        { title: 'Treatment', link: '', imageUrl: '' },
        { title: 'Referral', link: '', imageUrl: '' },
        { title: 'Anc End', link: '', imageUrl: '' },
      ],
    };
  },
});
</script>