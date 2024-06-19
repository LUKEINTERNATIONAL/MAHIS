<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
export default defineComponent({
    data: () => ({
        userRole: "" as any,
        ready: false,
        userRoleSettings: {} as any,
    }),
    watch: {
        $route: {
            async handler(route: any) {
                this.userRole = Service.getUserRoles();
                if (this.userRole == "Lab") {
                    this.userRoleSettings = {
                        url: "home",
                        btnName: "Back to home",
                        stepperTitle: "Laboratory",
                    };
                } else {
                    this.userRoleSettings = {
                        url: "OPDvitals",
                        btnName: "Back to vitals",
                        stepperTitle: "The consultation plan",
                    };
                }
            },
            immediate: true,
            deep: true,
        },
    },
});
</script>
