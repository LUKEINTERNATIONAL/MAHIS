import { defineStore } from "pinia"
import { icons } from '@/utils/svg';


export const useReferralStore = defineStore('referralStore',{
    state: () =>({
        referralInfo:[

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Referral for urgent care',
                        selectedValue: '',
                        class:"bold",
                        name:'referral for urgent care'
                    },
                    data:[
                        {  
                            name: 'Yes',
                            value: 'Yes',
                            colSize: "2.5",
                        },
                        { 
                            name: 'No',
                            value: 'No',
                            colSize: "2.5",
                        },
                    ]
                }
            },
            {

                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:{
                    header:{
                        title: 'Reason for referral',
                        selectedValue: '',
                        displayNone: true,
                        class:"bold",
                        name:"Reason for referral",
                    },
                    data:[
                        {  
                            name: "Referral for screening including diagnostics",
                            value: "Referral for screening ",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: 'Referral for other general services',
                            value: 'Referral for other general services',
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Any treatment given before referral',
                        class:"bold",
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: 'Yes',
                            value: 'Yes',
                            colSize: "2.5",
                        },
                        { 
                            name: "No",
                            value: "No",
                            colSize: "2.5",
                        },
                    ]
                }
            },
            
            {   
               classDash: 'dashed_bottom_border',
               header:{
                        title: 'Date and time for scheduled referral',
                        selectedValue: ''
                    },
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Date',
                                    icon: icons.calenderPrimary,
                                    name: "Date scheduled referral",
                                    value: "Date scheduled referral",
                                    eventType: 'input',
                                    valueType: 'date',
                                    required: true,
                                    isDatePopover: true
                                },
                                    {
                                    inputHeader: 'Time',
                                    name: 'Time scheduled referral',
                                    value: "Time scheduled referral",
                                    valueType: "date",
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {   
               classDash: 'dashed_bottom_border',
               header:{
                        title: 'Location of referral',
                        selectedValue: ''
                    },
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Location',
                                    name: "Location of referral",
                                    value: "Location of referral",
                                    eventType: 'input',
                                    valueType: 'text',
                                    required: true
                                },
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {   
               classDash: 'dashed_bottom_border',
               header:{
                        title: 'Date and time referal was made',
                        selectedValue: ''
                    },
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Date',
                                    icon: icons.calenderPrimary,
                                    name: "Date referral was made",
                                    value: "Date referral was made",
                                    eventType: 'input',
                                    valueType:'date',
                                    required: true,
                                    isDatePopover: true
                                },
                                    {
                                    inputHeader: 'Time',
                                    name: "Time referral made",
                                    value: "Time referral made",
                                    eventType: 'input',
                                    valueType:'text',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
                        {   
               classDash: 'dashed_bottom_border',
               header:{
                        title: 'Provider who made the referral',
                        selectedValue: ''
                    },
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Provider’s facility',
                                    name: 'Provider’s facility',
                                    value: 'Provider’s facility',
                                    eventType: 'input',
                                    valueType:'text',
                                    required: true
                                },
                                    {
                                    inputHeader: 'Provider’s phone number',
                                    icon: icons.editPen,
                                    name: 'Provider’s phone number',
                                    value: 'Provider’s phone number',
                                    eventType: 'input',
                                    required: true
                                },
                                
                            ]
                        }
                    ],
                    
                }
                    
            },

            {
                classDash: 'dashed_bottom_border',
                header:{
                    title: 'Provider who made the referral',
                    selectedValue: ''
                },
                data:{
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Referral notes',
                                    icon: icons.editPen,
                                    name: 'Referral notes',
                                    value:'Referral notes',
                                    eventType: 'input',
                                    required: true
                                },
                                {
                                    inputHeader: 'Client history summary',
                                    icon: icons.editPen,
                                    name: 'Client history summary',
                                    value: 'Client history summary',
                                    eventType: 'input',
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },

        ] as any,
    }),
        actions:{
        addReferralInfo(data:any){
            this.referralInfo = data
        }
    },
    persist:true
})