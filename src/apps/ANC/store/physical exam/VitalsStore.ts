import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _, { initial } from "lodash";

const initialVitals = [
    {
        isFinishBtn: false,
        selectedData: [],
        validationStatus: "",
        sectionHeader: "Height and weight",
        classDash: "dashed_bottom_border _padding",
        name: "vitals",

        data: {
            header: {},
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Height*",
                            unit: "cm",
                            icon: icons.height,
                            value: "",
                            name: "Height",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                        },
                        {
                            inputHeader: "Weight*",
                            unit: "kg",
                            icon: icons.weight,
                            value: "",
                            name: "Weight",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                        },
                    ],
                },
                {
                    colData: [
                        {
                            inputHeader: "Pre-gestation weight",
                            unit: "kg",
                            icon: icons.weight,
                            value: "",
                            name: "Pre-gestation weight",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
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
        previousView: {
            name: "vitals",
        },
    },
    {
        sectionHeader: "Blood pressure",
        classDash: "dashed_bottom_border _padding",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Systolic Pressure*",
                            unit: "mmHg",
                            icon: icons.systolicPressure,
                            value: "",
                            name: "Systolic blood pressure",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                        },
                        {
                            inputHeader: "Diastolic pressure*",
                            unit: "mmHg",
                            icon: icons.diastolicPressure,
                            value: "",
                            name: "Diastolic",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                        },
                    ],
                },
                {
                    colData: [
                        {
                            inputHeader: "Repeated systolic pressure",
                            unit: "mmHg",
                            icon: icons.systolicPressure,
                            value: "",
                            name: "Repeated Systolic",
                            valueType: "number",
                            required: true,
                            eventType: "input",
                        },
                        {
                            inputHeader: "Repeated diastolic pressure",
                            unit: "mmHg",
                            icon: icons.diastolicPressure,
                            value: "",
                            name: "Repeated diastolic",
                            valueType: "number",
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
        previousView: {
            name: "vitals",
        },
    },
    {
        sectionHeader: "Temperature and Purse",
        classDash: "dashed_bottom_border _padding",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Temperature",
                            unit: "C",
                            icon: icons.temprature,
                            value: "",
                            name: "Temperature",
                            valueType: "number",
                            eventType: "input",
                        },
                        {
                            inputHeader: "Pulse rate",
                            unit: "BMP",
                            icon: icons.pulse,
                            value: "",
                            name: "Pulse",
                            valueType: "number",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
        previousView: {
            name: "vitals",
        },
    },
    {
        sectionHeader: "Oximetry and Respiratory rate",
        classDash: "dashed_bottom_border _padding",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Oxygen saturation",
                            unit: "%",
                            icon: icons.oxgenStaturation,
                            value: "",
                            name: "Blood oxygen saturation",
                            valueType: "number",
                            eventType: "input",
                        },
                        {
                            inputHeader: "Respiratory rate",
                            unit: "BMP",
                            icon: icons.respiratory,
                            value: "",
                            name: "Respiratory rate",
                            valueType: "number",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
        previousView: {
            name: "vitals",
        },
    },
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Respiratory exam findings",
                selectedValue: "",
                name: "Respiratory exam findings",
                class: "bold",
            },
            data: [
                {
                    name: "Exam not done",
                    value: "exam not done",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Normal exam",
                    value: "normal exam",
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
                name: "Respiratory exam findings",
            },
            data: [
                {
                    name: "Cough",
                    value: "cough",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Rapid breathing",
                    value: "rapid breathing",
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
                name: "Respiratory exam findings",
            },
            data: [
                {
                    name: "Slow breathing",
                    value: "Slow breathing",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Wheezing",
                    value: "wheezing",
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
                name: "Respiratory exam findings",
            },
            data: [
                {
                    name: "Rales",
                    value: "Rales",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Respiratory distress",
                    value: "respiratory distress",
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
                name: "Respiratory exam findings",
            },
            data: [
                {
                    name: "Other",
                    value: "Other",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
    {
        sideColSize: 0.000001,
        sectionHeader: "",
        classDash: "dashed_bottom_border",
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
                            name: "Other notes",
                            valueType: "text",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "Severe pre-eclampsia exam",
                selectedValue: "",
                name: "Severe pre-eclampsia",
                class: "bold",
            },
            data: [
                {
                    name: "No severe pre-eclampsia",
                    value: "No severe pre-eclampsia",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Severe headache",
                    value: "Severe headache",
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
                name: "Severe pre-eclampsia",
            },
            data: [
                {
                    name: "Visual disturbance",
                    value: "Visual disturbance",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Vomiting",
                    value: "Vomiting",
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
                name: "Severe pre-eclampsia",
            },
            data: [
                {
                    name: "Vomiting",
                    value: "Vomiting",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Epigastric pain",
                    value: "Epigastric pain symptom",
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
                name: "Severe pre-eclampsia",
            },
            data: [
                {
                    name: "Dizziness",
                    value: "Dizziness symptom",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },
] as any;

// const initialRespiration=[

// ] as any;
// const initialPreEclampsia=[

// ] as any;
export const useVitalsStore = defineStore("vitalsStore", {
    state: () => ({
        vitals: [...initialVitals] as any,
        // respiration: [...initialRespiration ] as any,
        // preEclampsia: [ ...initialPreEclampsia] as any,
    }),
    actions: {
        setVitals(data: any) {
            this.vitals = data;
        },

        getInitial() {
            const data = _.cloneDeep(initialVitals);
            return [...data];
        },
        // getInitial1(){
        //     const data=_.cloneDeep(initialRespiration)
        //     return[...data]
        // },
        // getInitial2(){
        //     const data=_.cloneDeep(initialPreEclampsia)
        //     return [...data]
        // }
    },
    // persist:true,
});
