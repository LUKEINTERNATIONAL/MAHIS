import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDangerSignsStore = defineStore("dangerSignsStore", {
    state: () => ({
        DangerSigns: [
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Danger signs",
                    },
                    data: [
                        {
                            name: "No danger signs",
                            value: "NoDangerSigns",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },

                        {
                            name: "Central cyanosis",
                            value: "CentralCyanosis",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Pre-term labour",
                            value: "PreTermLabour",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Unconscious",
                            value: "Unconscious",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Fever",
                            value: "Fever",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Imminent delivery",
                            value: "BleedingDelivery",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Severe headache",
                            value: "SevereHeadache",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Vomiting",
                            value: "SevereVomiting",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Severe abdominal pain",
                            value: "SevereAbdominalPain",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Draining liquor",
                            value: "DrainingLiquor",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Respiratory problems",
                            value: "RespiratoryProblems",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Convulsion history",
                            value: "ConvulsionHistory",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Oedema",
                            value: "Oedema",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Epigastric pain",
                            value: "Epigastric pain",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Bleeding vaginally",
                            value: "BleedingVaginally",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },

                        {
                            name: "Other",
                            value: "other",
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
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Specify",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other notes",
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

        PreviousVisit: [
            {
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Previous visits",
                    },
                    data: [
                        {
                            value: "Yes",
                            name: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            value: "No",
                            name: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                sectionHeader: "",
                classDash: "dashed_bottom_border_padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Number of previous ANC visits",
                                    unit: "",
                                    icon: "",
                                    value: "",
                                    name: "Number of previous anc visits",
                                    eventType: "input",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
        PreviousVisitDate: [
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Specify date*",
                                    value: "",
                                    name: "Visit date",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: "Pick the date",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    }),

    actions: {
        addDangerSigns(data: any) {
            this.DangerSigns = data;
        },
        setPreviousVisits(data: any) {
            this.PreviousVisit = data;
        },
        setPreviousVisitDate(data: any) {
            this.PreviousVisitDate = data;
        },
    },
    // persist:true,
});
