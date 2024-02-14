import { defineStore } from "pinia";
import { icons } from '@/utils/svg';

const ancEndForm ={
        Inlabour:{
        name:"In labour",
        value:"Inlabour"
    },
        liveBirth:{
        name:"Live birth",
        value:"liveBirth"
    },
       stillbirth:{
        name:"Stillbirth",
        value:"stillbirth"
    },
        miscarriage:{
        name:'Miscarriage',
        value:'miscarriage'
    },
        abortion:{
        name:"Abortion",
        value:"abortion"
    },
        death:{
        name:"Death",
        value:"death"
    },
        lostFollowUp:{
        name:"Lost to follow up",
        value:"lostFollowUp"
    },
        timeScheduledReferral:{
        name:"time scheduled referral",
        value:"timeScheduledReferral"
    },
        movedAway:{
        name:"Moved away",
        value:" movedAway"
    },
        falsePregnancy:{
        name:"False pregnancy",
        value:"falsePregnancy"
    },
        wrongEntry:{
        name:"Wrong entry",
        value:"wrongEntry"
    },
        otherOnClosingANC:{
        name:"Other",
        value:"otherOnClosingANC"
    },
    specifyOnAncClosing:{
        name:"SpecifyAnC",
        value:""
    },
        dateofDelivery:{
        name:"DateD",
        value:"dateofDelivery"
    },
        timeOfDelivery:{
        name:"Time of delivery",
        value:"timeOfDelivery"
    },
        home:{
        name:"Home",
        value:"home"
    },
       healthCareFacility:{
        name:"Health-care facility",
        value:"healthCareFacility"
    },
        otherOnPlaceDelivery:{
        name:"Other",
        value:"otherOnPlaceDelivery"
    },
        specifyOnPlaceDelivery:{
        name:"Specify",
        value:""
    },
       pretermDeathYes:{
        name:"Yes",
        value:"no"
    },
        pretermDeathNo:{
        name:"No",
        value:"no"
    },
        normal:{
        name:"Normal",
        value:"normal"
    },
        forceps:{
        name:"Forceps",
        value:"forceps"
    },
        vacuum:{
        name:"Vacuum",
        value:"vacuum"
    },
        cSection:{
        name:"C-section",
        value:"cSection"
    },
        weight:{
        name:"Weight",
        value:"weight"
    },
   
}

export const useAncEndStore = defineStore('ancEndStore',{
    state: () =>({
        ancInfo:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: '',
                        selectedValue: '',
                        name:'otherEnd'
                    },
                    data:[
                        {
                            name: ancEndForm.Inlabour.name,
                            value: ancEndForm.Inlabour.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.liveBirth.name,
                            value: ancEndForm.liveBirth.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.stillbirth.name,
                            value: ancEndForm.stillbirth.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.miscarriage.name,
                            value: ancEndForm.miscarriage.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                                                {
                            name: ancEndForm.abortion.name,
                            value: ancEndForm.abortion.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.death.name,
                            value: ancEndForm.death.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.miscarriage.name,
                            value: ancEndForm.miscarriage.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.lostFollowUp.name,
                            value: ancEndForm.lostFollowUp.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.movedAway.name,
                            value: ancEndForm.movedAway.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.falsePregnancy.name,
                            value: ancEndForm.falsePregnancy.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.wrongEntry.name,
                            value: ancEndForm.wrongEntry.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.otherOnClosingANC.name,
                            value: ancEndForm.otherOnClosingANC.value,
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
                                            value: ancEndForm.specifyOnAncClosing.value,
                                            name: ancEndForm.specifyOnAncClosing.name,
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
                                    inputHeader: 'Death Date',
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
                        selectedValue: ''
                    },
                          
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {   
                                    displayNone:true,
                                    inputHeader: 'Date',
                                    icon: icons.calenderPrimary,
                                    value: ancEndForm.dateofDelivery.value,
                                    name: ancEndForm.dateofDelivery.name,
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
                        name:'placeDelivery',
                        displayNone:true
                    },
                    data:[
                        {
                            name: ancEndForm.home.name,
                            value: ancEndForm.home.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.healthCareFacility.name,
                            value: ancEndForm.healthCareFacility.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.otherOnPlaceDelivery.name,
                            value: ancEndForm.otherOnPlaceDelivery.value,
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
                                            inputHeader: 'specify',
                                            icon: icons.editPen,
                                            value: ancEndForm.specifyOnPlaceDelivery.value,
                                            name: ancEndForm.specifyOnPlaceDelivery.name,
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
                        title: 'Preterm birth',
                        selectedValue: '',
                        name:'preterm',
                        diplayNone:true,
                    },
                    data:[
                        {
                            name: ancEndForm.pretermDeathYes.name,
                            value: ancEndForm.pretermDeathYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.pretermDeathNo.name,
                            value: ancEndForm.pretermDeathNo.value,
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
                        name:'deliveryMode',
                        displayNone:true,
                    },
                    data:[
                        {
                            name: ancEndForm.normal.name,
                            value: ancEndForm.normal.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.forceps.name,
                            value: ancEndForm.forceps.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: ancEndForm.vacuum.name,
                            value: ancEndForm.vacuum.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name:  ancEndForm.cSection.name,
                            value: ancEndForm.cSection.value,
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
                                value: ancEndForm.weight.value,
                                name: ancEndForm.weight.name,
                                eventType: 'input',
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
        addAncInfo(data:any){
            this.ancInfo = data
        }
    },
    persist:true
})

