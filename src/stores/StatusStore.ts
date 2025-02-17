import { defineStore } from "pinia";
import { getOfflineRecords } from "@/services/offline_service";
import { set } from "lodash";
import { sync } from "ionicons/icons";

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
            isSyncingDone: false,
            syncingTotal: 0 as any,
            syncingCountPercentage: 0 as any,
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
        async checkMetaDataStatus() {
            this.getSyncingCountPercentage();
            try {
                // Check if all counts match the expected totals
                this.isSyncingDone =
                    this.offlineVillageStatus.total_village === this.offlineVillageStatus.total &&
                    this.offlineRelationshipStatus.total_relationships === this.offlineRelationshipStatus.total &&
                    this.offlineCountriesStatus.total_countries === this.offlineCountriesStatus.total &&
                    this.offlineDistrictStatus.total_districts === this.offlineDistrictStatus.total &&
                    this.offlineTAsStatus.total_TAs === this.offlineTAsStatus.total &&
                    this.offlinePatientsStatus.offlinePatientsCount === this.offlinePatientsStatus.serverPatientsCount;
            } catch (error) {
                console.error("Error checking metadata status:", error);
                this.isSyncingDone = false; // Ensure syncing is marked as not done in case of errors
            }
        },
        getSyncingCountPercentage() {
            const denominator =
                this.offlineVillageStatus.total +
                this.offlineRelationshipStatus.total +
                this.offlineCountriesStatus.total +
                this.offlineDistrictStatus.total +
                this.offlineTAsStatus.total +
                this.offlinePatientsStatus.serverPatientsCount;
            const numerator =
                this.offlineVillageStatus.total_village +
                this.offlineRelationshipStatus.total_relationships +
                this.offlineCountriesStatus.total_countries +
                this.offlineDistrictStatus.total_districts +
                this.offlineTAsStatus.total_TAs +
                this.offlinePatientsStatus.offlinePatientsCount;

            if (denominator === 0) {
                this.syncingCountPercentage = 0;
            }
            let percentage = (numerator / denominator) * 100;
            this.syncingCountPercentage = `${percentage ? percentage.toFixed(0) : 0}`;
        },
        async setSyncingTotal() {
            // Fetch all offline records in parallel for better performance
            if (this.apiStatus) {
                const [villages, relationships, countries, districts, TAs, patientRecords] = await Promise.all([
                    getOfflineRecords("villages"),
                    getOfflineRecords("relationship"),
                    getOfflineRecords("countries"),
                    getOfflineRecords("districts"),
                    getOfflineRecords("TAs"),
                    getOfflineRecords("patientRecords"),
                ] as any);

                // Update statuses
                this.offlineVillageStatus.total_village = villages.length;
                this.offlineRelationshipStatus.total_relationships = relationships.length;
                this.offlineCountriesStatus.total_countries = countries.length;
                this.offlineDistrictStatus.total_districts = districts.length;
                this.offlineTAsStatus.total_TAs = TAs.length;
                this.offlinePatientsStatus.offlinePatientsCount = patientRecords.length;
            }
        },
    },
    persist: true,
});
