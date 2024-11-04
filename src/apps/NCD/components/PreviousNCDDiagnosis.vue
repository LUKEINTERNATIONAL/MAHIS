<template>

</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import { getNCDDiagnosis } from "@/apps/NCD/services/treatment";

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        IonRow,
    },
    data() {
        const initDiag = async () => {
           await getNCDDiagnosis()
        }

        return {
            initDiag
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
        this.initDiag()
    },
    methods: {

    },
});
</script>



