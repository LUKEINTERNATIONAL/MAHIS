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
            if (this.apiStatus && this.districtList.length != useStatusStore().offlineDistrictStatus?.total) {
                for (let i of [1, 2, 3]) {
                    const districts = await LocationService.getDistricts(i);
                    this.districtList.push(...districts);
                }
            }
            if (this.apiStatus && this.countriesList.length != useStatusStore().offlineCountriesStatus?.total) {
                this.countriesList = await LocationService.getDistricts(4);
            }
        },
        async getVillages(targetId: any) {
            const offlineVillage: any = await getOfflineRecords("villages", { whereClause: { traditional_authority_id: targetId } });
            if (offlineVillage.length > 0) return offlineVillage;
            if (this.apiStatus) return await LocationService.getVillages(targetId);
        },
        async getTAs(targetId: any) {
            const offlineTA: any = await getOfflineRecords("TAs", { whereClause: { district_id: targetId } });
            if (offlineTA.length > 0) return offlineTA;
            if (this.apiStatus) return await LocationService.getTraditionalAuthorities(targetId);
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
