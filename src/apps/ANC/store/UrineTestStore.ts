import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useUrineTestStore = defineStore ("urineTestingStore", {
    state: ()=> ({
        urineTest:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Select whether:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Urine test conducted',
                            value: 'conducted',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine test ordered',
                            value: 'ordered',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine test not done',
                            value: 'not done',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        testType:[
            {
                selectdData: [],
                isFinishBtn: false,
                
                radioBtnContent:
                {
                    header:{
                        title: 'Select the urine test conducted:',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Midstream urine culture (recommended)',
                            value: 'culture',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Midstream urine gram-staining',
                            value: 'gram',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine dipstick',
                            value: 'dipstick',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                },    
            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Urine Test Date',
                                    value: '',
                                    name: 'UTD',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                },
                                
                            ],
                            
                        },
                   
        
                    ],
                
                },
                        
            }
        ] as any,
         reason:[
            {
                selectdData: [],
                isFinishBtn: false,
                 sectionHeader: '',
                classDash: '',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Machine not functioning',
                            value: 'required',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                        },
                        {
                            name: 'Technician not available',
                            value: 'ordered',
                            labelPlacement: 'start',
                            colSize: '6',
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
        culture:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Midstream urine culture',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Positive-any agent',
                            value: 'positive',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Positive -Group B Streptococcus (GBS)',
                            value: 'gbs',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Negative',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        gram:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Midstream urine gram-staining',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Positive',
                            value: 'positive',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Negative',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        nitrites:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Dipstick test result - nitrites',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'None',
                            value: 'none',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+',
                            value: '+',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++',
                            value: '++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+++',
                            value: '+++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++++',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        leukocytes:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Dipstick test result - leukocytes',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'None',
                            value: 'none',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+',
                            value: '+',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++',
                            value: '++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+++',
                            value: '+++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++++',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        protein:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Dipstick test result - protein',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Negative',
                            value: 'none',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+',
                            value: '+',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++',
                            value: '++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+++',
                            value: '+++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++++',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
        glucose:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Dipstick test result - glucose',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Negative',
                            value: 'none',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+',
                            value: '+',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++',
                            value: '++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '+++',
                            value: '+++',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: '++++',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            }
        ] as any,
    }),

    actions: {
        setReason(data: any){
            this.reason = data
        },
        setTestType(data: any){
            this.testType = data
        },
        setUrineTest(data: any){
            this.urineTest = data
        },
        setNitrites(data: any){
            this.nitrites = data
        },
        setCulture(data: any){
            this.culture = data
        },
        setGram(data: any){
            this.gram = data
        },
        setLeukocytes(data: any){
            this.leukocytes = data
        },
        setProtein(data: any){
            this.protein = data
        },
        setGlucose(data: any){
            this.glucose = data
        },


    },
    persist:true,
    
})
