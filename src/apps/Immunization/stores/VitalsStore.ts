import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationVitalsStore = defineStore("immunizationVitalsStore", {
    state: () => ({
        vitals: [
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
        ] as any,
    }),
    actions: {
        setVitals(data: any) {
            this.vitals = data;
        },
    },
    persist: true,
});
