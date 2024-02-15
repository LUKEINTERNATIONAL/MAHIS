import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useMedicationDispensedStore = defineStore ('medicationDispensed', {
    state: () => ({

        iron:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Iron prescribed?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'y',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                data:{
                    rowData: [{
                        colData: [{
                        
                            inputHeader: 'Amount of Iron prescribed',
                            value: '',
                            name: 'iron',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    },
                  ]
                    }]
                   } 
            },
        ],

        ironDosage:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Type of Iron supplement dosage provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Daily',
                            value: 'daily',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Weekly',
                            value: 'weekly',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            
        ],
     
        folicAcid:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Daily dose of folic acid prescribed?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'y',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                        
                            inputHeader: 'Amount of Folic acid prescribed',
                            value: '',
                            name: 'iron',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    },
                  ]
                    }]
                   } 
            },
        ],

        folicAcidReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                 sectionHeader: '',
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason Iron and folic acid not prescribed',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Side effects',
                            value: 'side effects',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Client was referred',
                            value: 'referred',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '7',
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
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },
        ] as any,

        vitaminA:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Vitamin A prescribed?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'yes',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'no',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            
        ],

        vitaminADosage:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '_padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Type of Vitamin A dosage provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Daily',
                            value: 'daily',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Weekly',
                            value: 'weekly',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            
        ],

        vitaminAReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                 sectionHeader: '',
                classDash: '_padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason vitamin A not prescribed',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Side effects',
                            value: 'side effects',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Stock-out',
                            value: 'referred',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '7',
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
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },
        ] as any,


        calcium:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Daily calcium prescribed?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'y',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                        
                            inputHeader: 'Amount of daily calcium supplements',
                            value: '',
                            name: 'calcium',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    },
                  ]
                    }]
                   } 
            },
        ],

        calciumReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                 sectionHeader: '',
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason calcium supplements not prescribed',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Side effects',
                            value: 'side effects',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Stock-out',
                            value: 'referred',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Allergy to medication',
                            value: 'allergy',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '7',
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
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },
        ] as any,
    }),
    actions:{
        setIron(data:any) {
            this.iron = data
        },
        setIronDosage(data:any) {
            this.ironDosage = data
        },
        setFolicAcid(data:any) {
            this.folicAcid = data
        },
        setFolicAcidReason(data:any) {
            this.folicAcidReason = data
        },
        setVitaminA(data:any) {
            this.vitaminA = data
        },
        setVitaminADosage(data:any) {
            this.vitaminADosage = data
        },
        setVitaminAReason(data:any) {
            this.vitaminAReason = data
        },
        setCalcium(data:any) {
            this.calcium = data
        },
        setCalciumReason(data:any) {
            this.calciumReason = data
        }



    },
    persist:true
})