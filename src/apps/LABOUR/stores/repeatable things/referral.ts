import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useReferralStore = defineStore("referralStore", {
  state: () => ({
    referral: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Who is being referred",
            selectedValue: "",
            name: "referred",
          },
          data: [
            {
              name: "Mother",
              value: "mother",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Baby",
              value: "baby",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },

      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "Reason for referring mother",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "Danger sign present",
              value: "danger sign present",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Antepartum haemorrhage",
              value: "antepartum haemorrhage",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "(Pre)-Eclampsia",
              value: "pre-eclampsia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Sepsis",
              value: "sepsis",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Retained placenta",
              value: "retained placenta",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Perineal tear (2nd, 3rd or 4th degree",
              value: "perineal tear",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Postpartum haemorrhage",
              value: "postpartum haemorrhage",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Obstructed/prolonged labour",
              value: "prolonged labour",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Premature labour",
              value: "premature labour",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Placenta previa",
              value: "placenta previa",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Severe anaemia",
              value: "severe anaemia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Placenta abruption",
              value: "placenta abruption",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Symphysiotomy",
              value: "symphysiotomy",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
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
                  inputHeader: "Specify",
                  unit: "",
                  icon: icons.editPen,
                  value: " Specify",
                  name: "specify",
                  eventType: "input",
                },
              ],
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
                  inputHeader: "Any other treatment given before referral?",
                  unit: "",
                  icon: icons.editPen,
                  value: " ",
                  name: "treatment given before referral",
                  eventType: "input",
                },
              ],
            },
          ],
        },
      },

      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "Reason for referring baby",
            selectedValue: "",
          },
          data: [
            {
              name: "Asphyxia",
              value: "asphyxia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Preterm",
              value: "preterm",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Under weight",
              value: "under weight",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Congenital abnormalities",
              value: "congenital abnormalities",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
          },
          data: [
            {
              name: "Sepsis",
              value: "sepsis",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
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
                  inputHeader: "Specify",
                  unit: "",
                  icon: icons.editPen,
                  value: " Specify",
                  name: "specify",
                  eventType: "input",
                },
              ],
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
                  inputHeader:
                    "Any other treatment given to baby before referral?",
                  unit: "",
                  icon: icons.editPen,
                  value: " ",
                  name: "treatment given to baby before referral",
                  eventType: "input",
                },
              ],
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
                  inputHeader: "Time of referral",
                  unit: "",
                  icon: icons.time,
                  value: "",
                  name: "Time of referral",
                  required: true,
                  eventType: "input",
                  placeholder: "Pick time",
                },
                {
                  inputHeader: "Date of referral",
                  unit: "",
                  icon: icons.calenderPrimary,
                  value: " ",
                  name: "Date of referral",
                  required: true,
                  datePopover: true,
                  eventType: "input",
                  placeholder: "Pick date",
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
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Provider who made referral",
                  unit: "",
                  icon: "",
                  value: "",
                  name: "Provider who made referral",
                  required: true,
                  eventType: "input",
                },
                {
                  inputHeader: "Phone number for provider",
                  unit: "",
                  icon: "",
                  value: " ",
                  name: "Phone number for provider",
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
    ] as any,
  }),
  actions: {
    setLabourReferral(data: any) {
      this.referral = data;
    },
  },
  persist: true,
});