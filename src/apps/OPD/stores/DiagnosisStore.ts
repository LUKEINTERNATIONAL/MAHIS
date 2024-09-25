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
                            inputHeader: "Primary diagnosis*",
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
    // persist: true,
});