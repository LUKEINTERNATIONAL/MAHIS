import { defineStore } from "pinia";


export const  usePersistentBehaviourStore  = defineStore('persistentBehaviourStore',{
    state: ()=>({
        persistentBehaviour:[
            {
                selectdData: [],
                isFinishBtn:false,
                 classDash: 'dashed_bottom_border',
                checkboxBtnContent:{
                    header:{
                        selectedValue:'',
                        name:'Persistent behaviour',
                        title:'What persistent behaviour does the woman has?',
                        class:'bold'
                    },
                    data:[
                        {
                            name: 'None',
                            value: 'None',
                            colSize: "12",
                        },
                        {
                            name: 'High caffeine intake',
                            value: 'High caffeine intake',
                            colSize: "12",
                        },
                        {
                            name: 'Tobacco use',
                            value: 'Tobacco use',
                            colSize: "12",
                        },
                        {
                            name: 'Recently quit tobacco products',
                            value: 'Recently quit tobacco products',
                            colSize: "12",
                        },
                        {
                            name: 'Exposure to second-hand smoke',
                            value: 'Exposure to second-hand smoke',
                            colSize: "12",
                        },
                        {
                            name: 'Condom use',
                            value: 'Condom use',
                            colSize: "12",
                        },
                        {
                            name: 'Alcohol use',
                            value: 'Alcohol use',
                            colSize: "12",
                        },
                        {
                            name: 'Substance use',
                            value: 'Substance usev',
                            colSize: "12",
                        },
                        {
                            name: 'High caffeine intake',
                            value: 'High caffeine intake',
                            colSize: "12",
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: 'What persistent symptoms does the woman has?',
                            selectedValue: '',
                            name: 'Persistent Symptom',
                            class:"bold"
                        },
                        data:[
                            {
                                name: 'Breathing difficulty',
                                value: 'Breathing difficulty',
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Leg cramps',
                                value: 'Leg cramps',
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Constipation',
                                value: 'Constipation',
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Heartburn',
                                value: 'Heartburn',
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: "None",
                                value: 'None',
                                colSize: '6',
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
                            title: 'Current physiological symptoms',
                            selectedValue: '',
                            name:'Physiological symptom',
                            class:'bold'
                        },
                        data:[
                            {
                                name: "None",
                                value: 'None',
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: "Cough lasting more than 3 weeks",
                                value: "Cough lasting more than three weeks",
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Constipation',
                                value: 'Constipation',
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Heartburn',
                                value: "Heartburn",
                                colSize: '6',
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
                                colSize: '6',
                                checked: false
                            },
                            {
                                name: 'Pain-pelvic',
                                value: 'Pelvic pain',
                                colSize: '6',
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
                                name: 'Abnormal pulse rate',
                                value: 'Abnormal pulse rate',
                                colSize: '6',
                                checked: false
                            },

                        ],
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