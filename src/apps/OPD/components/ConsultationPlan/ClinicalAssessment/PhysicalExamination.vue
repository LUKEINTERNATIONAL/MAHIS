<template>
    <div class="modal_wrapper"></div>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
    },

    data() {
        return {};
    },
    methods: {},
});
</script>

<style scoped></style>
