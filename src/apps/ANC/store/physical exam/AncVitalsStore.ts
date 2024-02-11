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
                                name: 'Respiration not done',
                                value: 'respiration not done',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                        inputHeader: 'Other (specify)',
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
                            {
                                colData:
                                    [
                                        {
                                            inputHeader: 'Oximetry',
                                            unit: '',
                                            icon:'',
                                            value: 'This to be taken when breathing distress is selected\'',
                                            name: 'Oximetry',
                                            required: true,
                                            eventType: 'input'
                                        },
                                        {
                                            inputHeader: 'Respiratory rate',
                                            unit: 'mmHg',
                                            icon: '',
                                            value: ' This to be taken when breathing distress is selected',
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
                classDash: '',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'test1'

                        },
                        data:[
                            {
                                name: 'Unable',
                                value: 'Unable',
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
                            name:'test2'
                        },
                        data:[
                            {
                                value: 'BPCuffNotAvailable',
                                name: 'BP cuff (sphygmomanometer) not available',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'BPCuffBroken',
                                name: 'BP cuff (sphygmomanometer) is broken',
                                labelPlacement: 'start',
                                colSize: '12',
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
                                        inputHeader: 'Other (specify)',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
                                colSize: '12',
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
