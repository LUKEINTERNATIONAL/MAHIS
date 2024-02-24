import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useRegistrationStore = defineStore("registrationStore", {
    state: () => ({
        personInformation: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "National ID",
                                    iconRight: icons.scannerIcon,
                                    icon: icons.nationalID,
                                    value: "",
                                    name: "nationalID",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                    placeholder: "__-__-__-__",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "First name*",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "firstname",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Last name*",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "lastname",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Middle name",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "middleName",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Phone number",
                                    icon: icons.phone,
                                    value: "",
                                    name: "phoneNumber",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Date of birth*",
                                    icon: icons.calenderPrimary,
                                    value: "",
                                    name: "birthdate",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                    isDatePopover: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Estimated age",
                                    icon: icons.calenderPrimary,
                                    value: "",
                                    name: "estimation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                radioBtnContent: {
                    header: {
                        title: "Gender*",
                        selectedValue: "",
                        name: "gender",
                        alertsError: false,
                        alertsErrorMassage: "",
                    },
                    data: [
                        {
                            name: "Male",
                            value: "M",
                            colSize: "4",
                        },
                        {
                            name: "Female",
                            value: "F",
                        },
                    ],
                },
            },
        ] as any,
        socialHistory: [
            {
                selectedData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: "Marital status",
                        selectedValue: "",
                        name: "maritalStatus",
                        alertsError: false,
                        alertsErrorMassage: "",
                    },
                    data: [
                        {
                            name: "Single",
                            value: "single",
                        },
                        {
                            name: "Married",
                            value: "married",
                        },
                        {
                            name: "Widow",
                            value: "widow",
                        },
                        {
                            name: "Divorced",
                            value: "divorced",
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Religion",
                                    popOver: true,
                                    icon: icons.search,
                                    value: "",
                                    name: "religion",
                                    placeholder: "eg. Christian",
                                    eventType: "input",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
                radioBtnContent: {
                    header: {
                        title: "Occupation status",
                        name: "occupation",
                        selectedValue: "",
                    },
                    data: [
                        {
                            name: "Employed",
                            value: "employed",
                        },
                        {
                            name: "Unemployed",
                            value: "unemployed",
                        },
                        {
                            name: "Other",
                            value: "Other",
                        },
                    ],
                },
            },
        ] as any,
        homeLocation: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Home district",
                                    popOver: true,
                                    icon: icons.search,
                                    value: "",
                                    name: "homeDistrict",
                                    setName: "homeLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Home traditional authority",
                                    icon: icons.search,
                                    value: "",
                                    name: "homeTraditionalAuthority",
                                    setName: "homeLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                    displayNone: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Home village",
                                    icon: icons.search,
                                    value: "",
                                    name: "homeVillage",
                                    setName: "homeLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "traditional_authority_id",
                                    displayNone: true,
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
        currentLocation: [
            {
                selectedData: [],
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Current district",
                                    icon: icons.search,
                                    value: "",
                                    name: "currentDistrict",
                                    setName: "currentLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Current traditional authority",
                                    icon: icons.search,
                                    value: "",
                                    name: "currentTraditionalAuthority",
                                    setName: "currentLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "district_id",
                                    displayNone: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Current village",
                                    icon: icons.search,
                                    value: "",
                                    name: "currentVillage",
                                    setName: "currentLocation",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    popOverData: {
                                        filterData: true,
                                        data: [],
                                    },
                                    id: "",
                                    idName: "traditional_authority_id",
                                    displayNone: true,
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Closest landmark/Plotnumber",
                                    icon: icons.search,
                                    name: "closestLandmark",
                                    value: "",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
        guardianInformation: [
            {
                selectedData: {},
                isFinishBtn: false,
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "First name",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "guardianFirstname",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Last name",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "guardianLastname",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Middle name",
                                    icon: icons.fullName,
                                    value: "",
                                    name: "guardianMiddleName",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Phone number",
                                    icon: icons.phone,
                                    value: "",
                                    name: "guardianPhoneNumber",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: "Relationship to patient",
                                    icon: icons.search,
                                    value: "",
                                    name: "relationship",
                                    eventType: "input",
                                    alertsError: false,
                                    alertsErrorMassage: "",
                                    selectedID: "",
                                    popOverData: {
                                        filterData: false,
                                        data: [],
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPersonalInformation(data: any) {
            this.personInformation = data;
        },
        setSocialHistory(data: any) {
            this.socialHistory = data;
        },
        setHomeLocation(data: any) {
            this.homeLocation = data;
        },
        setCurrentLocation(data: any) {
            this.currentLocation = data;
        },
        setGuardianInformation(data: any) {
            this.guardianInformation = data;
        },
    },
    persist: true,
});
