import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialFollowUp = [
    {
        checkboxBtnContent: {
            data: [
                {
                    name: "Change guardian",
                    value: "Change guardian",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 2,
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
                            displayNone: true,
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
        sideColSize: 2,
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
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        sideColSize: 2,
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
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        sideColSize: 2,
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
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        sideColSize: 2,
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
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        sideColSize: 2,
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
                            displayNone: true,
                            selectedID: "",
                            popOverData: {
                                filterData: false,
                                data: [],
                            },
                        },
                    ],
                },
            ],
        },
    },
    {
        checkboxBtnContent: {
            data: [
                {
                    name: "Vaccine adverse effects",
                    value: "Vaccine adverse effects",
                    checked: false,
                },
            ],
        },
    },
    {
        sideColSize: 2,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "",
                            icon: icons.search,
                            valueType: "text",
                            isMultiSelect: true,
                            popOver: true,
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
                            displayNone: true,
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useFollowUpStoreStore = defineStore("followUpStoreStore", {
    state: () => ({
        followUpStore: [...initialFollowUp] as any,
    }),
    actions: {
        setFollowUp(data: any) {
            this.followUpStore = data;
        },
        getInitialFollowUp() {
            const data = _.cloneDeep(initialFollowUp);
            return [...data];
        },
    },
    persist: true,
});
