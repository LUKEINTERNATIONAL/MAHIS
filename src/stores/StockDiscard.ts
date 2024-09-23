import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";
import _ from "lodash";
const initialStockDiscard = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Quantity*",
                            icon: icons.weight,
                            valueType: "number",
                            value: "",
                            name: "quantity",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
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
                            inputHeader: "Reason *",
                            icon: icons.search,
                            valueType: "text",
                            isSingleSelect: true,
                            popOver: true,
                            value: "",
                            name: "reason",
                            validationFunctionName: "required",
                            trackBy: "id",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "VVM stage > 2",
                                },
                                {
                                    id: 2,
                                    name: "Frozen",
                                },
                                {
                                    id: 3,
                                    name: "Damage",
                                },
                                {
                                    id: 4,
                                    name: "Wastage",
                                },
                            ],
                            eventType: "input",
                            required: true,
                            alertsErrorMassage: "",
                            id: "",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useStockDiscard = defineStore("stockDiscard", {
    state: () => ({
        stockDiscard: [...initialStockDiscard] as any,
    }),
    actions: {
        setStockDiscard(data: any) {
            this.stockDiscard = data;
        },
        getInitialStockDiscard() {
            const data = _.cloneDeep(initialStockDiscard);
            return [...data];
        },
    },
    persist: true,
});
