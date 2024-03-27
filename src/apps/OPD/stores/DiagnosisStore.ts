import {defineStore} from "pinia";
import {icons} from "@/utils/svg";

export const useOPDDiagnosisStore = defineStore("OPDDiagnosisStore", {
    state: () => ({
        OPDdiagnosis: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Primary Diagnosis",
                                    icon: icons.search,
                                    popOver: true,
                                    value: "",
                                    name: "primaryDiagnosis",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
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
                                    popOver: true,
                                    value: "",
                                    name: "differentialDiagnosis",
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
                                    name: "Save",
                                    fill: "clear",
                                    btn_col_size: 3,
                                    icon: icons.plus,
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setOPDDiagnosis(data: any) {
            this.OPDdiagnosis = data;
        },
    },
    // persist: true,
});
