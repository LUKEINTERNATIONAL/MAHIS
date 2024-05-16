import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useLabourQuickCheckStore = defineStore('labourDetailsStore',{
    state: () => ({

        pastProblems: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash:"dashed_bottom_border _padding",
                radioBtnContent:
                    {
                        header:{
                            title: 'What is the reason for coming to the facility?',
                            class: 'bold',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'In labour',
                                value: 'In labour',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Delivered on the way to the facility',
                                value: 'Delivered',
                                labelPlacement: 'start',
                                colSize: '7',
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
                            title: 'Danger signs',
                            class: 'bold',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Bleeding vaginally',
                                value: 'bleeding vaginally',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Central cyanosis',
                                value: 'central cyanosis',
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
                                name: 'Pre-term labour',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Severe vomiting',
                                value: 'severe vomiting',
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
                                name: 'Fever',
                                value: 'fever',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Visual disturbance',
                                value: 'visual disturbance',
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
                                name: 'Severe abdominal pain',
                                value: 'severe abdominal pain',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unconscious',
                                value: 'unconscious',
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
                                name: 'Severe vomiting',
                                value: 'severe vomiting',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'No danger signs',
                                value: 'no danger signs',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Other danger signs',
                                value: 'other danger signs',
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
                radioBtnContent:
                    {
                        header:{
                            title: 'Labour onset type',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Spontaneous',
                                value: 'well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Induced',
                                value: 'disturbed',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: 'Date and Time of onset of labour',
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Time of onset of labour',
                                        value: '',
                                        name: 'Time',
                                        icon: icons.time,
                                        required: true,
                                        eventType: 'input',
                                        isDatePopover: true,
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                        
                                    },
                                    {
                                        inputHeader: 'Date of onset of labour',
                                        value: '',
                                        name: 'Date',
                                        icon: icons.calendar,
                                        required: true,
                                        isDatePopover: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },

                                ],

                            },

                        ],

                    },

            },

            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:
                    {
                        header:{
                            title: 'Membranes ruptured?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                isFinishBtn: false,
                sectionHeader: 'Date and Time membranes ruptured',
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Time membranes ruptured',
                                        value: '',
                                        name: 'Time',
                                        icon: icons.time,
                                        required: true,
                                        eventType: 'input',
                                        isDatePopover: true,
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                        
                                    },
                                    {
                                        inputHeader: 'Date membranes ruptured',
                                        value: '',
                                        name: 'Date',
                                        icon: icons.calendar,
                                        required: true,
                                        isDatePopover: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },

                                ],

                            },

                        ],

                    },

            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Has she had food in 4 hours? ',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'No',
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
                            title: 'Homemade medicines taken?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'No',
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
                            title: 'Sleep',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well',
                                value: 'Well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Disturbed',
                                value: 'Disturbed',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
        ] as any,


    }),
    actions:{

        setPastProblems(data: any){
            this.pastProblems = data
        },
    },
    persist:true,

})