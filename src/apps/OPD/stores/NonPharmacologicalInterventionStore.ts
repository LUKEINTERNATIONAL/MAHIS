import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import Display from "../../../composables/display";

export const useNonPharmacologicalInterventionStore = defineStore("nonPharmacologicalInterventionStore", {
    state: () => ({
        nonPharmacologicalIntervention: [
            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Wound dressing",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Wound dressing",
                            value: "Wound dressing",
                            checked: false,
                        },
                    ],
                },
            },

            {
                selectedData: [],
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "Patient education",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Patient education",
                            value: "Patient education",
                            checked: false,
                        },
                    ],

                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Counselling",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Counselling",
                            value: "Counselling",
                            checked: false,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "Minor Surgery",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Minor Surgery",
                            value: "Minor Surgery",
                            checked: false,
                        },
                    ],
                },
            },
        ],
    }),
    actions: {
        setPregnancy(data: any) {
            this.nonPharmacologicalIntervention = data;
        },
    },
    persist: true,
});
