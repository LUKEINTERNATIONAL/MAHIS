<script lang="ts">
import { defineComponent } from "vue";
import { LocationService } from "@/services/location_service";
import { getOfflineRecords } from "@/services/offline_service";
import { useStatusStore } from "@/stores/StatusStore";
import { mapState } from "pinia";

export default defineComponent({
    data: () => ({
        districtList: [] as any,
        countriesList: [] as any,
        TAsList: [] as any,
        villageList: [] as any,
        locations: [] as any,
    }),
    async mounted() {
        await this.getLocationData();
    },
    computed: {
        ...mapState(useStatusStore, ["apiStatus"]),
    },
    methods: {
        async getLocationData() {
            this.districtList = await getOfflineRecords("districts");
            this.countriesList = await getOfflineRecords("countries");
            this.TAsList = await getOfflineRecords("TAs");
            this.villageList = await getOfflineRecords("villages");

            if (this.apiStatus && !this.metaDataRegSyncStatus()) {
                this.countriesList = await LocationService.getDistricts(4);

                let districtList = [];
                for (let i of [1, 2, 3]) {
                    const districts = await LocationService.getDistricts(i);
                    districtList.push(...districts);
                }
                this.districtList = districtList;
            }
        },
        metaDataRegSyncStatus() {
            return useStatusStore().registrationMetaDataStatus();
        },
        async getVillages(targetId: any) {
            if (this.apiStatus && !this.metaDataRegSyncStatus()) {
                return await LocationService.getVillages(targetId);
            }
            if (this.villageList == "") return null;
            return this.villageList?.filter((obj: any) => obj.traditional_authority_id === targetId);
        },
        async getTAs(targetId: any) {
            if (this.apiStatus && !this.metaDataRegSyncStatus()) {
                return await LocationService.getTraditionalAuthorities(targetId);
            }
            return await getOfflineRecords("TAs", { whereClause: { district_id: targetId } });
        },
        getDistricts(targetId: any) {
            return this.districtList.filter((obj: any) => obj.region_id === targetId);
        },
        getCountries(targetId: any) {
            return this.countriesList.filter((obj: any) => obj.region_id === targetId);
        },
    },
});
</script>
