import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialAdministerOtherVaccine = [
    {
        isFinishBtn: false,
        validationStatus: "",

        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Batch Number",
                            value: "",
                            name: "Height",
                            required: true,
                            eventType: "input",
                            alertsError: false,
                            alertsErrorMassage: "",
                            disabled: false,
                            colSize: 12,
                        },
                        {
                            inputHeader: "Vaccine Name",
                            value: "",
                            name: "Height",
                            required: true,
                            eventType: "input",
                            alertsError: false,
                            alertsErrorMassage: "",
                            disabled: false,
                            colSize: 12,
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useAdministerOtherVaccineStore = defineStore("administerOtherVaccineStore", {
    state: () => ({
        administerOtherVaccine: [...initialAdministerOtherVaccine] as any,
    }),
    actions: {
        setAdministerOtherVaccine(data: any) {
            this.administerOtherVaccine = data;
        },
        getInitialSocialHistory() {
            const data = _.cloneDeep(initialAdministerOtherVaccine);
            return [...data];
        },
    },
    // persist: true,
});
