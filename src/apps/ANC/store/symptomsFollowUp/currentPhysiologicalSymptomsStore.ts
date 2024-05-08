import { defineStore } from "pinia";

export const useCurrentPhysiologicalSymptomsStore = defineStore('currentPhysiologicalSymptomsStore',{
    state: ()=>({
        physiologicalSymptoms:[
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: 'Current physiological symptoms',
                        selectedValue: '',
                        name:'Physiological symptom',
                        class:'bold'
                    },
                    data:[
                        {
                            name: 'Abnormal pulse rate',
                            value: 'Abnormal pulse rate',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                                                {
                            name: "Cough lasting more than 3 weeks",
                            value: "Cough lasting more than three weeks",
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
                        name:'Physiological symptom',
                    },
                    data:[
                        {
                            name: 'Pain - Low back',
                            value: 'Pain - Low back',
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
                        name:'Physiological symptom',
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
                            value: "Heartburn",
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
                        name:'Physiological symptom',
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
                            name: 'Pain-pelvic',
                            value: 'Pelvic pain',
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
                        name:'Physiological symptom',
                    },
                    data:[
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
        addPhysiologicalSymptoms(data:any){
            this.physiologicalSymptoms = data
        }
    },
    persist:true

})