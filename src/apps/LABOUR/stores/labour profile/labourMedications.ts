import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialMedications = [
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Which medications is the woman currently prescribed?*",
                selectedValue: "",
                class: "bold",
            },
            data: [],
        },
    },
    {
        sideColSize: 0.5,
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Oral PreP for HIV",
                    value: "Oral PreP for HIV",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Analgesic",
                    value: "Analgesic",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Anti-consulsive",
                    value: "Anti-consulsive",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Anti-TB",
                    value: "Anti-TB",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Antihelmintic",
                    value: "Antihelmintic",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Antimarials",
                    value: "Antimarials",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Antitussive",
                    value: "Antitussive",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Aspirin",
                    value: "Aspirin",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Calcium",
                    value: "Calcium",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Doxylamine",
                    value: "Doxylamine",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Hematinic",
                    value: "Hematinic",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Iron",
                    value: "Iron",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Metoclopramide",
                    value: "Metoclopramide",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Thyroid medication",
                    value: "Thyroid medication",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Antiacids",
                    value: "Antiacids",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Anti-psychotics",
                    value: "Anti-psychotics",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Anti-diabetic",
                    value: "Anti-diabetic",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Anti-hypertensive",
                    value: "Anti-hypertensive",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Asthamatic",
                    value: "Asthamatic",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Co-trimoxazole",
                    value: "Co-trimoxazole",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Folic acid",
                    value: "Folic acid",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Hemorrhoidal medication",
                    value: "Hemorrhoidal medication",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Magnesium",
                    value: "Magnesium",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Multivitamin",
                    value: "Multivitamin",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "Vitamin A",
                    value: "Vitamin A",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Other",
                    value: "other",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Which medications is the woman currently prescribed?",
            },
            data: [
                {
                    name: "None",
                    value: "none",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        childName: "Other",
        sideColSize: 0.5,
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify other medications",
                            unit: "",
                            icon: icons.editPen,
                            value: "",
                            valueType: "text",
                            name: "Other notes",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useLabourMedicationStore = defineStore("labourMedicationsStore", {
    state: () => ({
        LabourMedication: [...initialMedications] as any,
    }),
    actions: {
        setPersonalInformation(data: any) {
            this.LabourMedication = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialMedications);
            return [...data];
        },
    },
    persist: true,
});
