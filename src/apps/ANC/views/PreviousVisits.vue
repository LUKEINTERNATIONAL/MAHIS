<template>
  <Toolbar/>
  <div style="padding-top: 1px">
    <DemographicBar/>
  </div>
  <ion-split-pane content-id="main">
    <SideBar :menu="menu" />
    <div class="ion-page" id="main" style="top:130px">
      <ion-content>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="12" offset-md="0" style="padding-left: 200px;padding-right: 200px">
              <PreviousVisits/>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </div>
  </ion-split-pane>
</template>

<script>
import { IonPage, IonIcon, IonLabel, IonContent, IonToolbar, IonHeader, IonRow, IonCol, IonList, IonMenuButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import SideBar from "@/apps/ANC/components/SideBar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import Visits from "@/apps/ANC/components/Visits.vue";
import PreviousVisits from "@/apps/ANC/components/PreviousVisits.vue";

export default defineComponent({
  components: {
    PreviousVisits,
    Visits, IonPage, IonIcon, IonLabel, IonContent, IonToolbar, IonHeader, IonRow, IonCol, IonList, IonMenuButton, SideBar, DemographicBar, Toolbar },

});
</script>

<style scoped>
ion-menu {
  --width: 250px;
}
ion-toolbar {
  --ion-padding: 10px;
}

ion-split-pane {
  --side-width: 150px;
}

[v-cloak] {
  display: none;
}

ion-item {
  --inner-padding-start: 0px;
  --color-hover: red;
}

ion-item.submenu {
  height: 0px;
}
</style>
