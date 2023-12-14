import { defineStore } from 'pinia'

export const useDispositionStore = defineStore('DispositionStore', {
    state: () => ({
        dispositions: [] as any
    }),
    actions:{
        setDispositions(data: any){
            this.dispositions = data
        }
    },
    persist:true,

})