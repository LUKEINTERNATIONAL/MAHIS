import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import { getRadioSelectedValue, modifyFieldValue } from "@/services/data_helpers";
import * as yup from "yup";
import { extractArrayOfNameValue, validateStore } from "@/services/data_helpers";

export const pastObstreticValidationShema = yup.object().shape({
    Gravida: yup.number().typeError("Gravida can only be number").min(0).max(30),
    "Abortions/Miscarriages": yup.number().typeError("Abortions/Miscarriages can only be number").min(0),
    Stillbirths: yup.number().typeError("Stillbirths can only be number").min(0),
});

export const useLabourCoplicationsStore = defineStore("labourCoplicationsStore", {
    state: () => ({
        labourPrevPregnancies: [
            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        class: "bold",
                        title: "Did the woman have any of the complications during the past pregnancies?",
                        selectedValue: "",
                        name: "past pregnancies complications",
                        displayNone: false,
                    },
                    data: [
                        {
                            name: "Asphyxia",
                            value: "Asphyxia",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Pre-eclampsia",
                            value: "pre-eclampsia",
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
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "past pregnancies complications",
                        displayNone: false,
                    },
                    data: [
                        {
                            name: "Eclampsia",
                            value: "eclampsia",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Puerperal Sepsis",
                            value: "puerperal sepsis",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
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
                        name: "past pregnancies complications",
                        displayNone: false,
                    },
                    data: [
                        {
                            name: "Baby died within 24hrs of birth",
                            value: "baby died within 24hrs of birth",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Convulsions",
                            value: "convulsions",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
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
                        name: "past pregnancies complications",
                        displayNone: false,
                    },
                    data: [
                        {
                            name: "Gestational diabetes mellitus",
                            value: "gestational diabetes mellitus",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Heavy bleeding",
                            value: "heavy bleeding",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
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
                        name: "past pregnancies complications",
                        displayNone: false,
                    },
                    data: [
                        {
                            name: "Macrosomia",
                            value: "macrosomia",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            name: "Perineal tear (3rd or 4th degree)",
                            value: "perineal tear (3rd or 4th degree)",
                            checked: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
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
                        name: "past pregnancies complications",
                        displayNone: false,
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
                isFinishBtn: false,
                sectionHeader: "",
                classDash: "dashed_bottom_border",
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
                                    name: "Other notes",
                                    valueType: "text",
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
        preterm: [],
        modeOfDelivery: [] as any,
        Complications: [] as any,
    }),
    actions: {
        setPrevPregnancies(data: any) {
            this.labourPrevPregnancies = data;
        },
        async validate() {
            const obstetricHistory = extractArrayOfNameValue(this.labourPrevPregnancies);
            const obstetricHistoryValid = await validateStore(this.labourPrevPregnancies, pastObstreticValidationShema, obstetricHistory);

            return obstetricHistoryValid;
        },
    },
    // persist: true,
});
