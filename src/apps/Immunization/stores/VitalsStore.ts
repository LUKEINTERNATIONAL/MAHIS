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
] as any;
export const useVitalsStore = defineStore("vitalsWeightHeightStore", {
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
    // persist: true,
});
