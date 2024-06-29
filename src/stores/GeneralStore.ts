import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", {
    state: () => ({
        OPDActivities: [] as any,
        NCDActivities: [] as any,
        OPDUserActions: [] as any,
        NCDUserActions: [] as any,
    }),
    actions: {
        setOPDActivity(data: any) {
            this.OPDActivities = data;
        },
        setNCDActivity(data: any) {
            this.NCDActivities = data;
        },
        setOPDUserActions(data: any) {
            this.OPDUserActions = data;
        },
        setNCDUserActions(data: any) {
            this.NCDUserActions = data;
        },
    },
    persist: true,
});
