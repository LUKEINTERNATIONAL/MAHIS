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
            name: "severe hypertension", //this concept is temporary
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
            name: "severe hypertension", //this concept is temporary
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
            name: "severe hypertension", //this concept is temporary
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
            name: "severe hypertension", //this concept is temporary
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

    hypertension: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counseling conducted on the risks of severe hypertension?",
            selectedValue: "",
            class: "bold",
            name: "severe hypertension",
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
    ] as any,

    preEclampsia: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title:
              "Does the patient have severe pre-eclampsia with severe features?",
            selectedValue: "",
            class: "bold",
            name: "severe pre-eclampsia",
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
    ] as any,

    hyper: [] as any,

    hiv: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on HIV positive conducted?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on HIV positive",
          },
          data: [
            {
              name: "Yes",
              value: "Yes",

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
        selectdData: [],
        isFinishBtn: false,
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Reason counselling on HIV not provided",
            selectedValue: "",
            class: "bold",
            name: "counselling on HIV not provided",
          },
          data: [
            {
              name: "Stockout",
              value: "Stockout",
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
                  displayNone: true,
                  inputHeader: "specify",
                  value: "",
                  name: "hiv Counselling",
                  icon: icons.editPen,
                  required: true,
                  eventType: "input",
                  valueType: "text",
                  inputWidth: "85%",
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ] as any,

    hepatitisB: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on Hepatitis B conducted?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on Hepatitis B",
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
    ] as any,

    hepatitisC: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on Hepatitis C conducted?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on Hepatitis C",
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
    ] as any,

    syphilis: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on Syphilis conducted?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on Syphilis",
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
    ] as any,

    syphilisTesting: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on Syphilis conducted?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on Syphilis",
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
    ] as any,

    tbScreening: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        class: "bold",
        radioBtnContent: {
          header: {
            title: "Counselling on TB screening conducted?",
            selectedValue: "",
            name: "Counselling on TB screening",
            class:"bold"
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
    ] as any,

    ASB: [] as any,

    GDM: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on gestational diabetes mellitus (GDM)?",
            selectedValue: "",
            class: "bold",
            name: "gestational diabetes mellitus counselling",
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
    ] as any,
    diabetes: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on diabetes mellitus conducted?",
            selectedValue: "",
            class: "bold",
            name: "diabetes mellitus counselling",
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
    ] as any,
    anaemia: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Counselling on anaemia conducted?",
            selectedValue: "",
            class: "bold",
            name: "anaemia counselling",
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
    ] as any,
  }),

  actions: {
    setDiagnoses(data: any) {
      this.diagnoses = data;
    },
    // setHIVReason(data: any) {
    //   this.hivReason = data;
    // },
    // setHypertensionReason(data: any) {
    //   this.hypertensionReason = data;
    // },
    // setHepatitisReason(data: any) {
    //   this.hepatitisReason = data;
    // },
    // setASBReason(data: any) {
    //   this.asbReason = data;
    // },
    setHypertension(data: any) {
      this.hypertension = data;
    },
    setPreEclampsia(data: any) {
      this.preEclampsia = data;
    },
    setHyper(data: any) {
      this.hyper = data;
    },
    setHIV(data: any) {
      this.hiv = data;
    },
    setHepatitisB(data: any) {
      this.hepatitisB = data;
    },
    setHepatitisC(data: any) {
      this.hepatitisC = data;
    },
    setSyphilis(data: any) {
      this.syphilis = data;
    },
    setSyphilisTesting(data: any) {
      this.syphilisTesting = data;
    },
    setTBscreening(data: any) {
      this.tbScreening = data;
    },
    setASB(data: any) {
      this.ASB = data;
    },
    setGDM(data: any) {
      this.GDM = data;
    },
    setDiabetes(data: any) {
      this.diabetes = data;
    },
    setAnaemia(data: any) {
      this.anaemia = data;
    },
  },
  // persist: true,
});
