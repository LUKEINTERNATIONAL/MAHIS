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
                                        required: true,
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },
                                    
                                ],
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
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