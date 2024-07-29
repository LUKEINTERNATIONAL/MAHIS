<script lang="ts">
import { defineComponent } from "vue";
import { LocationService } from "@/services/location_service";
import { getLocation } from "@/services/set_location";
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
                this.locations = await getLocation();
                this.districtList = this.locations?.districts;
                this.TAsList = this.locations?.TAs;
                this.villageList = this.locations?.villages;
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        getVillages(targetId: any) {
            return this.villageList.filter((obj: any) => obj.traditional_authority_id === targetId);
        },
        getTAs(targetId: any) {
            return this.TAsList.filter((obj: any) => obj.district_id === targetId);
        },
    },
});
</script>
