import { defineStore } from 'pinia'

export const useOutcomeStore = defineStore('outcome', {
    state: () => ({
        dispositions: [] as any,
    }),
    actions:{
        addOutcomeData(data: any, index: any) {
            if (isNaN(index)) {
                this.dispositions.splice(0, this.dispositions.length, data)
            } else {
                this.dispositions.splice(index, 1, data)
            }
        }
    },
    persist:true,

})