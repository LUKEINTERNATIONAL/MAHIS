import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import * as yup from "yup";
import { extractArrayOfNameValue, validateStore } from "@/services/data_helpers";

export const fetalSchema = yup.object().shape({
    heart: yup.number().typeError("Fetal heart rate can only be number").min(0),
    Cervical: yup.number().typeError("Cervical dilation can only be number").min(0).max(10),
});

export const useOtherExamsStore = defineStore("otherExamsStore", {
    state: () => ({
        otherExams: [
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                sectionHeader: "Fetal heart rate",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Fetal heart rate",
                                    unit: "cm",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "heart",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Number (checked every four hours)",
                                    inputWidth: "100%",
                                },
                            ],
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
                        title: "State of Membranes?",
                        selectedValue: "",
                        class: "bold",
                        name: "Membranes",
                    },
                    data: [
                        {
                            name: "Ruptured",
                            value: "ruptured",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Intact",
                            value: "intact",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Holder Membranes?",
                        selectedValue: "",
                        class: "bold",
                        name: "Membranes",
                    },
                    data: [
                        {
                            name: "Artifical",
                            value: "artifical",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Spontaneously",
                            value: "spontaneously",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "State of Liquor",
                        selectedValue: "",
                        class: "bold",
                        name: "State of Liquor",
                    },
                    data: [
                        {
                            name: "Clear",
                            value: "clear",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Meconium stained",
                            value: "meconium stained",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Blood-stained",
                            value: "blood-stained",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Absent",
                            value: "Absent",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Offensive smell",
                            value: "offensive smell",
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
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "What is the Grade?",
                        selectedValue: "",
                        class: "bold",
                        name: "Grade",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "1",
                            value: "1",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "2",
                            value: "2",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "3",
                            value: "3",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                sectionHeader: "Cervical dilation",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Cervical dilation",
                                    unit: "cm",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "Cervical",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Number (checked every 30 minutes)",
                                    inputWidth: "100%",
                                },
                            ],
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
                        title: "Umbilical Cord ",
                        selectedValue: "",
                        class: "bold",
                        name: "Umbilical Cord ",
                    },
                    data: [
                        {
                            name: "+",
                            value: "+",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "++",
                            value: "++",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "+++",
                            value: "+++",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Moulding",
                        selectedValue: "",
                        class: "bold",
                        name: "Moulding",
                    },
                    data: [
                        {
                            name: "+",
                            value: "+",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "++",
                            value: "++",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "+++",
                            value: "+++",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Caput",
                        selectedValue: "",
                        class: "bold",
                        name: "Caput",
                    },
                    data: [
                        {
                            name: "Nil",
                            value: "nil",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Mild",
                            value: "mild",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "moderate",
                            value: "moderate",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Severe",
                            value: "severe",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
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
                        title: "Station",
                        selectedValue: "",
                        class: "bold",
                        name: "Station",
                    },
                    data: [
                        {
                            name: "-4",
                            value: "-4",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "-3",
                            value: "-3",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "-2",
                            value: "-2",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "-1",
                            value: "-1",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "0",
                            value: "0",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "1",
                            value: "1",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "2",
                            value: "2",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "3",
                            value: "3",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "4",
                            value: "4",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Cervix dilation",
                                    unit: "cm",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "cervix dilation",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Enter the number between 1-10",
                                    inputWidth: "55%",
                                },
                            ],
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
                        title: "Descent",
                        selectedValue: "",
                        class: "bold",
                        name: "Descent",
                    },
                    data: [
                        {
                            name: "0/5",
                            value: "0/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "1/5",
                            value: "1/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "2/5",
                            value: "2/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "3/5",
                            value: "3/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "4/5",
                            value: "4/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "5/5",
                            value: "5/5",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Contractions",
                                    unit: "",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "contractions",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "",
                                    inputWidth: "55%",
                                },
                            ],
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
                        title: "Severity of contractions",
                        selectedValue: "",
                        class: "bold",
                        name: "Severity of contractions",
                    },
                    data: [
                        {
                            name: "No contractions",
                            value: "no contractions",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Mild",
                            value: "mild",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Moderate",
                            value: "moderate",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Strong",
                            value: "strong",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
        ] as any,

        urine: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Has the woman urinated?",
                        selectedValue: "",
                        class: "bold",
                        name: "woman urinated",
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
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Amount of urine",
                                    unit: "",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "amount of urine",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Color of urine",
                                    unit: "",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "color of urine",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "Odour of urine",
                                    unit: "",
                                    icon: icons.editPen,
                                    valueType: "text",
                                    value: "",
                                    name: "Odour",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "",
                                    inputWidth: "55%",
                                },
                            ],
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
                        title: "Fully dilated?",
                        selectedValue: "",
                        class: "bold",
                        name: "Fully dilated",
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
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Time fully dilated",
                                    unit: "",
                                    icon: icons.time,
                                    value: "",
                                    name: "Time fully dilated",
                                    required: true,
                                    valueType: "text",
                                    eventType: "input",
                                    placeholder: "",
                                    inputWidth: "55%",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    }),
    actions: {
        setOtherExams(data: any) {
            this.otherExams = data;
        },
        setUrine(data: any) {
            this.urine = data;
        },
        async validateFatalExam() {
            const fatalExam = extractArrayOfNameValue(this.otherExams);
            const fatalExamValid = await validateStore(this.otherExams, fetalSchema, fatalExam);

            return fatalExamValid;
        },
    },
    //persist: true,
});
