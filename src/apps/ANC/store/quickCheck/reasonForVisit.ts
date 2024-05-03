import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import _ from "lodash";
const initialReasonForVisit= [
    {
        classDash:'dashed_bottom_border',
        radioBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'Reason the woman came to the facility today',
                    selectedValue: '',
                    name:'Reason for visit',
                    displayNext:'First antenatal care contact'
                },
                data:[
                    {
                        value: 'First antenatal care contact',
                        name: 'First antenatal care contact',
                        labelPlacement: 'end',
                        colSize: '7',

                    },
                    {
                        value: 'Scheduled antenatal care contact',
                        name: 'Scheduled antenatal care contact',
                        labelPlacement: 'end',
                        colSize: '7',

                    },
                    {
                        name: 'Specific complaint related to antenatal care',
                        value: 'Specific complaint related to antenatal care',
                        labelPlacement: 'end',
                        colSize: '7',

                    }
                ]
            }

    },
    {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Does the woman had any previous ANC visit?",
                class:'bold',
                selectedValue: "",
                name:'Previous visits',
                displayNext:"Yes",
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectedData: [],
        classDash:'dashed_bottom_border',
        isFinishBtn: false,
        sideColSize: 0,
        childName: "Previous visits",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            class:"bold",
                            inputHeader: 'Enter number of previous ANC visits',
                            unit: '',
                            icon: icons.editPen,
                            value: '',
                            valueType:"text",
                            name: 'Number of previous visits',
                            required: true,
                            eventType: 'input',
                            inputWidth: "100%",

                        },

                    ],
                },
            ],
        },
    },

    // {
    //     childName:"",
    //     classDash: "dashed_bottom_border",
    //     sideColSize:0,
    //     data: {
    //         rowData: [
    //             {
    //                 colData: [
    //                     {
    //                         displayNone:true,
    //                         inputHeader: "Start date",
    //                         class: "bold",
    //                         icon: icons.calendar,
    //                         popOver: true,
    //                         value: "",
    //                         valueType: "text",
    //                         name: "",
    //                         eventType: "input",
    //                         required: true,
    //                         alertsError: false,
    //                         alertsErrorMassage: "",
    //                         id: "",
    //                         idName: "startDate",
    //                         inputWidth:'55%',
    //                         placeholder: "Pick the date",
    //                         isDatePopover: true,
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },

] as any;

const getVisitDateField=(number:number)=>{
    return [
        {
            childName:"",
            classDash: "dashed_bottom_border",
            sideColSize:1,
            data: {
                rowData: [
                    {
                        colData: [
                            {
                                inputHeader: `Date for ANC visit ${number+1}`,
                                class: "bold",
                                icon: icons.calendar,
                                popOver: true,
                                value: "",
                                valueType: "text",
                                name: `Last ANC Visit Date ${number}`,
                                eventType: "input",
                                required: true,
                                alertsError: false,
                                alertsErrorMassage: "",
                                id: "",
                                idName: "startDate",
                                inputWidth:'100%',
                                placeholder: "Pick the date",
                                isDatePopover: true,
                            },
                        ],
                    },
                ],
            },
        },
    ]
}
export const useReasonForVisitStore = defineStore('reasonForVisitStore',{
    state: () => ({
        ReasonForVisit:[...initialReasonForVisit]
    }),
    actions:{
        setReasonForVisit(number: number){
            this.ReasonForVisit = []
            for (let i = 0; i < number; i++) {
                const inputs =getVisitDateField(i)
                this.ReasonForVisit.push(inputs[0])
                this.ReasonForVisit.push(inputs[1])
            }
        },

        getInitial(){
            const data = _.cloneDeep(initialReasonForVisit);
            return [...data];
        }
    },
    // persist:true,

})