import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import { getRadioSelectedValue, modifyFieldValue } from '@/services/data_helpers';

export const useObstreticHistoryStore = defineStore("obstreticHistoryStore", {
  state: () => ({
    prevPregnancies: [
      {
        isFinishBtn: false,
        sectionHeader: "",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Gravida*",
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
        isFinishBtn: false,
        sectionHeader: "",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Abortions*",
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
                  inputHeader: "Stillbirths*",
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
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border _padding",
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Live births*",
                  value: "",
                  disabled: true,
                  name: "LiveBirths",
                  required: true,
                  valueType: "text",
                  eventType: "input",
                  alertsError: false,
                  alertsErrorMassage: "",
                },
                {
                  inputHeader: "Parity*",
                  disabled: true,
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
    abnormalities: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Last live birth had congenital abnormalities?",
            selectedValue: "",
          },
          data: [
            {
              name: "Yes",
              value: "Yes",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "No",
              value: "No",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Dont know",
              value: "Dont know",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
    ],
    preterm: [
      {
        selectedData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            class: "bold",
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
    modeOfDelivery: [] as any,
    Complications: [
      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            class: "bold",
            title:
              "Did the woman have any of the complications during the past pregnancies?",
            selectedValue: "",
            name: "past pregnancies complications",
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
              name: "Pre-eclampsia",
              value: "pre-eclampsia",
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
            name: "past pregnancies complications",
          },
          data: [
            {
              name: "Eclampsia",
              value: "eclampsia",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Puerperal Sepsis",
              value: "puerperal sepsis",
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
            name: "past pregnancies complications",
          },
          data: [
            {
              name: "Baby died within 24hrs of birth",
              value: "baby died within 24hrs of birth",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Convulsions",
              value: "convulsions",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      // {
      //   classDash: "dashed_bottom_border",
      //   checkboxBtnContent: {
      //     header: {
      //       title: "",
      //       selectedValue: "",
      //       name: "past pregnancies complications",
      //     },
      //     data: [
      //       // {
      //       //   name: "Forceps",
      //       //   value: "forceps",
      //       //   checked: false,
      //       //   labelPlacement: "start",
      //       //   colSize: "6",
      //       //   justify: "space-between",
      //       // },
      //     ],
      //   },
      // },

      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "past pregnancies complications",
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
            name: "past pregnancies complications",
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
            name: "past pregnancies complications",
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
        classDash: "dashed_bottom_border",
        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "specify",
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  name: "Other notes",
                  valueType: "text",
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
    setAbnormalities(data: any) {
      this.abnormalities = data;
    },
    setModeOfDelivery(number: number) {
      this.modeOfDelivery = [];
      for (let i = 0; i < number; i++) {
        const inputs = getRadioButton(i);
        this.modeOfDelivery.push(inputs[0]);
        this.modeOfDelivery.push(inputs[1]);
      }
    },

    checkChanges() {
      const number = this.modeOfDelivery.length / 2;
      for (let i = 0; i < number; i++) {
        const value = getRadioSelectedValue(
          this.modeOfDelivery,
          `Mode of delivery ${i}`
        );
        if (value == "Other") {
          modifyFieldValue(
            this.modeOfDelivery,
            `Specify ${i}`,
            "displayNone",
            false
          );
        } else {
          modifyFieldValue(
            this.modeOfDelivery,
            `Specify ${i}`,
            "displayNone",
            true
          );
        }
      }
    },
    setComplications(data: any) {
      this.Complications = data;
    },
  },
  // persist: true,
});


const getRadioButton = (number:number)=>{
  return [
    {
      sideColSide: 1,
      selectdData: [],
      isFinishBtn: false,
      classDash: "dashed_bottom_border",
      radioBtnContent: {
        header: {
          title: `Specify mode of delivery (child ${number + 1})`,
          selectedValue: "",
          name: `Mode of delivery ${number}`,
          class: "bold",
          //displayNext:"Other"
        },
        data: [
          {
            name: "Caesarean section",
            value: "caesarean section",
            colSize: "4.1",
          },
          {
            name: "Vacuum extraction delivery",
            value: "vacuum extraction delivery",
            colSize: "4.1",
          },
          {
            name: "Breech delivery",
            value: "breech delivery",
            colSize: "4.1",
          },
          {
            name: "SVD",
            value: "svd",
            colSize: "4.1",
          },
          {
            name: "Other",
            value: "Other",
            colSize: "4.1",
          },
        ],
      },
    },
    {
      //childName:`cesareanSec ${number}`,
      data: {
        rowData: [
          {
            colData: [
              {
                displayNone: true,
                inputHeader: `specify  for child ${number + 1}`,
                icon: icons.editPen,
                value: "",
                name: `Specify ${number}`,
                eventType: "input",
                inputWidth: "82%",
                required: true,
              },
            ],
          },
        ],
      },
    },
  ];
}