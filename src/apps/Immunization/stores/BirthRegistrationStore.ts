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
                            value: "",
                            name: "middleName",
                            eventType: "input",
                            alertsError: false,
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
                            value: "",
                            name: "weight",
                            eventType: "input",
                            alertsError: false,
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
                            inputHeader: "Birth Height(cm)",
                            icon: icons.height,
                            value: "",
                            name: "Height",
                            eventType: "input",
                            alertsError: false,
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
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "How many doses of Tdv",
                            multiSelectData: [
                                {
                                    concept_id: 2,
                                    name: ">3 doses of TdV in past 5 years",
                                },
                                {
                                    concept_id: 3,
                                    name: "1-4 doses of TdV in the past",
                                },
                                {
                                    concept_id: 4,
                                    name: "Tdv not received",
                                },
                                {
                                    concept_id: 5,
                                    name: "Unknown",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsError: false,
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
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "Protected at birth",
                            multiSelectData: [
                                {
                                    concept_id: 2,
                                    name: "Yes",
                                },
                                {
                                    concept_id: 3,
                                    name: "No",
                                },
                                {
                                    concept_id: 4,
                                    name: "Don't know",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsError: false,
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
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "HIV status of the Child",
                            multiSelectData: [
                                {
                                    id: 2,
                                    name: "Positive",
                                },
                                {
                                    id: 3,
                                    name: "Negative",
                                },
                                {
                                    id: 4,
                                    name: "Unknown",
                                },
                            ],
                            openDirection: "top",
                            eventType: "input",
                            required: true,
                            alertsError: false,
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
    // persist: true,
});
