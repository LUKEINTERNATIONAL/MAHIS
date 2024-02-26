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
                       
                        selectedValue:'',
                        radioTitle:['Yes','No'],
                    },
                    data:[
                        {
                            name: 'High caffeine intake',
                            value: persistentBehaviourForm.highCaffaineIntakeYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
      
                            value: persistentBehaviourForm.highCaffaineIntakeNo.value,
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
                            name: 'Tobacco use',
                            value: persistentBehaviourForm.tobaccoUseYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
        
                            value: persistentBehaviourForm.tobaccoUseNo.value,
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
                            name: 'Recently quit tobacco products',
                            value: persistentBehaviourForm.recentlyQuitTobaccoProductsYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            value: persistentBehaviourForm.recentlyQuitTobaccoProductsNo.value,
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
                            name: 'Exposure to second-hand smoke',
                            value: persistentBehaviourForm.exposureToSecondHandSmokeYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: persistentBehaviourForm.exposureToSecondHandSmokeNo.value,
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
                            name: 'Condom use during sex',
                            value: persistentBehaviourForm.condomUseDuringSexYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
            
                            value: persistentBehaviourForm.condomUseDuringSexNo.value,
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
                            name: 'Alcohol use',
                            value: persistentBehaviourForm.alcoholUseYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: persistentBehaviourForm.alcoholUseNo.value,
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
                            name: 'Substance use',
                            value: persistentBehaviourForm.substanceUseYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                           
                            value: persistentBehaviourForm.substanceUseNo.value,
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
                            name: 'No persistent behaviours',
                            value: persistentBehaviourForm.noPersistentBehaviourYes.value,
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: persistentBehaviourForm.noPersistentBehaviourNo.value,
                            labelPlacement:'start',
                            colSize: "2",
                            justify:"end" 
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