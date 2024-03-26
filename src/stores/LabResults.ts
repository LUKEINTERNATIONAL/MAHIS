import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabResultsStore = defineStore("labResultsStore", {
    state: () => ({
        labResults: [
            {
                isFinishBtn: false,
                validationStatus: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Height*",
                                    unit: "cm",
                                    icon: icons.height,
                                    value: "",
                                    name: "Height",
                                    required: true,
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                                {
                                    inputHeader: "Weight*",
                                    unit: "kg",
                                    icon: icons.weight,
                                    value: "",
                                    name: "Weight",
                                    required: true,
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
                alerts: [
                    {
                        backgroundColor: "",
                        status: "",
                        icon: "",
                        textColor: "",
                        value: "",
                        name: "",
                        index: "",
                    },
                ],
                previousView: {
                    name: "vitals",
                },
            },
            {
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Systolic Pressure*",
                                    unit: "mmHg",
                                    icon: icons.systolicPressure,
                                    value: "",
                                    name: "Systolic",
                                    required: true,
                                    eventType: "input",
                                },
                                {
                                    inputHeader: "Diastolic pressure*",
                                    unit: "mmHg",
                                    icon: icons.diastolicPressure,
                                    value: "",
                                    name: "Diastolic",
                                    required: true,
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
                alerts: [
                    {
                        backgroundColor: "",
                        status: "",
                        icon: "",
                        textColor: "",
                        value: "",
                        name: "",
                        index: "",
                    },
                ],
                previousView: {
                    name: "vitals",
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Temperature",
                                    unit: "C",
                                    icon: icons.temprature,
                                    value: "",
                                    name: "Temp",
                                    eventType: "input",
                                },
                                {
                                    inputHeader: "Pulse rate",
                                    unit: "BMP",
                                    icon: icons.pulse,
                                    value: "",
                                    name: "Pulse",
                                    eventType: "input",
                                },
                            ],
                        },
                        {
                            colData: [
                                {
                                    inputHeader: "Respiratory rate",
                                    unit: "BMP",
                                    icon: icons.respiratory,
                                    value: "",
                                    name: "Respiratory rate",
                                    eventType: "input",
                                },
                                {
                                    inputHeader: "Oxygen saturation",
                                    unit: "%",
                                    icon: icons.oxgenStaturation,
                                    value: "",
                                    name: "SP02",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
                previousView: {
                    name: "vitals",
                },
            },
        ] as any,
    }),
    actions: {
        setLabResults(data: any) {
            this.labResults = data;
        },
    },
    persist: true,
});
