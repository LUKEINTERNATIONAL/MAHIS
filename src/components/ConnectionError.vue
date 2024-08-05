<template>
    <div class="api-error offline" v-if="!apiStatus">Offline mode</div>
    <div class="api-error online" v-if="apiStatus">Online mode</div>
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
.api-error {
    bottom: 5px;
    position: absolute;

    color: white;
    left: 5px;
    text-align: center;
    z-index: 40;
    border-radius: 5px;
    padding: 2.5px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 14px;
}
.offline {
    background: rgb(216, 16, 16);
}
.online {
    background: rgb(6, 177, 20);
}
</style>
