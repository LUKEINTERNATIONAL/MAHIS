<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true">
      <div id="container">
        <strong>Scan patient barcode or QR code</strong>
        <p>Use searchbar below to find your patient <br />
          profile and start dispensation
        </p>
        <div class="centered-content">
          <!-- Your component goes here -->
          <ToolbarSearch />
        </div>
        <router-link to="/dispensation">
          <ion-button class="primary_btn" style="padding-left: 15px">Proceed to dispensation</ion-button>
        </router-link>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow,
  IonCol
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from '../../../components/Toolbar.vue'
import ToolbarSearch from '../../../components/ToolbarSearch.vue'
export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Toolbar,
    ToolbarSearch,
    IonRow,
    IonCol
  }
})
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-button.medicalAlBtn {
  --background: #fecdca;
  --color: #b42318;
  text-transform: none;
}

.error-label {
  background: #fecdca;
  color: #b42318;
  text-transform: none;
  padding: 6%;
  border-radius: 10px;
  margin-top: 7px;
  display: flex;
  text-align: center;
}

ion-button.addMedicalTpBtn {
  --background: #ddeedd;
  --color: #006401;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
}

ion-button.medicalAlAddBtn {
  font-size: large;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
