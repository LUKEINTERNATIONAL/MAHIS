import { defineStore } from 'pinia'

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({
        vitals: []
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    persist:true,

})

// {
//     height:'',
//     weight:'',
//     systolic:'',
//     diastolic:'',
//     bmp:'',
//     pulse:'',
//     respiratory:'',
//     oxygen:'',
//     temperature:''
// }