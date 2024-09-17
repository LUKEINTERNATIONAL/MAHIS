import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore("diagnosisStore", {
  state: () => ({

    diagnoses: [
      {
        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title: "Patient diagnosis",
            selectedValue: "",
            class: "bold",
            name: "Diagnosis",
          },
          data: [
            {
              name: "Hypertension",
              value: "Hypertension",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Pre-eclampsia",
              value: "Pre-eclampsia",
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
            name: "Diagnosis",
          },
          data: [
            {
              name: "HIV",
              value: "HIV",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Hepatitis B",
              value: "Hepatitis B",
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
            name: "Diagnosis",
          },
          data: [
            {
              name: "Hepatitis C",
              value: "Hepatitis C",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Syphilis",
              value: "Syphilis",
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
            name: "Diagnosis",
          },
          data: [
            {
              name: "Pre-eclampsia with Severe Features",
              value: "Pre-eclampsia with Severe Features",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "None",
              value: "none",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
    ] as any,


  }),

  actions: {
    setDiagnoses(data: any) {
      this.diagnoses = data;
    },

  },
  persist: true,
});
