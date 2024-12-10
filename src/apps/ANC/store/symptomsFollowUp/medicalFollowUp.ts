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
                    name: 'None',
                    value: 'None',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking Calcium Supplements',
                    value: 'Taking Calcium Supplements',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking iron and folic acid (IFA) tablets',
                    value: 'Taking iron and folic acid (IFA) tablets',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking aspirin tablets',
                    value: 'Taking aspirin tablets',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking vitamin A supplements',
                    value: 'Taking vitamin A supplements',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking penicillin treatment for syphilis',
                    value: 'Taking penicillin treatment for syphilis',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Taking Albendazole for deworming',
                    value: 'Taking Albendazole for deworming',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Other medication',
                    value: 'Other medication',
                    checked: false,
                    colSize: "12",

                },

            ],
        },
    },
    {
        childName:"Other medication",
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
                    name: 'No side effects',
                    value: 'No side effects',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Side-effects from calcium supplements',
                    value: 'Side-effects from calcium supplements',
                    checked: false,
                    colSize: "12",
                },
                {
                    name: 'Side-effects from iron and folic acid supplements',
                    value: 'Side-effects from iron and folic acid supplements',
                    checked: false,
                    colSize: "12",
                },
                {
                    name: 'Side-effects from Aspirin supplements',
                    value: 'Side-effects from Aspirin supplements',
                    checked: false,
                    colSize: "12",
                },
                {
                    name: 'Side-effects from Vitamin A supplements',
                    value: 'Side-effects from Vitamin A supplements',
                    checked: false,
                    colSize: "12",
                },
                {
                    name: 'Side-effects from Penicillin',
                    value: 'Side-effects from Penicillin',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Side-effects from Albendazole',
                    value: 'Side-effects from Albendazole',
                    checked: false,
                    colSize: "12",

                },
                {
                    name: 'Other',
                    value: 'Other',
                    checked: false,
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
    // persist:true
})