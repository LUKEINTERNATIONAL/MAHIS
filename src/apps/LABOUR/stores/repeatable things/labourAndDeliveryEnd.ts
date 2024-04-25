import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useEndLabourStore = defineStore("endLabourStore", {
  state: () => ({
    endLabourAndDelivery: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border _padding",
        radioBtnContent: {
          header: {
            title: "Reason for closing labour and delivery record",
            selectedValue: "",
            name: "closing labour and delivery",
          },
          data: [
            {
              name: "Death",
              value: "death",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Absconded",
              value: "absconded",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: "Wrong entry",
              value: "wrong entry",
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
        data: {
          rowData: [
            {
              colData: [
                {
                  inputHeader: "Specify",
                  unit: "",
                  icon: icons.editPen,
                  value: "",
                  name: "Specify",
                  valueType:'text',
                  required: true,
                  eventType: "input",
                  placeholder: "",
                },
              ],
            },
          ],
        },
      },
    ] as any,
  }),
  actions: {
    setLabourEnd(data: any) {
      this.endLabourAndDelivery = data;
    },
  },
  persist: true,
});