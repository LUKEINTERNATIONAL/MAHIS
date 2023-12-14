import { defineStore } from 'pinia'

export const useInvestigationStore = defineStore('investigationStore', {
    state: () => ({
        investigations: [] as any
    }),
    actions:{
        setInvestigations(data: any){
            this.investigations = data
        }
    },
    persist:true,

})