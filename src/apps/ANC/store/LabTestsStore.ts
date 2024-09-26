import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabTestsStore = defineStore("labTestsStore", {
  state: () => ({
    ultrasound: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "What is the status of the ultra sound?",
            selectedValue: "",
            name: "Ultrasound scan status",
            class: "bold",
          },
          data: [
            {
              name: "Ultrasound scan conducted",
              value: "Scan conducted",
              colSize: "7",
            },
            {
              name: "Ultrasound scan not done",
              value: "NOT done",
              colSize: "7",
            },
          ],
        },
      },
      {
        classDash: "dashed_bottom_border _padding",
        header: {
          name: "Scan date",
        },
        data: {
          rowData: [
            {
              colData: [
                {
                  class: "bold",
                  inputHeader: "Ultrasound Scan Date",
                  displayNone: true,
                  value: "",
                  name: "Scan date",
                  valueType: "date",
                  required: true,
                  eventType: "input",
                  alertsErrorMassage: "",
                  isDatePopover: true,
                  icon: icons.calenderPrimary,
                  placeholder: "Pick the date",
                },
              ],
            },
          ],
        },
      },
    ],
    reason: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Reason ultrasound scan not done",
            selectedValue: "",
            displayNone: true,
            class: "bold",
            name: "Reason not done",
          },
          data: [
            {
              name: "Machine not functioning",
              value: "Machine not functioning",
              colSize: "7",
            },
            {
              name: "Technician not available",
              value: "Technician not available",
              colSize: "7",
            },
            {
              name: "Other reason",
              value: "Other reason",
              colSize: "7",
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
                  //displayNone: true,
                  inputHeader: "Other (specify)",
                  icon: icons.editPen,
                  value: "",
                  name: "specify",
                  required: true,
                  eventType: "input",
                  inputWidth: "85%",
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
            title: "Amniotic fluid level detected during ultrasound",
            selectedValue: "",
            name: "Amniotic fluid level",
            class: "bold",
            displayNone: true,
          },
          data: [
            {
              name: "Normal amniotic fluid level",
              value: "Normal level",
              colSize: "7",
            },
            {
              name: "Reduced amniotic fluid level",
              value: "Reduced level",
              colSize: "7",
            },
            {
              name: "Increased amniotic fluid level",
              value: "Increased level",
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
            title: "Location of the placenta detected during the ultrasound",
            selectedValue: "",
            name: "Placenta location",
            class: "bold",
            displayNone: true,
          },
          data: [
            {
              name: "Praevia",
              value: "Praevia",
              colSize: "4",
            },
            {
              name: "Low",
              value: "Low",
              colSize: "4",
            },
            {
              name: "Anterior",
              value: "Anterior",
              colSize: "4",
            },
            {
              name: "Posterior",
              value: "Posterior",
              colSize: "4",
            },
            {
              name: "Right side",
              value: "Right side",
              colSize: "4",
            },
            {
              name: "Left side",
              value: "left",
              colSize: "4",
            },
            {
              name: "Fundal",
              value: "fundal",
              colSize: "4",
            },
          ],
        },
      },
    ],
  }),
  actions: {
    setUltrasound(data: any) {
      this.ultrasound = data;
    },
    setReason(data: any) {
      this.reason = data;
    },
  },
  //  persist: true,
});
