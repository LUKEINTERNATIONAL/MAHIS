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
                    ],
                },
            },
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
                            name: "BCG",
                            value: "BCG",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        sixWeeksImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "6 Weeks",
                    },
                    data: [
                        {
                            name: "OPV 1",
                            value: "OPV 1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "6 Weeks",
                    },
                    data: [
                        {
                            name: "Pentavalent 1",
                            value: "Pentavalent 1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "6 Weeks",
                    },
                    data: [
                        {
                            name: "PCV 1",
                            value: "PCV 1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "6 Weeks",
                    },
                    data: [
                        {
                            name: "Rota 1",
                            value: "Rota 1",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        tenWeeksImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "OPV 2",
                            value: "OPV 2",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "Pentavalent 2",
                            value: "Pentavalent 2",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "PCV 2",
                            value: "PCV 2",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "Rota 2",
                            value: "Rota 2",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        fourteenWeeksImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "OPV 3",
                            value: "OPV 3",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "Pentavalent 3",
                            value: "Pentavalent 3",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "PCV 3",
                            value: "PCV 3",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "",
                        selectedValue: "",
                        name: "10 Weeks",
                    },
                    data: [
                        {
                            name: "IPV",
                            value: "IPV",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        fiveToTwentyTwoImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "5 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "Malaria Vaccine 1",
                            value: "Malaria Vaccine 1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "6 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "Malaria Vaccine 2",
                            value: "Malaria Vaccine 2",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "7 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "Malaria Vaccine 3",
                            value: "Malaria Vaccine 3",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "9 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "MR 1",
                            value: "MR 1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "9 months – under 15 years",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "TCV",
                            value: "TCV",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "15 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "MR 2",
                            value: "MR 2",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "22 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "Malaria Vaccine 4",
                            value: "Malaria Vaccine 4",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        oneYearToFiveYearsImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "1 Year",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "1 Year 6 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "2 Years",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "2 Years 6 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "3 Years",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "3 Year 6 Months",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "4 Years",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "4 Years 6 Month",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "5 Years",
                        class: "bold",
                        selectedValue: "",
                        name: "birth immunization",
                    },
                    data: [
                        {
                            name: "vitamin A",
                            value: "vitamin A",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        nineToFourteenYearsImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "1st Dose",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "HPV1",
                            value: "HPV1",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "2nd dose after 6 months",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "HPV2",
                            value: "HPV2",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        twelveYearsAboveImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "Pfizer",
                            value: "Pfizer",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        fifteenYearsImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "1st Dose",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "TD",
                            value: "TD",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "2nd after 4 weeks",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "TD",
                            value: "TD",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "3rd after 6 months",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "TD",
                            value: "TD",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: "4th after 5 years",
                        class: "bold",
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "TD",
                            value: "TD",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
        eighteenYearsAboveImmunization: [
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "AstraZeneca",
                            value: "AstraZeneca",
                            checked: false,
                        },
                    ],
                },
            },
            {
                selectedData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        selectedValue: "",
                        name: "moreThan5",
                    },
                    data: [
                        {
                            name: "Janssen (Johnson & Johnson)",
                            value: "Janssen (Johnson & Johnson)",
                            checked: false,
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setDiagnosis(data: any) {
            this.birthImmunization = data;
        },
    },
    persist: true,
});
