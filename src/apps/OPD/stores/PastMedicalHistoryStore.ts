import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialPastMedicalHistory = [
  {
    selectedData: [],
    initial: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Existing Chronic Health Conditions",
        class: "bold",
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "TB",
          value: "TB",
          checked: false,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "TB",
    radioBtnContent: {
      header: {
        title: "On TB medication",
        name: "TB treatment",
        selectedValue: "",
        displayNext: "Yes",
        displayNone: true,
        class: "bold",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: 2,
        },
        {
          name: "No",
          value: "No",
          colSize: 2,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "TB treatment",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Select medication",
              class: "bold",
              icon: icons.search,
              popOver: true,
              value: "",
              valueType: "text",
              name: "TB drugs",
              eventType: "input",
              required: true,
              alertsErrorMassage: "",
              popOverData: {
                filterData: true,
                data: [],
              },
              id: "",
              idName: "medication",
            },
            {
              inputHeader: "Start date",
              class: "bold",
              icon: icons.calendar,
              popOver: true,
              value: "",
              valueType: "text",
              name: "TB drug start date",
              eventType: "input",
              required: true,
              alertsErrorMassage: "",
              id: "",
              idName: "startDate",
              placeholder: "Pick the date",
              isDatePopover: true,
            },
          ],
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Chronic Obstructive Pulmonary Disease (COPD)",
          value: "Chronic obstructive pulmonary disease",
          checked: false,
          // disabled: false,
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
        name: "Chronic disease",
      },
      data: [
        {
          name: "Asthma",
          value: "Asthma",
          checked: false,
          // disabled: false,
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
        name: "Chronic disease",
      },
      data: [
        {
          name: "Epilepsy",
          value: "Epilepsy",
          checked: false,
          // disabled: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Previous stroke",
          value: "Stroke",
          checked: false,
          //disabled: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Peptic Ulcer Disease (PUD)",
          value: "Peptic ulcer disease",
          checked: false,
          //disabled: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Mental disorder",
          value: "Mental disorders",
          checked: false,
          //disabled: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          colSize: 4.8,
          name: "Bleeding disorders",
          value: "Bleeding disorders",
          checked: false,
          // disabled: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Hypertension",
          value: "Hypertension",
          checked: false,
          // disabled: false,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "Hypertension",
    radioBtnContent: {
      header: {
        title: "On medication",
        name: "Hypertension medication",
        class: "bold",
        selectedValue: "",
        displayNext: "Yes",
        displayNone: true,
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: 2,
        },
        {
          name: "No",
          value: "No",
          colSize: 2,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "Hypertension medication",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Select medication",
              icon: icons.search,
              class: "bold",
              popOver: true,
              displayNone: true,
              value: "",
              valueType: "text",
              name: "Current hypertension treatment regimen",
              eventType: "input",
              required: true,
              alertsErrorMassage: "",
              popOverData: {
                filterData: false,
                data: [],
              },
              id: "",
              idName: "medication",
            },
          ],
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "HIV Positive",
          value: "HIV pos",
          checked: false,
          //disabled: false,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "HIV Positive",
    radioBtnContent: {
      header: {
        title: "ART status",
        name: "HIV status",
        selectedValue: "",
        class: "bold",
        displayNone: true,
        displayNext: "Yes",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: 2,
        },
        {
          name: "No",
          value: "No",
          colSize: 2,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "HIV status",
    data: {
      rowData: [
        {
          colData: [
            {
              class: "bold",
              inputHeader: "Enter ARV start date",
              icon: icons.calendar,
              popOver: true,
              displayNone: true,
              value: "",
              valueType: "text",
              name: "ARV start date",
              eventType: "input",
              required: true,
              alertsErrorMassage: "",
              idName: "medication",
              placeholder: "Pick the date",
              isDatePopover: true,
            },
          ],
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "Diabetes Mellitus",
          value: "Diabetes Mellitus",
          checked: false,
          // disabled: false,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "Diabetes Mellitus",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "Type",
        name: "Diabetes",
        selectedValue: "",
        displayNone: true,
      },
      data: [
        {
          name: "Type I",
          value: "Type 1 diabetes",
          colSize: 2,
        },
        {
          name: "Type II",
          value: "Type 2 diabetes",
          colSize: 2,
        },
        {
          name: "Unsure",
          value: "Unknown",
          colSize: 2,
        },
      ],
    },
  },
  {
    selectedData: [],
    isFinishBtn: false,
    sideColSize: 1,
    childName: "Diabetes Mellitus",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "Controlled by",
        name: "Controlled by",
        selectedValue: "",
        displayNone: true,
      },
      data: [
        {
          name: "Diet",
          value: "Diet",
          colSize: 2,
        },
        {
          name: "Tablets",
          value: "Tablets",
          colSize: 2,
        },
        {
          name: "Insulin",
          value: "Insulin",
          colSize: 2,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        selectedValue: "",
        name: "Chronic disease",
      },
      data: [
        {
          name: "None",
          value: "None",
        },
      ],
    },
  },
] as any;
export const usePastMedicalHistoryStore = defineStore("pastMedicalHistoryStore", {
    state: () => ({
        pastMedicalHistory: [...initialPastMedicalHistory] as any,
    }),
    actions: {
        setPastMedicalHistory(data: any) {
            this.pastMedicalHistory = data;
        },
        getInitial() {
            const data = _.cloneDeep(initialPastMedicalHistory);
            return [...data]; // Return a copy of the initial state
        },
    },
   // persist: true,
});
