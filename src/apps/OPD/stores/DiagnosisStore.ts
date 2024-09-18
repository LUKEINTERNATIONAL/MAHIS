import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialOPDdiagnosis = [
    {
        sideColSize:0.5,
        childName:"Primary diagnosis",
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Diagnosis*",
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
                            // inputFieldDisplayNone: true,
                            // colSize: 0,
                        },
                    ],
                    btns: [
                        {
                            name: "Add",
                            fill: "clear",
                            btn_col_size: 3,
                            icon: icons.plus,
                        },
                    ],
                },
            ],
        },
    },
    {
        sideColSize:0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Other diagnosis",
            },
            data: [
                {
                    name: "Secondary diagnosis",
                    value: "Secondary diagnosis",
                    checked: false,
                    colSize: "4",
                },
                {
                    name: "Differential diagnosis",
                    value: "Differential diagnosis",
                    checked: false,
                    colSize: "6",
                },
            ],
        },
    },
    {
        sideColSize:0.5,
        childName:'Secondary diagnosis',
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
                            name: "secondarylDiagnosis",
                            multiSelectData: [],
                            eventType: "input",
                            // required: true,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                        },
                    ],
                    btns: [
                        {
                            name: "Add",
                            fill: "clear",
                            btn_col_size: 3,
                            icon: icons.plus,
                        },
                    ],
                },
            ],
        },
    },
    // {
    //     sideColSize:0.5,
    //     childName:'Secondary diagnosis',
    //     selectedData: [],
    //     isFinishBtn: false,
    //     data: {
    //         rowData: [
    //             {
    //                 colData: [
    //                     {
    //                         // displayNone:true,
    //                         inputHeader: "Attempted/ Differential Diagnosis",
    //                         icon: icons.search,
    //                         isMultiSelect: true,
    //                         popOver: true,
    //                         value: "",
    //                         name: "differentialDiagnosis",
    //                         multiSelectData: [],
    //                         eventType: "input",
    //                         // required: true,
    //                         alertsErrorMassage: "",
    //                         id: "",
    //                         idName: "district_id",
    //                     },
    //                 ],
    //                 btns: [
    //                     {
    //                         name: "Add",
    //                         fill: "clear",
    //                         btn_col_size: 3,
    //                         icon: icons.plus,
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
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
    // persist: true,
});
