<script lang="ts">
import { defineComponent } from "vue";
import { LocationService } from "@/services/location_service";
export default defineComponent({
    data: () => ({
        districtList: [] as any,
    }),
    watch: {
        $route: {
            async handler(route: any) {
                this.districtList = [];
                for (let i of [1, 2, 3]) {
                    const districts: any = await LocationService.getDistricts(i);
                    this.districtList.push(...districts);
                }
            },
            immediate: true,
            deep: true,
        },
    },
});
</script>
