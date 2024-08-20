import { defineStore } from "pinia";

export const EIRreportsStore = defineStore("EIRreportsStore", {
    state: () => ({
        navigationPayload: {} as any,
    }),
    actions: {
        setNavigationPayload(title: string, canGoBack: boolean, canGoForward: boolean,  backHref: string, previousRoute: string): void{
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