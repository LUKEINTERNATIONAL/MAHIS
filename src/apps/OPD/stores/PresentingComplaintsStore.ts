import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const usePresentingComplaintsStore = defineStore("PresentingComplaintsStore", {
    state: () => ({
        presentingComplaints: [
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
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                },
                                {
                                    inputHeader: "Duration",
                                    value: "",
                                    icon: icons.time,
                                    name: "Duration",
                                    required: true,
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                },
                                {
                                    inputHeader: "Duration Units",
                                    popOver: true,
                                    icon: icons.search,
                                    value: "",
                                    name: "units",
                                    eventType: "input",
                                    alertsError: false,
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
        ] as any,
    }),
    actions: {
        setPresentingComplaints(data: any) {
            this.presentingComplaints = data;
        },
    },
    persist: true,
});
