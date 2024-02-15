<template>
  <ion-page>
    <Toolbar/>
    <ion-content :fullscreen="true">
      <DemographicBar />
      <ion-row class="ion-justify-content-center">
<!--        <ion-col v-for="(card, index) in cards" :key="index" size="6" size-sm="6" size-md="4" size-lg="3">-->
<!--          <ion-card class="custom-card">-->
<!--            <ion-card-header class="custom-card-header">-->
<!--              <ion-card-title>{{ card.title }}</ion-card-title>-->
<!--            </ion-card-header>-->
<!--            <ion-card-content class="custom-card-content">-->
<!--              <a :href="card.link" class="custom-link">Go to {{ card.title }}</a>-->
<!--            </ion-card-content>-->
<!--          </ion-card>-->
<!--        </ion-col>-->
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol,IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";

export default defineComponent({
  components: {DemographicBar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonPage, Toolbar },
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
<style scoped>
.custom-card {
  width: 200px;
  height: 150px;
  margin: 2px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-card-header {
  background-color: #336699;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.custom-card-content {
  padding: 10px;
}

.custom-link {
  color: #336699;
  text-decoration: none;
  font-weight: bold;
}

.custom-link:hover {
  text-decoration: underline;
}
</style>