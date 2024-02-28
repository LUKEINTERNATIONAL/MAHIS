import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const usePhysicalExamStore = defineStore('physicalExamStore',{
    state: () => ({

        physicalExamination: [

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Hydration status',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well hydrated',
                                value: 'well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Poorly hydrated',
                                value: 'poorly hydrated',
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
                            title: 'General condition',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Sick',
                                value: 'sick',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Well',
                                value: 'well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                isFinishBtn: false,
                sectionHeader: 'Height',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'specify',
                                        unit: 'cm',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Palmer pallor?',
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Jaundice?',
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Haemoglobin low?',
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Oedema',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Present',
                                value: 'present',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Absent',
                                value: 'absent',
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
                            title: 'Lie',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Longitudinal',
                                value: 'longitudinal',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Transverse',
                                value: 'transverse',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Oblique',
                                value: 'oblique',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            // {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border _padding',
            //     radioBtnContent:
            //         {
            //             header:{
            //                 title: 'Lie',
            //                 selectedValue: ''
            //             },
            //             data:[
            //                 {
            //                     name: 'Longitudinal',
            //                     value: 'longitudinal',
            //                     labelPlacement: 'start',
            //                     colSize: '7',
            //                     justify: 'space-between',
            //                 },
            //                 {
            //                     name: 'Transverse',
            //                     value: 'transverse',
            //                     labelPlacement: 'start',
            //                     colSize: '7',
            //                     justify: 'space-between',
            //                 },
            //                 {
            //                     name: 'Oblique',
            //                     value: 'oblique',
            //                     labelPlacement: 'start',
            //                     colSize: '7',
            //                     justify: 'space-between',
            //                 },
            //             ]
            //         }
            //
            // },


        ] as any,

        labourDetails:[
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:
                    {
                        header:{
                            title: 'Reason for coming to the facility?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'In labour',
                                value: 'in labour',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Delivered on the way to facility',
                                value: 'delivered on the way to facility',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Specify',
                                    value: '',
                                    name: 'specify',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    inputWidth:'55%'
                                },

                            ]
                        },
                    ]
                }
            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Labour onset type?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Induced',
                                value: 'induced',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Spontaneous',
                                value: 'spontaneous',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },


            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Date of labour onset',
                                        value: '',
                                        name: 'Date of labour onset',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: '',
                                        isDatePopover: true,
                                        icon: icons.calenderPrimary,
                                        placeholder: 'Select date',
                                    },
                                    {
                                        inputHeader: 'Time of labour',
                                        value: '',
                                        name: 'Time of labour onset',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: '',
                                        isTimePopover: true,
                                        icon: icons.time,
                                        placeholder: 'Specify time',
                                    },
                                ],

                            },

                        ],

                    },

            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Membranes raptured?',
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
                classDash: 'dashed_bottom_border',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Date membranes ruptured',
                                        value: '',
                                        name: 'Date membranes ruptured',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: '',
                                        isDatePopover: true,
                                        icon: icons.calenderPrimary,
                                        placeholder: 'Select date',
                                    },
                                    {
                                        inputHeader: 'Time membranes ruptured',
                                        value: '',
                                        name: 'Time membranes ruptured',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: '',
                                        isTimePopover: true,
                                        icon: icons.time,
                                        placeholder: 'Specify time',
                                    },

                                ]
                            },
                        ]
                    }
            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Has the woman had food in 4 hrs?',
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
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:
                    {
                        header:{
                            title: 'Has the woman had  homemade medicines?',
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
                classDash: 'dashed_bottom_border',
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Specify',
                                    value: '',
                                    name: 'specify',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    inputWidth:'55%'
                                },

                            ]
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Sleep?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well',
                                value: 'well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Disturbed',
                                value: 'disturbed',
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
                radioBtnContent:
                    {
                        header:{
                            title: 'Bleeding?',
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
                classDash: 'dashed_bottom_border',
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Amount of bleeding',
                                    value: '',
                                    name: 'amount of bleeding',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    inputWidth:'55%'
                                },

                            ]
                        },
                    ]
                }
            },
        ] as any,

    }),
    actions:{
        setLabourDetails(data: any){
            this.labourDetails = data
        },
        setPastProblems(data: any){
            this.pastProblems = data
        },
    },
    persist:true,

})