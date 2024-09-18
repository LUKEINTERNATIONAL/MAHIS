import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialMedicalFollowUp=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What medication supplements is the woman currently taking?",
                selectedValue: "",
                name:'Medical follow up',
                class:'bold'

            },
            data: [
                {
                    name: 'Taking Calcium Supplements',
                    value: 'Taking Calcium Supplements',
                    colSize: "12",

                },
                {
                    name: 'Taking iron and folic acid (IFA) tablets',
                    value: 'Taking iron and folic acid (IFA) tablets',
                    colSize: "12",

                },
                {
                    name: 'Taking aspirin tablets',
                    value: 'Taking aspirin tablets',
                    colSize: "12",

                },
                {
                    name: 'Taking vitamin A supplements',
                    value: 'Taking vitamin A supplements',
                    colSize: "12",

                },
                {
                    name: 'Taking penicillin treatment for syphilis',
                    value: 'Taking penicillin treatment for syphilis',
                    colSize: "12",

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
                title: 'What side effects does the woman have due to medication supplements?',
                selectedValue: '',
                name:'Side effects',
                class:'bold',
            },
            data:[
                {
                    name: 'Side-effects from calcium supplements',
                    value: 'Side-effects from calcium supplements',
                    colSize: "12",

                },
                {
                    name: 'Side-effects from iron and folic acid supplements',
                    value: 'Side-effects from iron and folic acid supplements',
                    colSize: "12",

                },
                {
                    name: 'Side-effects from Aspirin supplements',
                    value: 'Side-effects from Aspirin supplements',
                    colSize: "12",

                },
                {
                    name: 'Side-effects from Vitamin A supplements',
                    value: 'Side-effects from Vitamin A supplements',
                    colSize: "12",

                },
                {
                    name: 'Side-effects from Penicillin',
                    value: 'Taking penicillin treatment',
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
export const useMedicalFollowUpStore = defineStore('medicalFollowUpStore',{
    state: () =>({
        medicalFollowUp:[...initialMedicalFollowUp] as any,
    }),
    actions:{
        addMedicalFollowUP(data:any){
            this.medicalFollowUp = data
        },
        getInitial(){
            const data = _.cloneDeep(initialMedicalFollowUp);
            return [...data];
        }
    },
    persist:true
})