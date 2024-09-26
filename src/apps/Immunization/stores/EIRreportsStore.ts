import { defineStore } from "pinia";

export const EIRreportsStore = defineStore("EIRreportsStore", {
    state: () => ({
        navigationPayload: {} as any,
        start_date: '',
        end_date: '',
        immunizationMonthlyRepoartData: [] as any,
        AEFIReportData: {},
    }),
    actions: {
        setNavigationPayload(title: string, canGoBack: boolean, canGoForward: boolean,  backHref: string, previousRoute: string, subTxt=''): void{
            const data = {
                title: title,
                canGoBack: canGoBack,
                canGoForward: canGoForward, 
                backHref: backHref,
                previousRoute: previousRoute,
                subTxt: subTxt
            }
            
            this.navigationPayload = data
        },
        setStartAndEndDates(startDate: string, endDate: string): void {
            this.start_date = startDate
            this.end_date = endDate
        },
        setImmunizationMonthlyRepoartData(data: []) {
            this.immunizationMonthlyRepoartData = data
        },
        setAEFIReportData(data: object): void {
            this.AEFIReportData = data
        }
    },
    persist: true,
})