import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const usePregnancyStore = defineStore("pregnancyStore", {
    state: () => ({
        pregnancy: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Are you pregnant?",
                        name: "Patient pregnant",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            colSize: 2,
                        },
                        {
                            name: "No",
                            value: "No",
                            colSize: 2,
                        },
                    ],
                },
            },
            {
                radioBtnContent: {
                    header: {
                        title: "Breastfeeding?",
                        name: "Is patient breast feeding",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Yes",
                            value: "Yes",
                            colSize: 2,
                        },
                        {
                            name: "No",
                            value: "No",
                            colSize: 2,
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPregnancy(data: any) {
            this.pregnancy = data;
        },
    },
    persist: true,
});
