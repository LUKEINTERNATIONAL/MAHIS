import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useVitalsStore = defineStore("vitalsStore", {
    state: () => ({
        vitals: [
            {
                isFinishBtn: false,
                validationStatus: "",
                sectionHeader: "Height and weight",

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
                                    disabled: false,
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
                                    disabled: false,
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
                classDash: "dashed_bottom_border",
                selectedData: [],
                sideColSize: 3.8,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Primary diagnosis",
                    },
                    data: [
                        {
                            colSize: "5.8",
                            name: "Height And Weight Not Done",
                            value: "Height And Weight Not Done",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            inputHeader: "Specify Reason*",
                            icon: icons.search,
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "Height Weight Reason",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 2,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 3,
                                    name: "Machine not working",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                sectionHeader: "Blood pressure",
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
                                    disabled: false,
                                },
                                {
                                    inputHeader: "Diastolic pressure*",
                                    unit: "mmHg",
                                    icon: icons.diastolicPressure,
                                    value: "",
                                    name: "Diastolic",
                                    required: true,
                                    eventType: "input",
                                    disabled: false,
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
                classDash: "dashed_bottom_border",
                selectedData: [],
                sideColSize: 3.8,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Primary diagnosis",
                    },
                    data: [
                        {
                            colSize: "5.8",
                            name: "Blood Pressure Not Done",
                            value: "Blood Pressure Not Done",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            inputHeader: "Specify Reason*",
                            icon: icons.search,
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "Blood Pressure Reason",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 2,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 3,
                                    name: "Machine not working",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsError: false,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                sectionHeader: "Temperature and rates",
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
        setVitals(data: any) {
            this.vitals = data;
        },
    },
    // persist: true,
});
