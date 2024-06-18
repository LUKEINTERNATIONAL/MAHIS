import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";

export const ConsciousnessConcepts = {
  BEST_VERBAL_RESPONSE: "Best verbal response",
  EYE_OPENING_RESPONSE: "Eye opening response",
  BEST_MOTOR_RESPONSE: "Best motor response",
};

export const eyeOpeningWeights: { [key: string]: number } = {
  Spontaneously: 4,
  "To speech": 3,
  "To pain": 2,
  "No response": 1,
};

export const verbalResponseWeights: { [key: string]: number } = {
  "Oriented to time, place and person": 5,
  Confused: 4,
  "Inappropriate words": 3,
  "Incomprehensible sounds": 2,
  "No response": 1,
};

export const motorResponseWeights: { [key: string]: number } = {
  "Obeys commands": 6,
  "Moves to localised pain": 5,
  "Flexion withdrawal from pain": 4,
  "Abnormal flexion (decorticate)": 3,
  "Abnormal extension (decerebrate)": 2,
  "No response": 1,
};

export const eyeOpeningMinorWeights: { [key: string]: number } = {
  "Not directed": 0,
  "Directed eye movements": 1,
};
export const motorResponseMinorWeights: { [key: string]: number } = {
  "Non specific or no response": 0,
  "Withdraws from pain": 1,
  "Localizes pain": 2,
};
export const verbalResponseMinorWeights: { [key: string]: number } = {
  "No cry": 0,
  "Inappropriate cry or moan": 1,
  "Appropriate cry": 2,
};
const initialLevelOfConsciousness = [
  {
    selectedData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Eye-opening response",
        name: ConsciousnessConcepts.EYE_OPENING_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Spontaneously",
          value: "Spontaneously",
          colSize: 6,
        },
        {
          name: "To speech",
          value: "To speech",
          colSize: 6,
        },
        {
          name: "To pain",
          value: "To pain",
          colSize: 6,
        },
        {
          name: "No response",
          value: "No response",
          colSize: 6,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Best verbal response",
        name: ConsciousnessConcepts.BEST_VERBAL_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Oriented to time, place and person",
          value: "Oriented to time, place and person",
          colSize: 6,
        },
        {
          name: "Confused",
          value: "Confused",
          colSize: 6,
        },
        {
          name: "Inappropriate words",
          value: "Inappropriate words",
          colSize: 6,
        },
        {
          name: "Incomprehensible sounds",
          value: "Incomprehensible sounds",
          colSize: 6,
        },
        {
          name: "No response",
          value: "No response",
          colSize: 6,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Best motor response",
        name: ConsciousnessConcepts.BEST_MOTOR_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Obeys commands",
          value: "Obeys commands",
          colSize: 6,
        },
        {
          name: "Moves to localised pain",
          value: "Moves to localised pain",
          colSize: 6,
        },
        {
          name: "Flexion withdrawal from pain",
          value: "Flexion withdrawal from pain",
          colSize: 6,
        },
        {
          name: "Abnormal flexion (decorticate)",
          value: "Abnormal flexion (decorticate)",
          colSize: 6,
        },
        {
          name: "Abnormal extension (decerebrate)",
          value: "Abnormal extension (decerebrate)",
          colSize: 6,
        },
        {
          name: "No response",
          value: "No response",
          colSize: 6,
        },
      ],
    },
  },
];
const initiallevelOfConsciousnessMinor = [
  {
    selectedData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Eye-opening response",
        name: ConsciousnessConcepts.EYE_OPENING_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Directed eye movements",
          value: "Directed eye movements",
          colSize: 6,
        },
        {
          name: "Not directed",
          value: "Not directed",
          colSize: 6,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Best verbal response",
        name: ConsciousnessConcepts.BEST_VERBAL_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Appropriate cry",
          value: "Appropriate cry",
          colSize: 6,
        },
        {
          name: "Inappropriate cry or moan",
          value: "Inappropriate cry or moan",
          colSize: 6,
        },
        {
          name: "No cry",
          value: "No cry",
          colSize: 6,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    radioBtnContent: {
      header: {
        title: "Best motor response",
        name: ConsciousnessConcepts.BEST_MOTOR_RESPONSE,
        selectedValue: "",
        class: "bold",
      },
      data: [
        {
          name: "Localizes pain",
          value: "Localizes pain",
          colSize: 6,
        },
        {
          name: "Withdraws from pain",
          value: "Withdraws from pain",
          colSize: 6,
        },
        {
          name: "Non specific or no response",
          value: "Non specific or no response",
          colSize: 6,
        },
      ],
    },
  },
];
export const useLevelOfConsciousnessStore = defineStore("levelOfConsciousnessStore", {
  state: () => ({
    levelOfConsciousness: [...initialLevelOfConsciousness] as any,
    levelOfConsciousnessMinor: [...initiallevelOfConsciousnessMinor]as any,
  }),
  actions: {
    setPregnancy(data: any) {
      this.levelOfConsciousness = data;
      this.levelOfConsciousnessMinor = data;
    },
    getInitialLevelOfConsciousness() {
      const data = _.cloneDeep(initialLevelOfConsciousness);
      return [...data];
    },
    getinitiallevelOfConsciousnessMinor(){
        const data = _.cloneDeep(initiallevelOfConsciousnessMinor);
        return [...data];
    }
  },
   persist: true,
});
