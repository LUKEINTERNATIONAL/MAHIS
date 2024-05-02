import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useWomanBehaviourStore = defineStore("womanBehaviourStore", {
  state: () => ({
    dailyCaffeineIntake: [
      {
        selectdData: [],
        // sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
          header: {
            class: "bold",
            title: "Daily caffeine use",
            selectedValue: "",
            name: "Daily caffeine use",
          },
          data: [
            {
              name: "More than 2 cups of coffee",
              value: "more than 2 cups of coffee",
              checked: false,
              labelPlacement: "start",
              colSize: "7",
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
            name: "Daily caffeine use",
          },
          data: [
            {
              name: "More than 4 cups of tea",
              value: "more than 4 cups of tea",
              checked: false,
              labelPlacement: "start",
              colSize: "7",
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
            name: "Daily caffeine use",
          },
          data: [
            {
              name: "More than 12 bars of chocolate",
              value: "more than 12 bars of chocolate",
              checked: false,
              labelPlacement: "start",
              colSize: "7",
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
            name: "Daily caffeine use",
          },
          data: [
            {
              name: "More than one bottle of soda, energy, soft drink",
              value: "more than one bottle of soda, energy, soft drink",
              checked: false,
              labelPlacement: "start",
              colSize: "7",
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
            name: "Daily caffeine use",
          },
          data: [
            {
              name: "None",
              value: "none",
              checked: false,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
    ],
    Tobacco: [
      {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            class: "bold",
            title: "Recently quit tobacco products",
            selectedValue: "",
            name: "Recently quit tobacco products",
          },
          data: [
            {
              value: "Yes",
              name: "Yes",
              colSize: "2.5",
            },
            {
              value: "No",
              name: "No",
              colSize: "2.5",
            },
          ],
        },
      },
      {
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            class: "bold",
            title: "Exposure to second hand smoke",
            selectedValue: "",
            name: "Exposure to second hand smoke",
          },
          data: [
            {
              value: "Yes",
              name: "Yes",
              colSize: "2.5",
            },
            {
              value: "No",
              name: "No",
              colSize: "2.5",
            },
          ],
        },
      },
    ] as any,
  }),
  actions: {
    setPersonalInformation(data: any) {
      this.dailyCaffeineIntake = data;
    },
  },
  // persist: true,
});
