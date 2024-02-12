import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore',{
    state: () => ({
        saveProgressStatus: false
    }),
    actions:{
        setSaveProgressStatus(data: any){
            this.saveProgressStatus = data
        }
    },
    persist:true,

})