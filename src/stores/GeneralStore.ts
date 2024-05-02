import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", {
    state: () => ({
        activities: [] as any,
        userActions: [] as any,
    }),
    actions: {
        setActivity(data: any) {
            this.activities = data;
        },
        setUserActions(data: any) {
            this.userActions = data;
        },
    },
    persist: true,
});
