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
                        selectedValue: '',
                        name:'Urine test status',
                    },
                    data:[
                        {
                            name: 'Urine test conducted',
                            value: 'Test conducted',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine test ordered',
                            value: 'Test ordered',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine test not done',
                            value: 'Test not done',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
                        {
                selectdData: [],
                isFinishBtn: false,   
                radioBtnContent:
                {
                    header:{
                        title: 'Select the urine test conducted:',
                        selectedValue: '',
                        displayNone:true,
                        name:'Urine test',
                           
                    },
                    data:[
                        {
                            name: 'Midstream urine culture (recommended)',
                            value: 'Midstream urine culture',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Midstream urine gram-staining',
                            value: 'Midstream urine gram-staining',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Urine dipstick',
                            value: 'Urine dipstick',
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
                {      header: {
                    selectedValue: '',
                    name: 'Date' 

                },
                    rowData:[
                        {
                            colData: [
                                {   
                                    displayNone:true,
                                    inputHeader: 'Urine Test Date',
                                    value: '',
                                    name: 'Urine test date',
                                    valueType: "date",
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
                        
            },
        // ] as any,
        // // testType:[

        // // ] as any,
        //  reason:[
            {
                selectdData: [],
                isFinishBtn: false,
                 sectionHeader: '',
                classDash: '',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: '',
                        // displayNone:true,
                         name:'Reason not done'
                    },
                    data:[
                        {   
                            name: 'Machine not functioning',
                            value: 'Machine not functioning',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                        },
                        {
                            name: 'Technician not available',
                            value: 'Technician not available',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                        },
                        {
                            name: 'Other',
                            value: 'Other',
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
                        header:{
                            selectedValue: '',
                            name:'Other',
                        },
                        rowData:[
                            {
                                colData: [
                                    {   
                                        displayNone:true,
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
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
                        selectedValue: '',
                        name: 'Midstream urine culture result'
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
                            name: 'Positive-Group B Streptococcus (GBS)',
                            value: 'Positive-Group B Streptococcus',
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
                        selectedValue: '',
                        name: 'Midstream urine gram-staining result'
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
                        selectedValue: '',
                        name: 'Nitrites dipstick test result'
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
                        selectedValue: '',
                        name: 'Leukocytes dipstick test result'
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
                        selectedValue: '',
                        name: 'Protein dipstick test result'
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
                        selectedValue: '',
                        name: 'Glucose dipstick test result'
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
        // setReason(data: any){
        //     this.reason = data
        // },
        // setTestType(data: any){
        //     this.testType = data
        // },
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
