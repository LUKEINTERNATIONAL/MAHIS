import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useAncVitalsStore = defineStore('ancVitalsStore',{
    state: () => ({
        heightWeight: [
            {
                isFinishBtn: false,
                sectionHeader: '',

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
                                ],
                            },
                            {

                                colData: [

                                    {
                                        inputHeader: 'Pre-gestaion weight',
                                        unit: 'kg',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'PregestationWeight',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },
                                    {
                                        inputHeader: 'Current weight*',
                                        unit: 'kg',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'CurrentWeight',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },

                                ]
                            }
                        ]
                    },
            },
        ],
        respiration: [
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Normal exam',
                                value: 'normal exam',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },

            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Rapid breathing',
                                value: 'rapid breathing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Wheezing',
                                value: 'wheezing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Respiratory distress',
                                value: 'respiratory distress',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'OtherRespiratoryExam'
                        },
                        data:[
                            {
                                name: 'Other respiratory exam',
                                value: 'other respiratory exam',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
                                    },

                                ],

                            },
                            // {
                            //     colData:
                            //         [
                            //             {
                            //                 displayNone:true,
                            //                 inputHeader: 'Oximetry',
                            //                 unit: '%',
                            //                 icon:icons.respiratory,
                            //                 value: '',
                            //                 name: 'Oximetry',
                            //                 required: true,
                            //                 eventType: 'input'
                            //             },
                            //             {
                            //                 displayNone: true,
                            //                 inputHeader: 'Respiratory rate',
                            //                 unit: 'bpm',
                            //                 icon: icons.respiratory,
                            //                 value: '',
                            //                 name: 'RespiratoryRate',
                            //                 required: true,
                            //                 eventType: 'input'
                            //             }
                            //         ]
                            // }
                        ]
                    },
            },

        ],
        bloodPressure:[
            {
                sectionHeader: '',


                data:
                    {
                        rowData:[
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
                                ]
                            },
                            {
                                colData:
                                    [
                                        {
                                            inputHeader: 'Repeated systolic Pressure*',
                                            unit: 'mmHg',
                                            icon: icons.systolicPressure,
                                            value: '',
                                            name: 'RepeatedSystolic',
                                            required: true,
                                            eventType: 'input'
                                        },
                                        {
                                            inputHeader: 'Repeated diastolic pressure*',
                                            unit: 'mmHg',
                                            icon: icons.diastolicPressure,
                                            value: '',
                                            name: 'RepeatedDiastolic',
                                            required: true,
                                            eventType: 'input'
                                        }
                                    ]
                            }
                        ]
                    },
            },
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'UnAbleToRecordBloodPressure'

                        },
                        data:[
                            {
                                name: 'Unable to record blood pressure',
                                value: 'unable to record blood pressure',
                                checked: false,
                                labelPlacement: 'start',

                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Reason blood pressure cannot be taken',
                            selectedValue: '',
                            name:'reasonsBloodPressureCannotBeTaken',
                            displayNone:true
                        },
                        data:[
                            {
                                value: 'BPCuffNotAvailable',
                                name: 'BP cuff (sphygmomanometer) not available',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'BPCuffBroken',
                                name: 'BP cuff (sphygmomanometer) is broken',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'other',
                                name: 'Other',
                                labelPlacement: 'start',
                                colSize: '7',
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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
                                    },

                                ]
                            }
                        ]
                    },
            },



        ],
        temperature: [

            {
                sectionHeader: '',
                data:
                    { 
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'First temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'FirstTemp',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Second Temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'SecondTemp',
                                        eventType: 'input'
                                    }
                                ]
                            },
                        ]
                    },

            }
               
        ],
        pulse: [

            {
                sectionHeader: '',
                data:
                    {
                        rowData:[
                            {
                                colData:
                                    [
                                        {
                                            inputHeader: 'Pulse rate',
                                            unit: 'BMP',
                                            icon: icons.respiratory,
                                            value: '',
                                            name: 'FirstRespiratory',
                                            eventType: 'input'
                                        },
                                        {
                                            inputHeader: 'Second pulse rate',
                                            unit: 'BMP',
                                            icon: icons.respiratory,
                                            value: '',
                                            name: 'SecondRespiratory',
                                            eventType: 'input'
                                        },
                                    ]
                            }
                        ]
                    },

            }

        ],
        preEclampsia: [

            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Severe headache',
                                value: 'SevereHeadache',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Epigastric pain',
                                value: 'EpigastricPain',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
            {
                selectdData: [],
                classDash: '',
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
                                colSize: '7',
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
    persist:true,

})
