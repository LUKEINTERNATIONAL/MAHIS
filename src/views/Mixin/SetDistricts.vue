<script lang="ts">
import { defineComponent } from "vue";
import { LocationService } from "@/services/location_service";
import { getOfflineRecords } from "@/services/offline_service";
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
    methods: {
        async getLocationData() {
            this.districtList = await getOfflineRecords("districts");
            this.countriesList = await getOfflineRecords("countries");
            this.TAsList = await getOfflineRecords("TAs");
            this.villageList = await getOfflineRecords("villages");
        },
        async getVillages(targetId: any) {
            if (this.villageList == "") return null;
            return this.villageList?.filter((obj: any) => obj.traditional_authority_id === targetId);
        },
        async getTAs(targetId: any) {
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
