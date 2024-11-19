import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _, { initial } from "lodash";
import * as yup from "yup";
import { extractArrayOfNameValue, validateStore } from "@/services/data_helpers";

export const pastObstreticValidationShema = yup.object().shape({
    "The woman received tetanus doses for immunization?": yup.mixed().required("This field is required"),
});

const initialLMNP = [
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
                title: "Number of under immunised tetanus doses",
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
                            inputHeader: "TTV 1 immunisation date",
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
                            inputHeader: "TTV 1 immunisation date",
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
                            inputHeader: "TTV 2 immunisation date",
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
                            inputHeader: "TTV 1 immunisation date",
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
                            inputHeader: "TTV 2 immunisation date",
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
                            inputHeader: "TTV 3 immunisation date",
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
                            inputHeader: "TTV 1 immunisation date",
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
                            inputHeader: "TTV 2 immunisation date",
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
                            inputHeader: "TTV 3 immunisation date",
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
                            inputHeader: "TTV 4 immunisation date",
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
                            inputHeader: "TTV 5 immunisation date",
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
                            inputHeader: "TTV 1 immunisation date",
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
                            inputHeader: "TTV 2 immunisation date",
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
                            inputHeader: "TTV 3 immunisation date",
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
                title: "Reason Tetanus toxoid (TT) was not conducted",
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
