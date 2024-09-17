import { defineStore } from "pinia";
import {icons} from "@/utils/svg";
import _ from "lodash";

const initialPersistentBehaviour=[
    {
        selectdData: [],
        isFinishBtn:false,
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:{
            header:{
                selectedValue:'',
                name:'Abnormal bizzarre behaviour',
                title:'What persistent behaviour does the woman has? * ',
                class:'bold'
            },
            data:[
                {
                    name: 'No persistent behaviours',
                    value: 'No persistent behaviours',
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
                    value: 'Substance use',
                    colSize: "12",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "12",
                },
            ]
        }
    },
    {
        childName:'Other',
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            name: "Other notes",
                            value: "",
                            eventType: 'input',
                            inputWidth: "100%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },

    ] as any;

const initialPersistentSymptoms=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'What persistent and Physiological symptoms does the woman has?',
                    selectedValue: '',
                    name: 'Persistent Symptom',
                    class:"bold"
                },
                data:[
                    {
                        name: "None",
                        value: 'None',
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
                        name: 'Breathing difficulty',
                        value: 'Breathing difficulty',
                        colSize: '6',
                        checked: false
                    },


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
                        name: "Cough lasting more than 3 weeks",
                        value: "Cough lasting more than 3 weeks",
                        colSize: '6',
                        checked: false
                    },
                    {
                        name: 'Pelvic pain',
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
                    name:'Persistent Symptom',
                },
                data:[
                    {
                        name: 'Pain - Low back',
                        value: 'Pain - Low back',
                        colSize: '6',
                        checked: false
                    },
                    {
                        name: 'Abnormal pulse rate',
                        value: 'Abnormal pulse rate',
                        colSize: '6',
                        checked: false
                    },

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
                    name:'Persistent Symptom',
                },
                data:[
                    {
                        name: 'Other symptoms',
                        value: 'Other symptoms',
                        colSize: "12",
                    },


                ],
            }

    },
    {
        childName:"Other symptoms",
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Other (specify)',
                            icon: icons.editPen,
                            name: 'Other notes',
                            valueType:"text",
                            value: '',
                            eventType: 'input',
                            inputWidth: "100%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
] as any

export const  usePersistentBehaviourStore  = defineStore('persistentBehaviourStore',{
    state: ()=>({
        persistentBehaviour:[...initialPersistentBehaviour
        ] as any,

        persistentSymptoms:[...initialPersistentSymptoms] as any
    }),

    actions:{
        getInitial(){
            const data=_.cloneDeep(initialPersistentBehaviour)
            return [...data]
        },
        getInitialPersistentSymptoms(){
            const data=_.cloneDeep(initialPersistentSymptoms)
            return [...data]
        },
        addPersistentBehaviour(data:any){
            this.persistentBehaviour=data
        }
    },
    persist:true
})