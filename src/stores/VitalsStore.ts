import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({
        vitals: [
            {
                isFinishBtn: false,
                sectionHeader: 'Hieght and weight',
                classDash: 'dashed_bottom_border',
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
                                    eventType: 'blur'
                                },
                                {
                                    inputHeader: 'Weight*',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    value: '',
                                    name: 'Weight',
                                    required: true,
                                    eventType: 'blur'
                                },
                                
                            ]
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
                ]    
            },
            {
                sectionHeader: 'Blood pressure',
                classDash: 'dashed_bottom_border',
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
                                    eventType: 'blur'
                                },
                                {
                                    inputHeader: 'Diastolic pressure*',
                                    unit: 'mmHg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    name: 'Diastolic',
                                    required: true,
                                    eventType: 'blur'
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
                ]
            },
            {
                sectionHeader: 'Temperature and rates',
                classDash: 'dashed_bottom_border',
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
                                        eventType: 'blur'
                                    },
                                    {
                                        inputHeader: 'Pulse rate',
                                        unit: 'BMP',
                                        icon: icons.pulse,
                                        value: '',
                                        name: 'Pulse',
                                        eventType: 'blur'
                                    }
                                ]
                            },
                            {
                                colData:
                                [
                                    {
                                        inputHeader: 'Respiratory rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        eventType: 'blur'
                                    },
                                    {
                                        inputHeader: 'Oxygen saturation',
                                        unit: '%',
                                        icon: icons.oxgenStaturation,
                                        value: '',
                                        name: 'SP02',
                                        eventType: 'blur'
                                    }
                                ]
                            }
                        ]
                    }
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
