<template>
    <ion-page>
        <NavigationMenu/>
        <ion-content :fullscreen="true">
            <!-- <rawTable/> -->
            <MonthsPicker :fowardRoute="'AEFIReportTemplate'" :backwardRoute="'AEFIReport'" :reportName="'AEFI Monthly Report'"/>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import rawTable from './rawTable.vue';
import MonthsPicker from'./MonthsPicker.vue';
import NavigationMenu from './NavigationMenu.vue';

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        Toolbar,
        IonRow,
        rawTable,
        MonthsPicker,
        NavigationMenu,
    },
    data() {
        return {

        };
    },
    computed: {

    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {

    },
    async mounted() {
        
    },
    methods: {

    },
});
</script>



