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
                    name:'Reason for visit'
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
                name:'Previous visits'
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
export const useReasonForVisitStore = defineStore('reasonForVisitStore',{
    state: () => ({
        ReasonForVisit:[...initialReasonForVisit]
    }),
    actions:{
        setReasonForVisit(data: any){
            this.ReasonForVisit = data
        },
        getInitial(){
            const data = _.cloneDeep(initialReasonForVisit);
            return [...data];
        }
    },
    // persist:true,

})