import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationStore = defineStore("immunizationStore", {
  state: () => ({
    ttDoses: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Did the client complete Tetanus Toxoid (TT) doses before?",
            selectedValue: "",
            class: "bold",
            name: "Tetanus Toxoid",
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
    ],
    HepB1: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  //displayNone: true,
                  inputHeader: "Hep B-1 Date",
                  value: "",
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
        classDash: "",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  //displayNone: true,
                  inputHeader: "Hep B-2 Date",
                  value: "",
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
        classDash: "",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  //displayNone: true,
                  inputHeader: "Hep B-3 Date",
                  value: "",
                  name: "hep3Date",
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
        classDash: "",
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
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Client is ill",
              value: "client is ill",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Client refused",
              value: "client refused",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Allergy to vaccinate",
              value: "allergy to vaccinate",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  //displayNone: true,
                  inputHeader: "specify",
                  value: "",
                  name: "Specify",
                  icon: icons.editPen,
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
  persist: true,
});
