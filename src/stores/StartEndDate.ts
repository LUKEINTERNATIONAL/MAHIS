import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";
import _ from "lodash";
const initialStartEndDate = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Start date",
                            icon: icons.calenderPrimary,
                            value: HisDate.toStandardHisDisplayFormat(HisDate.currentDate()),
                            name: "start_date",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
                        },
                        {
                            inputHeader: "End date",
                            icon: icons.calenderPrimary,
                            value: HisDate.toStandardHisDisplayFormat(HisDate.currentDate()),
                            name: "end_date",
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                            isDatePopover: true,
                            minDate: HisDate.currentDate(),
                            maxDate: "",
                            validationFunctionName: "required",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useStartEndDate = defineStore("startEndDate", {
    state: () => ({
        startEndDate: [...initialStartEndDate] as any,
    }),
    actions: {
        setStartEndDate(data: any) {
            this.startEndDate = data;
        },
        getInitialStartEndDate() {
            const data = _.cloneDeep(initialStartEndDate);
            return [...data];
        },
    },
});
