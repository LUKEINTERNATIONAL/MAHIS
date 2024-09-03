<script lang="ts">
import { defineComponent, ref } from "vue";
import { Capacitor } from "@capacitor/core";

export default defineComponent({
    name: "Menu",
    data() {
        return {
            isMobile: false as any,
        };
    },
    mounted() {
        if (Capacitor.isNativePlatform()) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    },
});
</script>
