import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";
import _ from "lodash";
const initialSitePrefix = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "",
                            value: "",
                            name: "site_prefix",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                        },
                    ],
                    btns: [
                        {
                            name: "Save",
                            fill: "solid",
                            btn_col_size: 3,
                            showName: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useSitePrefix = defineStore("sitePrefix", {
    state: () => ({
        sitePrefix: [...initialSitePrefix] as any,
    }),
    actions: {
        setSitePrefix(data: any) {
            this.sitePrefix = data;
        },
        getInitialSitePrefix() {
            const data = _.cloneDeep(initialSitePrefix);
            return [...data];
        },
    },
});
