import { defineStore } from 'pinia'

export const useDiagnosisStore = defineStore('DiagnosisStore', {
    state: () => ({
        diagnosis: [] as any
    }),
    actions:{
        setDiagnosis(data: any){
            this.diagnosis = data
        }
    },
    persist:true,

})