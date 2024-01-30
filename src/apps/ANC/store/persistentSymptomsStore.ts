import { defineStore } from "pinia";

const persistentForm ={
    breadingDifficulty:{
        name:"Breathing difficulty",
        value: "breadingDifficulty"
    },
        legCramps:{
        name:"Leg cramps",
        value: "legCramps"
    },  
        visualDisturbance:{
        name:"Visual disturbance",
        value: "visualDisturbance"
    },
        constipation:{
        name:"Constipation",
        value: "constipation"
    },  
       headache:{
        name:"Headache",
        value: "headache"
    },
        heartburn:{
        name:"Heartburn",
        value: "heartburn"
    },
       painLeg:{
        name:"Pain-Leg",
        value: "painLeg"
       }
}

export const usePersistentSymptomsStore = defineStore('persistentSymptomsStore',{
    state: ()=>({
        persistentSymptom:[
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: ' Select which of the following physiological symptoms persist after being reported during last contact',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.breadingDifficulty.name,
                            value: persistentForm.breadingDifficulty.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.legCramps.name,
                            value: persistentForm.legCramps.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.visualDisturbance.name,
                            value: persistentForm.visualDisturbance.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.constipation.name,
                            value: persistentForm.constipation.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.headache.name,
                            value: persistentForm.headache.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.heartburn.name,
                            value: persistentForm.heartburn.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: persistentForm.painLeg.name,
                            value: persistentForm.painLeg.value,
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
     ] as any,
    }),

    actions:{
        addPersistent(data:any){
            this.persistentSymptom = data
        }
    },
    persist:true

})