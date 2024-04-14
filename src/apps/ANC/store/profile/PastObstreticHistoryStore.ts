import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useObstreticHistoryStore = defineStore("obstreticHistoryStore", {
  state: () => ({
    prevPregnancies: [
      {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            class:'bold',
            title: "History on previous pregnancies",
            selectedValue: "",
          },
          data: [
          ],
        },
      },
      {
        isFinishBtn: false,
        sideColSize:0.5,
        sectionHeader: "",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Gravida",
                  value: "",
                  name: "Gravida",
                  icon: icons.editPen,
                  required: true,
                  valueType: "text",
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
        sideColSize:0.5,
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Abortions/Miscarriages",
                  value: "",
                  icon: icons.editPen,
                  name: "Abortions",
                  required: true,
                  valueType: "text",
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
                {
                  inputHeader: "Stillbirths",
                  value: "",
                  name: "Stillbirths",
                  required: true,
                  valueType: "text",
                  icon: icons.editPen,
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
        sideColSize:0.5,
        classDash: "dashed_bottom_border",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Live births",
                  value: "",
                  name: "LiveBirths",
                  required: true,
                  valueType: "text",
                  icon: icons.editPen,
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
                {
                  inputHeader: "Parity",
                  value: "",
                  name: "Parity",
                  valueType: "text",
                  required: true,
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ] as any,

    preterm: [
      {
        selectedData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            class:'bold',
            title: "Was last live birth preterm?",
            selectedValue: "",
            name: "Was last live birth preterm?",
          },
          data: [
            {
              name: "Last live birth was preterm",
              value: "Preterm pregnancy - less than 28 weeks",
              colSize: "9",
            },
            {
              name: "Last live birth was not preterm/ Last live birth was full term",
              value: "Preterm pregnancy - 28 to 34 weeks",
              colSize: "9",
            },
            {
              name: "Last live birth had congenital abnormalities",
              value: "Preterm premature rupture of membranes (PPROM)",
              colSize: "9",
            },
          ],
        },
      },
    ],
    modeOfDelivery: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            class:"bold",
            title: "Specify mode of delivery",
            selectedValue: "",
            name: "cesareanSec",
          },
          data: [
            {
              name: "Cesarean section",
              value: "cesarean",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Vacuum",
              value: "vacuum",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Breach",
              value: "breach",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "SDV",
              value: "sdv",
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
                  inputHeader: "specify",
                  icon: icons.editPen,
                  value: "",
                  name: "Specify",
                  eventType: "input",
                  inputWidth: "82%",
                  required: true,
                },
              ],
            },
          ],
        },
      },
    ] as any,

    Complications: [
      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title:
              "Does the woman have any complications due to past pregnancies?",
            selectedValue: "",
            name: "Does the woman have any complications due to past pregnancies?",
            class:'bold',
          },
          data: [
            {
              name: "Asphyxia",
              value: "Asphyxia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Does not know",
              value: "Does not know",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            // {
            //   name: "Pre-eclampsia",
            //   value: "pre-eclampsia",
            //   checked: false,
            //   labelPlacement: "start",
            //   colSize: "6",
            //   justify: "space-between",
            // },
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "Pre-eclampsia",
              value: "pre-eclampsia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Eclampsia",
              value: "eclampsia",
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "Puerperal Sepsis",
              value: "puerperal sepsis",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Baby died within 24hrs of birth",
              value: "baby died within 24hrs of birth",
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "Convulsions",
              value: "convulsions",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Forceps",
              value: "forceps",
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "Gestational diabetes mellitus",
              value: "gestational diabetes mellitus",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Heavy bleeding",
              value: "heavy bleeding",
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "Macrosomia",
              value: "macrosomia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Perineal tear (3rd or 4th degree)",
              value: "perineal tear (3rd or 4th degree)",
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
            name: "Does the woman have any complications due to past pregnancies?",
          },
          data: [
            {
              name: "None",
              value: "none",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",
        name: "Does the woman have any complications due to past pregnancies?",
        data: {
          rowData: [
            {
              colData: [
                {
                 // displayNone: true,
                  inputHeader: "specify",
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  name: "other",
                  valueType:'text',
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                },
              ],
            },
          ],
        },
      },
    ] as any,
  }),
  actions: {
    setPrevPregnancies(data: any) {
      this.prevPregnancies = data;
    },
    setPreterm(data: any) {
      this.preterm = data;
    },

    setModeOfDelivery(data: any) {
      this.modeOfDelivery = data;
    },
    setComplications(data: any) {
      this.Complications = data;
    },
  },
  // persist:true,
});