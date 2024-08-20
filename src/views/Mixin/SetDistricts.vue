<script lang="ts">
import { defineComponent } from "vue";
import { LocationService } from "@/services/location_service";
import { getOfflineLocation, getLocalVillages } from "@/services/set_location";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
        TAsList: [] as any,
        villageList: [] as any,
        locations: [] as any,
    }),
    watch: {
        $route: {
            async handler(route: any) {
                this.locations = await getOfflineLocation();
                this.districtList = this.locations?.districts;
                this.TAsList = this.locations?.TAs;
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        async getVillages(targetId: any) {
            const data = await getLocalVillages();
            return data.filter((obj: any) => obj.traditional_authority_id === targetId);
        },
        getTAs(targetId: any) {
            return this.TAsList.filter((obj: any) => obj.district_id === targetId);
        },
        getDistricts(targetId: any) {
            return this.districtList.filter((obj: any) => obj.region_id === targetId);
        },
    },
});
</script>
