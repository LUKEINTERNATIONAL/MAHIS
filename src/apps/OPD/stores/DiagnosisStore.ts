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
                            alertsError: false,
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            trackBy: "concept_id",
                            multiSelectData: [],
                            idName: "district_id",
                        },
                        {
                            inputHeader: "Differential Diagnosis",
                            icon: icons.search,
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "differentialDiagnosis",
                            multiSelectData: [],
                            eventType: "input",
                            required: true,
                            alertsError: false,
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
