<template>
  <ion-content>
    <ion-list lines="full" class="sidebar" slot="start">
      <ion-item @click="navigateTo('Dashboard')">
        <ion-icon slot="start" name="apps-outline"></ion-icon>
        Dashboard
      </ion-item>
      <ion-item @click="navigateTo('ANC clients')">
        <ion-icon slot="start" name="person-circle-outline"></ion-icon>
        ANC clients
      </ion-item>
      <ion-item @click="navigateTo('Referral')">
        <ion-icon slot="start" name="arrow-forward-outline"></ion-icon>
        Referral
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonIcon, IonItem, IonList, IonContent } from "@ionic/vue";

export default defineComponent({
  components: {IonIcon, IonList, IonItem, IonContent},
  methods: {
    // navigateTo(page: string) {
    //   console.log('Navigating to', page);
    // }
  }
});
</script>

<style scoped>
.sidebar {
  width: 20%;
  background-color: #f0f0f0;
  padding: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow-y: auto;
}

.sidebar ion-list {
  margin-top: 20px;
}

.sidebar ion-item {
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sidebar ion-item:hover {
  background-color: #e0e0e0;
}

.sidebar ion-icon {
  margin-right: 8px;
}

.sidebar p {
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
