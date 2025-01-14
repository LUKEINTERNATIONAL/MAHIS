import { defineStore } from "pinia";

export const useStatusStore = defineStore("statusStore", {
    state: () => {
        return {
            apiStatus: true,
            offlineVillageStatus: {} as any,
            offlineDistrictStatus: {} as any,
            offlineCountriesStatus: {} as any,
            offlineTAsStatus: {} as any,
            offlineRelationshipStatus: {} as any,
            offlinePatientsStatus: {} as any,
        };
    },
    actions: {
        setApiStatus(data: any) {
            this.apiStatus = data;
        },
        setOfflineDistrictStatus(data: any) {
            this.offlineDistrictStatus = data;
        },
        setOfflineCountriesStatus(data: any) {
            this.offlineCountriesStatus = data;
        },
        setOfflineVillageStatus(data: any) {
            this.offlineVillageStatus = data;
        },
        setOfflineTAsStatus(data: any) {
            this.offlineTAsStatus = data;
        },
        setOfflineRelationshipStatus(data: any) {
            this.offlineRelationshipStatus = data;
        },
        setOfflinePatientsStatus(data: any) {
            this.offlinePatientsStatus = data;
        },
        registrationMetaDataStatus() {
            if (
                this.offlineVillageStatus?.total_village == this.offlineVillageStatus?.total &&
                this.offlineRelationshipStatus?.total_relationships == this.offlineRelationshipStatus?.total &&
                this.offlineCountriesStatus?.total_countries == this.offlineCountriesStatus?.total &&
                this.offlineDistrictStatus?.total_districts == this.offlineDistrictStatus?.total &&
                this.offlineTAsStatus?.total_TAs == this.offlineTAsStatus?.total
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    persist: true,
});
