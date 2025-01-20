import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const patientHistory = [
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Cardiovascular disease",
                    value: "Cardiovascular disease",
                    example: "eg. heart attack, ischemic heart disease, CCF",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Cardiovascular disease",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Cardiovascular disease date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Retinopathy",
                    value: "Retinopathy",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Retinopathy",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Retinopathy date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Renal disease",
                    value: "Renal disease",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Renal disease",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Renal disease date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Stroke/TIA",
                    value: "Stroke",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Stroke/TIA",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Stroke/TIA date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "PVD",
                    example: "eg. ulcers, gangrene",
                    value: "PVD",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "PVD",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "PVD date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Neuropathy",
                    value: "Suspected neuropathy",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Neuropathy",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Neuropathy date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Sexual dysfunction",
                    value: "Sexual dysfunction",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Sexual dysfunction",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Sexual dysfunction date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Anxiety",
                    value: "Anxiety",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Anxiety",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Anxiety date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                name: "Medical history",
            },
            data: [
                {
                    name: "Depression",
                    value: "Depression",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Depression",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Depression date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
];
const patientHistoryHIV = [
    {
        selectedData: [],
        isFinishBtn: false,
        radioBtnContent: {
            header: {
                title: "HIV",
                name: "HIV status",
                selectedValue: "",
                displayNext: "Reactive",
            },
            data: [
                {
                    name: "R",
                    value: "Reactive",
                    checked: false,
                },
                {
                    name: "NR",
                    value: "Non-reactive",
                    checked: false,
                },
                {
                    name: "Unknown",
                    value: "Unknown",
                    checked: false,
                },
            ],
        },
    },
    // {
    //     sideColSize: 1,
    //     childName: "HIV status",
    //     data: {
    //         rowData: [
    //             {
    //                 colData: [
    //                     {
    //                         inputHeader: "ART Start Date:",
    //                         icon: icons.calenderPrimary,
    //                         placeholder: "Pick the date",
    //                         buildConceptIgnore: true,
    //                         value: "",
    //                         name: "HIV status date",
    //                         eventType: "input",
    //                         isDatePopover: true,
    //                         displayNone: true,
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },
    {
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Medical history",
            },
            data: [
                {
                    name: "Use of traditional medicine",
                    value: "Herbal traditional medications",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Use of traditional medicine",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "traditional medicine date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        selectedData: [],
        isFinishBtn: false,
        checkboxBtnContent: {
            header: {
                title: "TB",
                selectedValue: "",
                name: "Tuberculosis past history",
            },
            data: [
                {
                    name: "Smear pos",
                    value: "Smear positive TB",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Smear pos",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Smear pos date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },

    {
        checkboxBtnContent: {
            header: {
                selectedValue: "",
                name: "Tuberculosis past history",
            },
            data: [
                {
                    name: "Smear neg",
                    value: "Smear negative TB",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Smear neg",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Smear neg date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                selectedValue: "",
                name: "Tuberculosis past history",
            },
            data: [
                {
                    name: "EPTB",
                    value: "EPTB",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "EPTB",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "EPTB date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            header: {
                selectedValue: "",
                name: "Tuberculosis past history",
            },
            data: [
                {
                    name: "Never had TB",
                    value: "Never had TB",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Never had TB",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Never had TB date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
];
const enrollmentDiagnosis = [
    {
        selectedData: [],
        isFinishBtn: false,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Primary diagnosis",
            },
            data: [
                {
                    name: "Type 1 DM",
                    value: "Type 1 diabetes",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Type 1 DM",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Type 1 DM date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        selectedData: [],
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Primary diagnosis",
            },
            data: [
                {
                    name: "Type 2 DM",
                    value: "Type 2 diabetes",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Type 2 DM",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Type 2 DM date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        selectedData: [],
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                name: "Primary diagnosis",
            },
            data: [
                {
                    name: "Hypertension",
                    value: "Hypertension",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "Hypertension",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Hypertension date",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
];
const initialSubstance = [
    {
        selectedData: [],
        isFinishBtn: false,

        radioBtnContent: {
            header: {
                title: "Smoking",
                name: "Smoking history",
                selectedValue: "",
            },
            data: [
                {
                    name: "Smoking",
                    value: "Smoking",
                },
                {
                    name: "Never",
                    value: "Never",
                },
                {
                    name: "Stopped",
                    value: "Stopped",
                },
            ],
        },
    },
    {
        radioBtnContent: {
            header: {
                title: "Drinking alcohol",
                name: "Does the patient drink alcohol?",
                selectedValue: "",
            },
            data: [
                {
                    name: "Drinking",
                    value: "Drinking",
                },
                {
                    name: "Never",
                    value: "Never",
                },
                {
                    name: "Stopped",
                    value: "Stopped",
                },
            ],
        },
    },
];
const initialFamilyHistory = [
    {
        selectedData: [],
        isFinishBtn: false,

        radioBtnContent: {
            header: {
                title: "Diabetes",
                name: "Diabetes family history",
                selectedValue: "",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                },
                {
                    name: "No",
                    value: "No",
                },
                {
                    name: "Unknown",
                    value: "Unknown",
                },
            ],
        },
    },
    {
        radioBtnContent: {
            header: {
                title: "Hypertension",
                name: "Does the family have a history of hypertension?",
                selectedValue: "",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                },
                {
                    name: "No",
                    value: "No",
                },
                {
                    name: "Unknown",
                    value: "Unknown",
                },
            ],
        },
    },
];
const initialPatientType = [
    {
        selectedData: [],
        isFinishBtn: false,

        radioBtnContent: {
            header: {
                title: "Patient Type",
                name: "Visit type",
                selectedValue: "",
            },
            data: [
                {
                    name: "New",
                    value: "New patient",
                },
                {
                    name: "External consultation",
                    value: "External consultation",
                },
                {
                    name: "Transferred in",
                    value: "Patient transferred in",
                },
            ],
        },
    },
];
const initialNCDNumber = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            iconRight: icons.editStarts,
                            leftText: "",
                            value: "",
                            name: "NCDNumber",
                            placeholder: "__-__-__-__",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },
];
export const useEnrollementStore = defineStore("enrollementStore", {
    state: () => ({
        substance: [...initialSubstance],
        enrollmentDiagnosis: [...enrollmentDiagnosis] as any,
        patientHistoryHIV: [...patientHistoryHIV],
        patientHistory: [...patientHistory],
        familyHistory: [...initialFamilyHistory],
        patientType: [...initialPatientType],
        NCDNumber: [...initialNCDNumber],
    }),
    actions: {
        getInitialEnrollmentDiagnosis() {
            const data = _.cloneDeep(enrollmentDiagnosis);
            return [...data];
        },
        getInitialPatientHistory() {
            const data = _.cloneDeep(patientHistory);
            return [...data];
        },
        getInitialSubstance() {
            const data = _.cloneDeep(initialSubstance);
            return [...data];
        },
        getInitialFamilyHistory() {
            const data = _.cloneDeep(initialFamilyHistory);
            return [...data];
        },
        getInitialPatientType() {
            const data = _.cloneDeep(initialPatientType);
            return [...data];
        },
        getInitialNCDNumber() {
            const data = _.cloneDeep(initialNCDNumber);
            return [...data];
        },
        getInitialPatientHistoryHIV() {
            const data = _.cloneDeep(patientHistoryHIV);
            return [...data];
        },
        setSubstance(data: any) {
            this.substance = data;
        },
        setPatientType(data: any) {
            this.patientType = data;
        },
        setDiagnosis(data: any) {
            this.enrollmentDiagnosis = data;
        },
        setPatientHistory(data: any) {
            this.patientHistory = data;
        },
        setPatientHistoryHIV(data: any) {
            this.patientHistoryHIV = data;
        },
        setFamilyHistory(data: any) {
            this.familyHistory = data;
        },
        setNCDNumber(data: any) {
            this.NCDNumber = data;
        },
    },
    persist: true,
});
