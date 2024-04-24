import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useOtherExamsStore = defineStore("otherExamsStore", {
  state: () => ({
    otherExams: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Liquor",
            selectedValue: "",
            class: "bold",
            name: "Liquor",
          },
          data: [
            {
              name: "Clear",
              value: "clear",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Blood stained",
              value: "blood stained",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Meconium stained (Grade 1 to 3)",
              value: "meconium stained",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Absent",
              value: "absent",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Offensive smell",
              value: "offensive smell",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },

      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Moulding *",
            selectedValue: "",
            class: "bold",
            name: "Moulding",
          },
          data: [
            {
              name: "+",
              value: "+",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "++",
              value: "++",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "+++",
              value: "+++",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Caput",
            selectedValue: "",
            class: "bold",
            name: "Caput",
          },
          data: [
            {
              name: "Nil",
              value: "nil",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Mild",
              value: "mild",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "moderate",
              value: "moderate",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Severe",
              value: "severe",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Station",
            selectedValue: "",
            class: "bold",
            name: "Station",
          },
          data: [
            {
              name: "-4",
              value: "-4",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "-3",
              value: "-3",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "-2",
              value: "-2",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "-1",
              value: "-1",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "0",
              value: "0",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "1",
              value: "1",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "2",
              value: "2",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "3",
              value: "3",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "4",
              value: "4",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Cervix dilation",
                  unit: "cm",
                  icon: icons.editPen,
                  valueType: "text",
                  value: "",
                  name: "cervix dilation",
                  required: true,
                  eventType: "input",
                  placeholder: "Enter the number between 1-10",
                  inputWidth: "55%",
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
        radioBtnContent: {
          header: {
            title: "Descent",
            selectedValue: "",
            class: "bold",
            name: "Descent",
          },
          data: [
            {
              name: "0/5",
              value: "0/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "1/5",
              value: "1/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "2/5",
              value: "2/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "3/5",
              value: "3/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "4/5",
              value: "4/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "5/5",
              value: "5/5",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Contractions",
                  unit: "",
                  icon: icons.editPen,
                  valueType: "text",
                  value: "",
                  name: "contractions",
                  required: true,
                  eventType: "input",
                  placeholder: "",
                  inputWidth: "55%",
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
        radioBtnContent: {
          header: {
            title: "Severity of contractions",
            selectedValue: "",
            class: "bold",
            name: "Severity of contractions",
          },
          data: [
            {
              name: "No contractions",
              value: "no contractions",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Mild",
              value: "mild",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Moderate",
              value: "moderate",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Strong",
              value: "strong",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
    ] as any,

    urine: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Has the woman urinated?",
            selectedValue: "",
            class: "bold",
            name: "woman urinated",
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
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Amount of urine",
                  unit: "",
                  icon: icons.editPen,
                  valueType: "text",
                  value: "",
                  name: "amount of urine",
                  required: true,
                  eventType: "input",
                  placeholder: "",
                  inputWidth: "55%",
                },
              ],
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Color of urine",
                  unit: "",
                  icon: icons.editPen,
                  valueType: "text",
                  value: "",
                  name: "color of urine",
                  required: true,
                  eventType: "input",
                  placeholder: "",
                  inputWidth: "55%",
                },
              ],
            },
          ],
        },
      },
      {
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Odour of urine",
                  unit: "",
                  icon: icons.editPen,
                  valueType: "text",
                  value: "",
                  name: "Odour",
                  required: true,
                  eventType: "input",
                  placeholder: "",
                  inputWidth: "55%",
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
        radioBtnContent: {
          header: {
            title: "Fully dilated?",
            selectedValue: "",
            class: "bold",
            name: "Fully dilated",
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
        classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Time fully dilated",
                  unit: "",
                  icon: icons.time,
                  value: "",
                  name: "Time fully dilated",
                  required: true,
                  valueType: "text",
                  eventType: "input",
                  placeholder: "",
                  inputWidth: "55%",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
  actions: {
    setOtherExams(data: any) {
      this.otherExams = data;
    },
    setUrine(data: any) {
      this.urine = data;
    },
  },
  persist: true,
});