import { defineStore } from "pinia";

export const EIRreportsStore = defineStore("EIRreportsStore", {
    state: () => ({
        navigationPayload: {},
    }),
    actions: {
        setNavigationPayload(title: string, canGoBack: string,canGoForward: string,  backHref: string, previousRoute: string): void{
            const data = {
                title: title,
                canGoBack: canGoBack,
                canGoForward: canGoForward, 
                backHref: backHref,
                previousRoute: previousRoute,
            }
            
            this.navigationPayload = data
        },
    },
    persist: true,
})