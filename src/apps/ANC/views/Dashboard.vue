<template>
    <Toolbar />
    <div style="padding-top: 1px">
        <DemographicBar />
    </div>
    <SideBar />
</template>

<script lang="ts">
import { IonPage, IonIcon, IonLabel, IonContent, IonToolbar, IonHeader, IonRow, IonCol, IonList, IonMenuButton } from "@ionic/vue";
import { defineComponent } from "vue";
import SideBar from "@/apps/ANC/components/SideBar.vue";
import DemographicBar from "@/apps/ANC/components/DemographicBar.vue";
import Toolbar from "@/apps/ANC/components/Toolbar.vue";
import Dashboard from "@/apps/ANC/components/Dashboard.vue";

export default defineComponent({
    components: {
        Dashboard,
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
