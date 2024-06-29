import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialPresentingComplaint = [
    {
        selectedData: [],
        isFinishBtn: false,
        validationStatus: "",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Presenting Complaints",
                            value: "",
                            name: "PresentingComplaints",
                            icon: icons.search,
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            trackBy: "concept_id",
                            multiSelectData: [],
                            idName: "district_id",
                        },
                        {
                            inputHeader: "Duration",
                            value: "",
                            icon: icons.time,
                            name: "Duration",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            isChangeUnits: true,
                            id: "",
                            idName: "district_id",
                            unitsData: {
                                inputHeader: "Duration Units",
                                popOver: true,
                                icon: icons.search,
                                value: "",
                                name: "units",
                                eventType: "input",
                                alertsErrorMassage: "",
                                isSingleSelect: true,
                                trackBy: "id",
                                multiSelectData: [
                                    { id: "1", name: "Hours" },
                                    { id: "2", name: "Days" },
                                    { id: "3", name: "Months" },
                                    { id: "4", name: "Years" },
                                ],
                                id: "",
                                idName: "district_id",
                            },
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
        alerts: [
            {
                backgroundColor: "",
                status: "",
                icon: "",
                textColor: "",
                value: "",
                name: "",
                index: "",
            },
        ],
    },
];
export const usePresentingComplaintsStore = defineStore("PresentingComplaintsStore", {
    state: () => ({
        presentingComplaints: [...initialPresentingComplaint] as any,
    }),
    actions: {
        setPresentingComplaints(data: any) {
            this.presentingComplaints = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialPresentingComplaint);
            return [...data]; // Return a copy of the initial state
        },
    },
    persist: true,
});
