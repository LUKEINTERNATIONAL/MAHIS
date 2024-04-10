import {defineStore} from "pinia";
import {icons} from "@/utils/svg";
import _ from "lodash"

const initialDangerSigns= [

    {
        selectdData: [],
        sideColSize:0.3,
        childName:"Yes",
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                selectedValue: "",
                name: "Extremities normal",
                title: "Extremities normal?",
                class:"bold",
                // displayNone: true,
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name:"No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectdData: [],
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What are the abnormalities for extremities?",
                selectedValue: "",
                 displayNone: false,
                name: "Danger signs",
                class:'bold'
            },
            data: [
                {
                    name: "No danger signs",
                    value: "NoDangerSigns",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },

                {
                    name: "Central cyanosis",
                    value: "CentralCyanosis",
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
        sideColSize:1,
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone: true,
                name: "Abnormality for extremities",
            },
            data: [
                {
                    name: "Other extremities abnormalities",
                    disabled: false,
                    value: "Other extremities abnormalities",
                    labelPlacement: "start",
                    colSize: "9",
                    justify: "space-between",
                    checked: false,
                },
            ],
        },
    },

    {
        classDash: "dashed_bottom_border",
        sideColSize:1,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            // displayNone: true,
                            inputHeader: "Specify extremity abnormality",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
                            name: "Other extremities abnormalities notes",
                            eventType: "input",
                            inputWidth: "100%",
                            required: true,
                        },
                    ],
                },
            ],
        },
    },
] as any;
export const useDangerSignsStore = defineStore("dangerSignsStore", {
    state: () => ({
        DangerSigns: [...initialDangerSigns]
    }),
    actions: {
        setDangerSignsStore(data: any) {
            this.DangerSigns = data;


        },
        getInitial(){
            const data = _.cloneDeep(initialDangerSigns);
            return [...data]; // Return a copy of the initial state
        }
    },
    // persist: true,
});
