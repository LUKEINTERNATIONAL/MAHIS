import { defineStore } from 'pinia'

export const useDemographicsStore = defineStore('demographicStore',{
    state: () => ({
        demographics: {}
    }),
    actions:{
        setDemographics(data: any){
            this.demographics = data
        }
    },
    persist:true,

})