import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useTBScreeningStore = defineStore('TBScreeningStore',{
    state: () => ({
        tbTest:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Select whether:',
                        selectedValue: '',
                        name:'tbConducted'
                    },
                    data:[
                        {
                            name: 'TB screening conducted',
                            value: 'conducted',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'TB screening ordered',
                            value: 'ordered',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'TB screening not done',
                            value: 'not done',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        // ] as any,
 
        // results:[
            {
                selectdData: [],
                isFinishBtn: false,
                
                radioBtnContent:
                {
                    header:{
                        title: 'TB screening results:',
                        selectedValue: '',
                        name:'results',
                        displayNone:true,
                    },
                    data:[
                        {
                            name: 'Positive for TB',
                            value: 'positive',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Negative for TB',
                            value: 'negative',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Inconclusive',
                            value: 'inconclusive',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Incomplete (symptoms only)',
                            value: 'inconclusive',
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
                                    dsiplayNone:true,
                                    inputHeader: 'TB screening date',
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
        reasons:[
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
                                name: 'Sputum smear not available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Sputum culture not available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
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
                                name: 'GeneXpert machine not available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'X-ray machine not available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
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
                                name: 'No sputum testing supplies available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Machine not functioning',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
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
                                name: 'Technician not available',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
                                checked: false,
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
                                        displayNone:true,
                                        inputHeader: 'specify',
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
        setTbTest(data: any){
            this.tbTest = data
        },
        setReasons(data: any){
            this.reasons = data
        },
        // setResults(data: any){
        //     this.results = data
        // },
    },
    persist:true,

})
