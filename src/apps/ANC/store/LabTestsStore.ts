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
                            value: 'required',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan ordered',
                            value: 'ordered',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan conducted',
                            value: 'conducted',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Ultrasound scan not done',
                            value: 'Not done',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            {
                classDash:'dashed_bottom_border _padding',
                data:
                { 
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Ultrasound Scan Date',
                                    value: '',
                                    name: 'scan',
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
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason ultrasound scan not done',
                        selectedValue: '',
                        name: 'Reason not done',
                    },
                    data:[
                        {
                            name: 'Machine not functioning',
                            value: 'required',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Technician not available',
                            value: 'ordered',
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
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Normal amniotic fluid level',
                            value: 'normal',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Reduced amniotic fluid level',
                            value: 'reduced',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Increased amniotic fluid level',
                            value: 'increased',
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
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Praevia',
                            value: 'praevia',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Low',
                            value: 'low',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Anterior',
                            value: 'anterior',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Posterior',
                            value: 'posterior',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Right side',
                            value: 'right',
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