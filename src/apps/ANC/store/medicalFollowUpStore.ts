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
                        title:'Taking Calcium Suppliments',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.takingCalciumSuplimentsYes.name,
                            value: trailForm.takingCalciumSuplimentsYes.value
                        },
                        {
                            name: trailForm.takingCalciumSuplimentsNo.name,
                            value: trailForm.takingCalciumSuplimentsNo.value
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
                        title:'Has side-effects from calcium supplements',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: trailForm.sideEffectsCalciumSuplimentsYes.name,
                            value: trailForm.sideEffectsCalciumSuplimentsYes.value
                        },
                        {
                            name: trailForm.sideEffectsCalciumSuplimentsNo.name,
                            value: trailForm.sideEffectsCalciumSuplimentsNo.value
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
                            value: trailForm.ifaTabletsYes.value
                        },
                        {
                            name: trailForm.ifaTabletsNo.name,
                            value: trailForm.ifaTabletsNo.value
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
                            value: trailForm.sideEfffectsifaSuplimeYes.value
                        },
                        {
                            name: trailForm.sideEfffectsifaSuplimeNo.name,
                            value: trailForm.sideEfffectsifaSuplimeNo.value
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
                            value: trailForm.takingAspirinTabletsYes.value
                        },
                        {
                            name: trailForm.takingAspirinTabletsNo.name,
                            value: trailForm.takingAspirinTabletsNo.value
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
                            value: trailForm.takingVitaminAsupplementsYes.value
                        },
                        {
                            name: trailForm.takingVitaminAsupplementsNo.name,
                            value: trailForm.takingVitaminAsupplementsNo.value
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
                            value: trailForm.takingPenicillinTreatmentForSyphilisYes.value
                        },
                        {
                            name: trailForm.takingPenicillinTreatmentForSyphilisNo.name,
                            value: trailForm.takingPenicillinTreatmentForSyphilisNo.value
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