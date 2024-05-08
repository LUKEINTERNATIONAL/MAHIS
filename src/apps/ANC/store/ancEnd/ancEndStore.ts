import { defineStore } from "pinia";
import { icons } from '@/utils/svg';


export const useAncEndStore = defineStore('ancEndStore',{
    state: () =>({
        ancInfo:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'What is the outcome of the pregnancy?',
                        selectedValue: '',
                        name:'Reason for closing ANC',
                        class:'bold'
                    },
                    data:[
                        {
                            name: "In labour",
                            value: "In labour",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Live birth",
                            value: "Live birth",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Stillbirth",
                            value: "Stillbirth",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Miscarriage",
                            value:"Miscarraige",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                                                {
                            name: "Abortion",
                            value: "Abortion",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Death",
                            value: "Death",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Lost to follow up",
                            value: "Lost to follow up",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  "Moved away",
                            value: "Moved away",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "False pregnancy",
                            value: "False pregnancy",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:"Wrong entry",
                            value: "Wrong entry",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  "Other",
                            value: "Other",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                data:{ 
                            rowData:[
                                {
                                    colData:[
                                        {   
                                            displayNone:true,
                                            inputHeader: 'Specify',
                                            icon: icons.editPen,
                                            value: "Other (specify)",
                                            name: "Other (specify)",
                                            eventType: 'input',
                                            inputWidth: "82%",
                                            required: true
                                        }
                                        
                                    ]
                                }
                            ],
                            
                        }
                    
            },
            {           
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {    
                                    displayNone:true,
                                    inputHeader: 'Date of death',
                                    icon: icons.calendar,
                                    name: "DeathDate",
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                },
                                
                            ]
                        }
                    ],
                    
                }
            
            },
            {            
                data:{ 
                    rowData:[
                        {
                            colData:[
                                    {
                                    
                                    displayNone:true,
                                    inputHeader: 'Cause of Death',
                                    icon: icons.editPen,
                                    name: 'DeathCause',
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
            
            },
            {
               selectdData: [],
                isFinishBtn: false,
                radioBtnContent:{
                    header:{
                        title: 'Client record will no longer be  viewed',
                        selectedValue: '',
                        name:'recordViewed',
                        displayNone:true,
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
                            name:  'No',
                            value: 'no',
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            { 
          
               header:{
                        title: 'Date of delivery',
                        selectedValue: '',
                        name:"Date of delivery"
                    },
                          
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'Date',
                                    icon: icons.calenderPrimary,
                                    value: "Date of delivery",
                                    name: "Date of delivery",
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true,
                                    isDatePopover: true
                                },
                                
                            ]
                        }
                    ],
                    
                }
            
            },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:{
                    header:{
                        title: 'Place of delivery',
                        selectedValue: '',
                        name:'Place of Delivery',
                        displayNone:true
                    },
                    data:[
                        {
                            name: "Home",
                            value: "Home",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Health-care facility",
                            value: "Health-care facility",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  "Other",
                            value: "Other",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
                // {    
                //         data:{ 
                //             rowData:[
                //                 {
                //                     colData:[
                //                         {   
                //                             displayNone:true,
                //                             inputHeader: 'specify',
                //                             icon: icons.editPen,
                //                             value: "",
                //                             name: "Other (specify)",
                //                             valueType: "text",
                //                             eventType: 'input',
                //                             inputWidth: "82%",
                //                             required: true
                //                         }
                                        
                //                     ]
                //                 }
                //             ],
                            
                //         }
                    
                //     },

            {
                selectdData: [],
                isFinishBtn: false,
                
                radioBtnContent:{
                    header:{
                        title: 'Preterm birth',
                        selectedValue: '',
                        name:'Preterm',
                        diplayNone:true,
                    },
                    data:[
                        {
                            name: "Yes",
                            value: "Yes",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  "No",
                            value: "No",
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
                
                radioBtnContent:{
                    header:{
                        title: 'Mode of delivery',
                        selectedValue: '',
                        name:'Mode of delivery',
                        displayNone:true,
                    },
                    data:[
                        {
                            name: "Normal",
                            value: "Normal",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Forceps",
                            value: "Forceps",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "Vacuum",
                            value: "Vacuum",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: "C-section",
                            value: "C-section",
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                    ]
                }
            },
            {
                
                data:{ 
                    rowData:[
                        {
                            colData:[
                            {   displayNone:true,
                                inputHeader: 'Weight',
                                icon: icons.weight,
                                value: "Weight",
                                name: "Weight",
                                eventType: 'input',
                                valueType:"number",
                                inputWidth: "82%",
                                required: true
                            }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            
            ]as any,            
    }),
        actions:{
        // addAncInfo(data:any){
        //     this.ancInfo = data
        // }
    },
    persist:true
})

