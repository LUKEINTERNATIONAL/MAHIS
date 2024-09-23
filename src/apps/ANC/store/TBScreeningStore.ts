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
                        title: "TB screening",
                        selectedValue: "",
                        name: "TB screening status",
                        class:"bold"
                    },
                    data: [
                        {
                            name: "TB screening conducted",
                            value: "Screening conducted",
                            colSize: "7",

                        },
                        {
                            name: "TB screening not done",
                            value: "Screening not done",
                            colSize: "7",

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
                        class:"bold"

                    },
                    data: [
                        {
                            name: "Positive for TB",
                            value: "positive",
                            colSize: "7",

                        },
                        {
                            name: "Negative for TB",
                            value: "negative",
                            colSize: "7",

                        },
                        {
                            name: "Inconclusive",
                            value: "Inconclusive",
                            colSize: "7",

                        },
                        {
                            name: "Incomplete (symptoms only)",
                            value: "Incomplete",
                            colSize: "7",

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
                        class:"bold"

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
                        title: "Reasons TB Screening not done",
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
                            colSize: "7",

                        },
                        {
                            name: "Sputum culture not available",
                            value: "Sputum culture not available",
                            checked: false,
                            colSize: "7",

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
                        class:"bold"

                    },
                    data: [
                        {
                            name: "GeneXpert machine not available",
                            value: "GeneXpert machine not available",
                            checked: false,
                            colSize: "7",

                        },
                        {
                            name: "X-ray machine not available",
                            value: "X-ray machine not available",
                            checked: false,
                            colSize: "7",

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
                        class:"bold"

                    },
                    data: [
                        {
                            name: "No sputum testing supplies available",
                            value: "No sputum testing supplies available",
                            checked: false,
                            colSize: "7",

                        },
                        {
                            name: "Machine not functioning",
                            value: "Machine not functioning",
                            checked: false,
                            colSize: "7",

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
                        class:"bold"

                    },
                    data: [
                        {
                            name: "Technician not available",
                            value: "Technician not available",
                            checked: false,
                            colSize: "7",

                        },
                        {
                            name: "Other",
                            value: "Other",
                            checked: false,
                            colSize: "7",

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
