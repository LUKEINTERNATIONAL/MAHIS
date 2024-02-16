<template>
  <ion-split-pane when="lg" content-id="main" style="margin-top:180px; margin-bottom:180px;--min-width: 450px; --max-width: 450px;">
    <ion-menu content-id="main">
      <ion-content class="menu-content">
        <ion-list style="padding-left: 90px">
          <ion-item button lines="inset">
            <ion-router-link href="/start-game" class="menu-link">
              <ion-label class="menu-label">Dashboard</ion-label>
              <ion-icon name="eye" slot="start"></ion-icon>
            </ion-router-link>
          </ion-item>
          <ion-item button lines="inset">
            <ion-router-link href="/start-game" class="menu-link">
              <ion-label class="menu-label">New contact</ion-label>
              <ion-icon name="eye-outline" slot="start"></ion-icon>
            </ion-router-link>
          </ion-item>
          <ion-item button lines="inset">
            <ion-router-link href="/previous-visits" class="menu-link">
              <ion-label class="menu-label">Previous contacts</ion-label>
              <ion-icon name="eye-outline" slot="start"></ion-icon>
            </ion-router-link>
          </ion-item>
          <ion-item button lines="inset">
            <ion-router-link href="/referral" class="menu-link">
              <ion-label class="menu-label">Referral</ion-label>
              <ion-icon name="options-outline" slot="start"></ion-icon>
            </ion-router-link>
          </ion-item>
          <ion-item button lines="inset">
            <ion-router-link href="/anc-end" class="menu-link">
              <ion-label class="menu-label">ANC end</ion-label>
              <ion-icon name="options-outline" slot="start"></ion-icon>
            </ion-router-link>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-split-pane>
</template>

<script lang="ts">
import { IonContent, IonMenu, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonContent, IonMenu, IonSplitPane },
  methods: {
    toggleMenu(menu: any) {
      // Implement your menu toggle logic
    }
  }
});
</script>

<style scoped>
ion-split-pane {
  --min-width: 450px;
  --max-width: 450px;
}

.menu-content {
  padding-top: 20px; /* Adjust the top padding as needed */
}

.menu-label {
  font-weight: lighter;
  text-decoration: white; /* Add underlining to labels */
}

.menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.menu-link:hover .menu-label {
  color: blue; /* Change text color on hover */
}

.menu-item {
  background-color: #f0f0f0; /* Set background color for menu items */
  border-radius: 5px; /* Add border radius for rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition effect */
}

.menu-item:hover {
  background-color: #e0e0e0; /* Change background color on hover */
}
</style>
