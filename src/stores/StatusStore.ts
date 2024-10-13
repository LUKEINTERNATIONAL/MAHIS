import { defineStore } from "pinia";

export const useStatusStore = defineStore("statusStore", {
    state: () => ({
        apiStatus: true,
        offlineVillageStatus: {} as any,
        offlineDistrictStatus: {} as any,
        offlineTAsStatus: {} as any,
    }),
    actions: {
        setApiStatus(data: any) {
            this.apiStatus = data;
        },
        setOfflineDistrictStatus(data: any) {
            this.offlineDistrictStatus = data;
        },
        setOfflineVillageStatus(data: any) {
            this.offlineVillageStatus = data;
        },
        setOfflineTAsStatusStatus(data: any) {
            this.offlineTAsStatus = data;
        },
    },
    persist: true,
});
