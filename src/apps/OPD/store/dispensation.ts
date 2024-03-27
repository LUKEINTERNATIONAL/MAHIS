import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const dispensationStore = defineStore('dispensationStore',{
    state: () => ({
        dispensedMedications:[
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Acyclovir 500mg',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: ' Vitamin B 100 000 UI',
                                value: 'Vitamin B',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Baclofen 30mg',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'ORS',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },


            // {
            //     isFinishBtn: false,
            //     sectionHeader: '',
            //     classDash: 'dashed_bottom_border _padding',

            //     data:
            //         {
            //             rowData:[
            //                 {
            //                     colData: [
            //                         {   
            //                             displayNone:true,
            //                             inputHeader: 'specify',
            //                             unit: '',
            //                             icon: icons.editPen,
            //                             value: '',
            //                             name: 'otherC',
            //                             required: true,
            //                             eventType: 'input',
            //                             inputWidth: "85%",
            //                         },

            //                     ]
            //                 }
            //             ]
            //         },
            // },


        ] as any, 
       
    }),
    actions:{
        setDispensedMedications(data:any) {
            this.dispensedMedications = data
        },
      
    },
    // persist:true,

})