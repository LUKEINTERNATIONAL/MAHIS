import { defineStore } from "pinia";

export const useChangeStatusStore = defineStore("ChangeStatusStore", {
    state: () => ({
        navigationPayload: {},
    }),
    actions: {
        setNavigationPayload(payload: any): void{
            this.navigationPayload = payload
        }
    },
    persist: true,
})