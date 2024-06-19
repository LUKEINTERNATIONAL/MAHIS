<script lang="ts">
import { defineComponent } from "vue";
import { useGeneralStore } from "@/stores/GeneralStore";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";
import { mapState } from "pinia";
export default defineComponent({
    data: () => ({
        ready: false,
    }),
    watch: {
        $route: {
            async handler(route: any) {
                const generalStore = useGeneralStore();
                generalStore.setOPDActivity(await this.getUserActivities("OPD_activities"));
                generalStore.setNCDActivity(await this.getUserActivities("NCD_activities"));
            },
            immediate: true,
            deep: true,
        },
    },

    computed: {
        ...mapState(useGeneralStore, ["OPDActivities", "NCDActivities"]),
    },
    methods: {
        async getUserActivities(activities: any) {
            try {
                const userID = Service.getUserID();
                const userData = await UserService.getJson("user_properties", {
                    user_id: userID,
                    property: activities,
                });
                if (userData.property_value) {
                    return userData.property_value.split(",");
                } else {
                    return []; // Return an empty array if property_value is not available
                }
            } catch (error) {
                // console.error("Error fetching user activities:", error);
                return []; // Return an empty array in case of error
            }
        },
    },
});
</script>
