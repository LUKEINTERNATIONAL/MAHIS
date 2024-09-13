import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialDietCounselling=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Which diet counselling done?",
                selectedValue: "",
                name:'Diet counselling',
                class:'bold'

            },
            data: [
                {
                    name: "Counselling on six food balanced diet",
                    value: "Counselling on six food balanced diet",
                    checked: false,
                    colSize:12,
                },
                {
                    name: "Counselling on keeping physically active",
                    value: "Counselling on keeping physically active",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling  conducted on increasingly daily energy and protein supplementation",
                    value: "Counselling  conducted on increasingly daily energy and protein supplementation",
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
        radioBtnContent:{
            header:{
                title: 'Reason if any diet counselling was not done?',
                selectedValue: '',
                name:"Reason if any diet counselling was not done",
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
                    name:'Other',
                    value:'Other',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:'Reason if any diet counselling was not done',
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
                            valueType:'text',
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

] as any;
export const useDietCounsellingStore = defineStore('dietCounsellingStore',{
    state: () =>({
        dietCounsellingInfo:[...initialDietCounselling] as any,
    }),
        actions:{
        addDietCounsellingInfo(data:any){
            this.dietCounsellingInfo = data
        },

            getInitial(){
                const data = _.cloneDeep(initialDietCounselling)
                return [...data];
            },
    },
    persist:true
})
