import { defineStore } from 'pinia'

export const useDemographicsStore = defineStore('demographicStore',{
    state: () => ({
        demographics: {} as any
    }),
    actions:{
        setDemographics(data: any){
            this.demographics = data
        }
    },
    persist:true,

})