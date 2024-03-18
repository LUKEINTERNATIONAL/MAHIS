import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useImmediatePostnatalChecksForMotherStore = defineStore('immediatePostnatalChecksForMotherStore',{
    state: () => ({

        examsAfterDelivery: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'At what interval is the postnatal check',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Immediately after delivery',
                                value: 'immediately after delivery',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '1 hour after delivery',
                                value: '1 hour after delivery',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },

            {
                sectionHeader: 'Blood pressure',
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: 'Systolic Pressure*',
                                        unit: 'mmHg',
                                        icon: icons.systolicPressure,
                                        value: '',
                                        name: 'Systolic',
                                        required: true,
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Diastolic pressure*',
                                        unit: 'mmHg',
                                        icon: icons.diastolicPressure,
                                        value: '',
                                        name: 'Diastolic',
                                        required: true,
                                        eventType: 'input'
                                    }
                                ],
                                colData: [
                                    {
                                        inputHeader: 'Second systolic Pressure',
                                        unit: 'mmHg',
                                        icon: icons.systolicPressure,
                                        value: '',
                                        name: 'Second systolic',
                                        required: true,
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Second diastolic pressure',
                                        unit: 'mmHg',
                                        icon: icons.diastolicPressure,
                                        value: '',
                                        name: 'Second diastolic',
                                        required: true,
                                        eventType: 'input'
                                    }
                                ],
                            },
                        ]
                    }
            },
            {
                sectionHeader: 'Pulse rate',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Pulse rate',
                                        unit: 'BMP',
                                        icon: icons.pulse,
                                        value: '',
                                        name: 'Pulse',
                                        eventType: 'input'
                                    }
                                ],
                            },

                        ]
                    },
            },
            // {
            //     sectionHeader: 'Blood pressure',
            //     classDash: 'dashed_bottom_border _padding',
            //     data:
            //         {
            //             rowData: [
            //                 {
            //                     colData: [
            //                         {
            //                             inputHeader: 'Systolic Pressure*',
            //                             unit: 'mmHg',
            //                             icon: icons.systolicPressure,
            //                             value: '',
            //                             name: 'Systolic',
            //                             required: true,
            //                             eventType: 'input'
            //                         },
            //                         {
            //                             inputHeader: 'Diastolic pressure*',
            //                             unit: 'mmHg',
            //                             icon: icons.diastolicPressure,
            //                             value: '',
            //                             name: 'Diastolic',
            //                             required: true,
            //                             eventType: 'input'
            //                         }
            //                     ],
            //                 },
            //             ]
            //         }
            // },
            {
                sectionHeader: 'Pulse rate',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Pulse rate',
                                        unit: 'BMP',
                                        icon: icons.pulse,
                                        value: '',
                                        name: 'Pulse',
                                        eventType: 'input'
                                    }
                                ],
                            },

                        ]
                    },
            },
            {
                sectionHeader: 'Temperature',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'Temp',
                                        eventType: 'input'
                                    },
                                ],
                            },

                        ]
                    },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Uterus',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Involuted',
                                value: 'Sub-involuted',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Moderate',
                                value: 'moderate',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Heavy',
                                value: 'heavy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Lochia?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Mild',
                                value: 'mild',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Moderate',
                                value: 'moderate',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Heavy',
                                value: 'heavy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Has the woman urinated?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'no',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Amount of urine',
                                        unit: 'ml',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'amount of urine',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'',
                                        inputWidth:'55%'

                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Color of urine',
                                        unit: 'colour',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'color of urine',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'',
                                        inputWidth:'55%'

                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Odour of urine',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Odour',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'',
                                        inputWidth:'55%'

                                    },

                                ]
                            }
                        ]
                    },
            },

        ] as any,
    }),
    actions:{
        setExamsAfterDelivery(data: any){
            this.examsAfterDelivery = data
        },
    },
    persist:true,

})