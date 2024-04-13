import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore',{
    state: () => ({
        saveProgressStatus: false,
        activities: [] as any
    }),
    actions:{
        setSaveProgressStatus(data: any){
            this.saveProgressStatus = data
        },
        setActivity(data: any){
            this.activities = data
        }
    },
    persist:true,

})