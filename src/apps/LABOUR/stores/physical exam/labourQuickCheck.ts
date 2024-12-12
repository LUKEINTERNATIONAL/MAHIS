import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabourQuickCheckStore = defineStore("labourDetailsStore", {
    state: () => ({
        pastProblems: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "What is the reason for coming to the facility?",
                        name: "reason",
                        class: "bold",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "In labour",
                            value: "In labour",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Delivered on the way to the facility",
                            value: "Delivered",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Home Delivery",
                            value: "Home Delivery",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Sick",
                            value: "Sick",
                            labelPlacement: "start",
                            colSize: "7",
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
                        title: "Danger signs",
                        class: "bold",
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Bleeding vaginally",
                            value: "bleeding vaginally",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Central cyanosis",
                            value: "central cyanosis",
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
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Pre-term labour",
                            value: "value",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Severe vomiting",
                            value: "severe vomiting",
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
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Fever",
                            value: "fever",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Visual disturbance",
                            value: "visual disturbance",
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
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Severe abdominal pain",
                            value: "severe abdominal pain",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Unconscious",
                            value: "unconscious",
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
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "No fetal movement",
                            value: "no fetal movement",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Jaundice",
                            value: "jaundice",
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
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Difficulties in breathing",
                            value: "difficulties in breathing",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "No danger signs",
                            value: "no danger signs",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        name: "Danger signs",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Other danger signs",
                            value: "other danger signs",
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
                                    inputHeader: "specify",
                                    displayNone: true,
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "otherC",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
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
                        title: "Labour onset type",
                        name: "Labour onset type",
                        selectedValue: "",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Spontaneous",
                            value: "well",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Induced",
                            value: "disturbed",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "Date and Time of onset of labour",
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Time of onset of labour",
                                    displayNone: true,
                                    value: "",
                                    name: "Time",
                                    icon: icons.time,
                                    required: true,
                                    eventType: "input",
                                    isDatePopover: true,
                                    alertsErrorMassage: "",
                                },
                                {
                                    inputHeader: "Date of onset of labour",
                                    value: "",
                                    name: "Date",
                                    icon: icons.calendar,
                                    required: true,
                                    isDatePopover: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Membranes ruptured?",
                        name: "Membranes ruptured",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "Date and Time membranes ruptured",
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Time membranes ruptured",
                                    displayNone: true,
                                    value: "",
                                    name: "Time Membrane",
                                    icon: icons.time,
                                    required: true,
                                    eventType: "input",
                                    isDatePopover: true,
                                    alertsErrorMassage: "",
                                },
                                {
                                    inputHeader: "Date membranes ruptured",
                                    value: "",
                                    name: "Date Membrane",
                                    icon: icons.calendar,
                                    required: true,
                                    isDatePopover: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
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
                        title: "Has she had food in 4 hours? ",
                        selectedValue: "",
                        name: "food in 4 hours",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Homemade medicines taken?",
                        name: "Homemade medicines taken",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Sleep",
                        name: "Sleep",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Well",
                            value: "Well",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Disturbed",
                            value: "Disturbed",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPastProblems(data: any) {
            this.pastProblems = data;
        },
    },
    // persist: true,
});
