import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useLabourReferralStore = defineStore("labourReferralStore", {
  state: () => ({
    labourReferral: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Who is being referred",
            selectedValue: "",
            class: "bold",
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
        // classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "Reason for referring mother",
            selectedValue: "",
            class: "bold",
            name: "referring mother",
          },
          data: [
            {
              name: "Danger sign present",
              value: "danger sign present",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Antepartum haemorrhage",
              value: "antepartum haemorrhage",
              checked: false,
              displayNone: true,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "pre-eclampsia",
              value: "pre-eclampsia",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Sepsis",
              value: "sepsis",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "Retained placenta",
              value: "retained placenta",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Perineal tear (2nd, 3rd or 4th degree",
              value: "perineal tear",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            // {
            //   name: "Perineal tear (2nd, 3rd or 4th degree",
            //   value: "postpartum haemorrhage",
            //   displayNone: true,
            //   checked: false,
            //   labelPlacement: "start",
            //   colSize: "6",
            //   justify: "space-between",
            // },
            {
              name: "Obstructed/prolonged labour",
              value: "Obstructed/prolonged labour",
              checked: false,
              displayNone: true,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "Premature labour",
              value: "premature labour",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Placenta previa",
              value: "placenta previa",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "Severe anaemia",
              value: "severe anaemia",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Placenta abruption",
              value: "placenta abruption",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        //  classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "referring mother",
          },
          data: [
            {
              name: "Symphysiotomy",
              displayNone: true,
              value: "symphysiotomy",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "others",
              displayNone: true,
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
        //   classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                //  inputHeader: "Specify",
                  unit: "",
                  displayNone: true,
                  icon: icons.editPen,
                  value: "",
                  valueType: "text",
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
        //   classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Any other treatment given before referral?",
                  unit: "",
                  icon: icons.editPen,
                  value: " ",
                  displayNone: true,
                  valueType: "text",
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
        //classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "Reason for referring baby",
            class:'bold',
            selectedValue: "",
            name: "Baby identifier",
          },
          data: [
            {
              name: "Asphyxia",
              value: "asphyxia",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Preterm",
              value: "preterm",
              displayNone: true,
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
        //classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "Baby identifier",
          },
          data: [
            {
              name: "Under weight",
              value: "under weight",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Congenital abnormalities",
              value: "congenital abnormalities",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        //classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "Baby identifier",
          },
          data: [
            {
              name: "Sepsi",
              value: "sepsi",
              displayNone: true,
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Other reason",
              value: "other reason",
              displayNone: true,
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
                  displayNone:true,
                  inputHeader: "Specify",
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  valueType: "text",
                  name: "other",
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
                  valueType: "text",
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
                  valueType: "text",
                  required: true,
                  eventType: "input",
                  placeholder: "Pick time",
                },
                {
                  // displayNone: true,
                  inputHeader: "Date of referral",
                  value: "",
                  name: "Date of referral",
                  required: true,
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick date",
                  inputWidth: "100%",
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
                  valueType: "text",
                  name: "Provider who made referral",
                  required: true,
                  eventType: "input",
                },
                {
                  inputHeader: "Phone number for provider",
                  unit: "",
                  icon: "",
                  value: " ",
                  valueType: "text",
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
    ],
  }),
  actions: {
    setOtherExams(data: any) {
      this.labourReferral = data;
    },
  },
  //persist: true,
});