import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialSessionDate = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            icon: icons.calenderPrimary,
                            value: "",
                            name: "sessionDate",
                            eventType: "input",
                            alertsError: false,
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useConfigStore = defineStore("configStore", {
    state: () => ({
        sessionDate: [...initialSessionDate],
    }),
    actions: {
        setPersonalInformation(data: any) {
            this.sessionDate = data;
        },
        getInitialSessionDate() {
            const data = _.cloneDeep(initialSessionDate);
            return [...data];
        },
    },
    persist: true,
});
