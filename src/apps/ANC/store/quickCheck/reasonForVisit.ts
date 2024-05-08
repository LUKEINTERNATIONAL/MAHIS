import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import _ from "lodash";
const initialReasonForVisit= [
    {
        classDash:'dashed_bottom_border _padding',
        sideColSize: 0.5,
        radioBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'Reason the woman came to the facility today*',
                    selectedValue: '',
                    name:'Reason for visit',
                    displayNext:'Specific complaint related to antenatal care'
                },
                data:[
                    {
                        value: 'First antenatal care contact',
                        name: 'First antenatal care contact',
                        labelPlacement: 'end',
                        colSize: '7',

                    },
                    {
                        name: 'Specific complaint related to antenatal care',
                        value: 'Specific complaint related to antenatal care',
                        labelPlacement: 'end',
                        colSize: '7',

                    }
                ]
            }

    },
    {

        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "What danger signs does the woman has?*",
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
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
                    name: "Other danger signs",
                    value: "Other danger signs",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        childName:"Other danger signs",
        classDash: "dashed_bottom_border _padding",
        sideColSize: 0.5,
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
    {

    classDash:'dashed_bottom_border _padding',
        sideColSize: 0.5,
        radioBtnContent:
{
    header:{
        class:'bold',
            title: 'Do you want to refer the woman*?',
            selectedValue: '',
            name:'Action for danger signs',
            displayNext:'No',
            displayNone:true
    },
    data:[
        {
            value: 'Yes',
            name: 'Yes',
            colSize: '2',
        },
        {
            value: 'No',
            name: 'No',
            colSize: '2',

        },
        // {
        //     name: 'Proceed with the visit',
        //     value: 'Proceed with the visit',
        //     labelPlacement: 'end',
        //     colSize: '7',
        //
        // }
    ]
}

},
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectedData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'What are the specific health concerns for the patient*?',
                    selectedValue: '',
                    name: 'Specific health concerns',
                    displayNone:true
                },
                data:[

                    {
                        name: 'Abnormal vaginal discharge',
                        value: 'Abnormal vaginal discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-up',
                        value: 'Change in blood pressure-up',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Diarrhoea',
                        value: 'Diarrhoea',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Vomiting',
                        value: 'Vomiting',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital ulcers',
                        value: 'Genital ulcers',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-down',
                        value: 'Change in blood pressure-down',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },


                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Specific health concerns',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Constipation',
                        value: 'Constipation',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Contractions',
                        value: 'Contractions',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[

                    {
                        name: 'Vaginal bleeding',
                        value: 'Vaginal bleeding',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Intimate partner violence',
                        value: 'Intimate partner violence',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Flu symptoms',
                        value: 'Flu symptoms',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Painful urination',
                        value: 'Painful urination',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Headache',
                        value: 'Headache',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Dyspepsia',
                        value: 'Dyspepsia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Frequent urination/Polyuria',
                        value: 'Frequent urination/Polyuria',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Injury',
                        value: 'Injury',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },


                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Jaundice',
                        value: 'Jaundice',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Mental health-Depression',
                        value: 'Mental health-Depression',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital warts',
                        value: 'Genital warts',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Itchy vulva',
                        value: 'Itchy vulva',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Painful intercourse',
                        value: 'Painful intercourse',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'No health concerns',
                        value: 'No health concerns',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:'Other',
        isFinishBtn: false,
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Other (specify)',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Other notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "85%",

                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:'Action for danger signs',
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Does the woman have any previous ANC visit/s done at any facility?",
                class:'bold',
                selectedValue: "",
                name:'Previous visits',
                displayNext:"Yes",
                displayNone:true
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectedData: [],
        classDash:'dashed_bottom_border',
        isFinishBtn: false,
        sideColSize: 0.5,
        childName: "Previous visits",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            class:"bold",
                            inputHeader: 'Enter number of previous ANC visits',
                            unit: '',
                            icon: icons.editPen,
                            value: '',
                            valueType:"text",
                            name: 'Number of previous visits',
                            required: true,
                            eventType: 'input',
                            inputWidth: "85%",

                        },

                    ],
                },
            ],
        },
    },

    // {
    //     childName:"",
    //     classDash: "dashed_bottom_border",
    //     sideColSize:0,
    //     data: {
    //         rowData: [
    //             {
    //                 colData: [
    //                     {
    //                         displayNone:true,
    //                         inputHeader: "Start date",
    //                         class: "bold",
    //                         icon: icons.calendar,
    //                         popOver: true,
    //                         value: "",
    //                         valueType: "text",
    //                         name: "",
    //                         eventType: "input",
    //                         required: true,
    //                         alertsError: false,
    //                         alertsErrorMassage: "",
    //                         id: "",
    //                         idName: "startDate",
    //                         inputWidth:'55%',
    //                         placeholder: "Pick the date",
    //                         isDatePopover: true,
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },

] as any;
const initialSubsequentVisits= [
    {
        classDash:'dashed_bottom_border _padding',
        sideColSize: 0.5,
        radioBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'Reason the woman came to the facility today*',
                    selectedValue: '',
                    name:'Reason for visit',
                    displayNext:'Specific complaint related to antenatal care'
                },
                data:[
                    {
                        value: 'First antenatal care contact',
                        name: 'First antenatal care contact',
                        labelPlacement: 'end',
                        colSize: '7',

                    },
                    {
                        name: 'Specific complaint related to antenatal care',
                        value: 'Specific complaint related to antenatal care',
                        labelPlacement: 'end',
                        colSize: '7',

                    }
                ]
            }

    },
    {

        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "What danger signs does the woman has?*",
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
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        classDash: "dashed_bottom_border",
        sideColSize: 0.5,
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                displayNone:true,
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
        // childName:'Reason for visit',
        selectdData: [],
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        checkboxBtnContent: {
            header: {
                title: "",
                selectedValue: "",
                // displayNone:true,
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
                    name: "Other danger signs",
                    value: "Other danger signs",
                    checked: false,
                    labelPlacement: "start",
                    colSize: "6",
                    justify: "space-between",
                },
            ],
        },
    },

    {
        childName:"Other danger signs",
        classDash: "dashed_bottom_border _padding",
        sideColSize: 0.5,
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
    {

        classDash:'dashed_bottom_border _padding',
        sideColSize: 0.5,
        radioBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'Do you want to refer the woman*?',
                    selectedValue: '',
                    name:'Action for danger signs',
                    displayNext:'No',
                    displayNone:true
                },
                data:[
                    {
                        value: 'Yes',
                        name: 'Yes',
                        colSize: '2',
                    },
                    {
                        value: 'No',
                        name: 'No',
                        colSize: '2',

                    },
                    // {
                    //     name: 'Proceed with the visit',
                    //     value: 'Proceed with the visit',
                    //     labelPlacement: 'end',
                    //     colSize: '7',
                    //
                    // }
                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectedData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    class:'bold',
                    title: 'What are the specific health concerns for the patient*?',
                    selectedValue: '',
                    name: 'Specific health concerns',
                    displayNone:true
                },
                data:[

                    {
                        name: 'Abnormal vaginal discharge',
                        value: 'Abnormal vaginal discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-up',
                        value: 'Change in blood pressure-up',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Diarrhoea',
                        value: 'Diarrhoea',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Vomiting',
                        value: 'Vomiting',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital ulcers',
                        value: 'Genital ulcers',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Change in blood pressure-down',
                        value: 'Change in blood pressure-down',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },


                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Specific health concerns',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Constipation',
                        value: 'Constipation',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Contractions',
                        value: 'Contractions',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[

                    {
                        name: 'Vaginal bleeding',
                        value: 'Vaginal bleeding',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Intimate partner violence',
                        value: 'Intimate partner violence',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Flu symptoms',
                        value: 'Flu symptoms',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Painful urination',
                        value: 'Painful urination',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Headache',
                        value: 'Headache',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Dyspepsia',
                        value: 'Dyspepsia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Frequent urination/Polyuria',
                        value: 'Frequent urination/Polyuria',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Injury',
                        value: 'Injury',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },


                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Jaundice',
                        value: 'Jaundice',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Mental health-Depression',
                        value: 'Mental health-Depression',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Genital warts',
                        value: 'Genital warts',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Itchy vulva',
                        value: 'Itchy vulva',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Painful intercourse',
                        value: 'Painful intercourse',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'No health concerns',
                        value: 'No health concerns',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:'Reason for visit',
        sideColSize: 0.5,
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    displayNone:true,
                    name: 'Specific health concerns'

                },
                data:[
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:'Other',
        isFinishBtn: false,
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Other (specify)',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Other notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "85%",

                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:'Action for danger signs',
        sideColSize: 0.5,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
            header: {
                title: "Does the woman have any previous ANC visit/s done at any facility?",
                class:'bold',
                selectedValue: "",
                name:'Previous visits',
                displayNext:"Yes",
                displayNone:true
            },
            data: [
                {
                    value: "Yes",
                    name: "Yes",
                    colSize: "2",
                },
                {
                    value: "No",
                    name: "No",
                    colSize: "2",
                },
            ],
        },
    },
    {
        selectedData: [],
        classDash:'dashed_bottom_border',
        isFinishBtn: false,
        sideColSize: 0.5,
        childName: "Previous visits",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone:true,
                            class:"bold",
                            inputHeader: 'Enter number of previous ANC visits',
                            unit: '',
                            icon: icons.editPen,
                            value: '',
                            valueType:"text",
                            name: 'Number of previous visits',
                            required: true,
                            eventType: 'input',
                            inputWidth: "85%",

                        },

                    ],
                },
            ],
        },
    },
    // {
    //     childName:"",
    //     classDash: "dashed_bottom_border",
    //     sideColSize:0,
    //     data: {
    //         rowData: [
    //             {
    //                 colData: [
    //                     {
    //                         displayNone:true,
    //                         inputHeader: "Start date",
    //                         class: "bold",
    //                         icon: icons.calendar,
    //                         popOver: true,
    //                         value: "",
    //                         valueType: "text",
    //                         name: "",
    //                         eventType: "input",
    //                         required: true,
    //                         alertsError: false,
    //                         alertsErrorMassage: "",
    //                         id: "",
    //                         idName: "startDate",
    //                         inputWidth:'55%',
    //                         placeholder: "Pick the date",
    //                         isDatePopover: true,
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // },

] as any;

