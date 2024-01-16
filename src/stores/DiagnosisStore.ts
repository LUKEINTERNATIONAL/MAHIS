import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useDiagnosisStore = defineStore('DiagnosisStore', {
    state: () => ({
        diagnosis: [
            {
                selectdData: [],
                isFinishBtn: false,
                data:
                    { 
                        rowData:[
                            {
                                colData:[
                                    {
                                        inputHeader: 'Diagnosis',
                                        icon: icons.search,
                                        value: '',
                                        name: 'diagnosis',
                                        eventType: 'input',
                                        required: true
                                    },
                                    {
                                        inputHeader: 'Result',
                                        value: '',
                                        name: 'result',
                                        eventType: 'blur',
                                        required: true
                                    },
                                    
                                ],
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        icon: icons.plus
                                    }
                                ]
                            }
                        ],
                        
                    }
                 
            }
               
        ] as any
    }),
    actions:{
        setDiagnosis(data: any){
            this.diagnosis = data
        }
    },
    persist:true,

})