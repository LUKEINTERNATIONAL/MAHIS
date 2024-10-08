import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

const initialPregnancy = [
  {
    selectedData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Are you pregnant?",
        name: "Patient pregnant",
        selectedValue: "",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: 3,
        },
        {
          name: "No",
          value: "No",
          colSize: 3,
        },
      ],
    },
  },
  {
    radioBtnContent: {
      header: {
        title: "Breastfeeding?",
        name: "Is patient breast feeding",
        selectedValue: "",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: 3,
        },
        {
          name: "No",
          value: "No",
          colSize: 3,
        },
      ],
    },
  },
];
export const usePregnancyStore = defineStore("pregnancyStore", {
  state: () => ({
    pregnancy: [...initialPregnancy] as any,
  }),
  actions: {
    setPregnancy(data: any) {
      this.pregnancy = data;
    },
    getPregnancy() {
        const data = _.cloneDeep(initialPregnancy);
        return [...data];
    },
  },
  persist: true,
});
