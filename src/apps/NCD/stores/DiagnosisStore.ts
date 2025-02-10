import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore("NCDDiagnosisStore", {
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
                                    value: "",
                                    name: "diagnosis",
                                    eventType: "input",
                                    required: true,
                                    alertsErrorMassage: "",
                                    isSingleSelect: true,
                                    trackBy: "concept_id",
                                    valueType: "coded",
                                    multiSelectData: [],
                                    id: "",
                                    validationFunctionName: "required",
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
    // persist: true,
});
