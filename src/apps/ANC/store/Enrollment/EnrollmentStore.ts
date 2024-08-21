import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialEligibility = [
    {
        selectedData: [],
        isFinishBtn: false,

        checkboxBtnContent: {
            header: {
                title: "",
                name: "Confirmatory",
                selectedValue: "",
            },
            data: [
                {
                    name: "Confirm the client into ANC?",
                    value: "Confirmed",
                    colSize: "12",
                    checked: false,
                },
            ],
        },
    },
] as any;
export const useANCenrollementStore = defineStore("enrollementStore", {
    state: () => ({

        eligibility: [...initialEligibility] as any,
    }),
    actions: {
        setEligibility(data: any) {
            this.eligibility = data;
        },

    },
    persist: true,
});