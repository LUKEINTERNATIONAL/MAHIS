import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import * as yup from "yup";
import { extractArrayOfNameValue, validateStore } from "@/services/data_helpers";

export const labourPhysicalExamSchema = yup.object().shape({
    Height: yup.number().typeError("Height can only be number").min(0),
    Weight: yup.number().typeError("Height can only be number").min(0),
    fetuse: yup.number().typeError("Height can only be number").min(0),
    "Fetal Heart Rate": yup.number().typeError("Height can only be number").min(0),
});
export const examSchema = yup.object().shape({
    fetuse: yup.number().typeError("Height can only be number").min(0),
});

export const useLabourPhysicalExamStore = defineStore("physicalExamStore", {
    state: () => ({
        vitals: [
            // {
            //     selectdData: [],
            //     isFinishBtn: false,
            //     classDash: 'dashed_bottom_border _padding',
            //     radioBtnContent:
            //         {
            //             header:{
            //                 title: 'Hydration status',
            //                 selectedValue: ''
            //             },
            //             data:[
            //                 {
            //                     name: 'Well hydrated',
            //                     value: 'well',
            //                     labelPlacement: 'start',
            //                     colSize: '7',
            //                     justify: 'space-between',
            //                 },
            //                 {
            //                     name: 'Poorly hydrated',
            //                     value: 'poorly hydrated',
            //                     labelPlacement: 'start',
            //                     colSize: '7',
            //                     justify: 'space-between',
            //                 },
            //             ]
            //         }

            // },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "General condition",
                        name: "General condition",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Sick",
                            value: "sick",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Well",
                            value: "well",
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
                                    inputHeader: "Height",
                                    unit: "cm",
                                    icon: icons.height,
                                    value: "",
                                    name: "Height",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Enter height",
                                },
                                {
                                    inputHeader: "Weight",
                                    unit: "KG",
                                    icon: icons.weight,
                                    value: "",
                                    name: "Weight",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "Enter weight",
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
        ] as any,

        anaemia: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Conjunctiva pale?",
                        name: "Conjunctiva pale",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "no",
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
                        title: "Palmer pallor?",
                        name: "Palmer pallor",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "no",
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
                        title: "Haemoglobin low?",
                        name: "Haemoglobin low",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "no",
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
                        title: "Jaundice?",
                        name: "Jaundice",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No",
                            value: "no",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
            // {
            // isFinishBtn: false,
            // sectionHeader: "",
            // classDash: "dashed_bottom_border _padding",

            //     data: {
            //         rowData: [
            //             {
            //                 colData: [
            //                     {
            //                         inputHeader: "Fetal heart rate",
            //                         unit: "BPM",
            //                         icon: icons.bmi,
            //                         value: "",
            //                         name: "Fetal heart rate",
            //                         required: true,
            //                         eventType: "input",
            //                         placeholder: "Enter fetal heart rate",
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // },
            // {
            //     isFinishBtn: false,
            //     sectionHeader: "",
            //     classDash: "dashed_bottom_border _padding",

            //     data: {
            //         rowData: [
            //             {
            //                 colData: [
            //                     {
            //                         inputHeader: "Fundus",
            //                         unit: "",
            //                         icon: icons.bmi,
            //                         value: "",
            //                         name: "Fundus",
            //                         required: true,
            //                         eventType: "input",
            //                         placeholder: "Fundus",
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // },
            // {
            //     isFinishBtn: false,
            //     sectionHeader: "",
            //     classDash: "dashed_bottom_border _padding",

            //     data: {
            //         rowData: [
            //             {
            //                 colData: [
            //                     {
            //                         inputHeader: "Fundal Height",
            //                         unit: "",
            //                         icon: icons.bmi,
            //                         value: "",
            //                         name: "Fundal Height",
            //                         required: true,
            //                         eventType: "input",
            //                         placeholder: "Fundal Height",
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // },
        ] as any,

        otherphysicalExams: [
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Oedema",
                        name: "Oedema",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Present",
                            value: "present",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Absent",
                            value: "absent",
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
                                    // displayNone: true,
                                    inputHeader: "Specify",
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
            {
                isFinishBtn: false,
                sectionHeader: "Number of fetuses",
                classDash: "dashed_bottom_border _padding",

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Fetuses",
                                    unit: "",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "fetuse",
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
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Lie",
                        name: "Lie",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Longitudinal",
                            value: "longitudinal",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Transverse",
                            value: "transverse",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Oblique",
                            value: "oblique",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Undefined",
                            value: "undefined",
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
                        title: "Presentation",
                        name: "Presentation",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Cephalic",
                            value: "cephalic",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Breech",
                            value: "Breech",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Face/Brow",
                            value: "face",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Footling",
                            value: "footling",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Cord",
                            value: "Cord",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Fetal back/arms/shoulders",
                            value: "Fetal",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "No palpable fetal part",
                            value: "no palpable fetal part",
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
                                    inputHeader: "Specify Presentation",
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border _padding",
                radioBtnContent: {
                    header: {
                        title: "Choose position",
                        name: "Position",
                        displayNone: true,
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Right occiput anterior (ROA)",
                            value: "roa",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Left occiput anterior (LOA)",
                            value: "loa",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Left occiput transverse (LOT)",
                            value: "lot",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Right occiput transverse (ROT)",
                            value: "rot",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Left occiput posterior (LOP)",
                            value: "lop",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Right occiput posterior (ROP)",
                            value: "rop",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Breech Position",
                            value: "Breech",
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
                        title: "Contractions",
                        name: "Contractions",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "No Contraction felt",
                            value: "no Contraction Felt",
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
            // {
            //     isFinishBtn: false,
            //     sectionHeader: "",
            //     data: {
            //         rowData: [
            //             {
            //                 colData: [
            //                     {
            //                         inputHeader: "Number Of Contractions",
            //                         displayNone: true,
            //                         value: "",
            //                         name: "Number of contraction",
            //                         required: true,
            //                         eventType: "input",
            //                         placeholder: "Enter Number of contraction",
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Bladder",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Empty",
                            value: "empty",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            name: "Full",
                            value: "full",
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
                                    inputHeader: "Fetal Heart Rate (beats per minute)",
                                    value: "",
                                    name: "Fetal Heart Rate",
                                    required: true,
                                    eventType: "input",
                                    placeholder: "",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setLabourVitals(data: any) {
            this.vitals = data;
        },
        async validate() {
            const generalConditon = extractArrayOfNameValue(this.vitals);

            const generalConditonValid = await validateStore(this.vitals, labourPhysicalExamSchema, generalConditon);

            return generalConditonValid;
        },
        async validateExams() {
            const otherExam = extractArrayOfNameValue(this.otherphysicalExams);
            const otherExamValid = await validateStore(this.otherphysicalExams, examSchema, otherExam);

            return otherExamValid;
        },
    },
    // persist:true,
});
