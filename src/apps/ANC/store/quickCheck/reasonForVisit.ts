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
        selectedData: [],
        classDash:'dashed_bottom_border',
        isFinishBtn: false,
        sideColSize: 0,
        radioBtnContent: {
            header: {
                title: "Does the woman had any previous ANC visit at any facility?",
                name: "Previous visits",
                selectedValue: "",
                displayNext: "Yes",
                class: "bold",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: 2,
                },
                {
                    name: "No",
                    value: "No",
                    colSize: 2,
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
                            displayNone: true,
                            inputHeader: "Enter number of visits",
                            class: "bold",
                            icon: icons.editPen,
                            unit:'Visit(s)',
                            popOver: true,
                            value: "",
                            valueType: "number",
                            name: "Number of previous anc visits",
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            inputWidth:'55%',
                            alertsErrorMassage: "",
                            popOverData: {
                                filterData: true,
                                data: [],
                            },
                            // id: "",
                            // idName: "visit",
                        },

                    ],
                },
            ],
        },
    },

    {
        childName:"",
        classDash: "dashed_bottom_border",
        sideColSize:0,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: "Start date",
                            class: "bold",
                            icon: icons.calendar,
                            popOver: true,
                            value: "",
                            valueType: "text",
                            name: "Number of previous anc visits",
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "startDate",
                            inputWidth:'55%',
                            placeholder: "Pick the date",
                            isDatePopover: true,
                        },
                    ],
                },
            ],
        },
    },

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