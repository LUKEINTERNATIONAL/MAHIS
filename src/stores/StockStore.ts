import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialStock = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Product Name *",
                            icon: icons.search,
                            value: "",
                            name: "product name",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isSingleSelect: true,
                            trackBy: "concept_id",
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
                            inputHeader: "Batch No.*",
                            iconRight: icons.scannerIcon,
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
                            inputHeader: "Manufacturer*",
                            value: "",
                            name: "manufacture",
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
                            inputHeader: "Wasted vial",
                            value: "",
                            name: "doses_wasted",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isNumber",
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
                            inputHeader: "Expire date*",
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "expire date",
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
        radioBtnContent: {
            header: {
                title: "Dosage Form*",
                selectedValue: "",
                name: "dosage_form",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "vial",
                    value: "vial",
                    colSize: "3.3",
                },
                {
                    name: "ampoule",
                    value: "ampoule",
                    colSize: "4.7",
                },
                {
                    name: "tablet",
                    value: "tablet",
                    colSize: "3.7",
                },
            ],
        },
    },
    {
        radioBtnContent: {
            header: {
                title: "VVM stage",
                selectedValue: "",
                name: "vvm_stage",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "1",
                    value: "1",
                    colSize: "2.5",
                },
                {
                    name: "2",
                    value: "2",
                    colSize: "2.5",
                },
                {
                    name: "3",
                    value: "3",
                    colSize: "2.5",
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
                            inputHeader: "Stock Received*",
                            value: "",
                            name: "quantity",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validationFunctionName: "isNumber",
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
                            inputHeader: "Date Received:",
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "delivery_date",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
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
                            inputHeader: "No. of doses in a vial*",
                            value: "",
                            name: "unit_doses",
                            eventType: "input",
                            alertsErrorMassage: "",
                            valueType: "text",
                            validationFunctionName: "isNumber",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useStockStore = defineStore("stockStore", {
    state: () => ({
        stock: [...initialStock] as any,
    }),
    actions: {
        setStock(data: any) {
            this.stock = data;
        },
        getInitialStock() {
            const data = _.cloneDeep(initialStock);
            return [...data];
        },
    },
});
