import { defineStore } from "pinia";

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
                            name: "None",
                            value: 'None',
                            colSize: '12',
                            checked: false
                        },
                                          {
                            name: 'Injury to abdomen',
                            value: 'Injury to abdomen',
                            colSize: '12',
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
                            colSize: '12',
                            checked: false
                        },
                        {
                            name: "Misuse of alcohol",
                            value: "Misuse of alcohol",
                            colSize: '12',
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
                            colSize: '12',
                            checked: false
                        },
                        {
                            name: "Thoughts of self-harm",
                            value: "Thoughts of self-harm",
                            colSize: '12',
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
                            colSize: '12',
                            checked: false
                        },
                        {
                            name: "Misuse of drugs",
                            value: "Misuse of drugs",
                            colSize: '12',
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
                            name: 'Ongoing stress',
                            value: 'Ongoing stress',
                            colSize: '12',
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
    // persist:true

})

