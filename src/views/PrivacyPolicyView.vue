<template>
    <ion-page>
        <ion-content class="ion-padding login-page">
            <PrivacyPolicy />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonPage,
        PrivacyPolicy,
    },
});
</script>
