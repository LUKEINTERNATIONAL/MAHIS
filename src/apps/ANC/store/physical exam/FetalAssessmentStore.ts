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
                    name: "Symphysis-fundal height",
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
                                    name: "Symphysis-fundal height",
                                    valueType: "number",
                                    required: true,
                                    eventType: "input",
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
                        name: "Number of fetuses known",
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
                                    name: "Number of fetuses",
                                    valueType: "number",
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
                                    name: "Fetal heart rate",
                                    valueType: "number",
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
                                    name: "Repeated fetal rate",
                                    valueType: "number",
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
        setFetalAssessment(data: any) {
            this.fetalAssessment = data;
        },
    },
    persist: true,
});
