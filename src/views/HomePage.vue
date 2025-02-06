<template>
    <ion-page>
        <!-- Spinner -->
        <div v-if="isLoading" class="spinner-overlay">
            <ion-spinner name="bubbles"></ion-spinner>
            <div class="loading-text">Please wait...</div>
        </div>
        <Toolbar />
        <ion-content :fullscreen="true" v-if="![33, 14, 32, 12, 34, 35].includes(programs.activeProgramID)">
            {{ programs }}
            <div id="container">
                <strong>Search your patient profile</strong>
                <p>
                    Use searchbar below to find your patient <br />
                    profile and start the triage
                </p>
                <div class="centered-content">
                    <ToolbarSearch />
                </div>
            </div>
        </ion-content>

        <ImmunizationDashboard v-if="programs.activeProgramID == 33" />
        <OPDDashboard v-if="programs.activeProgramID == 14" />
        <NCDDashboard v-if="programs.activeProgramID == 32" />
        <ANCDashboard v-if="programs.activeProgramID == 12" />
        <LabourDashboard v-if="programs.activeProgramID == 34" />
        <PNCDashboard v-if="programs.activeProgramID == 35" />
        <Programs :programBtn="programs.programBtn" />
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import NCDDashboard from "@/apps/NCD/components/NCDDashboard.vue";
import ImmunizationDashboard from "@/apps/Immunization/components/ImmunizationDashboard.vue";
import OPDDashboard from "@/apps/OPD/components/OPDDashboard.vue";
import ANCDashboard from "@/apps/ANC/components/ANCDashboard.vue";
import LabourDashboard from "@/apps/LABOUR/components/LabourDashboard.vue";
import PNCDashboard from "@/apps/PNC/components/PNCDashboard.vue";
import Programs from "@/components/Programs.vue";
import { resetDemographics } from "@/services/reset_data";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import { useUserActivities } from "@/composables/useUserActivities";
import { useUserRole } from "@/composables/useUserRole";
import { useProgramStore } from "@/stores/ProgramStore";
import { storeToRefs } from "pinia";

import { useWorkerStore } from "@/stores/workerStore";
const isLoading = ref(true);
const route = useRoute();
const workerStore = useWorkerStore();
useUserActivities();
useUserRole();
const programStore = useProgramStore();

const { programs } = storeToRefs(programStore);
watch(
    () => route.name,
    async (newRoute) => {
        if (newRoute === "Home") {
            await resetDemographics();
            workerStore.postData("SYNC_ALL_DATA");
        }
    },
    { immediate: true, deep: true }
);

onMounted(async () => {
    try {
        isLoading.value = true;
        workerStore.terminate();
        await resetDemographics();
        await useGlobalPropertyStore().loadGlobalProperty();
    } catch (error) {
        console.error("Error initializing component:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>
<style scoped>
ion-card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 1px -1px, rgba(0, 0, 0, 0) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
}
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 1em;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
