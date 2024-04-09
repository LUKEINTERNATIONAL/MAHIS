import { defineStore } from 'pinia'

export const useOutcomeStore = defineStore('outcome', {
    state: () => ({
        dispositions: [
            // name:
            // type:
            // date:
            // reason:
            // dataItem:
        ] as any,
    }),
    actions:{
        addOutcomeData(data: any, index: any) {
            
            if (isNaN(index)) {
                this.dispositions.unshift(data);
            } else {
                this.dispositions.splice(index, 1, data);
            }

        },
    },
    persist:true,

})