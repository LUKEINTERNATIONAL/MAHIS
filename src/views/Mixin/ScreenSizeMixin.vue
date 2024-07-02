<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
import { OrderService } from "@/services/order_service";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
export default defineComponent({
    data: () => ({
        screenWidth: window.innerWidth,
        screenheight: window.innerHeight,
    }),
    mounted() {
        window.addEventListener("resize", this.updateSize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateSize);
    },
    methods: {
        updateSize() {
            this.screenWidth = window.innerWidth;
            this.screenheight = window.innerHeight;
        },
    },
});
</script>
