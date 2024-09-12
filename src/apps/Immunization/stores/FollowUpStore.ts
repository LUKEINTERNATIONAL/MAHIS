import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
import HisDate from "@/utils/Date";
const initialChangeGuardianInfo = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Guardian National ID",
                            iconRight: icons.scannerIcon,
                            icon: icons.nationalID,
                            value: "",
                            valueType: "text",
                            name: "guardianNationalID",
                            eventType: "input",
                            alertsErrorMassage: "",
                            placeholder: "__-__-__-__",
                            validationFunctionName: "isMWNationalID",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectedData: {},
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "First name",
                            icon: icons.fullName,
                            value: "",
                            name: "guardianFirstname",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isNameEmpty",
                        },
                    ],
                },
            ],
        },
    },
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Last name",
                            icon: icons.fullName,
                            value: "",
                            name: "guardianLastname",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isNameEmpty",
                        },
                    ],
                },
            ],
        },
    },
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Middle name",
                            icon: icons.fullName,
                            value: "",
                            name: "guardianMiddleName",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isNameEmpty",
                        },
                    ],
                },
            ],
        },
    },
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Phone number",
                            icon: icons.phone,
                            value: "",
                            name: "guardianPhoneNumber",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isMWPhoneNumber",
                        },
                    ],
                },
            ],
        },
    },
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Relationship to patient",
                            icon: icons.search,
                            value: "",
                            name: "relationship",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "isNameWithSlush",
                            isSingleSelect: true,
                            trackBy: "trackByID",
                            multiSelectData: [],
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialVaccineAdverseEffects = [
    {
        classDash: "solid_bottom_border",
        checkboxBtnContent: {
            header: {
                name: "Vaccine adverse effects",
                title: "Adverse event (s)",
                class: "bold",
            },
            data: [],
        },
    },
] as any;
const initialSerious = [
    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
            header: {
                selectedValue: "",
                title: "Serious",
                class: "bold",
                displayNext: "yes",
                name: "SeriousCheck",
            },
            data: [
                {
                    name: "Yes",
                    value: "yes",
                    colSize: "4",
                    labelPlacement: "start",
                },
                {
                    name: "No",
                    value: "no",
                    colSize: "4",
                    labelPlacement: "start",
                },
            ],
        },
    },
    {
        childName: "SeriousCheck",
        classDash: "solid_bottom_border",
        checkboxBtnContent: {
            header: {
                name: "Seriousness of adverse effects",
                displayNone: true,
            },
            data: [],
        },
    },
] as any;
const initialOutcome = [
    {
        classDash: "solid_bottom_border",
        radioBtnContent: {
            header: {
                name: "Adverse effects outcome",
                title: "Outcome",
                class: "bold",
                displayNext: "Patient died",
            },
            data: [],
        },
    },
    {
        sideColSize: 1,
        childName: "Adverse effects outcome",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Date of death",
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Date of death",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                            minDate: "",
                            maxDate: HisDate.currentDate(),
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialFirstDecision = [
    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
            header: {
                selectedValue: "",
                title: "Investigation needed",
                class: "bold",
                displayNext: "yes",
                name: "investigation_needed",
            },
            data: [
                {
                    name: "Yes",
                    value: "yes",
                    colSize: "4",
                    labelPlacement: "start",
                },
                {
                    name: "No",
                    value: "no",
                    colSize: "4",
                    labelPlacement: "start",
                },
            ],
        },
    },
    {
        sideColSize: 1,
        childName: "investigation_needed",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Date investigation planned",
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            buildConceptIgnore: true,
                            value: "",
                            name: "Investigation needed",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                            minDate: HisDate.currentDate(),
                            maxDate: "",
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialProtectedAtBirth = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Protected at birth (PAB)*",
                            icon: icons.search,
                            valueType: "text",
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "Protected at birth",
                            validationFunctionName: "required",
                            multiSelectData: [
                                {
                                    concept_id: 1065,
                                    name: "Yes",
                                },
                                {
                                    concept_id: 1066,
                                    name: "No",
                                },
                                {
                                    concept_id: 1067,
                                    name: "Don't know",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
];
export const useFollowUpStoreStore = defineStore("followUpStoreStore", {
    state: () => ({
        changeGuardianInfo: [...initialChangeGuardianInfo] as any,
        vaccineAdverseEffects: [...initialVaccineAdverseEffects] as any,
        protectedAtBirth: [...initialProtectedAtBirth] as any,
        serious: [...initialSerious] as any,
        outcome: [...initialOutcome] as any,
        firstDecision: [...initialFirstDecision] as any,
    }),
    actions: {
        setChangeGuardianInfo(data: any) {
            this.changeGuardianInfo = data;
        },
        getInitialChangeGuardianInfo() {
            const data = _.cloneDeep(initialChangeGuardianInfo);
            return [...data];
        },
        getInitialSerious() {
            const data = _.cloneDeep(initialSerious);
            return [...data];
        },
        getInitialOutcome() {
            const data = _.cloneDeep(initialOutcome);
            return [...data];
        },
        getInitialFirstDecision() {
            const data = _.cloneDeep(initialFirstDecision);
            return [...data];
        },
        setVaccineAdverseEffects(data: any) {
            this.vaccineAdverseEffects = data;
        },
        getInitialVaccineAdverseEffects() {
            const data = _.cloneDeep(initialVaccineAdverseEffects);
            return [...data];
        },

        setProtectedAtBirth(data: any) {
            this.protectedAtBirth = data;
        },
        getInitialProtectedAtBirth() {
            const data = _.cloneDeep(initialProtectedAtBirth);
            return [...data];
        },
    },
    // persist: true,
});
