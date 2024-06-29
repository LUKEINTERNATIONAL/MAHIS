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
                name: "ANC eligibility",
                selectedValue: "",
            },
            data: [
                {
                    name: "Confirm the client into ANC?",
                    value: "Confirm the client into ANC",
                    colSize: "12",
                    checked: false,
                },
            ],
        },
    },
] as any;
const initialANCNumber = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            iconRight: icons.editStarts,
                            leftText: "",
                            value: "",
                            name: "ANCNumber",
                            placeholder: "__-__-__-__",
                            eventType: "input",
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useANCenrollementStore = defineStore("enrollementStore", {
    state: () => ({

        eligibility: [...initialEligibility] as any,
        ANCNumber: [...initialANCNumber],
    }),
    actions: {
        setEligibility(data: any) {
            this.eligibility = data;
        },
        setANCNumber(data: any) {
            this.ANCNumber = data;
        },
    },
    persist: true,
});
