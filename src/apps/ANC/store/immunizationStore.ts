import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationStore = defineStore("immunizationStore", {
  state: () => ({
    ttDoses: [
      {
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "TTV",
                  value: "",
                  valueType: "text",
                  name: "hepb1 Date",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick the date",
                  required: true,
                  eventType: "input",
                  inputWidth: "50%",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],

    HepBCounselling: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on Hep B negative",
            selectedValue: "",
            class: "bold",
            name: "Counselling on Hep B negative",
          },
          data: [
            {
              name: "Yes",
              value: "yes",

              colSize: "2.5",
            },
            {
              name: "No",
              value: "no",

              colSize: "2.5",
            },
          ],
        },
      },
    ],
    HepB1: [
      {
        selectdData: [],
        isFinishBtn: false,
        // classDash: "",
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Hepatitis B-1",
            selectedValue: "",
            class: "bold",
            name: "Hepatitis B-1",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "Hep B-1 Date",
                  value: "",
                  valueType: "text",
                  name: "hepb1 Date",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick the date",
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],
    HepB2: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Hepatitis B-2",
            selectedValue: "",
            class: "bold",
            name: "Hepatitis B-2",
          },
          data: [
            {
              name: "Yes",
              value: "yes",

              colSize: "2.5",
            },
            {
              name: "No",
              value: "no",

              colSize: "2.5",
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "Hep B-2 Date",
                  value: "",
                  valueType: "text",
                  name: "Hep B-2 Date",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick the date",
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],

    HepB3: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Hepatitis B-3",
            selectedValue: "",
            class: "bold",
            name: "Hepatitis B-3",
          },
          data: [
            {
              name: "Yes",
              value: "yes",

              colSize: "2.5",
            },
            {
              name: "No",
              value: "no",

              colSize: "2.5",
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "Hep B-3 Date",
                  value: "",
                  name: "hep3Date",
                  valueType: "text",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick the date",
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],

    hepBReason: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Reason Hepatitis B vaccination not conducted",
            selectedValue: "",
            name: "Hepatitis B",
            class: "bold",
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
              name: "Allergy to vaccinate",
              value: "allergy to vaccinate",

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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "specify",
                  value: "",
                  name: "Specify",
                  icon: icons.editPen,
                  required: true,
                  valueType: "text",
                  eventType: "input",
                  inputWidth: "85%",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
  actions: {
    setTTDoses(data: any) {
      this.ttDoses = data;
    },
    setTT1(data: any) {
      // this.tt1 = data
    },
    setTT2(data: any) {
      // this.tt2 = data
    },
    setTT3(data: any) {
      // this.tt3 = data
    },
    setTT4(data: any) {
      // this.tt4 = data
    },
    setTT5(data: any) {
      // this.tt5 = data
    },
    setTTReason(data: any) {
      // this.ttReason = data
    },
    setHepB1(data: any) {
      this.HepB1 = data;
    },
    setHepB2(data: any) {
      this.HepB2 = data;
    },
    setHepB3(data: any) {
      this.HepB3 = data;
    },
    setHepBReason(data: any) {
      this.hepBReason = data;
    },
  },
  //persist: true,
});
