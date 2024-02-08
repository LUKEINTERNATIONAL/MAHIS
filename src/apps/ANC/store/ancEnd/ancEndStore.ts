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
        name:"Specify",
        value:""
    },
        dateofDelivery:{
        name:"Date of delivery",
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
        value:"w`eight"
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
                        selectedValue: ''
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
                                            inputHeader: 'Other (Specify)',
                                            icon: icons.editPen,
                                            value: ancEndForm.specifyOnAncClosing.name,
                                            name: ancEndForm.specifyOnAncClosing.value,
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
          
               header:{
                        title: 'Date of delivery',
                        selectedValue: ''
                    },
                classDash: 'dashed_bottom_border',           
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Date',
                                    icon: icons.editPen,
                                    value: ancEndForm.dateofDelivery.name,
                                    name: ancEndForm.dateofDelivery.value,
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                },
                                    {
                                    inputHeader: 'Time',
                                    icon: icons.editPen,
                                    value: ancEndForm.timeOfDelivery.name,
                                    name: ancEndForm.timeOfDelivery.value,
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
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Place of delivery',
                        selectedValue: ''
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
                {     classDash: 'dashed_bottom_border',
                        data:{ 
                            rowData:[
                                {
                                    colData:[
                                        {
                                            inputHeader: 'Other(specify)',
                                            icon: icons.editPen,
                                            value: ancEndForm.specifyOnPlaceDelivery.name,
                                            name: ancEndForm.specifyOnPlaceDelivery.value,
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
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Preterm death',
                        selectedValue: ''
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
                classDash: 'dashed_bottom_border',
                radioBtnContent:{
                    header:{
                        title: 'Mode of delivery',
                        selectedValue: ''
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
                classDash: 'dashed_bottom_border',
                data:{ 
                    rowData:[
                        {
                            colData:[
                            {
                                inputHeader: 'Weight',
                                icon: icons.weight,
                                value: ancEndForm.weight.name,
                                name: ancEndForm.weight.value,
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

