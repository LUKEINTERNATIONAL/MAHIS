import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import { radio } from "ionicons/icons";
import { size } from "lodash";

export const useComplicationsStore = defineStore("complicationsStore", {
    state: () => ({
        cvScreening: [
            {
                isFinishBtn: false,
                validationStatus: "",
                sectionHeader: "CV Risk %",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "",
                                    value: "",
                                    name: "CVD",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    disabled: false,
                                    valueType: "text",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        visualScreening: [
            {
                isFinishBtn: false,
                validationStatus: "",
                sectionHeader: "Visual acuity test",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Left Eye",
                                    value: "",
                                    name: "Left eye visual acuity",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    disabled: false,
                                    validationFunctionName: "",
                                    valueType: "text",
                                },
                                {
                                    inputHeader: "Right Eye",
                                    value: "",
                                    name: "Right eye visual acuity",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    disabled: false,
                                    validationFunctionName: "",
                                    valueType: "text",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        FootScreening: [
            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            header: {
                                selectedValue: "",
                                name: "Peripheral neuropathy",
                            },
                            data: [
                                {
                                    name: "Neuropathy/PVO",
                                    labelPlacement: "start",
                                    colSize: "3",
                                    justify: "space-between",
                                    header: true,
                                    headClassName: "bold",
                                },
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                                {
                                    name: "No",
                                    value: "No",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            header: {
                                selectedValue: "",
                                name: "Deformity",
                            },
                            data: [
                                {
                                    name: "Deformities",
                                    labelPlacement: "start",
                                    colSize: "3",
                                    justify: "space-between",
                                    header: true,
                                    headClassName: "bold",
                                },
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                                {
                                    name: "No",
                                    value: "No",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            header: {
                                selectedValue: "",
                                name: "Ulcers",
                            },
                            data: [
                                {
                                    name: "Ulcers",
                                    labelPlacement: "start",
                                    colSize: "3",
                                    justify: "space-between",
                                    header: true,
                                    headClassName: "bold",
                                },
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                                {
                                    name: "No",
                                    value: "No",
                                    checked: false,
                                    colSize: "3",
                                    justify: "end",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPersonalInformation(data: any) {
            this.FootScreening = data;
        },
    },
    // persist: true,
});
