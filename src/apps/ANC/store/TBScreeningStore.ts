import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useTBScreeningStore = defineStore("TBScreeningStore", {
    state: () => ({
        tbTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Select whether:",
                        selectedValue: "",
                        name: "TB screening status",
                    },
                    data: [
                        {
                            name: "TB screening conducted",
                            value: "Screening conducted",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "TB screening ordered",
                            value: "Screening ordered",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "TB screening not done",
                            value: "Screening not done",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            // ] as any,

            // results:[
            {
                selectdData: [],
                isFinishBtn: false,

                radioBtnContent: {
                    header: {
                        title: "TB screening results:",
                        selectedValue: "",
                        name: "TB screening results",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Positive for TB",
                            value: "positive",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Negative for TB",
                            value: "negative",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Inconclusive",
                            value: "Inconclusive",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Incomplete (symptoms only)",
                            value: "Incomplete",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                data: {
                    header: {
                        selectedValue: "",
                        name: "Screening date",
                    },
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "TB screening date",
                                    value: "",
                                    name: "Screening date",
                                    valueType: "date",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: "Pick the date",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
        reasons: [
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "Reasons TB Screeening not done",
                        selectedValue: "",
                        class: "bold",
                        displayNone: true,
                        name: "Reason not done",
                    },
                    data: [
                        {
                            name: "Sputum smear not available",
                            value: "Sputum smear not available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Sputum culture not available",
                            value: "Sputum culture not available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Reason not done",
                    },
                    data: [
                        {
                            name: "GeneXpert machine not available",
                            value: "GeneXpert machine not available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "X-ray machine not available",
                            value: "X-ray machine not available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Reason not done",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "No sputum testing supplies available",
                            value: "No sputum testing supplies available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Machine not functioning",
                            value: "Machine not functioning",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Reason not done",
                    },
                    data: [
                        {
                            name: "Technician not available",
                            value: "Technician not available",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Other",
                            value: "Other",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    header: {
                        selectedValue: "",
                    },
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other (specify)",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setTbTest(data: any) {
            this.tbTest = data;
        },
        setReasons(data: any) {
            this.reasons = data;
        },
        // setResults(data: any){
        //     this.results = data
        // },
    },
    persist: true,
});
