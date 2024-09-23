<template>
    <div id="api-error" class="his-card" v-if="!apiStatus">
        <p>Cannot connect to the server</p>
        <ion-button router-link="/settings/host" color="warning"> New Config </ion-button>
        <ion-button @click="refresh" color="warning"> Refresh </ion-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
    components: { IonButton },
    setup() {
        const refresh = () => location.reload();
        return {
            refresh,
        };
    },
    props: {
        apiStatus: {
            default: true as any,
        },
    },
});
</script>
<style scoped>
#api-error {
    bottom: 0;
    position: absolute;
    background: red;
    color: white;
    font-weight: bold;
    width: 25vw;
    bottom: 30px; /* Position Y halfway in */
    left: 50%; /* Position X halfway in */
    transform: translate(-50%, -50%); /* Move it halfway back(x,y) */
    text-align: center;
    z-index: 40;
    padding-bottom: 20px;
    border-radius: 5px;
}
</style>
