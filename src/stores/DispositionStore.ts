import { defineStore } from 'pinia'

export const useDispositionStore = defineStore('disposition', {
    state: () => ({
        dispositions: [] as any,
    }),
    actions:{
        addDispositionData(data: any, index: any) {
            
            if (isNaN(index)) {
                this.dispositions.push(data);
            } else {
                this.dispositions.splice(index, 1, data);
            }

        },
        getDispositionData() {
            return this.dispositions;
        }
    },
    persist:true,

})