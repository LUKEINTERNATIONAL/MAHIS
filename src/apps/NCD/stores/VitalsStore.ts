import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialVitals = [
    {
        isFinishBtn: false,
        validationStatus: "",
        sectionHeader: "Height and weight",
        actionBtn: "Finish and Save",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Height*",
                            unit: "cm",
                            icon: icons.height,
                            value: "",
                            name: "Height (cm)",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            disabled: false,
                            validationFunctionName: "vitalsHeight",
                        },
                        {
                            inputHeader: "Weight*",
                            unit: "kg",
                            icon: icons.weight,
                            value: "",
                            name: "Weight",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            disabled: false,
                            validationFunctionName: "vitalsHeight",
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
                selectedValue: " ",
            },
            data: [
                {
                    colSize: "5.8",
                    name: "Height And Weight Not Done",
                    value: "Height And Weight Not Done",
                    checked: false,
                    displayNone: false,
                },
            ],
            inputFields: [
                {
                    inputHeader: "Specify Reason",
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
                            name: "Machine not working",
                        },
                        {
                            id: 3,
                            name: "Machine not available",
                        },
                    ],
                    eventType: "input",
                    required: true,
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
                            validationFunctionName: "vitalsHeight",
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
                            validationFunctionName: "vitalsHeight",
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
                selectedValue: " ",
                name: "Primary diagnosis",
            },
            data: [
                {
                    colSize: "5.8",
                    name: "Blood Pressure Not Done",
                    value: "Blood Pressure Not Done",
                    checked: false,
                    displayNone: false,
                },
            ],
            inputFields: [
                {
                    inputHeader: "Specify Reason",
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
                            name: "Machine not working",
                        },
                        {
                            id: 3,
                            name: "Machine not available",
                        },
                    ],
                    eventType: "input",
                    required: true,
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
                            validationFunctionName: "vitalsHeight",
                        },
                        {
                            inputHeader: "Pulse rate*",
                            unit: "BMP",
                            icon: icons.pulse,
                            value: "",
                            name: "Pulse",
                            eventType: "input",
                            validationFunctionName: "vitalsHeight",
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
    },
    {
        classDash: "dashed_bottom_border",
        selectedData: [],
        sideColSize: 3.8,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: " ",
                name: "Primary diagnosis",
            },
            data: [
                {
                    colSize: "5.8",
                    name: "Pulse Rate Not Done",
                    value: "Pulse Rate Not Done",
                    checked: false,
                    displayNone: false,
                },
            ],
            inputFields: [
                {
                    inputHeader: "Specify Reason",
                    icon: icons.search,
                    isMultiSelect: true,
                    popOver: true,
                    value: "",
                    name: "Pulse Rate Reason",
                    multiSelectData: [
                        {
                            id: 1,
                            name: "Patient uncooperative",
                        },
                        {
                            id: 2,
                            name: "Machine not working",
                        },
                        {
                            id: 3,
                            name: "Machine not available",
                        },
                    ],
                    eventType: "input",
                    required: true,
                    alertsErrorMassage: "",
                    id: "",
                    idName: "district_id",
                    displayNone: true,
                },
            ],
        },
    },
    {
        sectionHeader: "null",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Respiratory rate",
                            unit: "BMP",
                            icon: icons.respiratory,
                            value: "",
                            name: "Respiratory rate",
                            eventType: "input",
                            validationFunctionName: "vitalsHeight",
                        },
                        {
                            inputHeader: "Oxygen saturation",
                            unit: "%",
                            icon: icons.oxgenStaturation,
                            value: "",
                            name: "SP02",
                            eventType: "input",
                            validationFunctionName: "vitalsHeight",
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
    },
    {
        classDash: "dashed_bottom_border",
        selectedData: [],
        sideColSize: 3.8,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: " ",
                name: "Primary diagnosis",
            },
            data: [
                {
                    colSize: "5.8",
                    name: "Respiratory rate Not Done",
                    value: "Respiratory rate Not Done",
                    checked: false,
                    displayNone: false,
                },
            ],
            inputFields: [
                {
                    inputHeader: "Specify Reason",
                    icon: icons.search,
                    isMultiSelect: true,
                    popOver: true,
                    value: "",
                    name: "Respiratory rate Reason",
                    multiSelectData: [
                        {
                            id: 1,
                            name: "Patient uncooperative",
                        },
                        {
                            id: 2,
                            name: "Machine not working",
                        },
                        {
                            id: 3,
                            name: "Machine not available",
                        },
                    ],
                    eventType: "input",
                    required: true,
                    alertsErrorMassage: "",
                    id: "",
                    idName: "district_id",
                    displayNone: true,
                },
            ],
        },
    },
] as any;
export const useVitalsStore = defineStore("NCDVitalsStore", {
    state: () => ({
        vitals: [...initialVitals] as any,
    }),
    actions: {
        setVitals(data: any) {
            this.vitals = data;
        },
        getInitialVitals() {
            const data = _.cloneDeep(initialVitals);
            return [...data];
        },
    },
    persist: true,
});
