import {defineStore} from "pinia";

export const useLevelOfConsciousnessStore = defineStore("levelOfConsciousnessStore", {
    state: () => ({
        levelOfConsciousness: [
            {
                selectedData: [],
                isFinishBtn: false,
                classDash: "dashed_bottom_border",
                radioBtnContent: {
                    header: {
                        title: "Eye-opening response",
                        name: "Eye-opening response",
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
                            name: "To pain ",
                            value: "To pain ",
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
                        name: "Best verbal response",
                        selectedValue: "",
                        class: "bold",
                    },
                    data: [
                        {
                            name: "Oriented to time, place and person ",
                            value: "Oriented to time, place and person ",
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
                            name: " Incomprehensible sounds",
                            value: " Incomprehensible sounds",
                            colSize: 6,
                        },
                        {
                            name: "No response ",
                            value: "No response ",
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
                        name: "Best motor response",
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
                            name: "Flexion withdrawal from pain ",
                            value: "Flexion withdrawal from pain ",
                            colSize: 6,
                        },
                        {
                            name: "Abnormal flexion (decorticate)",
                            value: "Abnormal flexion (decorticate)",
                            colSize: 6,
                        },
                        {
                            name: "Abnormal extension (decerebrate) ",
                            value: "Abnormal extension (decerebrate) ",
                            colSize: 6,
                        },
                        {
                            name: "No response ",
                            value: "No response ",
                            colSize: 6,
                        },
                    ],
                },
            },
        ] as any,
    }),
    actions: {
        setPregnancy(data: any) {
            this.levelOfConsciousness = data;
        },
    },
    // persist: true,
});
