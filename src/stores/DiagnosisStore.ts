import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore("DiagnosisStore", {
    state: () => ({
        diagnosis: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Diagnosis",
                                    icon: icons.search,
                                    popOver: true,
                                    value: "",
                                    name: "diagnosis",
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
        setDiagnosis(data: any) {
            this.diagnosis = data;
        },
    },
    persist: true,
});
