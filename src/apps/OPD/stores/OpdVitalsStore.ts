import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialOPDVitals = [
  {
    isFinishBtn: false,
    validationStatus: "",
    sectionHeader: "Hieght and weight",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Height",
              unit: "cm",
              icon: icons.height,
              value: "",
              name: "Height",
              required: false,
              eventType: "input",
              alertsErrorMassage: "",
            },
            {
              inputHeader: "Weight",
              unit: "kg",
              icon: icons.weight,
              value: "",
              name: "Weight",
              required: false,
              eventType: "input",
              alertsErrorMassage: "",
            },
          ],
        },
      ],
    },
    alerts: [
      {
        backgroundColor: "",
        status: "",
        icon: "",
        textColor: "",
        value: "",
        name: "",
        index: "",
      },
    ],
    previousView: {
      name: "vitals",
    },
  },

  {
    sectionHeader: "Temperature",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "",
              unit: "C",
              icon: icons.temprature,
              value: "",
              name: "Temp",
              eventType: "input",
            },
          ],
        },
      ],
    },
  },

  {
    sectionHeader: "Pulse rate",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Pulse rate",
              unit: "BMP",
              icon: icons.pulse,
              value: "",
              name: "Pulse",
              eventType: "input",
              alertsErrorMassage: "",
            },
          ],
        },
      ],
    },
  },

  {
    sectionHeader: "Blood Pressure",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Systolic Pressure",
              unit: "mmHg",
              icon: icons.systolicPressure,
              value: "",
              name: "Systolic",
              required: false,
              eventType: "input",
              alertsErrorMassage: "",
            },
            {
              inputHeader: "Diastolic pressure",
              unit: "mmHg",
              icon: icons.diastolicPressure,
              value: "",
              name: "Diastolic",
              required: false,
              eventType: "input",
              alertsErrorMassage: "",
            },
          ],
        },
      ],
    },
    alerts: [
      {
        backgroundColor: "",
        status: "",
        icon: "",
        textColor: "",
        value: "",
        name: "",
        index: "",
      },
    ],
  },

  {
    sectionHeader: "Respiratory rate",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Respiratory rate",
              unit: "BMP",
              icon: icons.respiratory,
              value: "",
              name: "RespiratoryRate",
              eventType: "input",
              alertsErrorMassage: "",
            },
          ],
        },
      ],
    },
  },
] as any;

export const useVitalsStore = defineStore("vitalsStore222", {
  state: () => ({
    vitals: [...initialOPDVitals] as any,
  }),
  actions: {
    setVitals(data: any) {
      this.vitals = data;
    },
    getOpdVitals(){
        const data = _.cloneDeep(initialOPDVitals);
        return [...data];
    },
  },
  //persist: true,
});
