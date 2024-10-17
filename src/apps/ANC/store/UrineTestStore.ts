import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useUrineTestStore = defineStore("urineTestingStore", {
    state: () => ({
        urineTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Select whether:",
                        selectedValue: "",
                        name: "Urine test status",
                        class:"bold"
                    },
                    data: [
                        {
                            name: "Urine test conducted",
                            value: "Test conducted",
                            colSize: "7",

                        },
                        {
                            name: "Urine test not done",
                            value: "Test not done",
                            colSize: "7",

                        },
                    ],
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Select the urine test conducted:",
                        selectedValue: "",
                        class: "bold",
                        displayNone: true,
                        name: "Urine test",
                    },
                    data: [
                        {
                            name: "Midstream urine culture (recommended)",
                            value: "Midstream urine culture",
                            colSize: "7",

                        },
                        {
                            name: "Midstream urine gram-staining",
                            value: "Midstream urine gram-staining",
                            colSize: "7",

                        },
                        {
                            name: "Urine dipstick",
                            value: "Urine dipstick",
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
                        name: "Date",
                    },
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Urine Test Date",
                                    value: "",
                                    name: "Urine test date",
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
            {
                selectdData: [],
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",
                checkboxBtnContent: {
                    header: {
                        title: "Reason Urine test not done",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Reason not done",
                    },
                    data: [
                        {
                            name: "Machine not functioning",
                            value: "Machine not functioning",
                            colSize: "7",

                        },
                        {
                            name: "Technician not available",
                            value: "Technician not available",
                            colSize: "7",

                        },
                        {
                            name: "Other",
                            value: "Other",
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
                                    valueType: "text",
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
        culture: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Midstream urine culture result",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Midstream urine culture result",
                    },
                    data: [
                        {
                            name: "Positive-any agent",
                            value: "positive",
                            colSize: "7",

                        },
                        {
                            name: "Positive-Group B Streptococcus (GBS)",
                            value: "Positive-Group B Streptococcus",
                            colSize: "7",

                        },
                        {
                            name: "Negative",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
        gram: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Midstream urine gram-staining result",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Midstream urine gram-staining result",
                    },
                    data: [
                        {
                            name: "Positive",
                            value: "positive",
                            colSize: "7",

                        },
                        {
                            name: "Negative",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
        nitrites: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Dipstick test result - nitrites",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Nitrites dipstick test result",
                    },
                    data: [
                        {
                            name: "None",
                            value: "none",
                            colSize: "7",

                        },
                        {
                            name: "+",
                            value: "+",
                            colSize: "7",

                        },
                        {
                            name: "++",
                            value: "++",
                            colSize: "7",

                        },
                        {
                            name: "+++",
                            value: "+++",
                            colSize: "7",

                        },
                        {
                            name: "++++",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
        leukocytes: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Dipstick test result - leukocytes",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Leukocytes dipstick test result",
                    },
                    data: [
                        {
                            name: "None",
                            value: "none",
                            colSize: "7",

                        },
                        {
                            name: "+",
                            value: "+",
                            colSize: "7",

                        },
                        {
                            name: "++",
                            value: "++",
                            colSize: "7",

                        },
                        {
                            name: "+++",
                            value: "+++",
                            colSize: "7",

                        },
                        {
                            name: "++++",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
        protein: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Dipstick test result - protein",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Protein dipstick test result",
                    },
                    data: [
                        {
                            name: "Negative",
                            value: "none",
                            colSize: "7",

                        },
                        {
                            name: "+",
                            value: "+",
                            colSize: "7",

                        },
                        {
                            name: "++",
                            value: "++",
                            colSize: "7",

                        },
                        {
                            name: "+++",
                            value: "+++",
                            colSize: "7",

                        },
                        {
                            name: "++++",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
        glucose: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Dipstick test result - glucose",
                        selectedValue: "",
                        displayNone: true,
                        class: "bold",
                        name: "Glucose dipstick test result",
                    },
                    data: [
                        {
                            name: "Negative",
                            value: "none",
                            colSize: "7",

                        },
                        {
                            name: "+",
                            value: "+",
                            colSize: "7",

                        },
                        {
                            name: "++",
                            value: "++",
                            colSize: "7",

                        },
                        {
                            name: "+++",
                            value: "+++",
                            colSize: "7",

                        },
                        {
                            name: "++++",
                            value: "negative",
                            colSize: "7",

                        },
                    ],
                },
            },
        ] as any,
    }),

    actions: {
        // setReason(data: any){
        //     this.reason = data
        // },
        // setTestType(data: any){
        //     this.testType = data
        // },
        setUrineTest(data: any) {
            this.urineTest = data;
        },
        setNitrites(data: any) {
            this.nitrites = data;
        },
        setCulture(data: any) {
            this.culture = data;
        },
        setGram(data: any) {
            this.gram = data;
        },
        setLeukocytes(data: any) {
            this.leukocytes = data;
        },
        setProtein(data: any) {
            this.protein = data;
        },
        setGlucose(data: any) {
            this.glucose = data;
        },
    },
  //  persist: true,
});
