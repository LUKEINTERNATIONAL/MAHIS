<template>
    <ion-page>
        <NavigationMenu/>
        <ion-content :fullscreen="true">
           hello dominic
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import NavigationMenu from '@/apps/Immunization/components/Reports/NavigationMenu.vue';

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonRow,
        NavigationMenu,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState(EIRreportsStore, ["navigationPayload"]), 
    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {

    },
    async mounted() {
        this.initOwnNavData()
    },
    methods: {
        initOwnNavData() {
            const store = EIRreportsStore()
            store.setNavigationPayload('Dispense Medication', true, false, '/', 'patientProfile')
        },
    },
});
</script>
