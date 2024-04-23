import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationStore = defineStore("ImmunizationStore", {
    state: () => ({
        birthImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "OPV 0",
                            value: "OPV 0",
                            checked: false,
                        },
                        {
                            name: "BCG",
                            value: "BCG",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setDiagnosis(data: any) {
            this.diagnosis = data;
        },
    },
    persist: true,
});
