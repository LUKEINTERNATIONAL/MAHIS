import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";
import _ from "lodash";
const initialName = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Search",
                            icon: icons.search,
                            value: "",
                            name: "search",
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
export const useSearchName = defineStore("searchName", {
    state: () => ({
        searchName: [...initialName] as any,
    }),
    actions: {
        setsearchName(data: any) {
            this.searchName = data;
        },
        getInitialName() {
            const data = _.cloneDeep(initialName);
            return [...data];
        },
    },
});
