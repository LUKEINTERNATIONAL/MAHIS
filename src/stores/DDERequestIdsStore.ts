import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";
import _ from "lodash";
const initialDDEIds = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Number of DDE ids to request",
                            value: "",
                            name: "dde_ids",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useDDERequestIds = defineStore("DDERequestIds", {
    state: () => ({
        DDERequestIds: [...initialDDEIds] as any,
    }),
    actions: {
        setDDERequestIds(data: any) {
            this.DDERequestIds = data;
        },
        getInitialDDEIds() {
            const data = _.cloneDeep(initialDDEIds);
            return [...data];
        },
    },
});
