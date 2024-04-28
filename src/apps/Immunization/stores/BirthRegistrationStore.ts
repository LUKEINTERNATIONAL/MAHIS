import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialBirthRegistration = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Child's MER ID",
                            icon: icons.nationalID,
                            value: "",
                            name: "nationalID",
                            eventType: "input",
                            alertsError: false,
                            alertsErrorMassage: "",
                            required: true,
                            placeholder: "",
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
                            inputHeader: "Child's NRB birth registration",
                            icon: icons.fullName,
                            value: "",
                            name: "firstname",
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
                            inputHeader: "Child's Registration Number",
                            icon: icons.fullName,
                            value: "",
                            name: "lastname",
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
                            inputHeader: "Birth Weight/First weight (kg)*",
                            icon: icons.fullName,
                            value: "",
                            name: "middleName",
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
                            icon: icons.phone,
                            value: "",
                            name: "phoneNumber",
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
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "Pulse Rate Reason",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 2,
                                    name: ">3 doses of TdV in past 5 years",
                                },
                                {
                                    id: 3,
                                    name: "1-4 doses of TdV in the past",
                                },
                                {
                                    id: 4,
                                    name: "Tdv not received",
                                },
                                {
                                    id: 5,
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
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "Pulse Rate Reason",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Patient uncooperative",
                                },
                                {
                                    id: 2,
                                    name: "Yes",
                                },
                                {
                                    id: 3,
                                    name: "No",
                                },
                                {
                                    id: 4,
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
                            isMultiSelect: true,
                            popOver: true,
                            value: "",
                            name: "Pulse Rate Reason",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Patient uncooperative",
                                },
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
    persist: true,
});
