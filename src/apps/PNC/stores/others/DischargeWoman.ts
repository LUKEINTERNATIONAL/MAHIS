import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialDischargeWoman = [
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "What is the discharge status of the woman?",
        selectedValue: "",
        class: "bold",
        name: "Discharge status of woman",
        displayNext: "Discharged alive",
      },
      data: [
        {
          name: "Discharged alive",
          value: "Discharged alive",
          colSize: "5",
        },
        {
          name: "Absconded",
          value: "Absconded",
          colSize: "5",
        },
        {
          name: "Referred out",
          value: "Referred out",
          colSize: "5",
        },
        {
          name: "Death",
          value: "Death",
          colSize: "5",
        },
      ],
    },
  },
  {
    childName: "Discharge status of woman",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Other mode of delivery notes",
              required: true,
              eventType: "input",
              inputWidth: "",
            },
          ],
        },
      ],
    },
  },
  {
    childName: "Discharge status of woman",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Postpartum family planning counselling done?",
        selectedValue: "",
        name: "Postpartum family planning counselling",
        class: "bold",
        displayNone: true,
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: "2.5",
        },
        {
          name: "No",
          value: "No",
          colSize: "2.5",
        },
      ],
    },
  },
  {
    childName: "Discharge status of woman",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Postpartum family planning methods provided?",
        selectedValue: "",
        name: "Postpartum family planning methods provided",
        class: "bold",
        displayNone: true,
        displayNext: "Yes",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: "2.5",
        },
        {
          name: "No",
          value: "No",
          colSize: "2.5",
        },
      ],
    },
  },
  {
    childName: "Postpartum family planning methods provided",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Select the method provided",
        selectedValue: "",
        name: "Postpartum family planning method",
        class: "bold",
        displayNone: true,
      },
      data: [
        {
          name: "IUCD",
          value: "IUCD",
          colSize: "3",
        },
        {
          name: "BTL",
          value: "BTL",
          colSize: "3",
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
export const useDischargeWomanStore = defineStore("dischargeWomanStore", {
  state: () => ({
    dischargeWoman: [...initialDischargeWoman] as any,
  }),
  actions: {
    setDischargeWoman(data: any) {
      this.dischargeWoman = data;
    },
    getInitial() {
      const data = _.cloneDeep(initialDischargeWoman);
      return [...data];
    },
  },
  //persist: true,
});
