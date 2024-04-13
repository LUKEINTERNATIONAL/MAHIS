import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({

        vitals: [

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
                                ],
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
                                        icon: icons.plus
                                    }
                                ]
                            },
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
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
                                        icon: icons.plus
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
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
                                        icon: icons.plus
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
                sectionHeader: 'Respiratory rate',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Respiratory rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        eventType: 'input'
                                    },
                                ],
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
                                        icon: icons.plus
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
                sectionHeader: 'Fetal heart rate',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Fetal heart rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        eventType: 'input'
                                    },
                                ],
                                btns:[
                                    {
                                        name: "Save",
                                        fill: "clear",
                                        btn_col_size: 3,
                                        icon: icons.plus
                                    }
                                ]
                            },
                        ]
                    },
                previousView:{
                    name:'vitals'
                }
            },
        ] as any,
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        },
    },
    persist:true,

})