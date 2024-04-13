import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import { radio } from "ionicons/icons";
import { size } from "lodash";

export const useComplicationsStore = defineStore("complicationsStore", {
    state: () => ({
        FootScreening: [
            {
                selectedData: [],
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            data: [
                                {
                                    name: "Physical Exam",
                                    labelPlacement: "start",
                                    colSize: "5",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "Left foot",
                                    labelPlacement: "start",
                                    colSize: "4.5",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "Right foot",
                                    labelPlacement: "start",
                                    colSize: "4",
                                    justify: "space-between",
                                    header: true,
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
                                name: "previousUlcerLeft",
                            },
                            data: [
                                {
                                    name: "Previous Ulcer",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "previousUlcerRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes2",
                                    checked: false,
                                    colSize: "8",
                                    justify: "end",
                                },
                                {
                                    name: "No",
                                    value: "No2",
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
                                name: "amputationLeft",
                            },
                            data: [
                                {
                                    name: "Previous Amputation",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "Amputation2",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes2",
                                    checked: false,
                                    colSize: "8",
                                    justify: "end",
                                },
                                {
                                    name: "No",
                                    value: "No2",
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
                                name: "deformityLeft",
                            },
                            data: [
                                {
                                    name: "Deformity",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "deformityRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                                name: "toenailLeft",
                            },
                            data: [
                                {
                                    name: "Ingrown toenail",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "toenailRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                                name: "pedalPulsesLeft",
                            },
                            data: [
                                {
                                    name: "Absent Pedal Pulses",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "pedalPulsesRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            data: [
                                {
                                    name: "Foot Lesions",
                                    labelPlacement: "start",
                                    colSize: "5",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "Left foot",
                                    labelPlacement: "start",
                                    colSize: "4.5",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "Right foot",
                                    labelPlacement: "start",
                                    colSize: "4",
                                    justify: "space-between",
                                    header: true,
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
                                name: "activeUlcerLeft",
                            },
                            data: [
                                {
                                    name: "Active Ulcer",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "activeUlcerRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                                name: "blistersLeft",
                            },
                            data: [
                                {
                                    name: "Blisters",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "blistersRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                                name: "callusesLeft",
                            },
                            data: [
                                {
                                    name: "Calluses",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "callusesRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                                name: "fissureLeft",
                            },
                            data: [
                                {
                                    name: "Fissure",
                                    labelPlacement: "start",
                                    colSize: "8",
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
                        {
                            header: {
                                title: "",
                                selectedValue: "",
                                name: "fissureRight",
                            },
                            data: [
                                {
                                    name: "Yes",
                                    value: "Yes",
                                    checked: false,
                                    colSize: "8",
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
                sectionHeader: "Neuropathy/Monofilament Exam",
                sectionHeaderFontWeight: 400,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Negative piprics (left foot)",
                                    value: "",
                                    name: "Temp",
                                    eventType: "blur",
                                },
                                {
                                    inputHeader: "Negative pinprics (right foot)",
                                    value: "",
                                    name: "Pulse",
                                    eventType: "blur",
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
    persist: true,
});
