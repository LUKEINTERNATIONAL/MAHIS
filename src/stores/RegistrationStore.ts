import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialPersonalInformation = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "National ID",
                            iconRight: "",
                            icon: icons.nationalID,
                            value: "",
                            name: "nationalID",
                            eventType: "input",
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
                            //disabled: true,
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
        selectedData: [],
        initial: [],
        isFinishBtn: false,
        sideColSize: 1,
        checkboxBtnContent: {
            header: {
                selectedValue: "",
                name: "Estimate",
            },
            data: [
                {
                    name: "Estimate Age",
                    value: "TB",
                    checked: false,
                },
            ],
        },
    },
    {
        childName: "Estimate Age",
        data: {
            rowData: [
                {
                    colData: [
                        // {
                        //     displayNone: true,
                        //     inputHeader: "Estimated age",
                        //     icon: icons.calenderPrimary,
                        //     value: "",
                        //     name: "estimation",
                        //     eventType: "input",
                        //     alertsErrorMassage: "",
                        //     required: true,
                        // },
                        {
                            displayNone: true,
                            inputHeader: "Estimated age",
                            value: "",
                            icon: icons.time,
                            name: "estimation",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            isChangeUnits: true,
                            id: "",
                            idName: "district_id",
                            unitsData: {
                                inputHeader: "Duration Units",
                                popOver: true,
                                icon: icons.search,
                                value: { id: "3", name: "Years" },
                                name: "units",
                                eventType: "input",
                                alertsErrorMassage: "",
                                isSingleSelect: true,
                                trackBy: "id",
                                multiSelectData: [
                                    { id: "1", name: "Days" },
                                    { id: "2", name: "Months" },
                                    { id: "3", name: "Years" },
                                ],
                                id: "",
                                idName: "district_id",
                            },
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
                            isPhoneInput: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialSocialHistory = [
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
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                { id: 1, name: "Christianity" },
                                { id: 2, name: "Islam" },
                                { id: 3, name: "Judaism" },
                                { id: 4, name: "Hinduism" },
                                { id: 5, name: "Buddhism" },
                                { id: 6, name: "Sikhism" },
                                { id: 7, name: "Jainism" },
                                { id: 8, name: "Bahá'í Faith" },
                                { id: 9, name: "Zoroastrianism" },
                                { id: 10, name: "Confucianism" },
                                { id: 11, name: "Taoism" },
                                { id: 12, name: "Shinto" },
                                { id: 13, name: "Baha'i Faith" },
                                { id: 14, name: "Juche" },
                                { id: 15, name: "Rastafari" },
                            ],
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
    {
        radioBtnContent: {
            header: {
                title: "Occupation status",
                name: "occupation",
                selectedValue: "",
                class: "bold",
            },
            data: [
                {
                    name: "Employed",
                    value: "employed",
                },
                {
                    name: "Student",
                    value: "Student",
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
    {
        selectedData: [],
        isFinishBtn: false,
        radioBtnContent: {
            header: {
                title: "Marital status",
                selectedValue: "",
                name: "maritalStatus",
                alertsErrorMassage: "",
                class: "bold",
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
                    name: "Widower",
                    value: "widower",
                },
                {
                    name: "Divorced",
                    value: "divorced",
                },
            ],
        },
    },
    {
        selectedData: [],
        isFinishBtn: false,
        radioBtnContent: {
            header: {
                title: "Highest Level Of Education",
                selectedValue: "",
                name: "highestLevelOfEducation",
                alertsErrorMassage: "",
                class: "bold",
            },
            data: [
                {
                    name: "No education",
                    value: "No education",
                },
                {
                    name: "Primary school",
                    value: "primary school",
                },
                {
                    name: "Secondary school",
                    value: "secondary school",
                },
                {
                    name: "Tertiary education",
                    value: "tertiary education",
                },
            ],
        },
    },
] as any;
const initialHomeLocation = [
    {
        selectdData: [],
        isFinishBtn: false,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
            },
            data: [
                {
                    name: "Same as current",
                    value: "sameas",
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Home district *",
                            popOver: true,
                            icon: icons.search,
                            value: "",
                            name: "home_district",
                            setName: "homeLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            trackBy: "district_id",
                            multiSelectData: [],
                            id: "",
                            idName: "district_id",
                            validationFunctionName: "required",
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
                            inputHeader: "Home traditional authority *",
                            icon: icons.search,
                            value: "",
                            name: "home_traditional_authority",
                            setName: "homeLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "traditional_authority_id",
                            multiSelectData: [],
                            idName: "district_id",
                            displayNone: true,
                            validationFunctionName: "required",
                        },
                    ],
                    btns: [
                        {
                            name: "TA",
                            fill: "clear",
                            btn_col_size: 2.1,
                            showName: false,
                            icon: icons.plus,
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
                            inputHeader: "Home village *",
                            icon: icons.search,
                            value: "",
                            name: "home_village",
                            setName: "homeLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "village_id",
                            multiSelectData: [],
                            idName: "traditional_authority_id",
                            displayNone: true,
                            validationFunctionName: "required",
                        },
                    ],
                    btns: [
                        {
                            name: "Village",
                            fill: "clear",
                            btn_col_size: 2.1,
                            showName: false,
                            icon: icons.plus,
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialCurrentLocation = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Current district*",
                            icon: icons.search,
                            value: "",
                            name: "current_district",
                            setName: "currentLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "district_id",
                            multiSelectData: [],
                            id: "",
                            idName: "district_id",
                            validationFunctionName: "required",
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
                            inputHeader: "Current traditional authority*",
                            icon: icons.search,
                            value: "",
                            name: "current_traditional_authority",
                            setName: "currentLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "traditional_authority_id",
                            multiSelectData: [],
                            id: "",
                            idName: "district_id",
                            displayNone: true,
                            validationFunctionName: "required",
                        },
                    ],
                    btns: [
                        {
                            name: "TA",
                            fill: "clear",
                            btn_col_size: 2.1,
                            showName: false,
                            icon: icons.plus,
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
                            inputHeader: "Current village*",
                            icon: icons.search,
                            value: "",
                            name: "current_village",
                            setName: "currentLocation",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            popOver: true,
                            trackBy: "village_id",
                            multiSelectData: [],
                            id: "",
                            idName: "village_id",
                            displayNone: true,
                            validationFunctionName: "required",
                        },
                    ],
                    btns: [
                        {
                            name: "Village",
                            fill: "clear",
                            btn_col_size: 2.1,
                            showName: false,
                            icon: icons.plus,
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
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            trackBy: "id",
                            multiSelectData: [
                                {
                                    id: 1,
                                    name: "Church",
                                },

                                {
                                    id: 2,
                                    name: "Mosque",
                                },
                                {
                                    id: 3,
                                    name: "Primary School",
                                },
                                {
                                    id: 4,
                                    name: "Borehole",
                                },
                                {
                                    id: 5,
                                    name: "Secondary School",
                                },
                                {
                                    id: 6,
                                    name: "College",
                                },
                                {
                                    id: 7,
                                    name: "Market",
                                },
                                {
                                    id: 8,
                                    name: "Football Ground",
                                },
                                {
                                    id: 9,
                                    name: "Other",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        sectionHeader: "",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class: "",
                            displayNone: true,
                            inputHeader: "Specify Landmark*",
                            value: "",
                            icon: icons.editPen,
                            name: "Other (specify)",
                            valueType: "text",
                            eventType: "input",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialCountry = [
    {
        selectedData: [],
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Country*",
                            icon: icons.search,
                            value: {
                                district_id: 292,
                                name: "Malawi",
                            },
                            name: "country",
                            setName: "country",
                            eventType: "input",
                            alertsErrorMassage: "",
                            isSingleSelect: true,
                            hide_selected: true,
                            popOver: true,
                            trackBy: "district_id",
                            multiSelectData: [],
                            id: "",
                            idName: "district_id",
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialAddTA = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "TA*",
                            value: "",
                            name: "TA",
                            eventType: "input",
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
                            inputHeader: "Village*",
                            value: "",
                            name: "Village",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validate: false,
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialAddVillage = [
    {
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Village*",
                            value: "",
                            name: "Village",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validate: false,
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialGuardianInformation = [
    {
        selectedData: {},
        isFinishBtn: false,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            inputHeader: "Guardian National ID",
                            iconRight: "",
                            icon: icons.nationalID,
                            value: "",
                            name: "guardianNationalID",
                            eventType: "input",
                            alertsErrorMassage: "",
                            placeholder: "__-__-__-__",
                            displayNone: true,
                        },
                    ],
                },
            ],
        },
    },

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
                            alertsErrorMassage: "",
                            validationFunctionName: "isNameEmpty",
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
                            alertsErrorMassage: "",
                            validationFunctionName: "isNameEmpty",
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
                            alertsErrorMassage: "",
                            validationFunctionName: "isNamesEmpty",
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
                            isPhoneInput: true,
                            value: "",
                            name: "guardianPhoneNumber",
                            eventType: "input",
                            alertsErrorMassage: "",
                            validationFunctionName: "isMWPhoneNumber",
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
                            inputHeader: "Relationship to patient *",
                            icon: icons.search,
                            value: "",
                            name: "relationship",
                            eventType: "input",
                            alertsErrorMassage: "",
                            selectedID: "",
                            validationFunctionName: "isNameWithSlush",
                            isSingleSelect: true,
                            trackBy: "trackByID",
                            multiSelectData: [],
                        },
                    ],
                },
            ],
        },
    },
] as any;

export const useRegistrationStore = defineStore("registrationStore", {
    state: () => ({
        personInformation: [...initialPersonalInformation],
        socialHistory: [...initialSocialHistory],
        homeLocation: [...initialHomeLocation],
        currentLocation: [...initialCurrentLocation],
        country: [...initialCountry],
        guardianInformation: [...initialGuardianInformation],
        addTA: [...initialAddTA],
        addVillage: [...initialAddVillage],
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
        setCountry(data: any) {
            this.country = data;
        },
        setGuardianInformation(data: any) {
            this.guardianInformation = data;
        },

        getInitialPersonalInformation() {
            const data = _.cloneDeep(initialPersonalInformation);
            return [...data];
        },
        getInitialSocialHistory() {
            const data = _.cloneDeep(initialSocialHistory);
            return [...data];
        },
        getInitialHomeLocation() {
            const data = _.cloneDeep(initialHomeLocation);
            return [...data];
        },
        getInitialCurrentLocation() {
            const data = _.cloneDeep(initialCurrentLocation);
            return [...data];
        },
        getInitialCountry() {
            const data = _.cloneDeep(initialCountry);
            return [...data];
        },
        getInitialGuardianInformation() {
            const data = _.cloneDeep(initialGuardianInformation);
            return [...data];
        },
    },
    persist: true,
});
