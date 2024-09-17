import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialWardDangerSigns = [
  {
    selectdData: [],
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Danger signs*",
        selectedValue: "",
        class: "bold",
        name: "Danger signs",
      },
      data: [
        {
          name: "Bleeding vaginally",
          value: "bleeding vaginally",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Central cyanosis",
          value: "central cyanosis",
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
        name: "Danger signs",
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
          name: "Severe vomiting",
          value: "severe vomiting",
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
        name: "Danger signs",
      },
      data: [
        {
          name: "Fever",
          value: "fever",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Visual disturbance",
          value: "visual disturbance",
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
        name: "Danger signs",
      },
      data: [
        {
          name: "Severe abdominal pain",
          value: "severe abdominal pain",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Unconscious",
          value: "unconscious",
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
        name: "Danger signs",
      },
      data: [
        {
          name: "Other danger signs",
          value: "Other danger signs",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "No danger signs",
          value: "no danger signs",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
      ],
    },
  },

  {
    childName: "Other danger signs",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Other danger signs notes",
              required: true,
              eventType: "input",
              inputWidth: "85%",
            },
          ],
        },
      ],
    },
  },
] as any;
const initialVitals = [
  {
    sectionHeader: "Blood pressure",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Systolic Pressure*",
              unit: "mmHg",
              icon: icons.systolicPressure,
              value: "",
              valueType: "text",
              name: "Systolic blood pressure",
              required: true,
              eventType: "input",
            },
            {
              inputHeader: "Diastolic pressure*",
              unit: "mmHg",
              icon: icons.diastolicPressure,
              value: "",
              valueType: "text",
              name: "Diastolic blood pressure",
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
    previousView: {
      name: "vitals",
    },
  },

  {
    sectionHeader: "Pulse rate",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Pulse rate*",
              unit: "BMP",
              icon: icons.pulse,
              value: "",
              valueType: "text",
              name: "Pulse",
              eventType: "input",
            },
          ],
        },
      ],
    },
    previousView: {
      name: "vitals",
    },
  },
  {
    sectionHeader: "Temperature",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Temperature*",
              unit: "C",
              icon: icons.temprature,
              value: "",
              valueType: "text",
              name: "Temp",
              eventType: "input",
            },
          ],
        },
      ],
    },
    previousView: {
      name: "vitals",
    },
  },
  {
    sectionHeader: "Respiratory rate",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Respiratory rate*",
              unit: "BPM",
              icon: icons.respiratory,
              valueType: "text",
              value: "",
              name: "Respiratory rate",
              eventType: "input",
            },
          ],
        },
      ],
    },
    previousView: {
      name: "vitals",
    },
  },
  {
    sectionHeader: "Oxygen saturation",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Oxygen saturation*",
              unit: "%",
              icon: icons.oxgenStaturation,
              valueType: "text",
              value: "",
              name: "Oxygen saturation",
              eventType: "input",
            },
          ],
        },
      ],
    },
    previousView: {
      name: "vitals",
    },
  },
] as any;

