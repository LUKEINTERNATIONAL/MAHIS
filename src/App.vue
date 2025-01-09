<template>
    <ion-app>
        <Menu />
        <modal-container @modalDismissed="activeModal = ''" :modalName="activeModal"> </modal-container>
        <full-screen-notice v-if="checkFullScreen" />
        <update-notification v-if="checkForUpdates" />
        <ion-router-outlet id="main" />
        <connection-error :apiStatus="apiOk" />
    </ion-app>
</template>

<script lang="ts">
import Menu from "@/components/Menu.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineAsyncComponent, defineComponent, ref, watch } from "vue";
import ApiClient, { ApiBusEvents } from "@/services/api_client";
import EventBus from "@/utils/EventBus";
import { EventChannels } from "@/utils/EventBus";
import { toastWarning, alertConfirmation, toastSuccess } from "./utils/Alerts";
import { useRoute } from "vue-router";
/** Nprogress */
import "nprogress/nprogress.css";
import nprogress from "nprogress";
import router from "@/router/index";
import { loadingController } from "@ionic/vue";
import { AuthService } from "./services/auth_service";
import Screentimeout from "@/composables/Screentimeout";
import useFacility from "./composables/useFacility";
import { useStatusStore } from "@/stores/StatusStore";
import { storeToRefs } from "pinia";
import { useWorkerStore } from "@/stores/workerStore";

export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
        Menu,
        ModalContainer: defineAsyncComponent(() => import("@/components/ModalContainer.vue")),
        FullScreenNotice: defineAsyncComponent(() => import("@/components/FullScreenModifier.vue")),
        // ConnectionError: defineAsyncComponent(() => import("@/components/ConnectionError.vue")),
    },
    setup() {
        const status = useStatusStore();
        const workerStore = useWorkerStore();
        const apiOk = ref(true);
        const route = useRoute();
        const notConfigPage = ref(true);
        const healthCheckInterval = ref(null) as any;
        const checkFullScreen = ref(false);
        const checkForUpdates = ref(true);
        const auth = new AuthService();
        const activeModal = ref("");

        // synchronize date every 1 hour
        auth.initDateSync(3600000);

        // load falility data
        useFacility().setLocation();

        Screentimeout.initiateSystemIdleMonitor();

        if (typeof auth.getAppConf("promptFullScreenDialog") === "boolean") {
            // checkFullScreen.value = auth.getAppConf("promptFullScreenDialog");
        }

        nprogress.configure({
            easing: "ease",
            speed: 330,
            trickleSpeed: 8,
        });

        watch(route, (route) => (notConfigPage.value = route.name != "API host settings"), {
            immediate: true,
        });

        watch(healthCheckInterval, (interval: any) => {
            apiOk.value = !interval;
            status.setApiStatus(apiOk.value);
        });

        EventBus.on(EventChannels.SHOW_MODAL, (modal: any) => (activeModal.value = modal));

        EventBus.on(ApiBusEvents.BEFORE_API_REQUEST, () => nprogress.start());

        EventBus.on(ApiBusEvents.AFTER_API_REQUEST, async (res: any) => {
            status.setApiStatus(apiOk.value);
            if (healthCheckInterval.value) {
                clearInterval(healthCheckInterval.value);
                healthCheckInterval.value = null;
                // const confirm = await alertConfirmation("Do you want to refresh the page?", {
                //     header: "API connection is back",
                // });
                // if (confirm) location.reload();
                toastSuccess("Connection restored");
                workerStore.postData("SYNC_ALL_DATA");
            }
            if (res && res.status === 401 && route.name != "Login") {
                router.push("/login");
            }
            nprogress.done();
        });

        EventBus.on(ApiBusEvents.ON_API_CRASH, () => {
            if (!healthCheckInterval.value) {
                loadingController.dismiss(); // Cancel any loading controller behaviour
                healthCheckInterval.value = setInterval(() => {
                    if (route.name != "API host settings") {
                        ApiClient.healthCheck();
                    }
                }, 2500);
                toastWarning("Offline mode");
            }
            nprogress.done();
        });
        return {
            apiOk,
            checkForUpdates,
            activeModal,
            notConfigPage,
            checkFullScreen,
        };
    },
});
</script>
