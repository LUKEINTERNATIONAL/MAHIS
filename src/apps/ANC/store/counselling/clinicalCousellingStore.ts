import { defineStore } from "pinia";
import { icons } from '@/utils/svg';
import _ from "lodash";

const initialClinicalCounselling=[
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Clinical counselling done?",
                selectedValue: "",
                name:'Clinical counselling',
                class:'bold'

            },
            data: [
                {
                    name: "Counseling conducted on the risks of severe hypertension",
                    value: "Counseling conducted on the risks of severe hypertension",
                    checked: false,
                    colSize:12,
                },
                {
                    name: "Counselling on HIV positive",
                    value: "Counselling on HIV positive",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on Hepatitis B",
                    value: "Counselling on Hepatitis B",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on Hepatitis C",
                    value: "Counselling on Hepatitis C",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on Syphilis",
                    value: "Counselling on Syphilis",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on TB screening",
                    value: "Counselling on TB screening",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on gestational diabetes mellitus (GDM)",
                    value: "Counselling on gestational diabetes mellitus (GDM)",
                    checked: false,
                    colSize:12,

                },
                {
                    name: "Counselling on anaemia conducted",
                    value: "Counselling on anaemia conducted",
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
                title: 'Reason if any clinical counselling not conducted?',
                selectedValue: '',
                name:'Reason clinical counselling not done',
                class:'bold',
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
export const useClinicalCounsellingStore = defineStore('clinicalCounsellingStore',{
    state: () =>({
        clinicalCounselling:[...initialClinicalCounselling] as any,
    }),
    actions:{
        addBehaviourInfo(data:any){
            this.clinicalCounselling = data
        },
        getInitial(){
            const data = _.cloneDeep(initialClinicalCounselling);
            return [...data];
        }
    },
    persist:true
})