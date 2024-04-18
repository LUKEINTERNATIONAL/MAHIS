import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({
        vitals: [
            {
                isFinishBtn: false,
                selectedData: [],
                validationStatus: '',
                sectionHeader: 'Height and weight',
                classDash: 'dashed_bottom_border _padding',
                name: "vitals",

                data:
                { 
                    header : {

                    },
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Height*',
                                    unit: 'cm',
                                    icon: icons.height,
                                    value: '',
                                    name: 'Height',
                                    valueType: 'number',
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
                                    valueType: 'number',
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
                                    name: 'Pre-gestation weight',
                                    valueType:'number',
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
                                    name: 'Systolic blood pressure',
                                    valueType: 'number',
                                    required: true,
                                    eventType: 'input'
                                },
                                {
                                    inputHeader: 'Diastolic pressure*',
                                    unit: 'mmHg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    name: 'Diastolic',
                                    valueType: 'number',
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
                                    name: 'Repeated Systolic',
                                    valueType: 'number',
                                    required: true,
                                    eventType: 'input'
                                },
                                {
                                    inputHeader: 'Repeated diastolic pressure',
                                    unit: 'mmHg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    name: 'Repeated diastolic',
                                    valueType: 'number',
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
                                        name: 'Temperature',
                                        valueType: 'number',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Pulse rate',
                                        unit: 'BMP',
                                        icon: icons.pulse,
                                        value: '',
                                        name: 'Pulse',
                                        valueType: 'number',
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
                                        name: 'Blood oxygen saturation',
                                        valueType: 'number',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Respiratory rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        valueType: 'number',
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
        respiration:
            [
            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'Respiratory exam findings'
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
                            selectedValue: '',
                            name:'Respiratory exam findings'
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
                            selectedValue: '',
                            name:'Respiratory exam findings'
                        },
                        data:[
                            {
                                name: 'Slow breathing',
                                value: 'Slow breathing',
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
                            selectedValue: '',
                            name:'Respiratory exam findings'
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
                            name:'Respiratory exam findings'
                        },
                        data:[
                            {
                                name: 'Other',
                                value: 'other',
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
                                        name: 'Other (specify)',
                                        valueType: 'text',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",

                                    },

                                ],

                            },
                        ]
                    },
            },

        ] as any,
        preEclampsia: [

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'Severe pre-eclampsia'
                        },
                        data:[
                            {
                                name: 'No severe pre-eclampsia',
                                value: 'No severe pre-eclampsia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Severe headache',
                                value: 'Severe headache',
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
                            selectedValue: '',
                            name:'Severe pre-eclampsia'
                        },
                        data:[
                            {
                                name: 'Visual disturbance',
                                value: 'Visual disturbance',
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
                            selectedValue: '',
                            name:'Severe pre-eclampsia'
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
                                value: 'Epigastric pain symptom',
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
                            selectedValue: '',
                            name:'Severe pre-eclampsia'
                        },
                        data:[
                            {
                                name: 'Dizziness',
                                value: 'Dizziness symptom',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
        ] as any
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    // persist:true,

})
