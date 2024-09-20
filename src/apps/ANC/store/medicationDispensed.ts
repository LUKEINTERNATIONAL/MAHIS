import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import * as yup from "yup";

export const vitaminValidationSchema = yup.object().shape({
  "Vitamin Amount": yup
    .number()
    .typeError("Amount of vitamin can only be a number")
    .min(0),
});

export const useMedicationDispensedStore = defineStore("medicationDispensed", {
    state: () => ({
        iron: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Aspirin provided?",
                        selectedValue: "",
                        class: "bold",
                        name: "Aspirin provided",
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
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Amount of daily aspirin provided until delivery",
                                    value: "",
                                    name: "Amount of daily aspirin provided",
                                    required: true,
                                    unit: "mg",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Reason aspirin not prescribed",
                        selectedValue: "",
                        class: "bold",
                        name: "aspirin not prescribed",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Side effects",
                            value: "side effects",

                            colSize: "7",
                        },
                        {
                            name: "Stock-out",
                            value: "stock-out",

                            colSize: "7",
                        },
                        {
                            name: "Gestational less than 13 weeks",
                            value: "gestational less than 13 weeks",

                            colSize: "7",
                        },
                        {
                            name: "Allergy to medication",
                            value: "allergy to medication",

                            colSize: "7",
                        },
                        {
                            name: "Other",
                            value: "other",

                            colSize: "7",
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
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Specify",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
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
                        title: "Iron prescribed?",
                        selectedValue: "",
                        class: "bold",
                        name: "Iron prescription",
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
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Type of Iron supplement dosage provided",
                        class: "bold",
                        selectedValue: "",
                        name: "Type of Iron supplement dosage",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Daily",
                            value: "daily",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Weekly",
                            value: "weekly",
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
                classDash: "",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Amount of Iron provided till delivery in mg",
                                    value: "",
                                    valueType: "text",
                                    unit: "mg",
                                    name: "iron Amount",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Reason Iron was not prescribed",
                        selectedValue: "",
                        class: "bold",
                        displayNone: true,
                        name: "Iron and folic acid not prescribed",
                    },
                    data: [
                        {
                            name: "Side effects",
                            value: "side effects",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Client was referred",
                            value: "referred",
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
                                    inputHeader: "specify",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
                        },
                    ],
                },
            },
        ],

        folicAcid: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Daily dose of folic acid prescribed?*",
                        selectedValue: "",
                        class: "bold",
                        name: "Folic acid",
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
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Amount of Folic acid prescribed till delivery in mg",
                                    value: "",
                                    unit: "mg",
                                    name: "Amount of Folic acid",
                                    required: true,
                                    valueType: "text",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            // ],

            // folicAcidReason: [
            {
                selectdData: [],
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Reason folic acid was not prescribed",
                        selectedValue: "",
                        class: "bold",
                        displayNone: true,
                        name: "Iron and folic acid not prescribed",
                    },
                    data: [
                        {
                            name: "Side effects",
                            value: "side effects",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Client was referred",
                            value: "referred",
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
                                    inputHeader: "specify",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,

        vitaminA: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                radioBtnContent: {
                    header: {
                        title: "Vitamin A prescribed?",
                        selectedValue: "",
                        class: "bold",
                        name: "Vitamin A prescription",
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

            // vitaminADosage:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "_padding",
                radioBtnContent: {
                    header: {
                        title: "Type of Vitamin A dosage provided",
                        selectedValue: "",
                        class: "bold",
                        name: "Type of Vitamin A dosage",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Daily",
                            value: "daily",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Weekly",
                            value: "weekly",
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
                                    inputHeader: "Amount of Vitamin prescribed till delivery in mg",
                                    value: "",
                                    unit: "mg",
                                    name: "Vitamin Amount",
                                    required: true,
                                    valueType: "text",
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },

            // ],

            // vitaminAReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "_padding",
                radioBtnContent: {
                    header: {
                        title: "Reason vitamin A not prescribed",
                        selectedValue: "",
                        class: "bold",
                        name: "vitamin A not prescribed",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Side effects",
                            value: "side effects",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Stock-out",
                            value: "referred",
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
                                    inputHeader: "Other (specify)",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other",
                                    required: true,
                                    eventType: "input",
                                    inputWidth: "85%",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,

        // calcium: [
        //   {
        //     selectdData: [],
        //     isFinishBtn: false,
        //     classDash: "",
        //     radioBtnContent: {
        //       header: {
        //         title: "Daily calcium prescribed?",
        //         class: "bold",
        //         selectedValue: "",
        //         name: "Daily calcium prescription",
        //       },
        //       data: [
        //         {
        //           name: "Yes",
        //           value: "yes",

        //           colSize: "2.5",
        //         },
        //         {
        //           name: "No",
        //           value: "no",

        //           colSize: "2.5",
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     isFinishBtn: false,
        //     sectionHeader: "",
        //     classDash: "dashed_bottom_border _padding",

        //     data: {
        //       rowData: [
        //         {
        //           colData: [
        //             {
        //               displayNone: true,
        //               inputHeader: "Amount of daily calcium supplements",
        //               value: "",
        //               name: "calcium supplements",
        //               required: true,
        //               valueType: "text",
        //               eventType: "input",
        //               alertsErrorMassage: "",
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   },
        //   // ],

        //   // calciumReason: [
        //   {
        //     selectdData: [],
        //     isFinishBtn: false,
        //     sectionHeader: "",
        //     classDash: "",
        //     radioBtnContent: {
        //       header: {
        //         title: "Reason calcium supplements not prescribed",
        //         selectedValue: "",
        //         class: "bold",
        //         name: "calcium supplements not prescribed",
        //         displayNone: true,
        //       },
        //       data: [
        //         {
        //           name: "Side effects",
        //           value: "side effects",
        //           labelPlacement: "start",
        //           colSize: "7",
        //           justify: "space-between",
        //         },
        //         {
        //           name: "Stock-out",
        //           value: "referred",
        //           labelPlacement: "start",
        //           colSize: "7",
        //           justify: "space-between",
        //         },
        //         {
        //           name: "Allergy to medication",
        //           value: "allergy",
        //           labelPlacement: "start",
        //           colSize: "7",
        //           justify: "space-between",
        //         },
        //         {
        //           name: "Other",
        //           value: "other",
        //           labelPlacement: "start",
        //           colSize: "7",
        //           justify: "space-between",
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     isFinishBtn: false,
        //     sectionHeader: "",
        //     classDash: "dashed_bottom_border _padding",

        //     data: {
        //       rowData: [
        //         {
        //           colData: [
        //             {
        //               displayNone: true,
        //               inputHeader: "Other (specify)",
        //               unit: "",
        //               icon: icons.editPen,
        //               value: "",
        //               name: "Other",
        //               valueType: "text",
        //               required: true,
        //               eventType: "input",
        //               inputWidth: "85%",
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   },
        // ] as any,
    }),
    actions: {
        setIron(data: any) {
            this.iron = data;
        },
        // setIronDosage(data:any) {
        //     this.ironDosage = data
        // },
        setFolicAcid(data: any) {
            this.folicAcid = data;
        },
        // setFolicAcidReason(data: any) {
        //   this.folicAcidReason = data;
        // },
        setVitaminA(data: any) {
            this.vitaminA = data;
        },
        // setVitaminADosage(data:any) {
        //     this.vitaminADosage = data
        // },
        // setVitaminAReason(data:any) {
        //     this.vitaminAReason = data
        // },
        // setCalcium(data: any) {
        //   this.calcium = data;
        // },
        // setCalciumReason(data: any) {
        //   this.calciumReason = data;
        // },
    },
    // persist: true,
});
