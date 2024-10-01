import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialBehaviourInfo=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Behaviour counselling done",
                selectedValue: "",
                name:'Behaviour counselling',
                class:'bold'

            },
            data: [
                {
                    name: "Counselling on caffeine",
                    value: "Counselling on caffeine",
                    checked: false,
                    colSize:12,
                },
                {
                    name: "Counselling on tobacco",
                    value: "Counselling on tobacco",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on second hand smoke",
                    value: "Counselling on second hand smoke",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling conducted on condom use",
                    value: "Counselling conducted on condom use",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling conducted on alcohol/substance",
                    value: "Counselling conducted on alcohol/substance",
                    checked: false,
                    colSize:12,

                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border',
        sideColSize:0,
        checkboxBtnContent:{
            header:{
                title: 'Reason if any behaviour counselling not conducted?',
                selectedValue: '',
                name:'Reason behaviour counselling not done',
                class:'bold',
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
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
        childName:"Other",
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
                            inputWidth: "100%",
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