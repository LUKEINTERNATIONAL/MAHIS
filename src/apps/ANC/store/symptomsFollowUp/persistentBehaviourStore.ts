import { defineStore } from "pinia";


const persistentBehaviourForm={

    highCaffaineIntakeYes:{
        name:"Yes",
        value:"yes"
    },
        highCaffaineIntakeNo:{
        name:"No",
        value:"no"
    },    
    tobaccoUseYes:{
        name:"Yes",
        value:"yes"
    },
    tobaccoUseNo:{
        name:"No",
        value:"no"
    },
        recentlyQuitTobaccoProductsYes:{
        name:"Yes",
        value:"yes"
    },
        recentlyQuitTobaccoProductsNo:{
        name:"No",
        value:"no"
    },
        exposureToSecondHandSmokeYes:{
        name:"Yes",
        value:"yes"
    },
        exposureToSecondHandSmokeNo:{
        name:"No",
        value:"no"
    },
        condomUseDuringSexYes:{
        name:"Yes",
        value:"yes"
    },
        condomUseDuringSexNo:{
        name:"No",
        value:"no"
    },
        alcoholUseYes:{
        name:"Yes",
        value:"yes"
    },
        alcoholUseNo:{
        name:"No",
        value:"no"
    },
        substanceUseYes:{
        name:"Yes",
        value:"yes"
    },
        substanceUseNo:{
        name:"No",
        value:"no"
    },
        noPersistentBehaviourYes:{
        name:"Yes",
        value:"yes"
    },
        noPersistentBehaviourNo:{
        name:"no",
        value:"no"
    },
       
};

export const  usePersistentBehaviourStore  = defineStore('persistentBehaviourStore',{
    state: ()=>({
        persistentBehaviour:[
            {
                selectdData: [],
                isFinishBtn:false,
                 classDash: 'dashed_bottom_border',
                radioBtnContent:{

                    header:{
                        title:'High caffeine intake',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.highCaffaineIntakeYes.name,
                            value: persistentBehaviourForm.highCaffaineIntakeYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.highCaffaineIntakeNo.name,
                            value: persistentBehaviourForm.highCaffaineIntakeNo.value,
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
                        title:'Tobacco use',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.tobaccoUseYes.name,
                            value: persistentBehaviourForm.tobaccoUseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.tobaccoUseNo.name,
                            value: persistentBehaviourForm.tobaccoUseNo.value,
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
                        title:'Recently quit tobacco products',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.recentlyQuitTobaccoProductsYes.name,
                            value: persistentBehaviourForm.recentlyQuitTobaccoProductsYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.recentlyQuitTobaccoProductsNo.name,
                            value: persistentBehaviourForm.recentlyQuitTobaccoProductsNo.value,
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
                        title:'Exposure to second-hand smoke',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.exposureToSecondHandSmokeYes.name,
                            value: persistentBehaviourForm.exposureToSecondHandSmokeYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.exposureToSecondHandSmokeNo.name,
                            value: persistentBehaviourForm.exposureToSecondHandSmokeNo.value,
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
                        title:'Condom use during sex',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.condomUseDuringSexYes.name,
                            value: persistentBehaviourForm.condomUseDuringSexYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.condomUseDuringSexNo.name,
                            value: persistentBehaviourForm.condomUseDuringSexNo.value,
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
                        title:'Alcohol use',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.alcoholUseYes.name,
                            value: persistentBehaviourForm.alcoholUseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.alcoholUseNo.name,
                            value: persistentBehaviourForm.alcoholUseNo.value,
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
                        title:'Substance use',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.substanceUseYes.name,
                            value: persistentBehaviourForm.substanceUseYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.substanceUseNo.name,
                            value: persistentBehaviourForm.substanceUseNo.value,
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
                        title:'No persistent behaviours',
                        selectedValue:''
                    },
                    data:[
                        {
                            name: persistentBehaviourForm.noPersistentBehaviourYes.name,
                            value: persistentBehaviourForm.noPersistentBehaviourYes.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        },
                        {
                            name: persistentBehaviourForm.noPersistentBehaviourNo.name,
                            value: persistentBehaviourForm.noPersistentBehaviourNo.value,
                            labelPlacement:'start',
                            colSize: "7",
                            justify:"space-between" 
                        }
                    ]
                }
            },
        ] as any,
    }),

    actions:{
        addPersistentBehaviour(data:any){
            this.persistentBehaviour=data
        }
    },
    persist:true
})