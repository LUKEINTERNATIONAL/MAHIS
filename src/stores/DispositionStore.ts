import { defineStore } from 'pinia'

export const useDispositionStore = defineStore('disposition', {
    state: () => ({
        dispositions: [
            // name:
            // type:
            // date:
            // reason:
        ] as any,
    }),
    actions:{
        addDispositionData(data: any, index: any) {
            
            if (isNaN(index)) {
                this.dispositions.unshift(data);
            } else {
                this.dispositions.splice(index, 1, data);
            }

        },
    },
    persist:true,

})