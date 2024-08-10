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
                            inputHeader: "Manufacturer",
                            value: "",
                            name: "manufacturer",
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
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Dosage Form",
                            icon: icons.search,
                            value: "",
                            name: "dosage form",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                { id: 1, name: "vial" },
                                { id: 2, name: "ampoule" },
                                { id: 3, name: "tablet" },
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
                            inputHeader: "VVM stage",
                            icon: icons.search,
                            value: "",
                            name: "vvm stage",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "required",
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                { id: 1, name: "1" },
                                { id: 2, name: "2" },
                                { id: 3, name: "3" },
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
                            inputHeader: "Stock Received*",
                            value: "",
                            name: "stock received",
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
        selectedData: {},
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Unit doses",
                            value: "",
                            name: "unit doses",
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
