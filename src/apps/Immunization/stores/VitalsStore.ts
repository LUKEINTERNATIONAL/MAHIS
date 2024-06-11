import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialVitals = [
    {
        isFinishBtn: false,
        validationStatus: "",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Height*",
                            unit: "cm",
                            icon: icons.height,
                            value: "",
                            name: "height",
                            required: true,
                            eventType: "input",
                            valueType: "number",
                            alertsErrorMassage: "",
                            disabled: false,
                        },
                        {
                            inputHeader: "Weight*",
                            unit: "kg",
                            icon: icons.weight,
                            value: "",
                            name: "weight",
                            required: true,
                            eventType: "input",
                            valueType: "number",
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
            name: "vitalsWeightHeight",
        },
    },
] as any;
export const useWeightHeightVitalsStore = defineStore("vitalsWeightHeightStore", {
    state: () => ({
        vitalsWeightHeight: [...initialVitals] as any,
    }),
    actions: {
        setVitals(data: any) {
            this.vitalsWeightHeight = data;
        },
        getInitialVitals() {
            const data = _.cloneDeep(initialVitals);
            return [...data];
        },
    },
    persist: true,
});
