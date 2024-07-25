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
                            name: "Systolic blood pressure",
                            required: true,
                            eventType: "input",
                            disabled: false,
                        },
                        {
                            inputHeader: "Diastolic pressure",
                            unit: "mmHg",
                            icon: icons.diastolicPressure,
                            value: "",
                            name: "Diastolic blood pressure",
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
                            name: "Respiratory",
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
] as any;
export const useVitalsStore = defineStore("immunizationVitalsStore", {
    state: () => ({
        vitals: [...initialVitals] as any,
    }),
    actions: {
        setVitals(data: any) {
            this.vitals = data;
        },
        getInitialSocialHistory() {
            const data = _.cloneDeep(initialVitals);
            return [...data];
        },
    },
});
