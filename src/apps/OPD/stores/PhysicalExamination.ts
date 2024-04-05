import {defineStore} from "pinia";
import {icons} from "@/utils/svg";

export const usePhysicalExaminationStore = defineStore("physicalExamStore", {
    state: () => ({
        physicalExam: [
            {
                selectedData: [],
                groupedRadioBtnContent: {
                    groupedData: [
                        {
                            data: [
                                {
                                    name: "",
                                    labelPlacement: "start",
                                    colSize: "5.155",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "Yes",
                                    labelPlacement: "start",
                                    colSize: "2.1",
                                    justify: "space-between",
                                    header: true,
                                },
                                {
                                    name: "No",
                                    labelPlacement: "start",
                                    colSize: "4.1",
                                    justify: "space-between",
                                    header: true,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        radioTittle: ["Yes", "No"],
                        selectedValue: "",
                        name: "Physical examination done",
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Has physical examination been done?",
                            labelPlacement: "start",
                            colSize: "6.1",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "end",
                            colSize: "2.1",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Reason why physical examination not done?",
                        selectedValue: "",
                        name: "Reason why physical examination not done",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "condition does not necessitate assessment",
                            name: "Condition does not necessitate assessment",
                            labelPlacement: "start",
                            colSize: "6.01",
                            justify: "space-between",
                        },
                        {
                            value: "patient refused to consent",
                            name: "Patient refused to consent",
                            labelPlacement: "start",
                            colSize: "6.01",
                            justify: "space-between",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Eyes normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Eyes normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select the abnormality on eyes",
                        selectedValue: "",
                        displayNone: true,
                        name: "Pallor",
                    },
                    data: [
                        {
                            name: "Pallor",
                            disabled: false,
                            value: "pallor",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Jaundice",
                    },
                    data: [
                        {
                            name: "Jaundice",
                            disabled: false,
                            value: "jaundice",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {

                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Ulcerations",
                    },
                    data: [
                        {
                            name: "Ulcerations",
                            disabled: false,
                            value: "ulcerations",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other eye abnormality",
                    },
                    data: [
                        {
                            name: "Other eye abnormality",
                            value: "other eye abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify eye abnormality",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other eye abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Mouth normal",
                        DisplayNone: true,
                    },
                    data: [
                        {
                            value: "Yes",
                            name: "Mouth normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select the abnormality found in the mouth",
                        selectedValue: "",
                        displayNone: true,
                        name: "Oral thrush",
                    },
                    data: [
                        {
                            name: "Oral thrush",
                            disabled: false,
                            value: "oral thrush",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Kaposi’s Sarcoma lesions",
                    },
                    data: [
                        {
                            name: "Kaposi’s Sarcoma lesions",
                            disabled: false,
                            value: "kaposi’s Sarcoma lesions",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Sores",
                    },
                    data: [
                        {
                            name: "Sores",
                            disabled: false,
                            value: "sores",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other mouth abnormality",
                    },
                    data: [
                        {
                            name: "Other mouth abnormality",
                            value: "other mouth abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "other",
                                    name: "Other mouth abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Ears normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Ears normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select abnormality",
                        selectedValue: "",
                        displayNone: true,
                        name: "Discharge",
                    },
                    data: [
                        {
                            name: "Discharge",
                            disabled: false,
                            value: "discharge",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Bleeding",
                    },
                    data: [
                        {
                            name: "Bleeding",
                            disabled: false,
                            value: "bleeding",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other ears abnormality",
                    },
                    data: [
                        {
                            name: "Other ears abnormality",
                            value: "other ears abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "other",
                                    name: "Other ears abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Face normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Face normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select abnormality on the face",
                        selectedValue: "",
                        displayNone: true,
                        name: "Rash",
                    },
                    data: [
                        {
                            name: "Rash",
                            disabled: false,
                            value: "rash",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Swelling",
                    },
                    data: [
                        {
                            name: "Swelling",
                            disabled: false,
                            value: "swelling",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other face abnormality",
                    },
                    data: [
                        {
                            name: "Other face abnormality",
                            value: "other face abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "Other face abnormality",
                                    name: "Other face abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Neck normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Neck normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select neck abnormality",
                        selectedValue: "",
                        displayNone: true,
                        name: "Neck rash",
                    },
                    data: [
                        {
                            name: "Neck rash",
                            disabled: false,
                            value: "rash",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Neck swelling",
                    },
                    data: [
                        {
                            name: "Neck swelling",
                            disabled: false,
                            value: "swelling",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Neck mass",
                    },
                    data: [
                        {
                            name: "Neck mass",
                            disabled: false,
                            value: "mass",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other neck abnormality",
                    },
                    data: [
                        {
                            name: "Other neck abnormality",
                            value: "other neck abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "Other neck abnormality",
                                    name: "Other neck abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Chest inspection normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Chest inspection normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select the abnormalities after chest inspection",
                        selectedValue: "",
                        displayNone: true,
                        name: "Chest rash",
                    },
                    data: [
                        {
                            name: "Chest rash",
                            disabled: false,
                            value: "chest rash",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Chest burns",
                    },
                    data: [
                        {
                            name: "Chest burns",
                            disabled: false,
                            value: "chest burns",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Chest bruises",
                    },
                    data: [
                        {
                            name: "Chest bruises",
                            disabled: false,
                            value: "bruises",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Chest wounds",
                    },
                    data: [
                        {
                            name: "Chest wounds",
                            disabled: false,
                            value: "wounds",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other chest abnormality",
                    },
                    data: [
                        {
                            name: "Other chest abnormality",
                            value: "other chest abnormality",
                            disabled: false,
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "Other chest abnormality",
                                    name: "Other chest abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Heart sounds normal",
                        DisplayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Heart sounds normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Loud P2",
                    },
                    data: [
                        {
                            name: "Loud P2",
                            disabled: false,
                            value: "loud p2",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Splitting P2",
                    },
                    data: [
                        {
                            name: "Splitting P2",
                            disabled: false,
                            value: "splitting P2",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Gallop rhythm",
                    },
                    data: [
                        {
                            name: "Gallop rhythm",
                            disabled: false,
                            value: "gallop rhythm",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Murmur",
                    },
                    data: [
                        {
                            name: "Murmur",
                            disabled: false,
                            value: "murmur",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Breath sounds normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Breath sounds normal",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "Select the abnormalities on breath sounds",
                        selectedValue: "",
                        displayNone: true,
                        name: "Absent",
                    },
                    data: [
                        {
                            name: "Absent",
                            disabled: false,
                            value: "absent",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Reduced",
                    },
                    data: [
                        {
                            name: "Reduced",
                            disabled: false,
                            value: "reduced",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Added",
                    },
                    data: [
                        {
                            name: "Added",
                            disabled: false,
                            value: "added",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },

            {
                selectdData: [],
                sideColSize:0.3,
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: 'Choose specific abnormalities when "Added"',
                        selectedValue: "",
                        displayNone: true,
                        name: "Clackles",
                    },
                    data: [
                        {
                            name: "Clackles",
                            disabled: false,
                            value: "clackles",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Wheezes",
                    },
                    data: [
                        {
                            name: "Wheezes",
                            disabled: false,
                            value: "wheezes",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Bronchial",
                    },
                    data: [
                        {
                            name: "Bronchial",
                            disabled: false,
                            value: "bronchial",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Crepitations",
                    },
                    data: [
                        {
                            name: "Crepitations",
                            disabled: false,
                            value: "Crepitations",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Abdominal inspection normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Abdominal inspection normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal distension",
                    },
                    data: [
                        {
                            name: "Abdominal distension",
                            disabled: false,
                            value: "abdominal distension",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal rash",
                    },
                    data: [
                        {
                            name: "Abdominal rash",
                            disabled: false,
                            value: "rash",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal wounds",
                    },
                    data: [
                        {
                            name: "Abdominal wounds",
                            disabled: false,
                            value: "wound",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Laceration",
                    },
                    data: [
                        {
                            name: "Laceration",
                            disabled: false,
                            value: "laceration",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal bruises",
                    },
                    data: [
                        {
                            name: "Abdominal bruises",
                            disabled: false,
                            value: "bruise",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal burns",
                    },
                    data: [
                        {
                            name: "Abdominal burns",
                            disabled: false,
                            value: "burn",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other abdominal abnormality",
                    },
                    data: [
                        {
                            name: "Other abdominal abnormality",
                            disabled: false,
                            value: "other abdominal abnormality",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "Other abdominal abnormality",
                                    name: "Other abdominal abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                selectdData: [],
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Abdominal auscultation normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Abdominal auscultation normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Bruit",
                    },
                    data: [
                        {
                            name: "Bruit",
                            disabled: false,
                            value: "bruit",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Bowel sounds",
                    },
                    data: [
                        {
                            name: "Bowel sounds",
                            disabled: false,
                            value: "bowel sounds",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Hyperactive",
                    },
                    data: [
                        {
                            name: "Hyperactive",
                            disabled: false,
                            value: "hyperactive",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Reduced bowel sounds",
                    },
                    data: [
                        {
                            name: "Reduced bowel sounds",
                            disabled: false,
                            value: "reduced bowel sounds",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Abdominal auscultation absent",
                    },
                    data: [
                        {
                            name: "Abdominal auscultation absent",
                            disabled: false,
                            value: "abdominal auscultation absent",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other abdominal auscultation abnormality",
                    },
                    data: [
                        {
                            name: "Other abdominal auscultation abnormality ",
                            disabled: false,
                            value: "other abdominal auscultation abnormality",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other abdominal auscultation abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Abdominal palpation normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Abdominal palpation normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Tenderness",
                    },
                    data: [
                        {
                            name: "Tenderness",
                            disabled: false,
                            value: "tenderness",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Hepatomegaly",
                    },
                    data: [
                        {
                            name: "Hepatomegaly",
                            disabled: false,
                            value: "hepatomegaly",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Splenomegaly",
                    },
                    data: [
                        {
                            name: "Splenomegaly",
                            disabled: false,
                            value: "splenomegaly",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Kidney ballotab",
                    },
                    data: [
                        {
                            name: "Kidney ballotab",
                            disabled: false,
                            value: "kidney ballotab",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other abdominal masses",
                    },
                    data: [
                        {
                            name: "Other abdominal masses",
                            disabled: false,
                            value: "other abdominal masses",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "Other abdominal palpation abnormality",
                                    name: "Other abdominal palpation abnormality field ",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Genital examination normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Genital examination normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {

                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Warts and Vesicles",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Warts",
                            disabled: false,
                            value: "warts",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Vesicles",
                            disabled: false,
                            value: "vesicles",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },

            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Growths and Genital sores",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Growths",
                            disabled: false,
                            value: "growths",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Genital sores",
                            disabled: false,
                            value: "genital sores",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },

                    ],
                },
            },

            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Urethral meatus abnormal",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Urethral meatus abnormal",
                            disabled: false,
                            value: "urethral meatus abnormal",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Urethral meatus abnormalities",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Oedema",
                            disabled: false,
                            value: "oedema",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Abnormal discharge",
                            disabled: false,
                            value: "abnormal discharge",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Scrotal swelling",
                            disabled: false,
                            value: "scrotal swelling",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Testes swelling",
                            disabled: false,
                            value: "testes swelling",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },

            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Vulva examination",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Vulva examination",
                            disabled: false,
                            value: "vulva examination",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name:'Vulva inspection abnormalities',
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Visible bleeding",
                            disabled: false,
                            value: "visible bleeding",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Abnormal vaginal discharge",
                            disabled: false,
                            value: "abnormal vaginal discharge",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Other genital abnormality",
                            disabled: false,
                            value: "other genital abnormality",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },

            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other genital abnormality field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Extremities normal",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "yes",
                            name: "Extremities normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "no",
                            labelPlacement: "start",
                            colSize: "2",
                            justify: "end",
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                selectdData: [],
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Cold and clammy",
                    },
                    data: [
                        {
                            name: "Cold and clammy",
                            disabled: false,
                            value: "cold and clammy ",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Oedema present",
                    },
                    data: [
                        {
                            name: "Oedema present",
                            disabled: false,
                            value: "oedema present",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Fracture",
                    },
                    data: [
                        {
                            name: "Fracture",
                            disabled: false,
                            value: "fracture",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Extremity burns",
                    },
                    data: [
                        {
                            name: "Extremity burns",
                            disabled: false,
                            value: "burns",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Extremity rash",
                    },
                    data: [
                        {
                            name: "Extremity rash",
                            disabled: false,
                            value: "rash",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Deformity",
                    },
                    data: [
                        {
                            name: "Deformity",
                            disabled: false,
                            value: "deformity",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Finger clubbing",
                    },
                    data: [
                        {
                            name: "Finger clubbing",
                            disabled: false,
                            value: "finger clubbing",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Decreased Power",
                    },
                    data: [
                        {
                            name: "Decreased Power",
                            disabled: false,
                            value: "decreased Power",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "",
                sideColSize:0.3,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Decreased Sensation",
                    },
                    data: [
                        {
                            name: "Decreased Sensation",
                            disabled: false,
                            value: "decreased Sensation",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        displayNone: true,
                        name: "Other extremities abnormalities",
                    },
                    data: [
                        {
                            name: "Other extremities abnormalities",
                            disabled: false,
                            value: "other extremities abnormalities",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                    ],
                },
            },
            {
                sideColSize:0.3,
                classDash: "dashed_bottom_border",
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: "specify",
                                    icon: icons.editPen,
                                    value: "",
                                    name: "Other extremities abnormalities field",
                                    eventType: "input",
                                    inputWidth: "100%",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                sideColSize:0.3,
                selectdData: [],
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Chest movement",
                        selectedValue: "",
                        name: "Chest movement",
                        displayNone: true,
                    },
                    data: [
                        {
                            value: "symmetrical",
                            name: "Symmetrical",
                            labelPlacement: "start",
                            colSize: "6.01",
                            justify: "space-between",
                        },
                        {
                            value: "asymmetrical",
                            name: "Asymmetrical",
                            labelPlacement: "start",
                            colSize: "6.01",
                            justify: "space-between",
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPhysicalExamStore(data: any) {
            this.physicalExam = data;
        },
    },
    // persist: true,
});
