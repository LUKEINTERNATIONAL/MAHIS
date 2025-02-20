import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialOPDdiagnosis = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Primary Diagnosis*",
                            value: "",
                            name: "primaryDiagnosis",
                            icon: icons.search,
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            trackBy: "concept_id",
                            multiSelectData: [],
                            idName: "district_id",
                            validationFunctionName: "required",

                        },
                    ],

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

            },
            data:[
                {
                    name:'Secondary Diagnosis',
                    value: 'Secondary Diagnosis',
                    colSize: "5",
                },
                {
                    name: 'Differential Diagnosis',
                    value: 'Differential Diagnosis',
                    colSize: "7",
                },
            ]
        }
    },
    {
        childName:"Secondary Diagnosis",
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: "Secondary Diagnosis",
                            icon: icons.search,
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "secondaryDiagnosis",
                            multiSelectData: [],
                            eventType: "input",
                            // required: true,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
    {
        childName:"Differential Diagnosis",
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: "Differential Diagnosis",
                            icon: icons.search,
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "differentialDiagnosis",
                            multiSelectData: [],
                            eventType: "input",
                            // required: true,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    btns: [
                        {
                            name: "Save",
                            fill: "solid",
                            btn_col_size: 3,
                            icon: icons.plus,
                        },
                    ],
                    colData: [
                    ],

                },
            ],
        },
    },


];
export const useOPDDiagnosisStore = defineStore("OPDDiagnosisStore", {
    state: () => ({
        OPDdiagnosis: [...initialOPDdiagnosis] as any,
    }),
    actions: {
        setOPDDiagnosis(data: any) {
            this.OPDdiagnosis = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialOPDdiagnosis);
            return [...data];
        },
    },
    persist: true,
});