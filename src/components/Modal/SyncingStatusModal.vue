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
                    <div style="margin-bottom: 20px">
                        <div>
                            <h5>Records from device to server</h5>
                            <div class="sub_title">
                                Patients
                                <span class="count"> ({{ syncingTotal - countPendingRecords }}/{{ syncingTotal }})</span>
                            </div>
                            <k-progress
                                :percent="fractionToPercentage(syncingTotal - countPendingRecords, syncingTotal)"
                                :active="!(syncingTotal - countPendingRecords == syncingTotal)"
                                active-color="#fff"
                                color="rgb(107, 199, 107)"
                            ></k-progress>
                        </div>
                        <ion-button style="float: right; margin-right: 70px" @click="reloadData('offline')"> Sync </ion-button>
                    </div>
                    <div style="margin-bottom: 20px">
                        <div>
                            <h5>Records from server to device</h5>
                            <div class="sub_title">
                                Relationships
                                <span class="count">
                                    ({{ offlineRelationshipStatus?.total_relationships }}/{{ offlineRelationshipStatus?.total }})</span
                                >
                            </div>
                            <k-progress
                                :percent="fractionToPercentage(offlineRelationshipStatus?.total_relationships, offlineRelationshipStatus?.total)"
                                :active="!offlineRelationshipStatus?.total_relationships == offlineRelationshipStatus?.total"
                                active-color="#fff"
                                color="rgb(107, 199, 107)"
                            ></k-progress>
                            <div class="sub_title">
                                Countries
                                <span class="count"> ({{ offlineCountriesStatus?.total_countries }}/{{ offlineCountriesStatus?.total }})</span>
                            </div>
                            <k-progress
                                :percent="fractionToPercentage(offlineCountriesStatus?.total_countries, offlineCountriesStatus?.total)"
                                :active="!offlineCountriesStatus?.total_countries == offlineCountriesStatus?.total"
                                active-color="#fff"
                                color="rgb(107, 199, 107)"
                            ></k-progress>
                            <div class="sub_title">
                                Districts
                                <span class="count"> ({{ offlineDistrictStatus?.total_districts }}/{{ offlineDistrictStatus?.total }})</span>
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
                            <div class="sub_title">
                                Patients
                                <span class="count">
                                    ({{ offlinePatientsStatus?.offlinePatientsCount }}/{{ offlinePatientsStatus?.serverPatientsCount }})</span
                                >
                            </div>
                            <k-progress
                                :percent="
                                    fractionToPercentage(offlinePatientsStatus?.offlinePatientsCount, offlinePatientsStatus?.serverPatientsCount)
                                "
                                :active="!offlinePatientsStatus?.offlinePatientsCount == offlinePatientsStatus?.serverPatientsCount"
                                active-color="#fff"
                                color="rgb(107, 199, 107)"
                            ></k-progress>
                        </div>

                        <ion-button style="float: right; margin-right: 70px" @click="reloadData('')"> Sync </ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonPage, IonButton, modalController } from "@ionic/vue";
import { onMounted, ref, watch } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import { useWorkerStatus } from "@/composables/useWorkerStatus";
import { useStatusStore } from "@/stores/StatusStore";
import { storeToRefs } from "pinia";
import { useWorkerStore } from "@/stores/workerStore";
import { icons } from "@/utils/svg";
import { getOfflineRecords } from "@/services/offline_service";

const workerStore = useWorkerStore();
let countPendingRecords = ref(0) as any;
const isLoading = ref(false) as any;
const statusStore = useStatusStore();
const {
    syncingTotal,
    offlineVillageStatus,
    offlineCountriesStatus,
    offlineDistrictStatus,
    offlineTAsStatus,
    offlineRelationshipStatus,
    offlinePatientsStatus,
} = storeToRefs(statusStore);
onMounted(async () => {
    countPendingRecords.value = await getPendingRecord();
});
const reloadData = async (data: any) => {
    if (data == "offline") {
        countPendingRecords.value = await getPendingRecord();
        useStatusStore().syncingTotal = countPendingRecords.value;
    }
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
watch(
    () => offlinePatientsStatus,
    async () => {
        countPendingRecords.value = await getPendingRecord();
    },
    { deep: true }
);
const getPendingRecord = async () => {
    const data: any = await getOfflineRecords("patientRecords", {
        whereClause: { saveStatusPersonInformation: "pending" },
    });
    return data.length;
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
