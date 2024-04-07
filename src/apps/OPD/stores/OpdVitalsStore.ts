import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useVitalsStore = defineStore("vitalsStore", {
  state: () => ({
    vitals: [
      {
        isFinishBtn: false,
        validationStatus: "",
        sectionHeader: "Height and weight",
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
                  alertsError: false,
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
                  alertsError: false,
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
        sectionHeader: "Temperature*",
        // classDash: "dashed_bottom_border _padding",
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
                  disabled: true,
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        sideColSize: 6,
        classDash: "dashed_bottom_border _padding",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Temperature not Done",
              value: "notDoneT",
              labelPlacement: "end",
              colSize: "6",
              justify: "",
              checked: false,
            },
          ],
        },
      },

      {
        sectionHeader: "Pulse rate",
        // classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Pulse rate*",
                  unit: "BMP",
                  icon: icons.pulse,
                  value: "",
                  name: "Pulse",
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
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Pulse rate not done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
              checked: true,
            },
          ],
        },
      },

      {
        sectionHeader: "Blood Pressure",
        // classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Systolic Pressure*",
                  unit: "mmHg",
                  icon: icons.systolicPressure,
                  value: "",
                  name: "Systolic",
                  required: false,
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
                {
                  inputHeader: "Diastolic pressure*",
                  unit: "mmHg",
                  icon: icons.diastolicPressure,
                  value: "",
                  name: "Diastolic",
                  required: false,
                  eventType: "input",
                  alertsError: false,
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
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Blood Pressure not done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
              checked: false,
            },
          ],
        },
      },

      {
        sectionHeader: "Respiratory rate",
        // classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Respiratory rate*",
                  unit: "BMP",
                  icon: icons.respiratory,
                  value: "",
                  name: "RespiratoryRate",
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
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Respiratory rate not done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
              checked: false,
            },
          ],
        },
      },
    ] as any,
  }),
  actions: {
    setVitals(data: any) {
      this.vitals = data;
    },
  },
  //persist: false,
});
