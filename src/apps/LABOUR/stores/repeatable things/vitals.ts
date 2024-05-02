import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useLabourVitalsStore = defineStore("labourVitalsStore", {
  state: () => ({
    vitals: [
      {
        sectionHeader: "Blood pressure",
        classDash: "dashed_bottom_border _padding",
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
                  valueType: "text",
                  required: true,
                  eventType: "input",
                },
                {
                  inputHeader: "Diastolic pressure*",
                  unit: "mmHg",
                  icon: icons.diastolicPressure,
                  value: "",
                  valueType: "text",
                  name: "Diastolic",
                  required: true,
                  eventType: "input",
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
                  valueType: "text",
                  name: "Pulse",
                  eventType: "input",
                },
              ],
            },
          ],
        },
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
                  inputHeader: "Temperature",
                  unit: "C",
                  icon: icons.temprature,
                  value: "",
                  valueType: "text",
                  name: "Temp",
                  eventType: "input",
                },
              ],

            },
          ],
        },
        previousView: {
          name: "vitals",
        },
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
                  valueType: "text",
                  value: "",
                  name: "Respiratory rate",
                  eventType: "input",
                },
              ],

            },
          ],
        },
        previousView: {
          name: "vitals",
        },
      },
      {
        sectionHeader: "Fetal heart rate",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Fetal heart rate",
                  unit: "BMP",
                  icon: icons.respiratory,
                  value: "",
                  valueType: "text",
                  name: "Fetal heart rate",
                  eventType: "input",
                },
              ],
            },
          ],
        },
        previousView: {
          name: "vitals",
        },
      },
    ] as any,
  }),
  actions: {
    setVitals(data: any) {
      this.vitals = data;
    },
  },
  // persist: true,
});