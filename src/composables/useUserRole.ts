// useUserRole.ts
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Service } from "@/services/service";

interface UserRoleSettings {
    url: string;
    btnName: string;
    stepperTitle?: string;
}

export function useUserRole() {
    const route = useRoute();
    const userRole = ref<string>("");
    const ready = ref<boolean>(false);
    const userRoleSettings = ref<UserRoleSettings>({} as UserRoleSettings);

    const updateUserRoleSettings = () => {
        const currentUserRole = Service.getUserRoles();
        const programID = Service.getProgramID();
        const programName = Service.getProgramName();

        userRole.value = currentUserRole;
        ready.value = false;

        // Lab user in OPD program
        if (currentUserRole === "Lab" && programID === 14) {
            userRoleSettings.value = {
                url: "home",
                btnName: "Back to home",
                stepperTitle: "Laboratory",
            };
        }
        // Non-Lab user in OPD program
        else if (programID === 14 && currentUserRole !== "Lab") {
            userRoleSettings.value = {
                url: "OPDvitals",
                btnName: "Back to vitals",
                stepperTitle: "The consultation plan",
            };
        }
        // ANC program
        else if (programID === 12) {
            userRoleSettings.value = {
                url: "contact",
                btnName: "Back",
            };
        }
        // Labour and Delivery program
        else if (programName === "LABOUR AND DELIVERY PROGRAM") {
            userRoleSettings.value = {
                url: "labour/labourHome",
                btnName: "Back to home",
            };
        }
        // PNC program
        else if (programName === "PNC PROGRAM") {
            userRoleSettings.value = {
                url: "pnc/home",
                btnName: "Back to home",
            };
        }
        // Default or unmatched conditions
        else {
            userRoleSettings.value = {
                url: "",
                btnName: "",
            };
        }

        ready.value = true;
    };

    // Watch for route changes
    watch(
        () => route.path,
        () => {
            updateUserRoleSettings();
        },
        { immediate: true, deep: true }
    );

    return {
        userRole,
        ready,
        userRoleSettings,
        updateUserRoleSettings,
    };
}
