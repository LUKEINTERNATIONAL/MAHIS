import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabResultsStore = defineStore("labResultsStore", {
    state: () => ({
        labResults: [] as any,
    }),
    actions: {
        setLabResults(data: any) {
            this.labResults = data;
        },
    },
    persist: true,
});
