import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialPreventativeCounselling=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Preventative counselling done?",
                selectedValue: "",
                    name:'Preventative counselling',
                class:'bold'

            },
            data: [
                {
                    name: "PrEp for HIV prevention provided",
                    value: "PrEp for HIV prevention provided",
                    checked: false,
                    colSize:12,
                },
                {
                    name: "Counselling on seeking care",
                    value: "Counselling on seeking care",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counseling on ANC contact schedule",
                    value: "Counseling on ANC contact schedule",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling to immediately go to hospital if severe danger signs are present",
                    value: "Counselling to immediately go to hospital if severe danger signs are present",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling conducted on birth preparedness and complications",
                    value: "Counselling conducted on birth preparedness and complications",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on TB screening",
                    value: "Counselling on mode of transport",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on intrapartum",
                    value: "Counselling on intrapartum",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on postpartum",
                    value: "Counselling on postpartum",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on breast feeding",
                    value: "Counselling on breast feeding",
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
                title: 'Reason if any preventative counselling not conducted?',
                selectedValue: '',
                name:'Reason clinical counselling not done',
                class:'bold',
            },
            data:[
                {
                    name:'Client was referred',
                    value: 'client was referred',
                    colSize: 12
                },
                {
                    name: 'Other',
                    value: 'Other',
                    colSize: 12
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
                            inputHeader: 'Specify',
                            icon: icons.editPen,
                            name: 'Other notes',
                            inputType:"",
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
] as any;
export const usePreventativeCounsellingStore = defineStore('preventativeCounsellingStore',{
    state: () =>({
        preventativeCounselling:[...initialPreventativeCounselling] as any,
    }),
    actions:{
        addBehaviourInfo(data:any){
            this.preventativeCounselling = data
        },
        getInitial(){
            const data = _.cloneDeep(initialPreventativeCounselling);
            return [...data];
        }
    },
    // persist:true
})