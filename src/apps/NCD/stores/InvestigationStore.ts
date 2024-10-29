import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useInvestigationStore = defineStore("investigationNCDStore", {
    state: () => ({
        investigations: [
            {
                db_data: [],
                isFinishBtn: false,
                selectedData: [],
                displayData: [],
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Test",
                                    icon: icons.search,
                                    value: "",
                                    name: "test",
                                    popOver: true,
                                    eventType: "input",
                                    required: true,
                                    alertsErrorMassage: "",
                                    isSingleSelect: true,
                                    trackBy: "concept_id",
                                    multiSelectData: [],
                                    id: "",
                                    idName: "test_id",
                                    validationFunctionName: "required",
                                },
                                {
                                    inputHeader: "Specimen",
                                    icon: icons.search,
                                    value: "",
                                    name: "specimen",
                                    eventType: "input",
                                    required: true,
                                    alertsErrorMassage: "",
                                    disabled: true,
                                    isSingleSelect: true,
                                    trackBy: "concept_id",
                                    multiSelectData: [],
                                    id: "",
                                    idName: "specimen_id",
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
        setInvestigations(data: any) {
            this.investigations = data;
        },
    },
    // persist: true,
});