const initialOtherexams = [
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Status of uterus",
        selectedValue: "",
        name: "Status of uterus",
        displayNext: "Other status",
        class: "bold",
      },
      data: [
        {
          name: "Involuted",
          value: "involuted",
          colSize: "4.001",
        },
        {
          name: "Sub-involuted",
          value: "Sub-involuted",
          colSize: "4.001",
        },
        {
          name: "Other status",
          value: "Other status",
          colSize: "5",
        },
      ],
    },
  },
  {
    childName: "Status of uterus",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Status of uterus notes",
              required: true,
              eventType: "input",
              inputWidth: "",
            },
          ],
        },
      ],
    },
  },

  {
    selectedData: [],
    childName: "",
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Was the intervention given?",
        selectedValue: "",
        name: "Intervention given",
        class: "bold",
        displayNext: "Yes",
        displayNone: true,
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
    childName: "Intervention given",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Describe the intervention given?",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Interventions provided notes",
              required: true,
              eventType: "input",
              inputWidth: "",
              displayNone: true,
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
    checkboxBtnContent: {
      header: {
        title: "Type of lochia",
        selectedValue: "",
        name: "Status of lochia",
        class: "bold",
        displayNext: "Other status",
      },
      data: [
        {
          name: "Mild",
          value: "mild",
          colSize: "4.001",
        },
        {
          name: "Moderate",
          value: "moderate",
          colSize: "4.001",
        },
        {
          name: "Heavy",
          value: "heavy",
          colSize: "4.001",
        },
        {
          name: "Offensive smell",
          value: "Offensive smell",
          colSize: "4.0001",
        },
        {
          name: "Other status",
          value: "Other status",
          colSize: "5",
        },
      ],
    },
  },
  {
    childName: "Status of lochia",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Status of lochia notes",
              required: true,
              eventType: "input",
              inputWidth: "",
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
        title: "Was the intervention given?",
        selectedValue: "",
        name: "Intervention for Lochia",
        displayNext: "Yes",
        class: "bold",
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
    childName: "Intervention for Lochia",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Describe the intervention given?",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Intervention for Lochia notes",
              required: true,
              eventType: "input",
              inputWidth: "",
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
        title: "Episiotomy/tear present?",
        selectedValue: "",
        name: "Episiotomy/tear",
        class: "bold",
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
    childName: "Episiotomy/tear",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Condition of episiotomy/tear?",
        selectedValue: "",
        name: "Condition of episiotomy/tear",
        class: "bold",
        displayNone: true,
        displayNext: "Infected and gaped",
      },
      data: [
        {
          name: "Intact",
          value: "intact",
          colSize: "4.001",
        },
        {
          name: "Gaped",
          value: "gaped",
          colSize: "4.001",
        },
        {
          name: "Infected",
          value: "infected",
          colSize: "4.001",
        },
        {
          name: "Infected and gaped",
          value: "infected and gaped",
          colSize: "4.001",
        },
      ],
    },
  },
  {
    childName: "Condition of episiotomy/tear",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Was the intervention given?",
        selectedValue: "",
        name: "Intervention on episiotomy/tear",
        class: "bold",
        displayNext: "Yes",
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
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Describe the intervention given?",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Intervention on tear/episiotomy notes",
              required: true,
              eventType: "input",
              inputWidth: "",
            },
          ],
        },
      ],
    },
  },
  {
    selectdData: [],
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Are any of the postnatal complications present for the mother",
        selectedValue: "",
        class: "bold",
        name: "Postnatal complications",
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
          name: "Sepsis",
          value: "sepsis",
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
        name: "Postnatal complications",
      },
      data: [
        {
          name: "Anemia",
          value: "anemia",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Postpartum hemorrhage",
          value: "postpartum hemorrhage",
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
        name: "Postnatal complications",
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
        name: "Postnatal complications",
      },
      data: [
        {
          name: "Breast engorgement",
          value: "breast engorgement",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Other complications",
          value: "Other complications",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
      ],
    },
  },

  {
    childName: "Other complications",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              unit: "text",
              icon: icons.editPen,
              valueType: "text",
              value: "",
              name: "Other postnatal complications notes",
              required: true,
              eventType: "input",
              inputWidth: "",
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
        title: "Was the intervention given for the complications?",
        selectedValue: "",
        name: "Interventions for complications",
        displayNext: "Yes",
        class: "bold",
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
    childName: "Interventions for complications",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",

    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Describe the intervention given?",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Intervention on complications notes",
              required: true,
              eventType: "input",
              inputWidth: "",
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
        title: "Breast feeding?",
        selectedValue: "",
        class: "bold",
        name: "Breast feeding",
      },
      data: [
        {
          name: "Breastfed exclusively",
          value: "Breastfed exclusively",
          colSize: "5",
        },
        {
          name: "Non exclusive",
          value: "non exclusive",
          colSize: "5",
        },
        {
          name: "Not breastfeeding",
          value: "not breastfeeding",
          colSize: "5",
        },
      ],
    },
  },
] as any;
export const usePostnatalWardStayStore = defineStore('postnatalWardStayStore',{
    state: () => ({
        dangerSigns: [...initialWardDangerSigns] as any,

        vitals: [...initialVitals] as any,

        otherExams:[...initialOtherexams] as any,
    }),
    actions:{
        setDangerSigns(data: any){
            this.dangerSigns = data
        }, setvitals(data: any){
            this.vitals = data
        }, setOtherExams(data: any){
            this.otherExams = data
        },
        getInitial(){
            const data=_.cloneDeep(initialWardDangerSigns);
            return [...data];
        },getInitial1(){
            const data=_.cloneDeep(initialVitals);
            return [...data];
        },getInitial2(){
            const data=_.cloneDeep(initialOtherexams);
            return [...data];
        },
    },
    // persist:true

})