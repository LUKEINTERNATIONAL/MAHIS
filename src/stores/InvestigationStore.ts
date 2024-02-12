import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useInvestigationStore = defineStore('investigationStore', {
    state: () => ({
        investigations: [
            {
                db_data: [],
                isFinishBtn: false,
                selectdData: [],
                displayData: [],
                data:
                    { 
                        rowData:[
                            {
                                colData:[
                                    {
                                        inputHeader: 'Test',
                                        icon: icons.search,
                                        value: '',
                                        name: 'test',
                                        eventType: 'input',
                                        required: true,
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },
                                    {
                                        inputHeader: 'Result',
                                        value: '',
                                        name: 'result',
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
        setInvestigations(data: any){
            this.investigations = data
        }
    },
    persist:true,

})