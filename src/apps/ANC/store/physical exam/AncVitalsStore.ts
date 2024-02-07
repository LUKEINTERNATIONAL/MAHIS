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
                isFinishBtn: false,
                sectionHeader: '',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'RapidBreathing',
                                name: 'Rapid breathing',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Dyspnoea',
                                name: 'Dyspnoea',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Unable to record blood pressure',
                                value: 'Unable to record blood pressure',
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
                            selectedValue: ''
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
                classDash: 'dashed_bottom_border _padding',

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
                                        inputWidth: "93%",
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

        ]
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    persist:true,

})
