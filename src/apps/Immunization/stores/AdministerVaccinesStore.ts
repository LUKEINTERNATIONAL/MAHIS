import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialAdministerVaccine = [
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
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useAdministerVaccineStore = defineStore("administerVaccineStore", {
    state: () => ({
        administerVaccine: [...initialAdministerVaccine] as any,
    }),
    actions: {
        setAdministerVaccine(data: any) {
            this.administerVaccine = data;
        },
        getInitialSocialHistory() {
            const data = _.cloneDeep(initialAdministerVaccine);
            return [...data];
        },
    },
    // persist: true,
});
