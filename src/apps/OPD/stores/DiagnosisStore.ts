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
                            icon: icons.search,
                            popOver: true,
                            value: "",
                            name: "primaryDiagnosis",
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                            id: "",
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
