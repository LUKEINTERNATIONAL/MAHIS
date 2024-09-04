import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialImmunizationSessions = [
    {
        selectedData: {},
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Session name",
                            value: "",
                            name: "batch",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "required",
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
                            inputHeader: "Start Date",
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "start date",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
                            minDate: "",
                            maxDate: "",
                            validationFunctionName: "required",
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
                            inputHeader: "End date",
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "end date",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
                            minDate: "",
                            maxDate: "",
                            validationFunctionName: "required",
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
                            inputHeader: "Session type",
                            icon: icons.search,
                            value: "",
                            name: "product name",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                {
                                    id: "1",
                                    name: "Static",
                                },
                                {
                                    id: "2",
                                    name: "Outreach",
                                },
                            ],
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
                            inputHeader: "Repeat",
                            icon: icons.search,
                            value: "",
                            name: "repeat",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                {
                                    id: "1",
                                    name: "Never",
                                },
                                {
                                    id: "2",
                                    name: "Daily",
                                },
                                {
                                    id: "3",
                                    name: "Weekly",
                                },
                                {
                                    id: "4",
                                    name: "Monthly",
                                },
                            ],
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
                            inputHeader: "Target",
                            value: "",
                            name: "target",
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
        selectedData: {},
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Vaccines",
                            icon: icons.search,
                            value: [],
                            name: "vaccines",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isMultiSelect: true,
                            trackBy: "drug_id",
                            multiSelectData: [],
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
                            inputHeader: "Assignees",
                            icon: icons.search,
                            value: [],
                            name: "assignees",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isMultiSelect: true,
                            trackBy: "user_id",
                            multiSelectData: [],
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useImmunizationSessionsStore = defineStore("immunizationSessionsStore", {
    state: () => ({
        immunizationSessions: [...initialImmunizationSessions] as any,
    }),
    actions: {
        setImmunizationSessions(data: any) {
            this.immunizationSessions = data;
        },
        getImmunizationSessions() {
            const data = _.cloneDeep(initialImmunizationSessions);
            return [...data];
        },
    },
});
