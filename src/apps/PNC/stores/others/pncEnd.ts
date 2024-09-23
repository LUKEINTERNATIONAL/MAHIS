import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialPNCEnd = [
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Reason for ending PNC?",
        selectedValue: "",
        name: "Reason for ending PNC",
        class: "bold",
      },
      data: [
        {
          name: "Refer",
          value: "Refer",
          colSize: "8",
        },
        {
          name: "Discharge home",
          value: "Discharge home",
          colSize: "8",
        },
        {
          name: "Death",
          value: "Death",
          colSize: "8",
        },
        {
          name: "Lost",
          value: "Lost",
          colSize: "8",
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    db_data: [],
    classDash: "dashed_bottom_border",
    isFinishBtn: false,
    selectdData: [],
    displayData: [],
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Facility for ART",
              icon: icons.search,
              value: "",
              name: "facility for art",
              popOver: true,
              valueType: "text",
              eventType: "input",
              required: true,
              alertsErrorMassage: "",
              placeholder: "Search for facility",
              popOverData: {
                filterData: false,
                data: [],
              },
              id: "",
              idName: "facility_id",
              style: {
                marginBottom: "15px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              },
            },
          ],
        },
        {
          colData: [
            {
              inputHeader: "Date of Referral*",
              value: "",
              name: "Date of referral",
              icon: icons.calenderPrimary,
              required: true,
              valueType: "text",
              eventType: "input",
              isDatePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick date",
              style: {
                width: "48%",
                marginRight: "4%",
              },
            },
            {
              inputHeader: "Time of Referral*",
              value: "",
              name: "Time of referral",
              icon: icons.timePicker,
              required: true,
              valueType: "text",
              eventType: "input",
              isTimePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick time",
              style: {
                width: "48%",
              },
            },
          ],
        },
        {
          colData: [
            {
              inputHeader: "Reason for Referral (Free text)",
              value: "",
              name: "reason for referral",
              required: true,
              valueType: "text",
              eventType: "input",
              isTextArea: true,
              alertsErrorMassage: "",
              placeholder: "Enter reason for referral",
              style: {
                marginBottom: "15px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              },
            },
          ],
        },
        {
          colData: [
            {
              inputHeader: "Woman's Condition on Referral",
              value: "",
              name: "condition on referral",
              required: true,
              valueType: "text",
              eventType: "input",
              alertsErrorMassage: "",
              placeholder: "Describe condition on referral",
              style: {
                padding: "10px",
                borderBottom: "1px solid #ccc",
              },
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    db_data: [],
    classDash: "dashed_bottom_border",
    isFinishBtn: false,
    selectdData: [],
    displayData: [],
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Date of Death*",
              value: "",
              name: "Date of Death",
              icon: icons.calenderPrimary,
              required: true,
              valueType: "text",
              eventType: "input",
              isDatePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick date",
              style: {
                width: "48%",
                marginRight: "4%",
              },
            },
            {
              inputHeader: "Time of Death*",
              value: "",
              name: "Time of Death",
              icon: icons.timePicker,
              required: true,
              valueType: "text",
              eventType: "input",
              isTimePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick time",
              style: {
                width: "48%",
              },
            },
          ],
        },
        {
          colData: [
            {
              inputHeader: "Cause of death (Free text)",
              value: "",
              name: "reason for referral",
              required: true,
              valueType: "text",
              eventType: "input",
              isTextArea: true,
              alertsErrorMassage: "",
              placeholder: "Enter reason for referral",
              style: {
                marginBottom: "15px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              },
            },
          ],
        },
      ],
    },
  },
] as any;
export const usePNCEndStore = defineStore("pncEndStore", {
  state: () => ({
    pncEnd: [...initialPNCEnd] as any,
  }),
  actions: {
    setPNCend(data: any) {
      this.pncEnd = data;
    },
    getInitial() {
      const data = _.cloneDeep(initialPNCEnd);
      return [...data];
    },
  },
  //persist: true,
});