const getVisitDateField=(number:number)=>{
    return [
        {
            childName:"",
            classDash: "dashed_bottom_border",
            sideColSize:1,
            data: {
                rowData: [
                    {
                        colData: [
                            {
                                inputHeader: `Date for ANC visit ${number+1}`,
                                class: "bold",
                                icon: icons.calendar,
                                popOver: true,
                                value: "",
                                valueType: "text",
                                name: `Last ANC Visit Date ${number}`,
                                eventType: "input",
                                required: true,
                                alertsError: false,
                                alertsErrorMassage: "",
                                id: "",
                                idName: "startDate",
                                inputWidth:'100%',
                                placeholder: "Pick the date",
                                isDatePopover: true,
                            },
                        ],
                    },
                ],
            },
        },
    ]
}
export const useReasonForVisitStore = defineStore('reasonForVisitStore',{
    state: () => ({
        ReasonForVisit:[...initialReasonForVisit] as any,
        ReasonForSubsequentVisit:[...initialSubsequentVisits]
    }),
    actions:{
        setReasonForVisit(number: number){
            this.ReasonForVisit = []
            for (let i = 0; i < number; i++) {
                const inputs =getVisitDateField(i)
                this.ReasonForVisit.push(inputs[0])
                this.ReasonForVisit.push(inputs[1])
            }
        },

        getInitial(){
            const data = _.cloneDeep(initialReasonForVisit);
            return [...data];
        },
        getInitial1(){
            const data = _.cloneDeep(initialSubsequentVisits);
            return [...data];
        }
    },
    // persist:true,

})