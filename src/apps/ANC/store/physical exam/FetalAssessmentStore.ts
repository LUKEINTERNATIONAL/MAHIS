import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useFetalAssessment = defineStore("fetalAssessment", {
    state: () => ({
        fetalAssessment: [
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                isFinishBtn: false,
                sectionHeader: "",

                header: {
                    name:"fundal height",
                    selectedValue: "",
                },

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Symphysis-fundal height (SFH)*",
                                    unit: "cm",
                                    icon: icons.height,
                                    value: "",
                                    name: "Height",
                                    required: true,
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Is number of fetuses known?",
                        selectedValue: "",
                        name: "Fetuses known",
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            value: "no",
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
                classDash: "dashed_bottom_border",
                header: {
                    name:"Number of Fetuses",
                    selectedValue: "",
                },
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Number of fetuses",
                                    unit: "",
                                    icon: "",
                                    value: "",
                                    name: "number of fetuses",
                                    eventType: "input",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Fetal heartbeat present?",
                        selectedValue: "",
                        name: "Fetal heartbeat",
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            value: "no",
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
                classDash: "",
                header: {
                    name: "Fetal rate",
                    selectedValue: "",
                },
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Fetal rate",
                                    unit: "BMP",
                                    icon: icons.systolicPressure,
                                    value: "",
                                    name: "fetal rate",
                                    eventType: "input",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sectionHeader: "",
                classDash: "dashed_bottom_border",
                header: {
                    name: "Repeated fetal rate",
                    selectedValue: "",
                },
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Repeated fetal rate",
                                    unit: "BMP",
                                    icon: icons.systolicPressure,
                                    value: "",
                                    name: "second fetal rate",
                                    eventType: "input",
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
        setVitals(data: any) {
            // this.vitals = data
        },
    },
    persist: true,
});
