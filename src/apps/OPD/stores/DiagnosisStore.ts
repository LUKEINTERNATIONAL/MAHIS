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
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [

                        {
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
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Secondary Diagnosis*",
                            value: "",
                            name: "secondaryDiagnosis",
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
            return [...data]; // Return a copy of the initial state
        },
    },
    persist: true,
});