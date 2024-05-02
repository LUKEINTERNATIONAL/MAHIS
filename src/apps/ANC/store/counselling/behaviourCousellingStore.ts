import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialBehaviourInfo=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:"bold",
                name:'Counselling on caffeine',
                title: 'Counselling  conducted on caffeine?',
                selectedValue: '',
                displayNext:"No"
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        selectdData: [],
        sideColSize:0.5,
        childName:"Counselling on caffeine",
        classDash: 'dashed_bottom_border',
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on caffeine reduction was not conducted?',
                selectedValue: '',
                name:'Counselling on caffeine not done',
                displayNone:true,
                displayNext:"Other"
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:"Counselling on caffeine not done",
        sideColSize:0.5,
        classDash: 'dashed_bottom_border',
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            name: 'Other notes',
                            inputType:"text",
                            value: '',
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Counselling  conducted on Tobacco?',
                selectedValue: '',
                name:'Counselling on tobacco',
                displayNext:'No'
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        childName:"Counselling on tobacco",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        isFinishBtn: false,
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on Tobacco cessation was not conducted?',
                selectedValue: '',
                name:'Counselling on tobacco not done',
                displayNone:true,
                displayNext:"Other"
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:"Counselling on tobacco not done",
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
                            inputType:"text",
                            name: 'Other tobacco not done notes',
                            value: '',
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:"bold",
                title: 'Counselling  conducted on second-hand smoke?',
                name:'Counselling on second hand smoke',
                displayNext:"No",
                selectedValue: ''
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        classDash: 'dashed_bottom_border',
        childName: "Counselling on second hand smoke",
        selectdData: [],
        isFinishBtn: false,
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on second-hand smoke was not conducted?',
                selectedValue: '',
                name:'Counselling on second hand smoke not done',
                displayNone:true,
                displayNext:"Other"
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        sideColSize:0.5,
        childName:"Counselling on second hand smoke not done",
        classDash: 'dashed_bottom_border',
        data:{
            rowData:[
                {
                    colData:[
                        {
                            displayNone:true,
                            inputHeader: 'Other (specify)',
                            icon: icons.editPen,
                            name: 'Other second hand smoke not done notes',
                            inputType:"text",
                            value: '',
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:"bold",
                title: 'Counselling  conducted on condom use?',
                name:'Counselling conducted on condom use',
                selectedValue: '',
                displayNext:"No"
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        childName:"Counselling conducted on condom use",
        selectdData: [],
        sideColSize:0.5,
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on condom use was not done?',
                selectedValue: '',
                name:"Counselling on condom use not done",
                displayNone:true,
                displayNext:"Other"
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:"Counselling on condom use not done",
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
                            name: 'Other condom use not done notes',
                            value: '',
                            inputType:"text",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{

                class:"bold",
                title: 'Counselling  conducted on alcohol/substance?',
                name:'Counselling conducted on alcohol/substance',
                selectedValue: '',
                displayNext:'No'
            },
            data:[
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2.5",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2.5",
                },
            ]
        }
    },
    {
        selectdData: [],
        childName:"Counselling conducted on alcohol/substance",
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on alcohol/substance was not done?',
                selectedValue: '',
                name:'Counselling on alcohol/substance not done',
                displayNone:true,
                class:'bold',
                displayNext:"Other",
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:"Counselling on alcohol/substance not done",
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
                            name: 'Other alcohol/substance not done',
                            inputType:"text",
                            value: '',
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
] as any;
export const useBehaviourCousellingStore = defineStore('behaviourCousellingStore',{
    state: () =>({
        behaviourInfo:[...initialBehaviourInfo] as any,
    }),
    actions:{
        addBehaviourInfo(data:any){
            this.behaviourInfo = data
        },
        getInitial(){
            const data = _.cloneDeep(initialBehaviourInfo);
            return [...data];
        }
    },
    persist:true
})