import { useStatusStore } from "@/stores/StatusStore";
export function useWorkerStatus() {
    const statusStore = useStatusStore();
    const setWorkerStatus = (workerData: any) => {
        if (workerData?.payload?.total_relationships) {
            statusStore.setOfflineRelationshipStatus(workerData.payload);
        }
        if (workerData?.payload?.total_village) {
            statusStore.setOfflineVillageStatus(workerData.payload);
        }
        if (workerData?.payload?.total_countries) {
            statusStore.setOfflineCountriesStatus(workerData.payload);
        }
        if (workerData?.payload?.total_districts) {
            statusStore.setOfflineDistrictStatus(workerData.payload);
        }
        if (workerData?.payload?.total_TAs) {
            statusStore.setOfflineTAsStatus(workerData.payload);
        }
    };

    return {
        setWorkerStatus,
    };
}
