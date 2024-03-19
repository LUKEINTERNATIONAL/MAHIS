<template>
    <Toolbar />
    <DemographicBar />
    <SideBar />
    <!--  <ion-content :fullscreen="true">-->
    <!--    <ion-header collapse="condense">-->
    <!--      <ion-toolbar>-->
    <!--        <ion-title size="large">{{ $route.params.id }}</ion-title>-->
    <!--      </ion-toolbar>-->
    <!--    </ion-header>-->

    <!--    <div id="container">-->
    <!--      <strong class="capitalize">{{ $route.params.id }}</strong>-->
    <!--      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>-->
    <!--    </div>-->
    <!--  </ion-content>-->
    <!--      <div class="ion-page" id="main" style="top:130px">-->
    <!--        <ion-content>-->
    <!--          <ion-grid>-->
    <!--            <ion-row>-->
    <!--              <ion-col size="12" size-md="12" offset-md="0" style="padding-left: 200px;padding-right: 200px">-->
    <!--                <Visits/>-->
    <!--              </ion-col>-->
    <!--            </ion-row>-->
    <!--          </ion-grid>-->
    <!--        </ion-content>-->
    <!--      </div>-->
</template>

<script lang="ts">
import { IonPage, IonIcon, IonLabel, IonContent, IonToolbar, IonHeader, IonRow, IonCol, IonList, IonMenuButton } from "@ionic/vue";
import { defineComponent } from "vue";
import SideBar from "@/apps/ANC/components/SideBar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import Visits from "@/apps/ANC/components/Visits.vue";

export default defineComponent({
    components: {
        Visits,
        IonPage,
        IonIcon,
        IonLabel,
        IonContent,
        IonToolbar,
        IonHeader,
        IonRow,
        IonCol,
        IonList,
        IonMenuButton,
        SideBar,
        DemographicBar,
        Toolbar,
    },
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
