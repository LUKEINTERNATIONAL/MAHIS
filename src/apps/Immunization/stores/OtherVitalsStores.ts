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
                            inputHeader: "Systolic Pressure",
                            unit: "mmHg",
                            icon: icons.systolicPressure,
                            value: "",
                            name: "Systolic",
                            required: true,
                            eventType: "input",
                            disabled: false,
                            valueType: "number",
                            validationFunctionName: "vitalsSystolic",
                        },
                        {
                            inputHeader: "Diastolic pressure",
                            unit: "mmHg",
                            icon: icons.diastolicPressure,
                            value: "",
                            name: "Diastolic",
                            required: true,
                            eventType: "input",
                            disabled: false,
                            valueType: "number",
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
                name: "bp",
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
                            validationFunctionName: "vitalsTemperature",
                            valueType: "number",
                        },
                        {
                            inputHeader: "Pulse rate",
                            unit: "BMP",
                            icon: icons.pulse,
                            value: "",
                            name: "Pulse",
                            eventType: "input",
                            validationFunctionName: "vitalsPulseRate",
                            valueType: "number",
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
                name: "temp",
                index: "",
            },
            {
                backgroundColor: "",
                status: "",
                icon: "",
                textColor: "",
                value: "",
                name: "pulse",
                index: "",
            },
        ],
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
                            valueType: "number",
                        },
                        {
                            inputHeader: "Oxygen saturation",
                            unit: "%",
                            icon: icons.oxgenStaturation,
                            value: "",
                            name: "SP02",
                            eventType: "input",
                            validationFunctionName: "vitalsOxygenSaturation",
                            valueType: "number",
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
                name: "respiratory",
                index: "",
            },
            {
                backgroundColor: "",
                status: "",
                icon: "",
                textColor: "",
                value: "",
                name: "oxygen",
                index: "",
            },
        ],
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
