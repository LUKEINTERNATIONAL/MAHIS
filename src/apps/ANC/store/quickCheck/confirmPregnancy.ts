import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useConfirmPregnancyStore = defineStore("confirmPregnancyStore", {
    state: () => ({
        ConfirmPregnancy: [
            {
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                    },
                    data: [
                        {
                            value: "Y",
                            name: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            value: "No",
                            name: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
        ],
        PlannedPregnancy: [
            {
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Was the pregnancy planned?",
                        selectedValue: "",
                    },
                    data: [
                        {
                            value: "Y",
                            name: "Yes",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                        {
                            value: "N",
                            name: "No",
                            labelPlacement: "start",
                            colSize: "7",
                            justify: "space-between",
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPersonalInformation(data: any) {
            // this.ConfirmedPregnancy = data
        },
    },
    persist: true,
});
