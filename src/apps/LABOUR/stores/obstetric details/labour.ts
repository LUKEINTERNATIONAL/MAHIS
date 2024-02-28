import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useLabourDetailsStore = defineStore('labourDetailsStore',{
    state: () => ({

        pastProblems: [
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
                                name: 'Obstructed labour',
                                value: 'obstructed labour',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Breech',
                                value: 'breech',
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
                                name: 'Pre-eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Twins',
                                value: 'twins',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Vacuum extraction',
                                value: 'vacuum extraction',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'CPD',
                                value: 'cpd',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Prolonged labour',
                                value: 'prolonged labour',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Caesarean section',
                                value: 'caesarian section',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Anaemia',
                                value: 'anaemia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Retained placenta',
                                value: 'retained placenta',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'APH',
                                value: 'aph',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'PPH',
                                value: 'pph',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Preterm labour',
                                value: 'preterm labour',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'None',
                                value: 'none',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'otherInfo',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        displayNone:true,
                                        inputHeader: 'specify',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Eclampsia/Pre-Eclampsia?',
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
    ] as any,

        labourDetails:[


            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',
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
                            title: 'Has the woman had food?',
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