<template>
    <ion-page :class="{ loading: isLoading }">
        <ion-header style="display: flex; justify-content: space-between">
            <ion-title class="modalTitle">Loading Offline Records</ion-title>
            <ion-icon @click="modalController.dismiss()" style="padding-top: 10px; padding-right: 10px" :icon="icons.cancel"></ion-icon>
        </ion-header>
        <ion-content>
            <div class="" style="display: block">
                <div class="title"></div>
                <div class="container">
                    <ion-button style="width: 100px; margin-bottom: 10px" @click="reloadData">Reload</ion-button>
                    <div class="sub_title">
                        Relationships
                        <span class="count"> ({{ offlineRelationshipStatus?.total_relationships }}/{{ offlineRelationshipStatus?.total }})</span>
                    </div>
                    <k-progress
                        :percent="fractionToPercentage(offlineRelationshipStatus?.total_relationships, offlineRelationshipStatus?.total)"
                        :active="!offlineRelationshipStatus?.total_relationships == offlineRelationshipStatus?.total"
                        active-color="#fff"
                        color="rgb(107, 199, 107)"
                    ></k-progress>
                    <div class="sub_title">
                        Countries <span class="count"> ({{ offlineCountriesStatus?.total_countries }}/{{ offlineCountriesStatus?.total }})</span>
                    </div>
                    <k-progress
                        :percent="fractionToPercentage(offlineCountriesStatus?.total_countries, offlineCountriesStatus?.total)"
                        :active="!offlineCountriesStatus?.total_countries == offlineCountriesStatus?.total"
                        active-color="#fff"
                        color="rgb(107, 199, 107)"
                    ></k-progress>
                    <div class="sub_title">
                        Districts <span class="count"> ({{ offlineDistrictStatus?.total_districts }}/{{ offlineDistrictStatus?.total }})</span>
                    </div>
                    <k-progress
                        :percent="fractionToPercentage(offlineDistrictStatus?.total_districts, offlineDistrictStatus?.total)"
                        :active="!offlineDistrictStatus?.total_districts == offlineDistrictStatus?.total"
                        active-color="#fff"
                        color="rgb(107, 199, 107)"
                    ></k-progress>
                    <div class="sub_title">
                        TAs <span class="count"> ({{ offlineTAsStatus?.total_TAs }}/{{ offlineTAsStatus?.total }})</span>
                    </div>
                    <k-progress
                        :percent="fractionToPercentage(offlineTAsStatus?.total_TAs, offlineTAsStatus?.total)"
                        :active="!offlineTAsStatus?.total_TAs == offlineTAsStatus?.total"
                        active-color="#fff"
                        color="rgb(107, 199, 107)"
                    ></k-progress>
                    <div class="sub_title">
                        Villages <span class="count"> ({{ offlineVillageStatus?.total_village }}/{{ offlineVillageStatus?.total }})</span>
                    </div>
                    <k-progress
                        :percent="fractionToPercentage(offlineVillageStatus?.total_village, offlineVillageStatus?.total)"
                        :active="!offlineVillageStatus?.total_village == offlineVillageStatus?.total"
                        active-color="#fff"
                        color="rgb(107, 199, 107)"
                    ></k-progress>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonPage, IonButton, modalController } from "@ionic/vue";
import { onMounted, ref } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import { useWorkerStatus } from "@/composables/useWorkerStatus";
import { useStatusStore } from "@/stores/StatusStore";
import { storeToRefs } from "pinia";
import { useWorkerStore } from "@/stores/workerStore";
import { icons } from "@/utils/svg";

const workerStore = useWorkerStore();
const isLoading = ref(false) as any;
const statusStore = useStatusStore();
const { offlineVillageStatus, offlineCountriesStatus, offlineDistrictStatus, offlineTAsStatus, offlineRelationshipStatus } = storeToRefs(statusStore);
onMounted(async () => {
    // await syncRegistrationMetaData();
});
const reloadData = async () => {
    workerStore.terminate();
    workerStore.postData("SYNC_ALL_DATA");
};

const fractionToPercentage = (numerator: any, denominator: any) => {
    if (denominator === 0) {
        return 0;
    }
    let percentage = (numerator / denominator) * 100;
    return `${percentage ? percentage.toFixed(2) : 0}`; // Keeps two decimal places
};
</script>
<style scoped>
.container {
    padding-top: 30px;
}
.title {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #00190e;
    margin-top: 10px;
}
.sub_title {
    font-size: 14px;
    font-weight: 700;
}
.count {
    padding-top: 3px;
    padding-left: 3px;
    font-size: 10px;
}
</style>
