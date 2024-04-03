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
                radioBtnContent: {
                    header: {
                        title: "On TB medication",
                        name: "TB treatment",
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
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Primary diagnosis",
                    },
                    data: [
                        {
                            colSize: 5.6,
                            name: "Chronic Obstructive Pulmonary Disease (COPD)",
                            value: "Chronic obstructive pulmonary disease",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Chronic obstructive pulmonary disease",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
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
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Asthma",
                            value: "Asthma",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Asthma",
                            showDatePopover: false,
                            eventType: "input",
                            displayNone: true,
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
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Epilepsy",
                            value: "Epilepsy",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Epilepsy",
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
                        name: "",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Previous stroke",
                            value: "Previous stroke",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Previous stroke",
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
                        name: "Peptic Ulcer Disease (PUD)",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Peptic Ulcer Disease (PUD)",
                            value: "Peptic Ulcer Disease (PUD)",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            eventType: "input",
                            name: "Peptic Ulcer Disease (PUD)",
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
                        name: "Mental disorder",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Mental disorder",
                            value: "Mental disorder",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Mental disorder",
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
                        name: "Hypertension",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Hypertension",
                            value: "Hypertension",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Hypertension",
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
                        name: "HIV Positive",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "HIV Positive",
                            value: "HIV Positive",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "HIV Positive",
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
                        name: "Diabetes Mellitus",
                    },
                    data: [
                        {
                            colSize: 4.8,
                            name: "Diabetes Mellitus",
                            value: "Diabetes Mellitus",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Diabetes Mellitus",
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
                        name: "None",
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
