import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/GeneralStore";
import { UserService } from "@/services/user_service";
import { Service } from "@/services/service";
import { storeToRefs } from "pinia";

export function useUserActivities() {
    const route = useRoute();
    const generalStore = useGeneralStore();
    const ready = ref(false);

    // Get store state using storeToRefs for reactivity
    const { OPDActivities, NCDActivities } = storeToRefs(generalStore);

    // Get user activities for a specific activity type
    const getUserActivities = async (activities: string): Promise<string[]> => {
        try {
            const userID = Service.getUserID();
            const userData = await UserService.getJson("user_properties", {
                user_id: userID,
                property: activities,
            });

            return userData?.property_value ? userData?.property_value?.split(",") : [];
        } catch (error) {
            console.error("Error fetching user activities:", error);
            return [];
        }
    };

    // Update activities in store
    const updateActivities = async () => {
        try {
            ready.value = false;
            const [opdActivities, ncdActivities] = await Promise.all([getUserActivities("OPD_activities"), getUserActivities("NCD_activities")]);

            generalStore.setOPDActivity(opdActivities);
            generalStore.setNCDActivity(ncdActivities);
        } catch (error) {
            console.error("Error updating activities:", error);
        } finally {
            ready.value = true;
        }
    };

    // Watch route changes
    watch(
        () => route.path,
        async () => {
            console.log("🚀 ~ useUserActivities ~ route:", route);
            await updateActivities();
        },
        { immediate: true, deep: true }
    );

    return {
        // State
        ready,
        OPDActivities,
        NCDActivities,

        // Methods
        getUserActivities,
        updateActivities,
    };
}
