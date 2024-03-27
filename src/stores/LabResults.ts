import {defineStore} from "pinia";

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
