import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabTestsStore = defineStore ('labTestsStore', {
    state: () => ({
        ultrasound:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Select whether?',
                        selectedValue: '',
                        name: 'Ultrasound scan status',
                    },
                    data:[
                        {
                            name: 'Ultrasound scan required',
                            value: 'Scan required',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan ordered',
                            value: 'Scan ordered',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan conducted',
                            value: 'Scan conducted',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan not done',
                            value: 'NOT done',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            {
                classDash:'dashed_bottom_border _padding',
                header : {
                    name: 'Scan date'
                },
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Ultrasound Scan Date',
                                    displayNone: true,
                                    value: '',
                                    name: 'Scan date',
                                    valueType: 'date',
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
        ],
        reason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason ultrasound scan not done',
                        selectedValue: '',
                        displayNone: true,
                        class: 'bold',
                        name: 'Reason not done',
                    },
                    data:[
                        {
                            name: 'Machine not functioning',
                            value: 'Machine not functioning',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Technician not available',
                            value: 'Technician not available',
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

                header:{
                    title: 'Reason ultrasound scan not done',
                    selectedValue: '',
                    name: 'Other reason',
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Other (specify)',
                                        displayNone: true,
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
        ],
        amniotic:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Amniotic fluid level detected during ultrasound',
                        selectedValue: '',
                        name: 'Amniotic fluid level'
                    },
                    data:[
                        {
                            name: 'Normal amniotic fluid level',
                            value: 'Normal level',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Reduced amniotic fluid level',
                            value: 'Reduced level',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Increased amniotic fluid level',
                            value: 'Increased level',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                  
                    ]
                }
                    
            },
        ],
        placenta:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Location of the placenta detected during the ultrasound',
                        selectedValue: '',
                        name: 'Placenta location',
                    },
                    data:[
                        {
                            name: 'Praevia',
                            value: 'Praevia',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Low',
                            value: 'Low',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Anterior',
                            value: 'Anterior',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Posterior',
                            value: 'Posterior',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Right side',
                            value: 'Right side',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Left side',
                            value: 'left',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Fundal',
                            value: 'fundal',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ],
    }),
    actions:{
        setUltrasound(data:any){
            this.ultrasound= data
        },
        setReason(data:any){
            this.reason = data
        },
        setAmniotic(data:any){
            this.amniotic = data
        },
        setPlacenta(data:any){
            this.placenta = data
        },
        
    },
    persist:true
})