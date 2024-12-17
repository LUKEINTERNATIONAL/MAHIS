import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialVitals = [
    {
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
                            validationFunctionName: "vitalsSystolic",
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
                            validationFunctionName: "vitalsDiastolic",
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
                    colSize: "12",
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
                            validationFunctionName: "vitalsTemperature",
                        },
                        {
                            inputHeader: "Pulse rate*",
                            unit: "BMP",
                            icon: icons.pulse,
                            value: "",
                            name: "Pulse",
                            eventType: "input",
                            validationFunctionName: "vitalsPulseRate",
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
                    colSize: "12",
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
                            validationFunctionName: "vitalsRespiratoryRate",
                        },
                        {
                            inputHeader: "Oxygen saturation",
                            unit: "%",
                            icon: icons.oxgenStaturation,
                            value: "",
                            name: "SP02",
                            eventType: "input",
                            validationFunctionName: "vitalsOxygenSaturation",
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
                    colSize: "12",
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
export const useVitalsStore = defineStore("immunizationVitalsStore", {
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
