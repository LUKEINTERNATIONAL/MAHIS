import { defineStore } from "pinia";

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
                        title: '',
                        selectedValue: '',
                        name: 'Persistent Symptom',
                    },
                    data:[
                        {
                            name: 'Breathing difficulty',
                            value: 'Breathing difficulty',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: 'Leg cramps',
                            value: 'Leg cramps',
                            labelPlacement: 'start',
                            colSize: '6',
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
                        selectedValue: '',
                        name: 'Persistent Symptom',
                    },
                    data:[
                        {
                            name: 'Visual disturbance',
                            value: 'Visual disturbance',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: 'Constipation',
                            value: 'Constipation',
                            labelPlacement: 'start',
                            colSize: '6',
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
                        selectedValue: '',
                        name: 'Persistent Symptom',
                    },
                    data:[
                        {
                            name: 'Headache',
                            value: 'Headache',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: 'Heartburn',
                            value: 'Heartburn',
                            labelPlacement: 'start',
                            colSize: '6',
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
                        selectedValue: '',
                        name: 'Persistent Symptom',
                    },
                    data:[
                        {
                            name: 'Pain-Leg',
                            value: 'Pain-Leg',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "None",
                            value: 'None',
                            labelPlacement: 'start',
                            colSize: '6',
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