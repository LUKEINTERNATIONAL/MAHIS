import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useObstreticHistoryStore = defineStore('obstreticHistoryStore',{
    state: () => ({
        prevPregnancies: [
            {
                isFinishBtn: false,
                sectionHeader: 'Number of previous pregnancies',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Gravida',
                                    value: '',
                                    name: 'Gravida',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Parity',
                                    value: '',
                                    name: 'Parity',
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
                                inputHeader: 'Abortions/Miscarriages',
                                value: '',
                                name: 'abortions',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            {
                                inputHeader: 'Live births',
                                value: '',
                                name: 'Live births',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            
                        ]
                    },
                    {
                        colData: [
                        {
                            inputHeader: 'Stillbirths',
                            value: '',
                            name: 'Stillbirths',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                        
                    ]
                },

                    ],
                    
                },
          
            },   
        ] as any,
        preterm:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Was last live birth preterm',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Smoking',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        preterm1:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: '',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        preterm2:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: '',
                            value: 'smoking'
                        },
                    ]
                }
                    
            },
        ],
        modeOfDelivery: [
            {
                isFinishBtn: false,
                sectionHeader: 'Mode of delivery',
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Mode of delivery',
                                    value: '',
                                    name: 'MOD',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Number of ceasarian',
                                    value: '',
                                    name: 'Ceasarian',
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
                                inputHeader: 'Last ceasarian section',
                                value: '',
                                name: 'LCS',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
                            },
                            
                        ],}
                   

                    ],
                
                },
            },
          
             
        ] as any,

        Complications:[
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Gestational diabetes mellitus',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Heavy bleeding (during or after delivery)',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Puerperal Sepsis',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Macrosomia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Baby died within 24hrs of birth',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Perineal tear (3rd or 4th degree)',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Convulsions',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Asphyxia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Forceps',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
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
                                name: 'Metoclopramide',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Thyroid medication',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Antiacids',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Anti-psychotics',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Anti-diabetic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Anti-hypertensive',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Pre-eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Puerperal Sepsis',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Baby did within 24hrs of birth',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                name: 'Convulsions',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Forceps',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
                            },
                        ]
                    }

            },

        ] as any,

        


       
    }),
    actions:{
        setPrevPregnancies(data: any){
            this.prevPregnancies = data
        },
        setPreterm(data: any){
            this.preterm = data
        },
        setModeOfDelivery(data:any) {
            this.modeOfDelivery = data
        },
        setComplications(data:any) {
            this.Complications = data
        },



      
    },
    persist:true,

})