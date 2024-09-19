import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _, { initial } from "lodash";
const initialLMNP = [
    {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "LNMP Known?",
                selectedValue: "",
                name: "LNMP Known?",
                displayNext: "Yes",
                alertsErrorMassage: "",
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        childName: "LNMP Known?",
        sectionHeader: "",
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            class: "bold",
                            inputHeader: "LNMP date",
                            value: "",
                            name: "lmnpDate",
                            eventType: "input",
                            minDate: "",
                            maxDate: "",
                            valueType: "text",
                            alertsErrorMassage: "",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            inputWidth: "100%",
                        },
                    ],
                },
            ],
        },
        alerts: [
            {
                backgroundColor: "",
                status: "",
                icon: icons.editPen,
                textColor: "",
                value: "",
                name: "",
                index: "",
            },
        ],
    },
    {
        childName: "LNMP Known?",
        sectionHeader: "",
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            class: "bold",
                            inputHeader: "Gestation age",
                            value: "",
                            name: "lmnpGestationAge",
                            eventType: "input",
                            valueType: "text",
                            alertsErrorMassage: "",
                            inputWidth: "100%",
                            unit: "Weeks",
                            disabled: "disabled",
                        },
                        {
                            // displayNone: true,
                            class: "bold",
                            inputHeader: "EDD",
                            value: "",
                            name: "Estimated date of delivery",
                            eventType: "input",
                            valueType: "text",
                            alertsErrorMassage: "",
                            inputWidth: "100%",
                            disabled: "disabled",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "Ultrasound done?",
                selectedValue: "",
                name: "Ultrasound done?",
                displayNext: "Yes",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        childName: "Ultrasound done?",
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class: "bold",
                            displayNone: true,
                            inputHeader: "Date for ultrasound",
                            value: "",
                            name: "Ultrasound",
                            minDate: "",
                            maxDate: "",
                            required: true,
                            eventType: "input",
                            valueType: "text",
                            alertsErrorMassage: "",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            inputWidth: "100%",
                        },
                        {
                            class: "bold",
                            inputHeader: "Gestation age from ultrasound",
                            value: "",
                            name: "specify",
                            required: true,
                            eventType: "input",
                            valueType: "text",
                            alertsErrorMassage: "",
                            icon: icons.editPen,
                            placeholder: "",
                            inputWidth: "100%",
                        },
                    ],
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        childName: "Ultrasound done?",
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "LMNP date from ultrasound",
                            value: "",
                            name: "ultrasound lmnp date",
                            required: true,
                            eventType: "input",
                            minDate: "2023-01-01",
                            maxDate: "2060-01-01",
                            alertsErrorMassage: "",
                            icon: icons.calenderPrimary,
                            disabled: "disabled",
                            inputWidth: "100%",
                            valueType: "text",
                        },
                        {
                            // displayNone: true,
                            inputHeader: "EDD",
                            value: "",
                            name: "Estimated date of delivery from ultrasound",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            minDate: "2023-01-01",
                            maxDate: "2060-01-01",
                            icon: icons.calenderPrimary,
                            disabled: "disabled",
                            inputWidth: "100%",
                            valueType: "text",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "Gestation age by Palpation known?",
                selectedValue: "",
                name: "Gestation",
                displayNext: "Yes",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "Yes",
                    value: "Yes",
                    colSize: "2",
                },
                {
                    name: "No",
                    value: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        sideColSize: 0.5,
        childName: "Gestation",
        isFinishBtn: false,
        class: "bold",
        classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Enter gestation age by palpation",
                            value: "",
                            class: "bold",
                            name: "Gestation age by palpation",
                            required: true,
                            eventType: "input",
                            valueType: "text",
                            alertsErrorMassage: "",
                            icon: icons.editPen,
                            inputWidth: "100%",
                        },
                        {
                            inputHeader: "EDD",
                            value: "",
                            name: "date of delivery",
                            required: true,
                            eventType: "input",
                            alertsErrorMassage: "",
                            //isDatePopover: true,
                            disabled: "disabled",
                            icon: icons.calenderPrimary,
                            placeholder: "Pick date",
                            inputWidth: "100%",
                        },
                    ],
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "Gestation age to be used",
                selectedValue: "",
                name: "Gestation age to be used",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "GA by  LNMP",
                    value: "GA by  LNMP",
                    colSize: "7",
                },
                {
                    name: "GA by ultrasound",
                    value: "ga by ultrasound",
                    colSize: "7",
                },
                {
                    name: "GA by palpation",
                    value: "Ga by palpation",
                    colSize: "7",
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "The woman received tetanus doses for immunization*?",
                selectedValue: "",
                name: "The woman received tetanus doses for immunization?",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "Fully Immunised",
                    value: "fully immunised",
                    colSize: "4",
                },
                {
                    name: "Under Immunised",
                    value: "under immunised",
                    colSize: "4",
                },
                {
                    name: "No doses",
                    value: "no doses",
                    colSize: "4.001",
                },
                {
                    name: "Unknown doses",
                    value: "unknown doses",
                    colSize: "4",
                },
            ],
        },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        // classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "Number of under immunised tetanus doses*",
                selectedValue: "",
                displayNone: true,
                name: "Number of tetanus doses",
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "One dose",
                    value: "one dose",
                    colSize: "4",
                },
                {
                    name: "Two doses",
                    value: "two doses",
                    colSize: "4",
                },
                {
                    name: "Three doses",
                    value: "three doses",
                    colSize: "4.001",
                },
                {
                    name: "Four doses",
                    value: "four doses",
                    colSize: "4",
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        classDash: "",
        sideColSize: 0.5,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "TTV 1 immunisation date*",
                            value: "",
                            name: "tt6Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        classDash: "",
        sideColSize: 0.5,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "TTV 1 immunisation date*",
                            value: "",
                            name: "tt7Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "",
                            alertsErrorMassage: "",
                        },
                        {
                            displayNone: true,
                            inputHeader: "TTV 2 immunisation date*",
                            value: "",
                            name: "tt8Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        isFinishBtn: false,
        //classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "TTV 1 immunisation date*",
                            value: "",
                            name: "tt9Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            displayNone: true,
                            inputHeader: "TTV 2 immunisation date*",
                            value: "",
                            name: "tt10Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "",
                            alertsErrorMassage: "",
                        },
                        {
                            displayNone: true,
                            inputHeader: "TTV 3 immunisation date*",
                            value: "",
                            name: "tt11Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        sideColSize: 0.5,
        //classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "TTV 1 immunisation date*",
                            value: "",
                            name: "tt1Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            //displayNone: true,
                            inputHeader: "TTV 2 immunisation date*",
                            value: "",
                            name: "tt2Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            // displayNone: true,
                            inputHeader: "TTV 3 immunisation date*",
                            value: "",
                            name: "tt3Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            //displayNone: true,
                            inputHeader: "TTV 4 immunisation date*",
                            value: "",
                            name: "tt4Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            displayNone: true,
                            inputHeader: "TTV 5 immunisation date*",
                            value: "",
                            name: "tt5Date",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        sideColSize: 0.5,
        //classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "TTV 1 immunisation date*",
                            value: "",
                            name: "12",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            //displayNone: true,
                            inputHeader: "TTV 2 immunisation date*",
                            value: "",
                            name: "13",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            // displayNone: true,
                            inputHeader: "TTV 3 immunisation date*",
                            value: "",
                            name: "14",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                        {
                            //displayNone: true,
                            inputHeader: "TTV 4 immunisation date",
                            value: "",
                            name: "15",
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: "Pick the date",
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
    {
        isFinishBtn: false,
        sideColSize: 0.5,
        //classDash: "dashed_bottom_border",
        data: {
            rowData: [
                {
                    colData: [
                        // {
                        //   displayNone: true,
                        //   inputHeader: "TTV 3 immunisation date",
                        //   value: "",
                        //   name: "immunised doses",
                        //   isDatePopover: true,
                        //   icon: icons.calenderPrimary,
                        //   placeholder: "",
                        //   required: true,
                        //   eventType: "input",
                        //   inputWidth: "100%",
                        //   alertsErrorMassage: "",
                        // },
                        // {
                        //   //displayNone: true,
                        //   inputHeader: "TTV 4 immunisation date",
                        //   value: "",
                        //   name: "underimmunised3",
                        //   isDatePopover: true,
                        //   icon: icons.calenderPrimary,
                        //   placeholder: "Pick the date",
                        //   required: true,
                        //   eventType: "input",
                        //   inputWidth: "100%",
                        //   alertsErrorMassage: "",
                        // },
                    ],
                },
            ],
        },
    },

    {
        sideColSize: 0.5,
        selectdData: [],
        isFinishBtn: false,
        //classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                class: "bold",
                title: "Reason Tetanus toxoid (TT) was not conducted*",
                name: "Reason Tetanus toxoid (TT) was not conducted",
                selectedValue: "",
                displayNone: true,
                alertsErrorMassage: "",
            },
            data: [
                {
                    name: "Stockout",
                    value: "stockout",
                    colSize: "5",
                },
                {
                    name: "Client is ill",
                    value: "client is ill",
                    colSize: "5",
                },
                {
                    name: "Client refused",
                    value: "client refused",
                    colSize: "5",
                },
                {
                    name: "Allergy to vaccine",
                    value: "allergy",
                    colSize: "5",
                },
                {
                    name: "Other",
                    value: "other",
                    colSize: "5",
                },
            ],
        },
    },
    {
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        isFinishBtn: false,
        sectionHeader: "",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify other reasons",
                            value: "",
                            name: "Other",
                            icon: icons.editPen,
                            required: true,
                            eventType: "input",
                            inputWidth: "100%",
                            alertsErrorMassage: "",
                        },
                    ],
                },
            ],
        },
    },
] as any;
const initialUltraSound = [] as any;
const initialTetenus = [] as any;
export const useCurrentPregnanciesStore = defineStore("currentPregnanciesStore", {
    state: () => ({
        palpation: [] as any,
        lmnp: [...initialLMNP] as any,
        ultrasound: [...initialUltraSound] as any,
        tetanus: [...initialTetenus] as any,
    }),
    actions: {
        setTetanus(data: any) {
            this.tetanus = data;
        },
        setLMNP(data: any) {
            this.lmnp = data;
        },
        setUltrasound(data: any) {
            this.ultrasound = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialLMNP);
            return [...data]; // Return a copy of the initial state
        },
        getInitial1() {
            const data = _.cloneDeep(initialUltraSound);
            return [...data]; // Return a copy of the initial state
        },
        getInitial2() {
            const data = _.cloneDeep(initialTetenus);
            return [...data]; // Return a copy of the initial state
        },
    },
    // persist:true,
});
