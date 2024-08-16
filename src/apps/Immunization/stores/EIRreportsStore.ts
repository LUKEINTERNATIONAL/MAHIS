import { defineStore } from "pinia";

export const EIRreportsStore = defineStore("EIRreportsStore", {
    state: () => ({
        navigationPayload: {} as any,
        start_date: '',
        end_date: '',
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
        setStartAndEndDates(startDate: string, endDate: string): void {
            this.start_date = startDate
            this.end_date = endDate
        },
    },
    persist: true,
})