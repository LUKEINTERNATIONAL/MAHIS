<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import { OrderService } from "@/services/order_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
export default defineComponent({
    data: () => ({
        userRole: "" as any,
        ready: false,
        labOrders: {} as any,
    }),
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    watch: {
        $route: {
            async handler(route: any) {
                this.labOrders = await OrderService.getOrders(this.demographics.patient_id);
            },
            immediate: true,
            deep: true,
        },
    },
});
</script>
