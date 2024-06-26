import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialBirthRegistration = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Birth certificate number",
                            iconRight: icons.scannerIcon,
                            icon: icons.nationalID,
                            buildConceptIgnore: true,
                            value: "",
                            valueType: "text",
                            name: "Serial Number",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            placeholder: "__-__-__-__",
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
                            inputHeader: "Birth Weight/First weight (kg)*",
                            icon: icons.weight,
                            valueType: "number",
                            value: "",
                            name: "Weight",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            validationFunctionName: "validateWeight",
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
                            inputHeader: "Birth Height(cm)",
                            displayNone: false,
                            icon: icons.height,
                            valueType: "number",
                            value: "",
                            name: "Height (cm)",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
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
                            inputHeader: "How many doses of Tdv did the mother receive?*",
                            icon: icons.search,
                            valueType: "text",
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "How many doses of Tdv did the mother receive?",
                            validationFunctionName: "required",
                            multiSelectData: [
                                {
                                    concept_id: 11760,
                                    name: ">3 doses of TdV in past 5 years",
                                },
                                {
                                    concept_id: 11761,
                                    name: "1-4 doses of TdV in the past",
                                },
                                {
                                    concept_id: 11762,
                                    name: "Tdv not received",
                                },
                                {
                                    concept_id: 1067,
                                    name: "Unknown",
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
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "HIV status of the Child's Mother",
                            icon: icons.search,
                            valueType: "text",
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "HIV status",
                            multiSelectData: [
                                {
                                    id: 703,
                                    name: "Positive",
                                },
                                {
                                    id: 664,
                                    name: "Negative",
                                },
                                {
                                    id: 1067,
                                    name: "Unknown",
                                },
                            ],
                            openDirection: "top",
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
export const useBirthRegistrationStore = defineStore("birthRegistrationStore", {
    state: () => ({
        birthRegistration: [...initialBirthRegistration],
    }),
    actions: {
        setBirthRegistration(data: any) {
            this.birthRegistration = data;
        },
        getInitialBirthRegistration() {
            const data = _.cloneDeep(initialBirthRegistration);
            return [...data];
        },
    },
    persist: true,
});
