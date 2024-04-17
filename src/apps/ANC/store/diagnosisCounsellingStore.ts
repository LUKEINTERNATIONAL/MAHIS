import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisCounsellingStore = defineStore("diagnosisCounsellingStore", {
  state: () => ({
    preEclampsia: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Pre-eclampsia risk",
            selectedValue: "",
            class: "bold",
            name: "Pre-eclampsia risk",
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

    preEclampsiaCounselling: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Pre-eclampsia counselling provided?",
            name: "Pre-eclampsia counselling",
            class: "bold",
            selectedValue: "",
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

    aspirin: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Aspirin provided?",
            selectedValue: "",
            class: "bold",
            name: "Aspirin provided",
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
                  displayNone: true,
                  inputHeader:
                    "Amount of daily aspirin provided until delivery",
                  value: "",
                  name: "Amount of daily aspirin provided",
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
      // ],

      // aspirinReason:[
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Reason aspirin not prescribed",
            selectedValue: "",
            class: "bold",
            name: "aspirin not prescribed",
            displayNone: true,
          },
          data: [
            {
              name: "Side effects",
              value: "side effects",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Stock-out",
              value: "stock-out",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Gestational less than 13 weeks",
              value: "gestational less than 13 weeks",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Allergy to medication",
              value: "allergy to medication",
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
                  name: "Specify",
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

    gdm: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Risk of gestational mellitus (GDM)",
            selectedValue: "",
            class: "bold",
            name: "GDM",
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

    gdmCounselling: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title:
              "Gestational diabetes mellitus (GDM) risk counselling conducted?",
            selectedValue: "",
            class: "bold",
            name: "GDM counselling conducted",
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

    hivRisk: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on HIV risk?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on HIV ",
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

    prEp: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "",
        radioBtnContent: {
          header: {
            title: "PrEp for HIV prevention provided?",
            selectedValue: "",
            class: "bold",
            name: "PrEp for HIV prevention",
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
                  displayNone: true,
                  inputHeader: "Amount of PrEp provided",
                  value: "",
                  name: "Amount of PrEp provided",
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
      // ],

      // prEpReason:[
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Reason PrEp for HIV prevention was not provided",
            selectedValue: "",
            class: "bold",
            name: "PrEp for HIV prevention was not provided",
          },
          data: [
            {
              name: "Client was referred",
              value: "client was referred",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Stock-out",
              value: "stock-out",
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
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  name: "Specify",
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

    seekingCare: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on seeking care?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on seeking care",
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

    dangerSigns: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title:
              "Counsel to immediately go to hospital if severe danger signs are present",
            selectedValue: "",
            class: "bold",
            name: "Counsel to immediately go to hospital",
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

    ancContact: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counseling on ANC contact schedule?",
            selectedValue: "",
            class: "bold",
            name: "Counseling on ANC contact",
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

    birth: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on birth?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on birth",
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
    modeOfTransport: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on mode of transport?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on mode of transport",
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
    intrapartum: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on intrapartum?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on intrapartum",
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
    birthPlace: [
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "",
        radioBtnContent: {
          header: {
            title: "Planned birth place",
            selectedValue: "",
            class: "bold",
            name: "birth Place",
          },
          data: [
            {
              name: "Facility",
              value: "facility",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Facility (elective ceasarian section)",
              value: "facility (elective ceasarian section)",
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
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  name: "Specify",
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

    postpartum: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on postpartum family planning?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on postpartum",
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

    breastFeeding: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Counselling conducted on breast feeding?",
            selectedValue: "",
            class: "bold",
            name: "Counselling on breast feeding",
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
  }),
  actions: {
    setPreEclampsia(data: any) {
      this.preEclampsia = data;
    },
    setPreEclampsiaCounselling(data: any) {
      this.preEclampsiaCounselling = data;
    },
    setAspirin(data: any) {
      this.aspirin = data;
    },
    setAspirinReason(data: any) {
      // this.aspirinReason = data
    },
    setGDM(data: any) {
      this.gdm = data;
    },
    setGDMCOunselling(data: any) {
      this.gdmCounselling = data;
    },
    setHIVRisk(data: any) {
      this.hivRisk = data;
    },
    setPrEp(data: any) {
      this.prEp = data;
    },
    setPrEpReason(data: any) {
      // this.prEpReason = data
    },
    setSeekingCare(data: any) {
      this.seekingCare = data;
    },
    setDangerSigns(data: any) {
      this.dangerSigns = data;
    },
    setANCContact(data: any) {
      this.ancContact = data;
    },
    setBirth(data: any) {
      this.birth = data;
    },
    setModeOfTransport(data: any) {
      this.modeOfTransport = data;
    },
    setIntrapartum(data: any) {
      this.intrapartum = data;
    },
    setBirthPlace(data: any) {
      this.birthPlace = data;
    },
    setPostpartum(data: any) {
      this.postpartum = data;
    },
    setBreastFeeding(data: any) {
      this.breastFeeding = data;
    },
  },
  persist:true
});
