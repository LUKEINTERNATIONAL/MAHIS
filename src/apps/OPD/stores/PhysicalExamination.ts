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
                        name: "Physical examination",
                    },
                    data: [
                        {
                            value: "Yes",
                            name: "Has physical examination been done?",
                            labelPlacement: "start",
                            colSize: "6.1",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Condition does not necessitate assessment",
                            name: "Condition does not necessitate assessment",
                            labelPlacement: "start",
                            colSize: "6.01",
                            justify: "space-between",
                        },
                        {
                            value: "Patient refused to consent",
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
                            value: "Yes",
                            name: "Eyes normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                        name: "Abnormality for eyes",
                    },
                    data: [
                        {
                            name: "Pallor",
                            disabled: false,
                            value: "Pallor",
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
                        name: "Abnormality for eyes",
                    },
                    data: [
                        {
                            name: "Jaundice",
                            disabled: false,
                            value: "Jaundice",
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
                        name: "Abnormality for eyes",
                    },
                    data: [
                        {
                            name: "Ulcerations",
                            disabled: false,
                            value: "Ulcerations",
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
                        name: "Abnormality for eyes",
                    },
                    data: [
                        {
                            name: "Other eye abnormality",
                            value: "Other eye abnormality",
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
                                    name: "Other eye abnormality notes",
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
                            value: "No",
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
                            value: "Oral thrush",
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
                            value: "Kaposi’s Sarcoma lesions",
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
                            value: "Sores",
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
                            value: "Other mouth abnormality",
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
                                    name: "Other mouth abnormality notes",
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
                            value: "Yes",
                            name: "Ears normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Discharge",
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
                            value: "Bleeding",
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
                            value: "Other ears abnormality",
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
                                    name: "Other ears abnormality notes",
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
                            value: "Yes",
                            name: "Face normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Rash",
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
                            value: "Swelling",
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
                            value: "Other face abnormality",
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
                                    name: "Other face abnormality notes",
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
                            value: "Yes",
                            name: "Neck normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Neck Swelling",
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
                            value: "Neck mass",
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
                            value: "Other neck abnormality",
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
                                    value: "Other neck abnormality notes",
                                    name: "Other neck abnormality notes",
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
                            value: "Yes",
                            name: "Chest inspection normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Chest wounds",
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
                            value: "Other chest abnormality",
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
                                    name: "Other chest abnormality notes",
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
                            value: "Yes",
                            name: "Heart sounds normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Loud p2",
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
                            value: "Splitting P2",
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
                            value: "Gallop rhythm",
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
                            value: "Murmur",
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
                            value: "Yes",
                            name: "Breath sounds normal",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Absent",
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
                            value: "Reduced",
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
                            value: "Added",
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
                            value: "Clackles",
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
                            value: "Wheezes",
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
                            value: "Bronchial",
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
                            value: "Yes",
                            name: "Abdominal inspection normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Abdominal distension",
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
                            value: "Abdominal rash",
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
                            value: "Abdominal wounds",
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
                            value: "Laceration",
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
                            value: "Abdominal bruises",
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
                            value: "Abdominal burns",
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
                            value: "Other abdominal abnormality",
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
                                    name: "Other abdominal abnormality notes",
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
                            value: "Yes",
                            name: "Abdominal auscultation normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                        title: "Select abdominal auscultation abnormalities",
                        selectedValue: "",
                        displayNone: true,
                        name: "Bruit",
                    },
                    data: [
                        {
                            name: "Bruit",
                            disabled: false,
                            value: "Bruit",
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
                            value: "Bowel sounds",
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
                        title: "Select bowel sounds",
                        selectedValue: "",
                        displayNone: true,
                        name: "Hyperactive",
                    },
                    data: [
                        {
                            name: "Hyperactive",
                            disabled: false,
                            value: "Hyperactive",
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
                            value: "Reduced bowel sounds",
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
                            value: "Abdominal auscultation absent",
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
                        name: "Other abdominal auscultation abnormality",
                    },
                    data: [
                        {
                            name: "Other abdominal auscultation abnormality",
                            disabled: false,
                            value: "Other abdominal auscultation abnormality",
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
                                    name: "Other abdominal auscultation abnormality notes",
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
                            value: "Yes",
                            name: "Abdominal palpation normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Tenderness",
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
                            value: "Hepatomegaly",
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
                            value: "Splenomegaly",
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
                            value: "Kidney ballotab",
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
                        name: "Other abdominal masses",
                    },
                    data: [
                        {
                            name: "Other abdominal masses",
                            disabled: false,
                            value: "Other abdominal masses",
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
                                    value: "Other abdominal palpation abnormality",
                                    name: "Other abdominal palpation abnormality notes",
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
                            value: "Yes",
                            name: "Genital examination normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                        name: "Warts",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Warts",
                            disabled: false,
                            value: "Warts",
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
                isFinishBtn: false,
                classDash: "",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Vesicles",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Vesicles",
                            disabled: false,
                            value: "Vesicles",
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
                        name: "Growths",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Growths",
                            disabled: false,
                            value: "Growths",
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
                        name: "Genital sores",
                        displayNone: true,
                    },
                    data: [

                        {
                            name: "Genital sores",
                            disabled: false,
                            value: "Genital sores",
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
                        name: "Urethral meatus abnormal",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Urethral meatus abnormal",
                            disabled: false,
                            value: "Urethral meatus abnormal",
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
                        title: "Urethral meatus abnormalities",
                        selectedValue: "",
                        name: "Urethral meatus abnormalities",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Oedema",
                            disabled: false,
                            value: "Oedema",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Abnormal discharge",
                            disabled: false,
                            value: "Abnormal discharge",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Scrotal swelling",
                            disabled: false,
                            value: "Scrotal swelling",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Testes swelling",
                            disabled: false,
                            value: "Testes swelling",
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
                        name: "Vulva examination",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Vulva examination",
                            disabled: false,
                            value: "Vulva examination",
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
                        title: "Vulva inspection abnormalities",
                        selectedValue: "",
                        name:'Vulva inspection abnormalities',
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Visible bleeding",
                            disabled: false,
                            value: "Visible bleeding",
                            labelPlacement: "start",
                            colSize: "8",
                            justify: "space-between",
                            checked: false,
                        },
                        {
                            name: "Abnormal vaginal discharge",
                            disabled: false,
                            value: "Abnormal vaginal discharge",
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
                        name: "Other genital abnormalities",
                        displayNone: true,
                    },
                    data: [
                        {
                            name: "Other genital abnormalities",
                            disabled: false,
                            value: "Other genital abnormalities",
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
                                    name: "Other genital abnormality notes",
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
                            value: "Yes",
                            name: "Extremities normal?",
                            labelPlacement: "start",
                            colSize: "6",
                            justify: "space-between",
                        },
                        {
                            value: "No",
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
                            value: "Oedema present",
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
                            value: "Fracture",
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
                            value: "Extremity burns",
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
                            value: "Extremity rash",
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
                            value: "Deformity",
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
                            value: "Finger clubbing",
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
                            value: "Decreased Power",
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
                            value: "Decreased Sensation",
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
                            value: "Other extremities abnormalities",
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
                                    name: "Other extremities abnormalities notes",
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
