import { defineStore } from "pinia"
import { icons } from '@/utils/svg';

const initialPhysiologicalCounselling=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:"bold",
                title: 'Counselling conducted on non-pharmacological measures to reduce nausea and vomiting?',
                selectedValue: '',
                name:'Counselling on non-pharmacological measures',
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
        classDash: 'dashed_bottom_border',
        childName:'Counselling on non-pharmacological measures',
        sideColSize:0.5,
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on non-pharmacological measures to reduce nausea and vomiting not conducted?',
                selectedValue: '',
                name:'Counselling on non-pharmacological measures not done',
                displayNone:'true',
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
        childName:'Counselling on non-pharmacological measures not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Counselling conducted on pharmacological treatment for nausea and vomiting?',
                selectedValue: '',
                name:'Counselling on pharmacological treatment',
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
        childName:'Counselling on pharmacological treatment',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Reason counselling on pharmacological was not conducted?',
                selectedValue: '',
                name:'Counselling on pharmacological treatment not done',
                displayNone:true,
                displayNext:'Other'
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
        childName:'Counselling on pharmacological treatment not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                class:'bold',
                title: 'Counselling  conducted on diet and lifestyle?',
                selectedValue: '',
                name:'Counselling on diet',
                displayNext:"No",
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
        childName:'Counselling on diet',
        selectdData: [],
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on diet and lifestyle was not conducted?',
                selectedValue: '',
                class:'bold',
                name:'Counselling on diet not done',
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
        childName:"Counselling on diet not done",
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
                            value: "Other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on antacid?',
                selectedValue: '',
                name:'Counselling on antacid',
                class:"bold",
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
        childName: 'Counselling on antacid',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on antacid was not done?',
                selectedValue: '',
                name:'Counselling on antacid not done',
                displayNone:true,
                displayNext:'Other'
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
        childName:'Counselling on antacid not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on symptoms of leg craps?',
                selectedValue: '',
                name:"Counselling on leg craps",
                class:'bold',
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
        childName:'Counselling on leg craps',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on  assumptions for leg craps was not done?',
                selectedValue: '',
                name:'Counselling on leg craps not done',
                displayNone:true,
                class:'bold',
                displayNext:'Other'
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
        childName:'Counselling on leg craps not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on the use magnesium and calcium to relieve leg cramps?',
                selectedValue: '',
                name:"Counselling on the use magnesium and calcium",
                class:'bold',
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
        childName:'Counselling on the use magnesium and calcium',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on  use of magnesium and calcium to relieve leg cramps was not done?',
                selectedValue: '',
                name:'Counselling on use magnesium and calcium not done',
                displayNone:true,
                class:'bold',
                displayNext:'Other'
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
        childName:'Counselling on use magnesium and calcium not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on dietary modifications to relieve constipation?',
                selectedValue: '',
                name:'Counselling on dietary modifications',
                class:'bold',
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
        childName: 'Counselling on dietary modifications',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on  dietary modifications to relieve constipation was not done?',
                selectedValue: '',
                name:'Counselling on dietary modifications not done',
                displayNone:true,
                class:'bold',
                displayNext:'Other'
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
        childName:'Counselling on dietary modifications not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },
    //break
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on the use of wheat?',
                selectedValue: '',
                name:'Counselling on wheat',
                class:'bold',
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
        childName:'Counselling on wheat',
        selectdData: [],
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on  the use of wheat was not done?',
                selectedValue: '',
                name:'Counselling on wheat not done',
                displayNone: true,
                class:'bold',
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
        childName:'Counselling on wheat not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },

    //break

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on regular exercise?',
                selectedValue: '',
                name:'Counselling on regular exercises',
                class:'bold',
                displayNone:'No'
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
        childName: 'Counselling on regular exercises',
        selectdData: [],
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        isFinishBtn: false,
        radioBtnContent:{
            header:{
                title: 'Reason counselling on regular exercise was not done?',
                selectedValue: '',
                class:'bold',
                name:'Counselling on regular exercises not done',
                displayNone:'Other'
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: "7",
                },
                {
                    name: 'Other',
                    value: 'other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:'Counselling on regular exercises not done',
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
                            value: "other notes",
                            eventType: 'input',
                            inputWidth: "82%",
                            required: true
                        }

                    ]
                }
            ],

        }

    },

    //break

    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        radioBtnContent:{
            header:{
                title: 'Counselling  conducted on  varicose veins and  oedema?',
                selectedValue: '',
                class:'bold',
                name:'Counselling on  varicose veins and  oedema',
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
        childName: 'Counselling on  varicose veins and  oedema',
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0.5,
        radioBtnContent:{
            header:{
                title: 'Reason counselling for varicose veins and oedema was not done?',
                selectedValue: '',
                name:'Counselling on  varicose veins and  oedema not done',
                displayNone:true,
                displayNext:'Other'
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
        childName:'Counselling on  varicose veins and  oedema not done',
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
                            value: "other notes",
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
export const usePhysiologicalCounselingStore = defineStore('physiologicalCounselingStore',{
    state: () =>({
        physiologicalCounselingInfo:[...initialPhysiologicalCounselling] as any,
    }),
        actions:{
        addPhysiologicalCounselingInfo(data:any){
            this.physiologicalCounselingInfo = data
        },
        getInitial(){
            const data=[...initialPhysiologicalCounselling]
            return [...data]
        }
    },
    persist:true
})