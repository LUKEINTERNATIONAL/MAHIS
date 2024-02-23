import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({
        vitals: [
            {
                isFinishBtn: false,
                validationStatus: '',
                sectionHeader: 'Height and weight',
                classDash: 'dashed_bottom_border _padding',

                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Height*',
                                    unit: 'cm',
                                    icon: icons.height,
                                    value: '',
                                    name: 'Height',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Weight*',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    value: '',
                                    name: 'Weight',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },

                            ],

                        },
                        {
                            colData: [

                                {
                                    inputHeader: 'Pre-gestation weight',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    value: '',
                                    name: 'PreWeight',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },

                            ],

                        }
                    ]
                },
                alerts:
                [
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        name: '',
                        index: ''
                    }
                ],
                previousView:{
                    name:'vitals'
                }   
            },
            {
                sectionHeader: 'Blood pressure',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData:    [
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
                            ]
                        },
                        {
                            colData:    [
                                {
                                    inputHeader: 'Repeated systolic pressure',
                                    unit: 'mmHg',
                                    icon: icons.systolicPressure,
                                    value: '',
                                    name: 'repeatedSystolic',
                                    required: true,
                                    eventType: 'input'
                                },
                                {
                                    inputHeader: 'Repeated diastolic pressure',
                                    unit: 'mmHg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    name: 'repeatedDiastolic',
                                    required: true,
                                    eventType: 'input'
                                }
                            ]
                        }
                    ]
                },
                alerts:[
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        name: '',
                        index: ''
                    }
                ],
                previousView:{
                    name:'vitals'
                }
            },
            {
                sectionHeader: 'Temperature and Purse',
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
                                    {
                                        inputHeader: 'Pulse rate',
                                        unit: 'BMP',
                                        icon: icons.pulse,
                                        value: '',
                                        name: 'Pulse',
                                        eventType: 'input'
                                    }
                                ]
                            },

                        ]
                    },
                    previousView:{
                        name:'vitals'
                    }
            },
            {
                sectionHeader: 'Oximetry and Respiratory rate',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Oxygen saturation',
                                        unit: '%',
                                        icon: icons.oxgenStaturation,
                                        value: '',
                                        name: 'SP02',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Respiratory rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        eventType: 'input'
                                    },
                                ]
                            },
                        ]
                    },
                previousView:{
                    name:'vitals'
                }
            }
               
        ] as any,
        respiration: [
            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Exam not done',
                                value: 'exam not done',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Normal exam',
                                value: 'normal exam',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },


            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Cough',
                                value: 'cough',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Rapid breathing',
                                value: 'rapid breathing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Slow breathing',
                                value: 'slow breathing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Wheezing',
                                value: 'wheezing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Rales',
                                value: 'rales',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Respiratory distress',
                                value: 'respiratory distress',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },

            {
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                        },
                        data:[
                            {
                                name: 'Other',
                                value: 'otherRespiratoryExam',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
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
                                        displayNone:true,
                                        inputHeader: 'Specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'OtherRespiration',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",

                                    },

                                ],

                            },
                            {
                                colData:
                                    [
                                        {
                                            displayNone:true,
                                            inputHeader: 'Oximetry',
                                            unit: '%',
                                            icon:icons.respiratory,
                                            value: '',
                                            name: 'Oximetry',
                                            required: true,
                                            eventType: 'input'
                                        },
                                        {
                                            displayNone: true,
                                            inputHeader: 'Respiratory rate',
                                            unit: 'bpm',
                                            icon: icons.respiratory,
                                            value: '',
                                            name: 'RespiratoryRate',
                                            required: true,
                                            eventType: 'input'
                                        }
                                    ]
                            }
                        ]
                    },
            },

        ],
        preEclampsia: [

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'No severe pre-eclampsia',
                                value: 'NoSymptomsOfEclampsia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Severe headache',
                                value: 'SevereHeadache',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Visual disturbance',
                                value: 'VisualDisturbance',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Vomiting',
                                value: 'Vomiting',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Vomiting',
                                value: 'Vomiting',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Epigastric pain',
                                value: 'EpigastricPain',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Dizziness',
                                value: 'Dizziness',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
        ]
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    // persist:true,

})
