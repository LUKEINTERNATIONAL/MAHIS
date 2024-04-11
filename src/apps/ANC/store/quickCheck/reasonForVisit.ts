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
        selectdData: [],
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Does the woman had any previous ANC visit at any facility?",
                selectedValue: "",
                class:"bold",
                name: "Previous visits",
                displayNext:"Yes"
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
        childName:"Previous visits",
        sectionHeader: "",
        classDash: "dashed_bottom_border_padding",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Number of previous ANC visits",
                            unit: "",
                            icon: icons.editPen,
                            name: "Number of previous anc visits",
                            eventType: "input",
                            required:true,
                            inputWidth: "55%",
                        },
                    ],
                },
            ],
        },
    },
    {
        childName:"",
        classDash: "dashed_bottom_border",
        sideColSize:0.000001,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Pick the date",
                            class:'bold',
                            icon: icons.calenderPrimary,
                            value: "",
                            valueType:'text',
                            name: "Visit date",
                            eventType: "input",
                            inputWidth: "100%",
                            required: true,
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