<template>
    <div class="modal_wrapper">
        <basic-form :contentData="pregnancy"></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { usePregnancyStore } from "@/apps/OPD/stores/PregnancyStore";
import { mapState } from "pinia";
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
        BasicForm,
    },

    data() {
        return {};
    },
    computed: {
        ...mapState(usePregnancyStore, ["pregnancy"]),
    },
    methods: {},
});
</script>

<style scoped></style>
