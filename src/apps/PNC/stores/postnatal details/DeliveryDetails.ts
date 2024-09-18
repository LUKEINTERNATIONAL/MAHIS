import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

import * as yup from "yup";

const babyDetails = [
  {
    sideColSize: 1,
    isFinishBtn: false,
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: false,
              inputHeader: "First name",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "First name",
              required: true,
              eventType: "input",
              placeholder: "",
            },
            {
              inputHeader: "Last name",
              unit: "",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Last name",
              required: true,
              eventType: "input",
              placeholder: "",
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 1,
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: false,
              inputHeader: "Baby weight",
              unit: "grams",
              icon: icons.weight,
              valueType: "text",
              value: "",
              name: "Weight",
              required: true,
              eventType: "input",
              placeholder: "",
            },
            {
              inputHeader: "Baby height",
              unit: "cm",
              icon: icons.height,
              value: "",
              valueType: "text",
              name: "Height",
              required: true,
              eventType: "input",
              placeholder: "",
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 1,
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: false,
              inputHeader: "APGAR score at 5 minute",
              unit: "",
              icon: icons.editPen,
              valueType: "text",
              value: "",
              name: "Apgar score at 5 minute",
              required: true,
              eventType: "input",
              placeholder: "",
            },
          ],
        },
      ],
    },
  },
  {
    sideColSize: 1,

    childName: "Baby general condition at birth",
    selectdData: [],
    checkboxBtnContent: {
      header: {
        title: "Any Newborn complications?",
        selectedValue: "",
        class: "bold",
        name: "Newborn baby complications",
        displayNone: false,
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
          name: "Prematurity",
          value: "prematurity",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
      ],
    },
  },
  {
    sideColSize: 1,
    selectdData: [],
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        name: "Newborn baby complications",
        displayNone: false,
      },
      data: [
        {
          name: "Sepsis",
          value: "sepsis",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
        {
          name: "Congenital abnormalities",
          value: "Congenital abnormalities",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
      ],
    },
  },
  {
    sideColSize: 1,
    selectdData: [],
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        name: "Newborn baby complications",
        displayNone: false,
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
          name: "Low birthweight",
          value: "Low birthweight",
          checked: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
        },
      ],
    },
  },
  {
    sideColSize: 1,
    childName: "Asphyxia",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Was resuscitation attempted?",
        selectedValue: "",
        name: "Resuscitation attempt",
        class: "bold",
        displayNext: "Yes",
        displayNone: true,
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
    sideColSize: 1,
    childName: "Resuscitation attempt",
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border _padding",
    radioBtnContent: {
      header: {
        title: "Type of resuscitation?",
        selectedValue: "",
        displayNone: true,
        class: "bold",
        name: "Type of resuscitation",
      },
      data: [
        {
          name: "Drying only",
          value: "Drying only",
          colSize: "7",
        },
        {
          name: "Clearing airway",
          value: "Clearing airway",
          colSize: "7",
        },
        {
          name: "Bag and mask",
          value: "Bag and mask",
          colSize: "7",
        },
      ],
    },
  },
  {
    sideColSize: 1,
    classDash: "dashed_bottom_border _padding",
    childName: "Baby general condition at birth",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        name: "Newborn baby complications",
        displayNone: true,
      },
      data: [
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
];

