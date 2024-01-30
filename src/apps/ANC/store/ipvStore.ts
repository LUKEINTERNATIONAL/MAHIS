import { defineStore } from "pinia";

const ipvForm ={
    ongoingStress:{
        name:"Ongoing stress",
        value: "ongoingStress"
    },
        injuryToAbdomen:{
        name:"Injury to abdomen",
        value: "injuryToAbdomen"
    },  
        womanHusbandIntrusiveDuringConsultations:{
        name:"Woman’s partner or husband is intrusive during consultations",
        value: "womanHusbandIntrusiveDuringConsultations"
    },
        misuseOfAlcohol:{
        name:"Misuse of alcohol",
        value: "misuseOfAlcohol"
    },  
       unspecifiedHarmfulBehaviours:{
        name:"Unspecified harmful behaviours",
        value: "unspecifiedHarmfulBehaviours"
    },
        thoughtsOfSelfHarm:{
        name:"Thoughts of self-harm",
        value: "thoughtsOfSelfHarm"
    },
       unwantedPregnancies:{
        name:"Unwanted Pregnancies",
        value: "unwantedPregnancies"
       },
        misuseOfDrugs:{
        name:"Misuse of drugs",
        value: "misuseOfDrugs"
       }
}

export const useIpvStore = defineStore('ipvStore',{
    state: ()=>({
        ipv:[
        {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: 'Presenting signs and symptoms that trigger suspicion of IPV and clinical inquiry',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: ipvForm.ongoingStress.name,
                            value: ipvForm.ongoingStress.value,
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
                            name: ipvForm.injuryToAbdomen.name,
                            value: ipvForm.injuryToAbdomen.value,
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
                            name: ipvForm.womanHusbandIntrusiveDuringConsultations.name,
                            value: ipvForm.womanHusbandIntrusiveDuringConsultations.value,
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
                            name: ipvForm.misuseOfAlcohol.name,
                            value: ipvForm.misuseOfAlcohol.value,
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
                            name: ipvForm.unspecifiedHarmfulBehaviours.name,
                            value: ipvForm.unspecifiedHarmfulBehaviours.value,
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
                            name: ipvForm.thoughtsOfSelfHarm.name,
                            value: ipvForm.thoughtsOfSelfHarm.value,
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
                            name: ipvForm.unwantedPregnancies.name,
                            value: ipvForm.unwantedPregnancies.value,
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
                            name: ipvForm.misuseOfDrugs.name,
                            value: ipvForm.misuseOfDrugs.value,
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
        addIpv(data:any){
            this. ipv = data
        }
    },
    persist:true

})