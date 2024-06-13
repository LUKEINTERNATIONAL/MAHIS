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
                        title: 'Referral for urgent care *',
                        selectedValue: '',
                        class:"bold",
                        name:'Referral for urgent care'
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
                            value: "Referral for screening including diagnostics",
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
                        title: 'Any treatment given before referral?',
                        class:"bold",
                        selectedValue: '',
                        name:'Any treatment given before referral'
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
                                    class:"bold",
                                    inputHeader: 'Date scheduled referral *',
                                    icon: icons.calenderPrimary,
                                    name: "Date scheduled referral",
                                    value: "",
                                    eventType: 'input',
                                    valueType: 'date',
                                    minDate:"",
                                    maxDate:"",
                                    required: true,
                                    placeholder:'Pick date',
                                    isDatePopover: true
                                },
                                    {
                                        class:"bold",

                                        inputHeader: 'Time scheduled referral',
                                        icon: icons.timePicker,
                                        name: 'Time scheduled referral',
                                    value: "",
                                    valueType: "date",
                                        placeholder:'Pick time',
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
                                    class:"bold",
                                    inputHeader: "Where is the client being referred to? *",
                                    icon: icons.search,
                                    value: "",
                                    name: "Location of referral",
                                    popOver: true,
                                    valueType: "text",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    placeholder: "Search for facility",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "facility_id",
                                },
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {   
               classDash: 'dashed_bottom_border',
               header:{
                        title: 'Date and time referral was made',
                        selectedValue: ''
                    },
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    class:"bold",
                                    inputHeader: 'Date referral was made *',
                                    icon: icons.calenderPrimary,
                                    name: "Date referral was made",
                                    value: "",
                                    eventType: 'input',
                                    valueType:'date',
                                    minDate:"",
                                    maxDate:"",
                                    required: true,
                                    placeholder:'Pick date',
                                    isDatePopover: true
                                },
                                    {
                                        class:"bold",
                                        inputHeader: 'Time referral made',
                                    name: "Time referral made",
                                    value: "",
                                    eventType: 'input',
                                    valueType:'text',
                                        placeholder:'Pick time',
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
                                    class:"bold",
                                    inputHeader: "Provider’s facility *",
                                    icon: icons.search,
                                    value: "",
                                    name: "Provider’s facility",
                                    popOver: true,
                                    valueType: "text",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    placeholder: "Search for facility",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "facility_id",
                                },
                                    {
                                    inputHeader: 'Provider’s phone number',
                                    icon: icons.editPen,
                                    name: 'Provider’s phone number',
                                    value: '',
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
                                    class:"bold",
                                    inputHeader: 'Referral notes',
                                    icon: icons.editPen,
                                    name: 'Referral notes',
                                    value:'',
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
                                    class:"bold",
                                    inputHeader: 'Client history summary',
                                    icon: icons.editPen,
                                    name: 'Client history summary',
                                    value: '',
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
    // persist:true
})