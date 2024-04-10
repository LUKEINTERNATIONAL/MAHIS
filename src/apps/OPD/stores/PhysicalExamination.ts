import {defineStore} from "pinia";
import {icons} from "@/utils/svg";
import _ from "lodash"

const initialPhysicalExam= [

    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize:0.3,
        radioBtnContent: {
            header: {
                title:'Has physical examination been done?',
                selectedValue: "",
                name: "Physical examination",
                class:"bold"
            },
            data: [
                {
                    name: "Yes",
                    value:"Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2.0",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:0.3,
        childName:'',
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Reason why physical examination not done?",
                selectedValue: "",
                name: "Reason why physical examination not done",
                // displayNone: true,
                class:'bold'
            },
            data: [
                {
                    value: "Condition does not necessitate assessment",
                    name: "Condition does not necessitate assessment",
                    colSize: "12",
                },
                {
                    value: "Patient refused to consent",
                    name: "Patient refused to consent",
                    colSize: "12",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Eyes normal",
                title: "Eyes normal?",
                displayNext:"No",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on eyes?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for eyes",
                class:'bold'
            },
            data: [
                {
                    name: "Pallor",
                    disabled: false,
                    value: "Pallor",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Jaundice",
                    disabled: false,
                    value: "Jaundice",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Ulcerations",
                    disabled: false,
                    value: "Ulcerations",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for eyes",
            },
            data: [
                {
                    name: "Other eye abnormality",
                    disabled: false,
                    value: "Other eye abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify eye abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Mouth normal",
                title: "Mouth normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities in the mouth?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for  mouth",
                class:'bold'
            },
            data: [
                {
                    name: "Oral thrush",
                    disabled: false,
                    value: "Oral thrush",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Kaposi’s Sarcoma lesions",
                    disabled: false,
                    value: "Kaposi’s Sarcoma lesions",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Sores",
                    disabled: false,
                    value: "Sores",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for  mouth",
            },
            data: [
                {
                    name: "Other mouth abnormality",
                    disabled: false,
                    value: "Other mouth abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify mouth abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Ears normal",
                title: "Ears normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on ears?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for ears",
                class:'bold'
            },
            data: [
                {
                    name: "Discharge",
                    disabled: false,
                    value: "Discharge",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Bleeding",
                    disabled: false,
                    value: "Bleeding",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for ears",
            },
            data: [
                {
                    name: "Other ears abnormality",
                    disabled: false,
                    value: "Other ears abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify ears abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Face normal",
                title: "Face normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on face?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for face",
                class:'bold'
            },
            data: [
                {
                    name: "Rash",
                    disabled: false,
                    value: "Rash",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Swelling",
                    disabled: false,
                    value: "Swelling",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for face",
            },
            data: [
                {
                    name: "Other face abnormality",
                    disabled: false,
                    value: "Other face abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify face abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Neck normal",
                title: "Neck normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on the neck?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for neck",
                class:'bold'
            },
            data: [
                {
                    name: "Neck rash",
                    disabled: false,
                    value: "Neck rash",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Neck swelling",
                    disabled: false,
                    value: "Swelling",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Neck mass",
                    disabled: false,
                    value: "Neck mass",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for neck",
            },
            data: [
                {
                    name: "Other neck abnormality",
                    disabled: false,
                    value: "Other neck abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify neck abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Chest inspection normal",
                title: "Chest inspection normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on the chest?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for  chest inspection",
                class:'bold'
            },
            data: [
                {
                    name: "Chest rash",
                    disabled: false,
                    value: "Chest rash",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Chest burns",
                    disabled: false,
                    value: "Chest burns",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Chest bruises",
                    disabled: false,
                    value: "Chest bruises",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Chest wounds",
                    disabled: false,
                    value: "Chest wounds",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },


    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for  chest inspection",
            },
            data: [
                {
                    name: "Other chest abnormality",
                    disabled: false,
                    value: "Other chest abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify chest abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Heart sounds normal",
                title: "Heart sounds normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on the heart sounds?",
                selectedValue: "",
                // displayNone: true,
                name: "Heart sounds abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Loud P2",
                    disabled: false,
                    value: "Loud P2",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Splitting P2",
                    disabled: false,
                    value: "Splitting P2",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Gallop rhythm",
                    disabled: false,
                    value: "Gallop rhythm",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Murmur",
                    disabled: false,
                    value: "Murmur",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Breath sounds normal",
                title: "Breath sounds normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on the breath sounds?",
                selectedValue: "",
                // displayNone: true,
                name: "Breath sounds abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Absent",
                    disabled: false,
                    value: "Absent",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Reduced",
                    disabled: false,
                    value: "Reduced",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Added",
                    disabled: false,
                    value: "Added",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on the breath sounds are Added?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormalities when added",
                class:'bold'
            },
            data: [
                {
                    name: "Clackles",
                    disabled: false,
                    value: "Clackles",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Wheezes",
                    disabled: false,
                    value: "Wheezes",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Bronchial",
                    disabled: false,
                    value: "Bronchial",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Crepitations",
                    disabled: false,
                    value: "Crepitations",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Abdominal inspection normal",
                title: "Abdominal inspection normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities after Abdominal inspection?",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal inspection abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Abdominal distension",
                    disabled: false,
                    value: "Abdominal distension",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abdominal rash",
                    disabled: false,
                    value: "Abdominal rash",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abdominal wounds",
                    disabled: false,
                    value: "Abdominal wounds",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Laceration",
                    disabled: false,
                    value: "Laceration",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abdominal bruises",
                    disabled: false,
                    value: "Abdominal bruises",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abdominal burns",
                    disabled: false,
                    value: "Abdominal burns",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal inspection abnormality",
            },
            data: [
                {
                    name: "Other abdominal abnormality",
                    disabled: false,
                    value: "Other abdominal abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify abdominal abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Abdominal auscultation normal",
                title: "Abdominal auscultation normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abdominal auscultation abnormalities?",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal auscultation abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Bruit",
                    disabled: false,
                    value: "Bruit",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Bowel sounds",
                    disabled: false,
                    value: "Bowel sounds",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Hyperactive",
                    disabled: false,
                    value: "Hyperactive",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities on bowel sounds?",
                selectedValue: "",
                // displayNone: true,
                name: "Bowel sounds abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Reduced bowel sounds",
                    disabled: false,
                    value: "Reduced bowel sounds",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abdominal auscultation absent",
                    disabled: false,
                    value: "Abdominal auscultation absent",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },

    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal auscultation abnormality",
            },
            data: [
                {
                    name: "Other abdominal auscultation abnormality",
                    disabled: false,
                    value: "Other abdominal auscultation abnormality",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify abdominal auscultation abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Abdominal palpation normal",
                title: "Abdominal palpation normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abdominal palpation abnormalities?",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal palpation abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Tenderness",
                    disabled: false,
                    value: "Tenderness",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Splenomegaly",
                    disabled: false,
                    value: "Splenomegaly",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Kidney ballotab",
                    disabled: false,
                    value: "Kidney ballotab",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abdominal palpation abnormality",
            },
            data: [
                {
                    name: "Other abdominal masses",
                    disabled: false,
                    value: "Other abdominal masses",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify abdominal palpation abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Genital examination normal",
                title: "Genital examination normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities after genital examination?",
                selectedValue: "",
                // displayNone: true,
                name: "Genital examination abnormality",
                class:'bold'
            },
            data: [
                {
                    name: "Warts",
                    disabled: false,
                    value: "Warts",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Vesicles",
                    disabled: false,
                    value: "Vesicles",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Growths",
                    disabled: false,
                    value: "Growths",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Genital sores",
                    disabled: false,
                    value: "Genital sores",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Genital examination abnormality",
            },
            data: [
                {
                    name: "Urethral meatus abnormal",
                    disabled: false,
                    value: "Urethral meatus abnormal",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the urethral meatus abnormalities?",
                selectedValue: "",
                // displayNone: true,
                name: "Urethral meatus abnormalities",
                class:'bold'
            },
            data: [
                {
                    name: "Oedema",
                    disabled: false,
                    value: "Oedema",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abnormal discharge",
                    disabled: false,
                    value: "Abnormal discharge",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Scrotal swelling",
                    disabled: false,
                    value: "Scrotal swelling",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Testes swelling",
                    disabled: false,
                    value: "Testes swelling",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Genital examination abnormality",
            },
            data: [
                {
                    name: "Vulva examination",
                    disabled: false,
                    value: "Vulva examination",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What Vulva abnormalities does the patient have?",
                selectedValue: "",
                // displayNone: true,
                name: "Vulva inspection abnormalities",
                class:'bold'
            },
            data: [
                {
                    name: "Visible bleeding",
                    disabled: false,
                    value: "Visible bleeding",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Abnormal vaginal discharge",
                    disabled: false,
                    value: "Abnormal vaginal discharge",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Genital examination abnormality",
            },
            data: [
                {
                    name: "Other genital abnormalities",
                    disabled: false,
                    value: "Other genital abnormalities",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify genital abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Extremities normal",
                title: "Extremities normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities for extremities?",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for extremities",
                class:'bold'
            },
            data: [
                {
                    name: "Cold and clammy",
                    disabled: false,
                    value: "Cold and clammy",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Oedema present",
                    disabled: false,
                    value: "Oedema present",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Fracture",
                    disabled: false,
                    value: "Fracture",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Extremity burns",
                    disabled: false,
                    value: "Extremity burns",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Extremity rash",
                    disabled: false,
                    value: "Extremity rash",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Deformity",
                    disabled: false,
                    value: "Deformity",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Finger clubbing",
                    disabled: false,
                    value: "Finger clubbing",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Decreased Power",
                    disabled: false,
                    value: "Decreased Power",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
                {
                    name: "Decreased Sensation",
                    disabled: false,
                    value: "Decreased Sensation",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },

            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for extremities",
            },
            data: [
                {
                    name: "Other extremities abnormalities",
                    disabled: false,
                    value: "Other extremities abnormalities",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify extremity abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
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
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Chest movements",
                title: "Chest movement?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Symmetrical",
                    name: "Symmetrical",
                    colSize: "6.01",
                },
                {
                    value: "Asymmetrical",
                    name:"Asymmetrical",
                    colSize: "6.01",
                },
            ],
        },
    },
] as any;
export const usePhysicalExaminationStore = defineStore("physicalExamStore", {
    state: () => ({
        physicalExam: [...initialPhysicalExam]
    }),
    actions: {
        setPhysicalExamStore(data: any) {
            this.physicalExam = data;


        },
        getInitial(){
            const data = _.cloneDeep(initialPhysicalExam);
            return [...data]; // Return a copy of the initial state
        }
    },
    // persist: true,
});
