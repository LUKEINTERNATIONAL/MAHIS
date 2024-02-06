import { radio } from "ionicons/icons";
import { defineStore } from "pinia";

const trailForm = {

    takingCalciumSuplimentsYes:{
        name:"Yes",
        value:"yes"
    },

    takingCalciumSuplimentsNo:{
        name:"No",
        value:"no"
    },
        sideEffectsCalciumSuplimentsYes:{
        name:"Yes",
        value:"yes"
    },
        sideEffectsCalciumSuplimentsNo:{
        name:"No",
        value:"no"
    },
        ifaTabletsYes:{
        name:"Yes",
        value:"yes"
    },
        ifaTabletsNo:{
        name:"No",
        value:"no"
    },
        sideEfffectsifaSuplimeYes:{
        name:"Yes",
        value:"yes"
    },
        sideEfffectsifaSuplimeNo:{
        name:"No",
        value:"no"
    },
        takingAspirinTabletsYes:{
        name:"Yes",
        value:"yes"
    },
        takingAspirinTabletsNo:{
        name:"No",
        value:"no"
    },
        takingVitaminAsupplementsYes:{
        name:"Yes",
        value:"yes"
    },
        takingVitaminAsupplementsNo:{
        name:"No",
        value:"no"
    },
        takingPenicillinTreatmentForSyphilisYes:{
        name:"Yes",
        value:"yes"
    },
        takingPenicillinTreatmentForSyphilisNo:{
        name:"No",
        value:"no"
    },

}

export const useMedicalFollowUpStore = defineStore('medicalFollowUpStore',{
    state: () => ({
        trial:[
            {
                selectdData: [],
                isFinishBtn:false,
                 classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        selectedValue:'',
                        radioTitle:['Yes','No']
                    },
                    data:[
                        {
                            name: 'Taking Calcium Suppliments',
                            value: trailForm.takingCalciumSuplimentsYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                            class: 'bold',
                        },
                        {
                            value: trailForm.takingCalciumSuplimentsNo.value,
                            labelPlacement:'start',
                            colSize: "2",
                            justify:"end" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        selectedValue:''
                    },
                    data:[
                        {
                            name: 'Has side-effects from calcium supplements',
                            value: trailForm.sideEffectsCalciumSuplimentsYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",                            
                            class: 'bold'
                        },
                        {
                            value: trailForm.sideEffectsCalciumSuplimentsNo.value,
                            labelPlacement:'start',
                            colSize: "2",
                            justify:"end" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'Taking iron and folic acid (IFA) tablets',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.ifaTabletsYes.name,
                            value: trailForm.ifaTabletsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: trailForm.ifaTabletsNo.name,
                            value: trailForm.ifaTabletsNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'Has side-effects from iron and folic acid supplements',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.sideEfffectsifaSuplimeYes.name,
                            value: trailForm.sideEfffectsifaSuplimeYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: trailForm.sideEfffectsifaSuplimeNo.name,
                            value: trailForm.sideEfffectsifaSuplimeNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'Taking aspirin tablets',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.takingAspirinTabletsYes.name,
                            value: trailForm.takingAspirinTabletsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: trailForm.takingAspirinTabletsNo.name,
                            value: trailForm.takingAspirinTabletsNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'Taking vitamin A supplements',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.takingVitaminAsupplementsYes.name,
                            value: trailForm.takingVitaminAsupplementsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: trailForm.takingVitaminAsupplementsNo.name,
                            value: trailForm.takingVitaminAsupplementsNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn:false,
               classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'Taking penicillin treatment for syphilis',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.takingPenicillinTreatmentForSyphilisYes.name,
                            value: trailForm.takingPenicillinTreatmentForSyphilisYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: trailForm.takingPenicillinTreatmentForSyphilisNo.name,
                            value: trailForm.takingPenicillinTreatmentForSyphilisNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            }
        ] as any,
    }),

    actions:{
        addFollowUp(data:any){
            this.trial=data;
        }
    },
    persist:true
})