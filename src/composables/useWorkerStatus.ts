import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStatusStore } from "@/stores/StatusStore";
import workerData from "@/activate_worker";
import { useRoute } from "vue-router";

export function useWorkerStatus() {
    const workerApi = ref(null) as any;
    const route = useRoute();

    const statusStore = useStatusStore();
    const { offlineVillageStatus, offlineCountriesStatus, offlineDistrictStatus, offlineTAsStatus, offlineRelationshipStatus } =
        storeToRefs(statusStore);

    const setWorkerStatus = () => {
        if (workerApi.value?.data?.payload?.total_relationships) {
            statusStore.setOfflineRelationshipStatus(workerApi.value.data.payload);
        }
        if (workerApi.value?.data?.payload?.total_village) {
            statusStore.setOfflineVillageStatus(workerApi.value.data.payload);
        }
        if (workerApi.value?.data?.payload?.total_countries) {
            statusStore.setOfflineCountriesStatus(workerApi.value.data.payload);
        }
        if (workerApi.value?.data?.payload?.total_districts) {
            statusStore.setOfflineDistrictStatus(workerApi.value.data.payload);
        }
        if (workerApi.value?.data?.payload?.total_TAs) {
            statusStore.setOfflineTAsStatus(workerApi.value.data.payload);
        }
    };
    const syncRegistrationMetaData = async () => {
        await workerData.terminate();
        workerApi.value = workerData.workerApi;
        await workerData.postData("SYNC_DDE");
        await workerData.postData("SET_GENERIC_VACCINE_SCHEDULE");
        await workerData.postData("SET_OFFLINE_RELATIONSHIPS");
        await workerData.postData("SET_OFFLINE_LOCATION");
    };
    const syncOtherMetaData = async () => {
        await workerData.postData("SYNC_CONCEPTS");
        await workerData.postData("SYNC_STOCK_RECORD");
        await workerData.postData("SYNC_PATIENT_RECORD", { msg: "Done Syncing" });
    };

    watch(
        () => workerApi.value,
        async () => {
            if (workerApi.value?.data?.payload) {
                setWorkerStatus();
                if (statusStore.registrationMetaDataStatus()) {
                    if (workerApi.value?.data?.payload?.total_village) {
                        await syncOtherMetaData();
                    }
                }
            }
        },
        { deep: true }
    );

    onMounted(async () => {
        await workerData.terminate();
        workerApi.value = workerData.workerApi;
    });

    return {
        // State
        workerApi,

        // Store state
        offlineVillageStatus,
        offlineCountriesStatus,
        offlineDistrictStatus,
        offlineTAsStatus,
        offlineRelationshipStatus,

        // Methods
        setWorkerStatus,
        syncOtherMetaData,
        syncRegistrationMetaData,
    };
}
