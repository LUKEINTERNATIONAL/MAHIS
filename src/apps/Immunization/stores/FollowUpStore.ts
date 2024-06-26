import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
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
                            name: "guardianNationalID",
                            eventType: "input",
                            alertsErrorMassage: "",
                            placeholder: "__-__-__-__",
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
                            inputHeader: "Relationship to patient *",
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
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "",
                            icon: icons.search,
                            valueType: "text",
                            isMultiSelect: true,
                            value: "",
                            name: "Vaccine adverse effects",
                            multiSelectData: [
                                {
                                    concept_id: 1,
                                    name: "Pain at injection site",
                                },
                                {
                                    concept_id: 2,
                                    name: "Redness at injection site",
                                },
                                {
                                    concept_id: 3,
                                    name: "Swelling at injection site",
                                },
                                {
                                    concept_id: 4,
                                    name: "Fever",
                                },
                                {
                                    concept_id: 5,
                                    name: "Fatigue",
                                },
                                {
                                    concept_id: 6,
                                    name: "Headache",
                                },
                                {
                                    concept_id: 7,
                                    name: "Muscle aches",
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
    }),
    actions: {
        setChangeGuardianInfo(data: any) {
            this.changeGuardianInfo = data;
        },
        getInitialChangeGuardianInfo() {
            const data = _.cloneDeep(initialChangeGuardianInfo);
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
    persist: true,
});
