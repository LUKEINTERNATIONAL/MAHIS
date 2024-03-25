import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useVitalsStore = defineStore('vitalsStore',{
    state: () => ({
        vitals: [
            {
                isFinishBtn: false,
                validationStatus: '',
                sectionHeader: 'Hieght and weight',
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
         selectdData: [],
         isFinishBtn: false,
         radioBtnContent:{
             header:{
                 title: 'Is Temperature Taken',
                 selectedValue: '',
                 name:"OpdTemperature",
                //  displayNone:true
             },
             data:[
                 {
                     name: 'Yes',
                     value: 'yes',
                     labelPlacement:'start',
                     colSize: "7",
                     justify:"space-between"
                 },
                 {
                     name: 'No',
                     value: 'no',
                     labelPlacement:'start',
                     colSize: "7",
                     justify:"space-between"
                 },
             ]
         }
     },
         {
                sectionHeader: 'Temperature and rates',
                data:
                    { 
                        rowData:[
                            {
                                colData: [
                                    {   
                                        displayNone:true,
                                        inputHeader: 'Temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'Temp',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Specify',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'specify',
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
                            {
                                colData:
                                [
                                    {
                                        inputHeader: 'Respiratory rate',
                                        unit: 'BMP',
                                        icon: icons.respiratory,
                                        value: '',
                                        name: 'Respiratory rate',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Oxygen saturation',
                                        unit: '%',
                                        icon: icons.oxgenStaturation,
                                        value: '',
                                        name: 'SP02',
                                        eventType: 'input'
                                    }
                                ]
                            }
                        ]
                    },
                    previousView:{
                        name:'vitals'
                    }
            }
               
        ] as any
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    persist:false,

})
