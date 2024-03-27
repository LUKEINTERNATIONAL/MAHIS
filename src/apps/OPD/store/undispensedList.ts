import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const undispensedStore = defineStore('undispensedStore',{
    state: () => ({
        undispensedMedications:[

            {
                isFinishBtn: false,
                sectionHeader: 'Paracetamol',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {   
                                        displayNone:false,
                                        inputHeader: 'Reason for not dispensing the medication',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'otherC',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },


        ] as any, 
        
        undispensedMedication:[

            {
                isFinishBtn: false,
                sectionHeader: 'Cotrimozol',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {   
                                        displayNone:false,
                                        inputHeader: 'Reason for not dispensing the medication',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'otherC',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },


        ] as any, 
        
       
    }),
    actions:{
        setUndispensedMedications(data:any) {
            this.undispensedMedications = data
        },
        setUndispensedMedication(data:any) {
            this.undispensedMedication = data
        },

      
    },
    // persist:true,

})