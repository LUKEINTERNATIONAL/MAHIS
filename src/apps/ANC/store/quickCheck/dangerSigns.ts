import {defineStore} from "pinia";
import {icons} from "@/utils/svg";
import _ from "lodash"

const initialDangerSigns= [

    // {
    //     selectdData: [],
    //     sideColSize:0.3,
    //     classDash: "dashed_bottom_border",
    //     radioBtnContent: {
    //         header: {
    //             selectedValue: "",
    //             name: "Extremities normal",
    //             title: "Extremities normal?",
    //             class:"bold",
    //             displayNext:"Yes"
    //             // displayNone: true,
    //         },
    //         data: [
    //             {
    //                 value: "Yes",
    //                 name: "Yes",
    //                 colSize: "2",
    //             },
    //             {
    //                 value: "No",
    //                 name:"No",
    //                 colSize: "2",
    //             },
    //         ],
    //     },
    // },
    {

        selectdData: [],
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "What danger signs does the woman has?",
                selectedValue: "",
                class:"bold",
                name:'Danger signs',
                // displayNone:true
            },
            data: [
                {
                    name: "None",
                    value: "None",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },

                {
                    name: "Central cyanosis",
                    value: "Central cyanosis",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Pre-term labour",
                    value: "Pre-term labour",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Unconscious",
                    value: "Unconscious",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Fever",
                    value: "Fever",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Imminent delivery",
                    value: "Imminent delivery",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Severe headache",
                    value: "Severe headache",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Vomiting",
                    value: "Vomiting",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Severe abdominal pain",
                    value: "Severe abdominal pain",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Draining liquor",
                    value: "Draining liquor",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Respiratory problems",
                    value: "Respiratory problems",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Convulsion history",
                    value: "Convulsion history",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Oedema",
                    value: "Oedema",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
                {
                    name: "Epigastric pain",
                    value: "Epigastric pain",
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
                name:'Danger signs'

            },
            data: [
                {
                    name: "Bleeding vaginally",
                    value: "Bleeding vaginally",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },

                {
                    name: "Other",
                    value: "Other",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        childName:"Other",
        classDash: "dashed_bottom_border",
        sideColSize:0.000001,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify the danger signs",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
                            name: "Other notes",
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
