import { defineStore } from "pinia"
import { icons } from '@/utils/svg';

const referralForm ={
        referralForUrgentCareYes:{
        name:"Yes",
        value:"yes"
    },
        referralForUrgentCareNo:{
        name:"No",
        value:"no"
    },
        referralScreeningDiagnostics:{
        name:"Referral for screening including diagnostics",
        value:"referralScreeningDiagnostics"
    },
        referralGeneralServices:{
        name:'Referral for other general services',
        value:'referralGeneralServices'
    },
        treatmentBeforeReferralYes:{
        name:"Yes",
        value:"yes"
    },
        treatmentBeforeReferralNo:{
        name:"No",
        value:"no"
    },
        dateScheduledReferral:{
        name:"Date scheduled referral",
        value:""
    },
        timeScheduledReferral:{
        name:"time scheduled referral",
        value:""
    },
        locationOfreferral:{
        name:"Location of referral",
        value:""
    },
        dateReferralMade:{
        name:"Date referral was made",
        value:""
    },
        timeReferralMade:{
        name:"time referral made",
        value:""
    },
        providerFacility:{
        name:"Provider’s facility",
        value:""
    },
        providerPhoneNumber:{
        name:"Provider’s phone number",
        value:""
    },
        referralNotes:{
        name:"Referral notes*",
        value:""
    },
        clientHistorySummary:{
        name:"Client history summary",
        value:""
    },
   
}

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
                        name:'referalOption'
                    },
                    data:[
                        {  
                            name: referralForm.referralForUrgentCareYes.name,
                            value: referralForm.referralForUrgentCareYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: referralForm.referralForUrgentCareNo.name,
                            value: referralForm.referralForUrgentCareNo.value,
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
                        title: 'Reason for referral',
                        selectedValue: '',
                        displayNone: true,
                        name:"referralOutcome",
                    },
                    data:[
                        {  
                            name: referralForm.referralScreeningDiagnostics.name,
                            value: referralForm.referralScreeningDiagnostics.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: referralForm.referralGeneralServices.name,
                            value: referralForm.referralGeneralServices.value,
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
                        selectedValue: ''
                    },
                    data:[
                        {  
                            name: referralForm.treatmentBeforeReferralYes.name,
                            value: referralForm.treatmentBeforeReferralYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        { 
                            name: referralForm.treatmentBeforeReferralNo.name,
                            value: referralForm.treatmentBeforeReferralNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
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
                                    name: referralForm.dateScheduledReferral.name,
                                    value: referralForm.dateScheduledReferral.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true,
                                    isDatePopover: true
                                },
                                    {
                                    inputHeader: 'Time',
                                    name: referralForm.timeScheduledReferral.name,
                                    value: referralForm.timeScheduledReferral.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                                    name: referralForm.locationOfreferral.name,
                                    value: referralForm.locationOfreferral.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                                    name: referralForm.dateReferralMade.name,
                                    value: referralForm.dateReferralMade.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true,
                                    isDatePopover: true
                                },
                                    {
                                    inputHeader: 'Time',
                                    name: referralForm.timeReferralMade.name,
                                    value: referralForm.timeReferralMade.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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
                                    name: referralForm.providerFacility.name,
                                    value: referralForm.providerFacility.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true
                                },
                                    {
                                    inputHeader: 'Provider’s phone number',
                                    icon: icons.editPen,
                                    name: referralForm.providerPhoneNumber.name,
                                    value: referralForm.providerPhoneNumber.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true
                                },
                                    {
                                    inputHeader: 'Referral notes',
                                    icon: icons.editPen,
                                    name: referralForm.referralNotes.name,
                                    value: referralForm.referralNotes.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
                                    required: true
                                },
                                    {
                                    inputHeader: 'Client history summary',
                                    icon: icons.editPen,
                                    name: referralForm.clientHistorySummary.name,
                                    value: referralForm.clientHistorySummary.value,
                                    eventType: 'input',
                                    inputWidth: "300px",
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