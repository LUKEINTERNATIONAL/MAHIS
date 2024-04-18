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
        name:"Partner's intrusive during consultations",
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
                        title: '',
                        selectedValue: '',
                        name: 'Intimate partner violence'
                    },
                    data:[
                        {
                            name: 'Ongoing stress',
                            value: 'Ongoing stress',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },                        {
                            name: 'Injury to abdomen',
                            value: 'Injury to abdomen',
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
                        name: 'Intimate partner violence'
                        
                    },
                    data:[
                        {
                            name: "Partner's intrusive during consultations",
                            value: "Partner's intrusive during consultations",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Misuse of alcohol",
                            value: "Misuse of alcohol",
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
                        name: 'Intimate partner violence'
                    },
                    data:[
                        {
                            name: "Unspecified Harmful Behaviours",
                            value: "Unspecified Harmful Behaviours",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Thoughts of self-harm",
                            value: "Thoughts of self-harm",
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
                        name: 'Intimate partner violence'
                    },
                    data:[
                        {
                            name: "Unwanted pregnancies",
                            value: "Unwanted pregnancies",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Misuse of drugs",
                            value: "Misuse of drugs",
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
                        name: 'Intimate partner violence'
                    },
                    data:[
                        {
                            name: "None",
                            value: 'None',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        
                    ],
                }
                    
        }
     ] as any,
    }),

    actions:{
        addIpv(data:any){
            this. ipv = data
        }
    },
    persist:true

})