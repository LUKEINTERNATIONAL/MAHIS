import { defineStore } from "pinia";

export const useStatusStore = defineStore("statusStore", {
    state: () => ({
        apiStatus: true,
    }),
    actions: {
        setApiStatus(data: any) {
            this.apiStatus = data;
        },
    },
    persist: true,
});
