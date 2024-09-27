import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabourReferralStore = defineStore("labourReferralStore", {
    state: () => ({
        labourReferral: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Who is being referred",
                        selectedValue: "",
                        class: "bold",
                        name: "referred",
                    },
                    data: [
                        {
                            name: "Mother",
                            value: "mother",
                           
                            colSize: "3",
                            
                        },
                        {
                            name: "Baby",
                            value: "baby",
                           
                            colSize: "3",
                            
                        },
                    ],
                },
            },
            {
                selectdData: [],
                // classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "Reason for referring mother",
                        selectedValue: "",  
                        class: "bold",
                        name: "referring mother",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Danger sign present",
                            value: "danger sign present",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Antepartum haemorrhage",
                            value: "antepartum haemorrhage",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone:true,
                        name: "referring mother",
                    },
                    data: [
                        {
                            name: "pre-eclampsia",
                            value: "pre-eclampsia",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Sepsis",
                            value: "sepsis",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        displayNone:true,selectedValue: "",
                        name: "referring mother",
                    },
                    data: [
                        {
                            name: "Retained placenta",
                            value: "retained placenta",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Perineal tear (2nd, 3rd or 4th degree",
                            value: "perineal tear",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        displayNone:true,selectedValue: "",
                        name: "referring mother",
                    },
                    data: [
                        {
                          name: "Perineal tear (2nd, 3rd or 4th degree",
                          value: "postpartum haemorrhage",
                          checked: false,
                          labelPlacement: "start",
                          colSize: "6",
                          justify: "space-between",
                        },
                        {
                            name: "Obstructed/prolonged labour",
                            value: "Obstructed/prolonged labour",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        displayNone:true,selectedValue: "",
                        name: "referring mother",
                    },
                    data: [
                        {
                            name: "Premature labour",
                            value: "premature labour",
                            displayNone: true,
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Placenta previa",
                            value: "placenta previa",
                            displayNone: true,
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone:true,
                        name: "referring mother",
                    },
                    data: [
                        {
                            name: "Severe anaemia",
                            value: "severe anaemia",
                           
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Placenta abruption",
                          
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                //  classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone:true,
                        name: "referring mother",
                    },
                    data: [
                        {
                            name: "Symphysiotomy",
                            value: "symphysiotomy",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Other",
                            value: "others",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                sectionHeader: "",
                //   classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    //  inputHeader: "Specify",
                                    unit: "",
                                    displayNone: true,
                                    icon: icons.editPen,
                                    value: "",
                                    valueType: "text",
                                    name: "specify",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sectionHeader: "",
                //   classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Any other treatment given before referral?",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: " ",
                                    displayNone: true,
                                    valueType: "text",
                                    name: "treatment given before referral",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                //classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "Reason for referring baby",
                        class: "bold",
                        selectedValue: "",
                        name: "Baby identifier",
                        displayNone: true
                    },
                    data: [
                        {
                            name: "Asphyxia",
                            value: "asphyxia",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Preterm",
                            value: "preterm",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                //classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Baby identifier",
                        displayNone:true
                    },
                    data: [
                        {
                            name: "Under weight",
                            value: "under weight",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Congenital abnormalities",
                            value: "congenital abnormalities",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },

            {
                //classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Baby identifier",
                        displayNone: true
                    },
                    data: [
                        {
                            name: "Sepsi",
                            value: "sepsi",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Other reason",
                            value: "other reason",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Specify",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    valueType: "text",
                                    name: "other",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Any other treatment given to baby before referral?",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: " ",
                                    displayNone:true,
                                    valueType: "text",
                                    name: "treatment given to baby before referral",
                                    eventType: "input",
                                },
                            ],
                        },
                    ],
                },
            },

            {
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Time of referral",
                                    unit: "",
                                    icon: icons.time,
                                    value: "",
                                    name: "Time of referral",
                                    valueType: "text",
                                    displayNone:true,
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Pick time",
                                },
                                {
                                    displayNone: true,
                                    inputHeader: "Date of referral",
                                    value: "",
                                    name: "Date of referral",
                                    required: true,
                                    eventType: "input",
                                    alertsErrorMassage: "",
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: "Pick date",
                                    inputWidth: "100%",
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
                sectionHeader: "",
                classDash: "dashed_bottom_border _padding",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone:true,
                                    inputHeader: "Provider who made referral",
                                    unit: "",
                                    icon: "",
                                    value: "",
                                    valueType: "text",
                                    name: "Provider who made referral",
                                    required: true,
                                    eventType: "input",
                                },
                                {
                                    displayNone:true,
                                    inputHeader: "Phone number for provider",
                                    unit: "",
                                    icon: "",
                                    value: " ",
                                    valueType: "text",
                                    name: "Phone number for provider",
                                    required: true,
                                    eventType: "input",
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
        ],
    }),
    actions: {
        setOtherExams(data: any) {
            this.labourReferral = data;
        },
    },
    //persist: true,
});