export const BabyDetailsValidationSchema = yup.object().shape({
  "First name": yup
    .string()
    .required("First Name is required")
    .max(50, "First Name cannot be longer than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters and spaces"),
  "Last name": yup
    .string()
    .required("first name is required")
    .max(50, "Name cannot be longer than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters and spaces"),
  "Apgar score at 1 minute": yup
    .number()
    .typeError("Apgar score at 1 minute can only be a number")
    .required("Apgar score at 1 minute is required")
    .label("Apgar score at 1 minute"),
  "Apgar score at 5 minute": yup
    .number()
    .typeError("Apgar score at 5 minute can only be a number")
    .required()
    .label("Apgar score at 5 minute"),
  Weight: yup
    .number()
    .typeError("Weight can only be a number")
    .min(2500)
    .required()
    .label("Weight"),
  Height: yup
    .number()
    .typeError("Height can only be a number")
    .min(500)
    .required()
    .label("Height"),
  Circumference: yup
    .number()
    .typeError("Circimference can only be a number")
    .required()
    .label("Circumference"),
});
const initialDeliveryDetails = [
  {
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "",
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Date of delivery*",
              value: "",
              name: "Date of delivery",
              icon: icons.calenderPrimary,
              required: true,
              valueType: "text",
              eventType: "input",
              isDatePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick date",
            },
            {
              inputHeader: "Time of delivery*",
              value: "",
              name: "Time of delivery",
              icon: icons.timePicker,
              required: true,
              valueType: "text",
              eventType: "input",
              isTimePopover: true,
              alertsErrorMassage: "",
              placeholder: "Pick time",
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
        title: "Mode of delivery*",
        selectedValue: "",
        class: "bold",
        name: "Mode of delivery",
        displayNext: "Other mode of delivery",
      },
      data: [
        {
          name: "Spontaneous Vertex Delivery",
          value: "Spontaneous vertex delivery",
          colSize: "5",
        },
        {
          name: "Vacuum extraction delivery",
          value: "Vacuum extraction delivery",
          colSize: "5",
        },
        {
          name: "Breech delivery",
          value: "Breech delivery",
          colSize: "5",
        },
        {
          name: "Caesarean section",
          value: "Caesarean section",
          colSize: "5",
        },
        {
          name: "Other mode of delivery",
          value: "Other mode of delivery",
          colSize: "5",
        },
      ],
    },
  },
  {
    childName: "Mode of delivery",
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
              name: "Other mode of delivery notes",
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
        title: "Place of delivery*",
        selectedValue: "",
        name: "Place of delivery",
        class: "bold",
      },
      data: [
        {
          name: "This facility",
          value: "this facility",
          colSize: "5",
        },
        {
          name: "In transit",
          value: "in transit",
          colSize: "5",
        },
        {
          name: "Other facility",
          value: "other facility",
          colSize: "5",
        },
        {
          name: "Home or TBA",
          value: "home/tba",
          colSize: "5",
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
        title: "Staff conducting delivery*",
        selectedValue: "",
        class: "bold",
        name: "Staff conducting delivery",
        displayNext: "other",
      },
      data: [
        {
          name: "MD/CO/MA/Nurse midwife/CMA",
          value: "md/co/ma/nurse midwife/cma",
          colSize: "7",
        },
        {
          name: "PA/WA/HSA/None",
          value: "pa/wa/hsa/other/none",
          colSize: "7",
        },
        {
          name: "Other",
          value: "other",
          colSize: "7",
        },
      ],
    },
  },
  {
    isFinishBtn: false,
    sectionHeader: "",
    childName: "Staff conducting delivery",
    classDash: "",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Other staff conducting delivery",
              value: "",
              name: "otherStaff",
              icon: icons.editPen,
              required: true,
              valueType: "text",
              eventType: "input",
              placeholder: "Enter staff name",
              alertsErrorMassage: "Please specify the staff name",
              showField: false,
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
        title: "What was the outcome of the delivery?*",
        selectedValue: "",
        class: "bold",
        name: "Outcome of the delivery",
        displayNext: "Live births",
      },
      data: [
        {
          name: "Live births",
          value: "Live births",
          colSize: "7",
        },
        {
          name: "Neonatal death",
          value: "Neonatal death",
          colSize: "7",
        },
        {
          name: "Stillbirths",
          value: "Stillbirths",
          colSize: "7",
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
        title: "Type of still birth?*",
        selectedValue: "",
        class: "bold",
        name: "Type of still birth",
        displayNone: true,
      },
      data: [
        {
          name: "Macerated still birth",
          value: "macerated still birth",
          colSize: "7",
        },
        {
          name: "Fresh still birth",
          value: "fresh still birth",
          colSize: "7",
        },
      ],
    },
  },
  {
    childName: "Outcome of the delivery",
    isFinishBtn: false,
    sectionHeader: "",
    classDash: "dashed_bottom_border _padding",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Total number of babies*",
              unit: "baby",
              icon: icons.editPen,
              value: "",
              valueType: "text",
              name: "Number of babies",
              required: true,
              eventType: "input",
              inputWidth: "",
            },
          ],
        },
      ],
    },
  },
] as any;
export const useDeliveryDetailsStore = defineStore("deliveryDetailsStore", {
  state: () => ({
    deliveryDetails: [...initialDeliveryDetails] as any,
    babyDetails: [..._.cloneDeep(babyDetails)] as any,
  }),
  actions: {
    setDeliveryDetails(data: any) {
      this.deliveryDetails = data;
    },
    getInitial() {
      const data = _.cloneDeep(initialDeliveryDetails);
      return [...data];
    },
    setBabyDetails(details = babyDetails) {
      this.babyDetails = [..._.cloneDeep(details)];
    },
  },
  // persist: true,
});
