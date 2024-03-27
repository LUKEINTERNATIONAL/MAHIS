<template>
    <div class="modal_wrapper">
        <basic-form :contentData="levelOfConsciousness"></basic-form>
    </div>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import BasicForm from "@/components/BasicForm.vue";
import { useLevelOfConsciousnessStore } from "@/apps/OPD/stores/LevelOfConsciousnessStore";
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
        ...mapState(useLevelOfConsciousnessStore, ["levelOfConsciousness"]),
    },
    methods: {},
});
</script>

<style scoped></style>
