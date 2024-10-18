<template>
    <ion-page>
        <NavigationMenu/>
        <ion-content :fullscreen="true">
             <clinicalDays/>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import NavigationMenu from '@/apps/Immunization/components/Reports/NavigationMenu.vue';
import clinicalDays from "./clinicalDays.vue";

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
        NavigationMenu,
        clinicalDays,
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



