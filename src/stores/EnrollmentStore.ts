import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useEnrollementStore = defineStore("enrollementStore", {
    state: () => ({
        substance: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Smoking",
                        name: "Smoking history",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Smoking",
                            value: "Smoking",
                        },
                        {
                            name: "Never",
                            value: "Never",
                        },
                        {
                            name: "Stopped",
                            value: "Stopped",
                        },
                    ],
                },
            },
            {
                radioBtnContent: {
                    header: {
                        title: "Drinking alcohol",
                        name: "Does the patient drink alcohol?",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Drinking",
                            value: "Drinking",
                        },
                        {
                            name: "Never",
                            value: "Never",
                        },
                        {
                            name: "Stopped",
                            value: "Stopped",
                        },
                    ],
                },
            },
        ],
        enrollmentDiagnosis: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Type 1 DM",
                            value: "type_1",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Type 1 DM",
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
                            name: "Type 2 DM",
                            value: "type_2",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Type 2 DM",
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
        ] as any,
        patientHistoryHIV: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "HIV",
                        name: "HIV",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "R",
                            value: "R",
                            checked: false,
                        },
                        {
                            name: "NR",
                            value: "NR",
                            checked: false,
                        },
                        {
                            name: "Unknow",
                            value: "Unknow",
                            checked: false,
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "ART Start Date:",
                                    icon: icons.calenderPrimary,
                                    value: "",
                                    name: "ART_start_date",
                                    eventType: "input",
                                    isDatePopover: true,
                                    displayNone: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Use of traditional medicine",
                            value: "Use of traditional medicine",
                            checked: false,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    header: {
                        title: "TB",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "PVD",
                            example: "eg. ulcers, gangrene",
                            value: "PVD",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "PVD",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Neuropathy",
                            value: "Neuropathy",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Neuropathy",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Sexual dysfunction",
                            value: "Sexual dysfunction",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Sexual dysfunction",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.2,
                            name: "Anxiety",
                            value: "Anxiety",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Anxiety",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.2,
                            name: "Depression",
                            value: "Depression",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Depression",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
        ],
        patientHistory: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "TB",
                        selectedValue: "",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Smear pos",
                            value: "Smear pos",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Smear pos",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.2,
                            name: "Smear neg",
                            value: "Smear neg",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Smear neg",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.2,
                            name: "EPTB",
                            value: "EPTB",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            eventType: "input",
                            name: "EPTB",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.8,
                            name: "Never had TB",
                            value: "Never had TB",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Never had TB",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Cardiovascular disease",
                            value: "Smear",
                            example: "eg. heart attack, ischemic heart disease, CCF",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Cardiovascular disease",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Retinopathy",
                            value: "Retinopathy",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Retinopathy",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            name: "Renal disease",
                            value: "Renal disease",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Renal disease",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                checkboxBtnContent: {
                    data: [
                        {
                            colSize: 4.2,
                            name: "Stroke/TIA",
                            value: "Stroke/TIA",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Stroke/TIA",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
        ],
        familyHistory: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Diabetes",
                        name: "diabetes",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                        },
                        {
                            name: "No",
                            value: "No",
                        },
                        {
                            name: "Unknown",
                            value: "Unknown",
                        },
                    ],
                },
            },
            {
                radioBtnContent: {
                    header: {
                        title: "Hypertension",
                        name: "hypertension",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                        },
                        {
                            name: "No",
                            value: "No",
                        },
                        {
                            name: "Unknown",
                            value: "Unknown",
                        },
                    ],
                },
            },
        ],
        NCDNumber: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    iconRight: icons.editStarts,
                                    leftText: "",
                                    value: "",
                                    name: "NCDNumber",
                                    placeholder: "__-__-__-__",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    }),
    actions: {
        setSubstance(data: any) {
            this.substance = data;
        },
        setDiagnosis(data: any) {
            this.diagnosis = data;
        },
        setPatientHistory(data: any) {
            this.patientHistory = data;
        },
        setPatientHistoryHIV(data: any) {
            this.patientHistoryHIV = data;
        },
        setFamilyHistory(data: any) {
            this.familyHistory = data;
        },
        setNCDNumber(data: any) {
            this.NCDNumber = data;
        },
    },
    persist: true,
});
