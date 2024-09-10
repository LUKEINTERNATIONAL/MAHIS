<template>
    <div>
        <ion-toolbar style="--background: #fff; --color: #000">
            <ion-title class="ion-text-center">
                <span class="his-lg-text" :class="color"> {{ title }} </span>
                <h3 v-if="subtitle">{{ subtitle }}</h3>
            </ion-title>
        </ion-toolbar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonToolbar, IonTitle, IonHeader } from "@ionic/vue";

export default defineComponent({
    components: { IonToolbar, IonTitle, IonHeader },
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
        },
        color: {
            type: String,
        },
    },
});
</script>
<style scoped>
h2 {
    padding-bottom: 0.2em;
}
</style>
