import { defineStore } from "pinia";


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
                        name:'High caffeine intake'
                    },
                    data:[
                        {
                            name: 'High caffeine intake*',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
      
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Tobacco use',
                    },
                    data:[
                        {
                            name: 'Tobacco use*',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
        
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Recently quit tobacco products',
                    },
                    data:[
                        {
                            name: 'Recently quit tobacco products*',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Exposure to second-hand smoke',
                    },
                    data:[
                        {
                            name: 'Exposure to second-hand smoke*',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Condom use'
                    },
                    data:[
                        {
                            name: 'Condom use during sex',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
            
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Alcohol use',
                    },
                    data:[
                        {
                            name: 'Alcohol use',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'Substance use',
                    },
                    data:[
                        {
                            name: 'Substance use',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                           
                            value: 'No',
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
                        
                        selectedValue:'',
                        name:'No persistent behaviours',
                    },
                    data:[
                        {
                            name: 'No persistent behaviours',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between" 
                        },
                        {
                            
                            value: 'No',
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