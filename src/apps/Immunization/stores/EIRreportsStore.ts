import { defineStore } from "pinia";

export const useChangeStatusStore = defineStore("ChangeStatusStore", {
    state: () => ({
        navigationPayload: {},
        previousRoute: '',
    }),
    actions: {
        setNavigationPayload(payload: any): void{
            this.navigationPayload = payload
        },
        setPreviousRoute(route: string): void {
            this.previousRoute = route
        }
    },
    persist: true,
})