import { defineStore } from "pinia"
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialPhysiologicalCounselling=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Which physiological counselling done?",
                selectedValue: "",
                name:'hiv Counselling',
                class:'bold'

            },
            data: [
                {
                    name: "Counselling on non-pharmacological measures",
                    value: "Counselling on non-pharmacological measures",
                    checked: false,
                    colSize:12,
                },
                {
                    name: "Counselling  conducted on lifestyle",
                    value: "Counselling  conducted on lifestyle",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on antacid",
                    value: "Counselling on antacid",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on leg craps",
                    value: "Counselling on leg craps",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on the use magnesium and calcium",
                    value: "Counselling on the use magnesium and calcium",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on dietary modifications",
                    value: "Counselling on dietary modifications",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling  conducted on the use of wheat bran and other fibre supplements",
                    value: "Counselling  conducted on the use of wheat bran and other fibre supplements",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on regular exercises",
                    value: "Counselling on regular exercises",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on  varicose veins and  oedema",
                    value: "Counselling on  varicose veins and  oedema",
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
        checkboxBtnContent:{
            header:{
                title: 'Reason if any physiological counselling was not done?',
                selectedValue: '',
                name:'Reason if any physiological counselling was not done',
                class:'bold'
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
export const usePhysiologicalCounselingStore = defineStore('physiologicalCounselingStore',{
    state: () =>({
        physiologicalCounselingInfo:[...initialPhysiologicalCounselling] as any,
    }),
        actions:{
        addPhysiologicalCounselingInfo(data:any){
            this.physiologicalCounselingInfo = data
        },
        getInitial(){
            const data=_.cloneDeep(initialPhysiologicalCounselling)
            return [...data]
        }
    },
    persist:true
})