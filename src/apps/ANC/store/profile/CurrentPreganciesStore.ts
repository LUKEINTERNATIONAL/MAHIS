import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _, {initial} from "lodash"
const initialLMNP = [
  {
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "LNMP Known?",
        selectedValue: "",
        name: "LNMP Known?",
        displayNext: "Yes",
      },
      data: [
        {
          value: "Yes",
          name: "Yes",
          colSize: "2",
        },
        {
          name: "No",
          value: "No",
          colSize: "2",
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    childName: "LNMP Known?",
    sectionHeader: "",
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              class: "bold",
              inputHeader: "LNMP date*",
              value: "",
              name: "lmnpDate",
              eventType: "input",
              alertsError: false,
              valueType: "text",
              alertsErrorMassage: "",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              inputWidth: "50%",
            },
          ],
        },
      ],
    },
    alerts: [
      {
        backgroundColor: "",
        status: "",
        icon: icons.editPen,
        textColor: "",
        value: "",
        name: "",
        index: "",
      },
    ],
  },
  {
    childName: "LNMP Known?",
    sectionHeader: "",
    sideColSize: 0.5,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              class: "bold",
              inputHeader: "Gestation age",
              value: "",
              name: "lmnpGestationAge",
              eventType: "input",
              valueType: "text",
              alertsError: false,
              alertsErrorMassage: "",
              inputWidth: "100%",
              unit: "Weeks",
              disabled: "disabled",
            },
            {
              // displayNone: true,
              class: "bold",
              inputHeader: "EDD",
              value: "",
              name: "Estimated date of delivery",
              eventType: "input",
              valueType: "text",
              alertsError: false,
              icon: icons.calenderPrimary,
              alertsErrorMassage: "",
              inputWidth: "100%",
              disabled: "disabled",
            },
          ],
        },
      ],
    },
  },
] as any;
const initialUltraSound = [
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "Ultrasound done?",
        selectedValue: "",
        name: "Ultrasound done?",
        displayNext: "Yes",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: "2",
        },
        {
          name: "No",
          value: "No",
          colSize: "2",
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    childName: "Ultrasound done?",
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              class: "bold",
              displayNone: true,
              inputHeader: "Date for ultrasound*",
              value: "",
              name: "Ultrasound",
              required: true,
              eventType: "input",
              alertsError: false,
              alertsErrorMassage: "",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              inputWidth: "55%",
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    childName: "Ultrasound done?",
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              class: "bold",
              displayNone: true,
              inputHeader: "Gestation age from ultrasound",
              value: "",
              name: "specify",
              required: true,
              eventType: "input",
              alertsError: false,
              alertsErrorMassage: "",
              icon: icons.editPen,
              placeholder: "",
              inputWidth: "55%",
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    childName: "Ultrasound done?",
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "LMNP date from ultrasound",
              value: "",
              name: "ultrasound lmnp date",
              //name:'lmnp date',
              required: true,
              eventType: "input",
              alertsError: false,
              alertsErrorMassage: "",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick date",
              inputWidth: "100%",
            },
            {
              // displayNone: true,
              inputHeader: "EDD",
              value: "",
              name: "Estimated date of delivery",
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
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "Gestation age by Palpation known?",
        selectedValue: "",
        name: "Gestation age by Palpation known",
        displayNext: "Yes",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: "2",
        },
        {
          name: "No",
          value: "No",
          colSize: "2",
        },
      ],
    },
  },
  {
    sideColSize: 0.5,
    childName: "Gestation age by Palpation known",
    isFinishBtn: false,
    class: "bold",
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Enter gestation age by palpation",
              value: "",
              class: "bold",
              name: "Gestation age to be used",
              required: true,
              eventType: "input",
              valueType: "text",
              alertsError: false,
              alertsErrorMassage: "",
              icon: icons.editPen,
              inputWidth: "100%",
            },
            {
              // displayNone: true,
              inputHeader: "EDD",
              value: "",
              name: "Estimated date of delivery",
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
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class: "bold",
        title: "Gestation age to be used",
        selectedValue: "",
        name: "Gestation age to be used",
      },
      data: [
        {
          name: "GA by  LNMP",
          value: "GA by  LNMP",
          colSize: "7",
        },
        {
          name: "GA by ultrasound",
          value: "ga by ultrasound",
          colSize: "7",
        },
        {
          name: "GA by palpation",
          value: "Ga by palpation",
          colSize: "7",
        },
      ],
    },
  },
] as any;
const initialTetenus=[
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class:"bold",
        title: "The woman received tetanus doses for immunization?",
        selectedValue: "",
        name: "The woman received tetanus doses for immunization?",
      },
      data: [
        {
          name: "Fully Immunised",
          value: "fully immunised",
          colSize: "5",
        },
        {
          name: "Under Immunised",
          value: "under immunised",
          colSize: "5",
        },
        {
          name: "No doses",
          value: "no doses",
          colSize: "5",
        },
        {
          name: "Unknown doses",
          value: "unknown doses",
          colSize: "5",
        },
      ],
    },
  },
  {
    isFinishBtn: false,
    classDash: "",
    sideColSize:0.5,
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "TTV 1 immunisation date",
              value: "",
              name: "tt1Date",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              required: true,
              eventType: "input",
              inputWidth: "",
              alertsError: false,
              alertsErrorMassage: "",
            },
            {
              displayNone: true,
              inputHeader: "TTV 2 immunisation date",
              value: "",
              name: "tt2Date",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              required: true,
              eventType: "input",
              inputWidth: "",
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
    classDash: "",
    sideColSize:0.5,
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "TTV 3 immunisation date",
              value: "",
              name: "tt3Date",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              required: true,
              eventType: "input",
              inputWidth: "",
              alertsError: false,
              alertsErrorMassage: "",
            },
            {
              displayNone: true,
              inputHeader: "TTV 4 immunisation date",
              value: "",
              name: "tt4Date",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              required: true,
              eventType: "input",
              inputWidth: "",
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
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "TTV 5 immunisation date",
              value: "",
              name: "tt5Date",
              isDatePopover: true,
              icon: icons.calenderPrimary,
              placeholder: "Pick the date",
              required: true,
              eventType: "input",
              inputWidth: "50%",
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
    sideColSize:0.5,
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Number of under immunised doses",
              value: "",
              name: "immunised doses",
              icon: icons.editPen,
              placeholder: "",
              required: true,
              eventType: "input",
              inputWidth: "100%",
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
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        class:"bold",
        title: "Reason Tetanus toxoid (TT) was not conducted",
        name: "Reason Tetanus toxoid (TT) was not conducted",
        selectedValue: "",
        displayNone: true,
      },
      data: [
        {
          name: "Stockout",
          value: "stockout",
          colSize: "5",
        },
        {
          name: "Client is ill",
          value: "client is ill",
          colSize: "5",
        },
        {
          name: "Client refused",
          value: "client refused",
          colSize: "5",
        },
        {
          name: "Allergy to vaccinate",
          value: "allergy",
          colSize: "5",
        },
        {
          name: "Other",
          value: "other",
          colSize: "5",
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    sideColSize:0.5,
    isFinishBtn: false,
    sectionHeader: "",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify other reasons",
              value: "",
              name: "Other",
              icon: icons.editPen,
              required: true,
              eventType: "input",
              inputWidth: "100%",
              alertsError: false,
              alertsErrorMassage: "",
            },
          ],
        },
      ],
    },
  },
    ] as any;
export const useCurrentPregnanciesStore = defineStore("currentPregnanciesStore", {
  state: () => ({
    palpation: [] as any,
    lmnp: [...initialLMNP] as any,
    ultrasound: [...initialUltraSound] as any,
    tetanus: [...initialTetenus] as any,
  }),
  actions: {
    // setTetanus(data: any) {
    //   this.tetanus = data;
    // },
    // setLMNP(data: any) {
    //   this.lmnp = data;
    // },
    // setUltrasound(data: any) {
    //   this.ultrasound = data;
    // },
    getInitial(){
      const data = _.cloneDeep(initialLMNP);
      return [...data]; // Return a copy of the initial state
    },
    getInitial1(){
      const data = _.cloneDeep(initialUltraSound);
      return [...data]; // Return a copy of the initial state
    },
    getInitial2(){
      const data = _.cloneDeep(initialTetenus);
      return [...data]; // Return a copy of the initial state
    }
  },
  // persist:true,
});