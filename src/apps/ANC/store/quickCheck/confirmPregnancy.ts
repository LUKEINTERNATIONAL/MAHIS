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
                        name:'Pregnancy confirmed'
                    },
                    data: [
                        {
                            value: "Yes",
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
                        name:'Pregnancy planned'
                    },
                    data: [
                        {
                            value: "Yes",
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
        ] as any,
    }),
    actions: {
        setPersonalInformation(data: any) {
            // this.ConfirmedPregnancy = data
        },
    },
    persist: true,
});
