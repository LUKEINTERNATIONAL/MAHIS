import { radio } from "ionicons/icons";
import { defineStore } from "pinia";

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
                        radioTitle:['Yes','No'],
                        name: "Taking Calcium Suppliments",
                        
                    },
                    data:[
                        {
                            name: 'Taking Calcium Suppliments',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                            
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
                        name: 'Side-effects from calcium supplements',
                    },
                    data:[
                        {
                            name: 'Has side-effects from calcium supplements',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",                            
                            
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
                        name:'Taking iron and folic acid tablets',
                        
                    },
                    data:[
                        {
                            name: 'Taking iron and folic acid (IFA) tablets',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                            // class: 'bold' 
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
                        name:'Side-effects from iron and folic acid supplements',
                    },
                    data:[
                        {
                            name: 'Has side-effects from iron and folic acid supplements',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                        },
                        {
       
                            value:"No",
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
                        name:'Taking aspirin tablets',
                    },
                    data:[
                        {
                            name: 'Taking aspirin tablets',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between", 
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
                        name:'Taking vitamin A supplements',
                    },
                    data:[
                        {
                            name: 'Taking vitamin A supplements',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                            
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
                        name:'Taking penicillin treatment'
                    },
                    data:[
                        {
                            name: 'Taking penicillin treatment for syphilis',
                            value: 'Yes',
                            labelPlacement:'start',
                            colSize: "9.7",
                            justify:"space-between",
                            
                        },
                        {
                         
                            value: 'No',
                            labelPlacement:'start',
                            colSize: "2",
                            justify:"end" 
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