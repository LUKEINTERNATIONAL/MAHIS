import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialStock = [
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
                            inputHeader: "Quantity*",
                            value: "",
                            name: "stock in",
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
                            inputHeader: "Delivery date",
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
