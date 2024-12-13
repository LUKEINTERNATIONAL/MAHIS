import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const allegiesForm = {
    albendazole: {
        name: "Albendazole",
        value: "albendazole",
    },
    aluminiumHydroxide: {
        name: "Aluminium-hydroxide",
        value: "aluminium-hydroxide",
    },
    calcium: {
        name: "Calcium",
        value: "calcium",
    },
    chamomile: {
        name: "Chamomile",
        value: "chamomile",
    },
    folicAcid: {
        name: "Folic-acid",
        value: "folic-acid",
    },
    ginger: {
        name: "Ginger",
        value: "ginger",
    },
    fish: {
        name: "Fish",
        value: "fish",
    },
    iron: {
        name: "Iron",
        value: "iron",
    },
    malariaMedication: {
        name: "Sulfadoxine-Pyrimethamine",
        value: "Sulfadoxine-Pyrimethamine",
    },
    mebendazole: {
        name: "Mebendazole",
        value: "mebendazole",
    },
    penicillin: {
        name: "Penicillin",
        value: "penicillin",
    },
    prEPTenofovirDisoproxilFumarate: {
        name: "PrEP(TDF)",
        value: "PrEP(TDF)",
    },
    otherAllegies: {
        name: "Other",
        value: "other",
    },
};

const initialAllergies = [
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Does the woman have any allergies?",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.albendazole.name,
                    disabled: false,
                    value: allegiesForm.albendazole.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.aluminiumHydroxide.name,
                    disabled: false,
                    value: allegiesForm.aluminiumHydroxide.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.calcium.name,
                    disabled: false,
                    value: allegiesForm.calcium.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.chamomile.name,
                    disabled: false,
                    value: allegiesForm.chamomile.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.folicAcid.name,
                    disabled: false,
                    value: allegiesForm.folicAcid.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.ginger.name,
                    disabled: false,
                    value: allegiesForm.ginger.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.fish.name,
                    disabled: false,
                    value: allegiesForm.fish.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.iron.name,
                    disabled: false,
                    value: allegiesForm.iron.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.malariaMedication.name,
                    disabled: false,
                    value: allegiesForm.malariaMedication.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.mebendazole.name,
                    disabled: false,
                    value: allegiesForm.mebendazole.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: allegiesForm.penicillin.name,
                    disabled: false,
                    value: allegiesForm.penicillin.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: allegiesForm.prEPTenofovirDisoproxilFumarate.name,
                    disabled: false,
                    value: allegiesForm.prEPTenofovirDisoproxilFumarate.value,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                class: "bold",
                name: "Does the woman have any allergies?",
            },
            data: [
                {
                    name: "None",
                    value: "none",
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Other",
                    value: "other",
                    disabled: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        childName: "Other",
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify",
                            icon: icons.editPen,
                            value: "",
                            name: "Other notes",
                            valueType: "text",
                            eventType: "input",
                            inputWidth: "82%",
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;

export const useLabourAllergiesStore = defineStore("labourAllergiesStore", {
    state: () => ({
        labourAllergies: [...initialAllergies] as any,
    }),
    actions: {
        addAllegy(data: any) {
            this.labourAllergies = data;
        },
    },
    // persist: true,
});
