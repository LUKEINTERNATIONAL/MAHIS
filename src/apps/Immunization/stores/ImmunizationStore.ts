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
                            name: "Penta 1",
                            value: "Penta 1",
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
                            name: "Penta 2",
                            value: "Penta 2",
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
                            name: "Penta 3",
                            value: "Penta 3",
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
    }),
    actions: {
        setDiagnosis(data: any) {
            this.birthImmunization = data;
        },
    },
    persist: true,
});
