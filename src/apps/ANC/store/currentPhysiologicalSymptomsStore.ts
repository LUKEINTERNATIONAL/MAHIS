import { defineStore } from "pinia";

const physiologicalSymptomsForm ={
    abnormalPulseRate:{
        name:"Abnormal pulse rate",
        value: "abnormalPulseRate"
    },
        coughLasting:{
        name:"Cough lasting more than 3 weeks",
        value: "coughLasting"
    },  
        painLowBack:{
        name:"Pain – Low back",
        value: "painLowBack"
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
       },
        painPelvic:{
        name:"Pain-pelvic",
        value: "painPelvic"
       }
}

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
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: physiologicalSymptomsForm.abnormalPulseRate.name,
                            value: physiologicalSymptomsForm.abnormalPulseRate.value,
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
                            name: physiologicalSymptomsForm.coughLasting.name,
                            value: physiologicalSymptomsForm.coughLasting.value,
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
                            name: physiologicalSymptomsForm.painLowBack.name,
                            value: physiologicalSymptomsForm.painLowBack.value,
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
                            name: physiologicalSymptomsForm.constipation.name,
                            value: physiologicalSymptomsForm.constipation.value,
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
                            name: physiologicalSymptomsForm.headache.name,
                            value: physiologicalSymptomsForm.headache.value,
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
                            name: physiologicalSymptomsForm.heartburn.name,
                            value: physiologicalSymptomsForm.heartburn.value,
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
                            name: physiologicalSymptomsForm.painLeg.name,
                            value: physiologicalSymptomsForm.painLeg.value,
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
                            name: physiologicalSymptomsForm.painPelvic.name,
                            value: physiologicalSymptomsForm.painPelvic.value,
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
        addPhysiologicalSymptoms(data:any){
            this.physiologicalSymptoms = data
        }
    },
    persist:true

})