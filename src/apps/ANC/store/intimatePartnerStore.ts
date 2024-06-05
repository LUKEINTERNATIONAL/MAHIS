import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useIntimatePartnerStore = defineStore("intimatePartnerStore", {
  state: () => ({
    ipv: [
      {
        selectdData: [],
        isFinishBtn: false,
        //classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Intimate partner firstline support provided?",
            selectedValue: "",
            class: "bold",
            name: "intimateInfo",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
       // classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Reason IPV firstline support not done",
            selectedValue: "",
            class: "bold",
            name: "IPV firstline support",
            displayNone: true,
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
              name: "Trained provided unavailable",
              value: "trained provided unavailable",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Private/safe space unavailable",
              value: "private/safe space unavailable",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Confidentiality could not be assured",
              value: "confidentiality could not be assured",
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
                  value: "",
                  name: "other",
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

    additionalCare: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "What additional care provided?",
            selectedValue: "",
            class: "bold",
            name: "additional care provided",
          },
          data: [
            {
              name: "No action necessary",
              value: "no action necessary",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Safety assessment conducted",
              value: "safety assessment conducted",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Mental health care",
              value: "mental health care",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Care for other presenting signs and symptoms",
              value: "care for other presenting signs and symptoms",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Client was referred",
              value: "client was referred",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
    ],

    safety_assessment: [
      {
        selectdData: [],
        isFinishBtn: false,
        //classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Safety assessment conducted?",
            selectedValue: "",
            class: "bold",
            name: "Safety assessment",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    physical_violence: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title:
              "Has the physical violence happened more often or gotten worse over the past 6 months?",
            selectedValue: "",
            class: "bold",
            name: "physical violence",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    beaten_pregnant: [
      {
        selectdData: [],
        isFinishBtn: false,
        //classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Has he ever beaten you when you were pregnant?",
            selectedValue: "",
            class:'bold',
            name: "beaten when pregnant",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    woman_threatened: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Has he ever threatened you with a weapon?",
            selectedValue: "",
            class: "bold",
            name: "threatened with a weapon",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    constant_jealous: [
      {
        selectdData: [],
        isFinishBtn: false,
        //classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Is he violently and constantly jealous of you?",
            selectedValue: "",
            class: "bold",
            name: "violently and constantly jealous",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    strangling: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Has he ever tried to strangle you?",
            selectedValue: "",
            class: "bold",
            name: "tried to strangle",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],

    murder_threat: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Do you believe he could kill you?",
            selectedValue: "",
            class: "bold",
            name: "he could kill you",
          },
          data: [
            {
              name: "Yes",
              value: "yes",
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
    ],
    referrals: [
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border ",
        checkboxBtnContent: {
          header: {
            title: "Referrals made as part of first-line support",
            selectedValue: "",
            class: "bold",
            name: "first-line support",
          },
          data: [
            {
              name: "Care at another facility",
              value: "care at another facility",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Crisis intervention or counselling",
              value: "crisis intervention or counselling",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border ",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "first-line support",
          },
          data: [
            {
              name: "Police",
              value: "police",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Shelter or housing",
              value: "shelter or housing",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        sectionHeader: "",
        classDash: "dashed_bottom_border ",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "first-line support",
          },
          data: [
            {
              name: "Shelter or housing",
              value: "shelter or housing",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Child protection",
              value: "child protection",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },

      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border ",
        sectionHeader: "",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "first-line support",
          },
          data: [
            {
              name: "Livelihood support",
              value: "livelihood support",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              labelPlacement: "start",
              colSize: "6",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border ",
        sectionHeader: "",
        checkboxBtnContent: {
          header: {
            title: "",
            selectedValue: "",
            name: "first-line support",
          },
          data: [
            {
              name: "None",
              value: "none",
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
  }),
  actions: {
    setIPV(data: any) {
      this.ipv = data;
    },
    // setIPVReason(data:any){
    //     this.ipvReason = data
    // },
    setAddCare(data: any) {
      this.additionalCare = data;
    },
    setSafety(data: any) {
      this.safety_assessment = data;
    },
    setViolence(data: any) {
      this.physical_violence = data;
    },
    setBeaten(data: any) {
      this.beaten_pregnant = data;
    },
    setThreatened(data: any) {
      this.woman_threatened = data;
    },
    setJealous(data: any) {
      this.constant_jealous = data;
    },
    setStrangling(data: any) {
      this.strangling = data;
    },
    setThreat(data: any) {
      this.murder_threat = data;
    },
    setReferral(data: any) {
      this.referrals = data;
    },
  },
    persist: true,
});