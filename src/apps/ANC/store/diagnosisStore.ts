import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore("diagnosisStore", {
  state: () => ({
    hypertensionReason: [
      {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "Counselling conducted on hypertension?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on hypertension",
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
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "Reason counselling on hypertension not provided",
            selectedValue: "",
            class: "bold",
            name: "hypertension",
            displayNone: true,
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
        // classDash: "dashed_bottom_border _padding",

        data: {
          rowData: [
            {
              colData: [
                {
                  displayNone: true,
                  inputHeader: "specify",
                  value: "",
                  name: "other",
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
    ],

    hivReason: [],

    hepatitisReason: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Reason counselling on Hepatitis B not provided",
            selectedValue: "",
            class: "bold",
            name: "hepatitis B",
          },
          data: [
            {
              name: "Stockout",
              value: "required",
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
                  valueType: "text",
                  name: "hepatitis B",
                  icon: icons.editPen,
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],

    asbReason: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title:
              "Seven-day antibiotic regemen for asymptomatic bacteriuria (ASB) provided?",
            selectedValue: "",
            class: "bold",
            name: "SevenDay",
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
            title:
              "Reason seven-day antibiotic regimen for asymptomatic bacteriuria (ASB) not provided",
            selectedValue: "",
            class: "bold",
            name: "SevenDayReason",
            displayNone: true,
          },
          data: [
            {
              name: "Stockout",
              value: "required",
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              labelPlacement: "start",
              colSize: "9",
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
                  displaNone: true,
                  inputHeader: "specify",
                  value: "",
                  name: "hypertensionCounselling",
                  icon: icons.editPen,
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
                  alertsErrorMassage: "",
                },
              ],
            },
          ],
        },
      },
    ],

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
      {
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            title:
              "Action on Pre-eclampsia with Severe Features(Refer urgently)",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Give Magnesium Sulphate",
              value: "Give Magnesium Sulphate",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Give appropriate anti-hypertensives",
              value: "Give appropriate anti-hypertensives",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Revise birth plan",
              value: "Revise birth plan",
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
            title: "Counselling on Pre-eclampsia with Severe Features",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Advice to reduce workload and to rest",
              value: "Advice to reduce workload and to rest",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: " Advise on danger signs",
              value: " Advise on danger signs",
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
            title: "Action on Pre-eclampsia(Refer urgently)",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Revise the birth plan",
              value: "Revise the birth plan",
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
            title: "Counselling Hypertension",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Advice to reduce workload and to rest ",
              value: "Advice to reduce workload and to rest ",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: " Advise on danger signs",
              value: " Advise on danger signs",
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
            title: "Counselling on HIV",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Counsel for HIV positive test",
              value: "Counsel for HIV positive test",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Initiate for HIV services.",
              value: "Initiate for HIV services.",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Opportunistic infections & seeking medical help",
              value: "opportunistic infections & seeking medical help",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Proceed with systematic screening for active TB",
              value: "Proceed with systematic screening for active TB",
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
            title: "Hepatitis B Counselling",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Provide post-testing counselling",
              value: "Provide post-testing counselling",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: " Manage or Refer to hospital if need be",
              value: " Manage or Refer to hospital if need be",
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
            title: "Hepatitis C Counselling",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Provide post-testing counselling",
              value: "Provide post-testing counselling",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: " Manage or Refer to hospital if need be",
              value: " Manage or Refer to hospital if need be",
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
            title: "Syphillis Counselling and Treatment",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "primary or secondary stage of syphilis, give single dose of benzathine penicillin 2,400,000 IU",
              value:
                "primary or secondary stage of syphilis, give single dose of benzathine penicillin 2,400,000 IU",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "late or unknown stage of syphilis,one dose of benzathine penicillin 2,400,000 IU weekly for 3 consecutive weeks",
              value:
                "late or unknown stage of syphilis,one dose of benzathine penicillin 2,400,000 IU weekly for 3 consecutive weeks",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Advise on treating partner",
              value: "Advise on treating partner",
              checked: false,
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Reinforce the use of condoms",
              value: "Reinforce the use of condoms",
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
            title: "Counselling on TB screening",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Refer the client for TB treatment",
              value: "Refer the client for TB treatment",
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
            title: "Counselling on anaemia",
            selectedValue: "",
            class: "bold",
            name: "Severe Features", //this concept is temporary
          },
          data: [
            {
              name: "Daily elemental iron should be increased to 120 mg until her haemoglobin (Hb) concentration rises to normal (Hb 110 g/L or higher). Thereafter, she can resume the standard daily antenatal iron dose to prevent recurrence of anaemia",
              value:
                "Daily elemental iron should be increased to 120 mg until her haemoglobin (Hb) concentration rises to normal (Hb 110 g/L or higher). Thereafter, she can resume the standard daily antenatal iron dose to prevent recurrence of anaemia",
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
            title: "Has client developed severe hypertension?",
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
            // displayNone: true,
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
    setHIVReason(data: any) {
      this.hivReason = data;
    },
    setHypertensionReason(data: any) {
      this.hypertensionReason = data;
    },
    setHepatitisReason(data: any) {
      this.hepatitisReason = data;
    },
    setASBReason(data: any) {
      this.asbReason = data;
    },
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
