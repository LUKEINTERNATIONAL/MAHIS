import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useVitalsStore = defineStore("vitalsStore", {
  state: () => ({
    vitals: [
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
                  inputHeader: "Height*",
                  unit: "cm",
                  icon: icons.height,
                  value: "",
                  name: "Height",
                  required: true,
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
                {
                  inputHeader: "Weight*",
                  unit: "kg",
                  icon: icons.weight,
                  value: "",
                  name: "Weight",
                  required: true,
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
        sectionHeader: "Is Temperature Taken",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdTemperature",
            //  displayNone:true
          },
          data: [
            {
              name: "Yes",
              value: "yes",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "No",
              value: "no",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        sectionHeader: "",
        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "Temperature",
                  unit: "C",
                  icon: icons.temprature,
                  value: "",
                  name: "Temp",
                  // inputWidth: "55%",
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
        sectionHeader: "",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "temperatureNotDone",
            //displayNone:true,
          },
          data: [
            {
              name: "Thermometer not available",
              value: "Thermometer",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Patient uncooperative",
              value: "uncooperative",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        sectionHeader: "Pulse Rate",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdPulseRate",
          },
          data: [
            {
              name: "Done",
              value: "done",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Not Done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  displayNone: true,
                  inputHeader: "Pulse rate",
                  unit: "BMP",
                  icon: icons.pulse,
                  value: "",
                  name: "Pulse",
                  eventType: "input",
                },
              ],
            },
          ],
        },
      },
      {
        sectionHeader: "",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdPulseRateNotDone",
            displayNone: true,
          },
          data: [
            {
              name: "Patient uncooperative",
              value: "uncooperative",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Machine not working",
              value: "machine",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Other reason",
              value: "Other",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  displayNone: true,
                  inputHeader: "Other",
                  icon: icons.editPen,
                  value: "",
                  name: "otherReason",
                  eventType: "input",
                },
              ],
            },
          ],
        },
      },
      {
        sectionHeader: "Blood Pressure",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdBloodPressure",
            //  displayNone:true
          },
          data: [
            {
              name: "Done",
              value: "done",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Not Done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        sectionHeader: "",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdBloodPressureReason",
            displayNone: true,
          },
          data: [
            {
              name: "BP machine not working",
              value: "not working",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "BP cuff is too small/large",
              value: "too small/large",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Patient uncooperative",
              value: "uncooperative",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "Systolic Pressure*",
                  unit: "mmHg",
                  icon: icons.systolicPressure,
                  value: "",
                  name: "Systolic",
                  required: true,
                  eventType: "input",
                },
                {
                  displayNone: true,
                  inputHeader: "Diastolic pressure*",
                  unit: "mmHg",
                  icon: icons.diastolicPressure,
                  value: "",
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
      },

      //   {
      //     sectionHeader: "Respiratory Rate",
      //     selectdData: [],
      //     isFinishBtn: false,
      //     radioBtnContent: {
      //       header: {
      //         title: "",
      //         selectedValue: "",
      //         name: "respiratoryRate",
      //         //  displayNone:true
      //       },
      //       data: [
      //         {
      //           name: "Yes",
      //           value: "yes",
      //           labelPlacement: "start",
      //           colSize: "7",
      //           justify: "space-between",
      //         },
      //         {
      //           name: "No",
      //           value: "no",
      //           labelPlacement: "start",
      //           colSize: "7",
      //           justify: "space-between",
      //         },
      //       ],
      //     },
      //   },
      {
        sectionHeader: "Respiratory Rate",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdRespiratoryRate",
          },
          data: [
            {
              name: "Done",
              value: "done",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Not done",
              value: "notDone",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  displayNone: true,
                  inputHeader: "Respiratory rate",
                  unit: "BMP",
                  icon: icons.respiratory,
                  value: "",
                  name: "RespiratoryRate",
                  eventType: "input",
                },
              ],
            },
          ],
        },
      },
      {
        sectionHeader: "",
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "OpdRespiratoryRateNotDone",
            displayNone: true,
          },
          data: [
            {
              name: "Patient uncooperative",
              value: "uncooperative",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Other reason- specify",
              value: "reason",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  inputHeader: "Respiratory rate(specify)",

                  icon: icons.editPen,
                  value: "",
                  name: "Respiratory reason",
                  eventType: "input",
                },
              ],
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
  persist: false,
});
