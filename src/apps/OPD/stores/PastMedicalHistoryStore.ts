import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import Display from "../../../composables/display";

export const usePastMedicalHistoryStore = defineStore("pastMedicalHistoryStore", {
    state: () => ({
        pastMedicalHistory: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "Existing Chronic Health Conditions",
                        class: "bold",
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "TB",
                            value: "TB",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                sideColSize: 1,
                radioBtnContent: {
                    header: {
                        title: "On TB medication",
                        name: "TB treatment",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            colSize: 2,
                        },
                        {
                            name: "No",
                            value: "No",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                displayNone: true,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Select medication",
                                    icon: icons.search,
                                    popOver: true,
                                    value: "",
                                    name: "TB drugs",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "medication",
                                },
                                {
                                    inputHeader: "Start date",
                                    icon: icons.calendar,
                                    popOver: true,
                                    value: "",
                                    name: "TB drug start date",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    id: "",
                                    idName: "startDate",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 5.6,
                            name: "Chronic Obstructive Pulmonary Disease (COPD)",
                            value: "Chronic obstructive pulmonary disease",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Asthma",
                            value: "Asthma",
                            checked: false,
                        },
                    ],
                },
            },

            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Epilepsy",
                            value: "Epilepsy",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Previous stroke",
                            value: "Previous stroke",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Peptic Ulcer Disease (PUD)",
                            value: "Peptic Ulcer Disease (PUD)",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Mental disorder",
                            value: "Mental disorder",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Bleeding disorders",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Bleeding disorders",
                            value: "Bleeding disorders",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Bleeding disorders",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Hypertension",
                            value: "Hypertension",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "On medication",
                        name: "Treatment",
                        selectedValue: "",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            colSize: 2,
                        },
                        {
                            name: "No",
                            value: "No",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                displayNone: true,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Select medication",
                                    icon: icons.search,
                                    popOver: true,
                                    value: "",
                                    name: "drugs",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "medication",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "HIV Positive",
                            value: "HIV Positive",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "ART status",
                        name: "ART status",
                        selectedValue: "",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            colSize: 2,
                        },
                        {
                            name: "No",
                            value: "No",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                displayNone: true,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Enter ARV start date",
                                    icon: icons.search,
                                    popOver: true,
                                    value: "",
                                    name: "Enter ARV start date",
                                    eventType: "input",
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "medication",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Diabetes Mellitus",
                            value: "Diabetes Mellitus",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Type",
                        name: "Type",
                        selectedValue: "",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Type I",
                            value: "Type I",
                            colSize: 2,
                        },
                        {
                            name: "Type II",
                            value: "Type II",
                            colSize: 2,
                        },
                        {
                            name: "Unsure",
                            value: "Unsure",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Controlled by",
                        name: "Controlled by",
                        selectedValue: "",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Diet",
                            value: "Diet",
                            colSize: 2,
                        },
                        {
                            name: "Tablets",
                            value: "Tablets",
                            colSize: 2,
                        },
                        {
                            name: "Insulin",
                            value: "Insulin",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Chronic disease",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "None",
                            value: "None",
                            checked: false,
                        },
                    ],
                },
            },
        ],
    }),
    actions: {
        setPregnancy(data: any) {
            this.pastMedicalHistory = data;
        },
    },
    // persist: true,
});
