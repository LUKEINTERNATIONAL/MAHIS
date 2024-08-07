import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDewormingStore = defineStore("dewormingStore", {
    state: () => ({
        treatment: [
            {
                selectdData: [],
                isFinishBtn: false,
                // classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Was preventative antihelminthic treatment provided?",
                        selectedValue: "",
                        class: "bold",
                        name: "antihelminthic treatment",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            colSize: "2.5",
                        },
                        {
                            name: "No",
                            value: "no",
                            colSize: "2.5",
                        },
                    ],
                },
            },
            // ],

            // treatmentType:[
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Preventative antihelminthic treatment provided",
                        selectedValue: "",
                        class: "bold",
                        name: "antihelminthic treatment provided",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Single-dose albendazole 400mg",
                            value: "single-dose albendazole 400mg",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Single-dose albendazole 500mg",
                            value: "single-dose albendazole 500mg",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            // ],

            // treatmentReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Reason no preventative treatment provided",
                        selectedValue: "",
                        class: "bold",
                        name: "no preventative treatment provided",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Client was referred",
                            value: "client was referred",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Other",
                            value: "other",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    value: "",
                                    name: "Specify",
                                    icon: icons.editPen,
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
        ],

        malaria: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Was counselling on malaria prevention conducted",
                        selectedValue: "",
                        class: "bold",
                        name: " counselling on malaria prevention",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            colSize: "2.5",
                        },
                        {
                            name: "No",
                            value: "no",
                            colSize: "2.5",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Reason no counselling on malaria prevention was not conducted",
                        selectedValue: "",
                        class: "bold",
                        name: "counselling on malaria prevention",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Client was referred",
                            value: "client was referred",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Other",
                            value: "other",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    valueType: "text",
                                    inputHeader: "Other (Specify)",
                                    value: "",
                                    name: "other",
                                    icon: icons.editPen,
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    }),
    actions: {
        setTreatment(data: any) {
            this.treatment = data;
        },
        setTreatmentType(data: any) {
            // this.treatmentType = data
        },
        setTreatmentReason(data: any) {
            // this.treatmentReason = data
        },
        setMalaria(data: any) {
            this.malaria = data;
        },
        // setMalariaReason(data: any) {
        //   this.malariaReason = data;
        // },
    },
    persist: true,
});
