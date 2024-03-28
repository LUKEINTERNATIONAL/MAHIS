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
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Wound Dressing",
                            value: "Wound Dressing",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Wound dressing",
                            showDatePopover: false,
                            eventType: "input",
                            displayNone: true,
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
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Patient education",
                            value: "Patient education",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Patient education",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
                        },
                    ],
                },
            },
            {
                classDash: "dashed_bottom_border",
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "",
                    },
                    data: [
                        {
                            colSize: 4.2,
                            name: "Counselling",
                            value: "Counselling",
                            checked: false,
                        },
                    ],
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            name: "Counselling",
                            eventType: "input",
                            isDatePopover: true,
                            displayNone: true,
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
                    inputFields: [
                        {
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            value: "",
                            eventType: "input",
                            name: "Minor Surgery",
                            isDatePopover: true,
                            displayNone: true,
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
