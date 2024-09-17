import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import {initial} from "lodash";
import {pencil} from "ionicons/icons";
const initialRespiratoryExam=[
    {
        selectdData: [],
        classDash:'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Respiratory exam findings',
                    selectedValue: '',
                    name:'Respiratory exam findings',
                    class:"bold"
                },
                data:[
                    {
                        name: 'Cough',
                        value: 'cough',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Rapid breathing',
                        value: 'rapid breathing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },

    {
        selectdData: [],
        classDash:'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Respiratory exam findings'
                },
                data:[
                    {
                        name: 'Slow breathing',
                        value: 'Slow breathing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Wheezing',
                        value: 'wheezing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash:'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Respiratory exam findings'
                },
                data:[
                    {
                        name: 'Rales',
                        value: 'Rales',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Respiratory distress',
                        value: 'respiratory distress',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },

    {
        classDash:'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Respiratory exam findings'
                },
                data:[
                    {
                        name: 'Other findings',
                        value: 'Other findings',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        childName:"Other findings",
        sideColSize: 0.000001,
        sectionHeader: '',
        classDash: 'dashed_bottom_border',
        data:
            {
                rowData: [
                    {
                        colData: [
                            {
                                displayNone: true,
                                inputHeader: 'Specify other respiratory findings',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Other respiratory findings notes',
                                valueType: 'text',
                                required: true,
                                eventType: 'input',
                                inputWidth: "100%",

                            },

                        ],

                    },
                ]
            },
    }
] as any;

const initialBreastExam=[
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Breast examinations results',
                    selectedValue: '',
                    name: 'Breast exam',
                    class:"bold"
                },
                data:[
                    {
                        name: 'No breast exam conducted',
                        value: 'Exam not done',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Normal breast exam result',
                        value: 'Normal exam',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Breast exam'
                },
                data:[
                    {
                        name: 'Bleeding',
                        value: 'Bleeding',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Nodule',
                        value: 'Nodule',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Breast exam'
                },
                data:[
                    {
                        name: 'Discharge',
                        value: 'Discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Flushing',
                        value: 'Flushing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Breast exam'
                },
                data:[
                    {
                        name: 'Local pain',
                        value: 'Local pain',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Increased temperature',
                        value: 'Increased temperature',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Breast exam'
                },
                data:[
                    {
                        name: 'Breast',
                        value: 'Breast',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Tenderness',
                        value: 'Tenderness',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Breast exam'
                },
                data:[
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        isFinishBtn: false,
        sectionHeader: '',
        childName:"Other",

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Other general exam findings',
                                valueType: 'text',
                                required: true,
                                eventType: 'input',
                                inputWidth: "100%",

                            },

                        ],

                    },
                ]
            },
    },

] as any;
const initialVaginalExam=[

    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Vaginal inspection',
                    selectedValue: '',
                    name: 'Vaginal inspection',
                    class:"bold"
                },
                data:[
                    {
                        name: 'No vaginal inspection done',
                        value: 'Exam not done',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Nothing abnormal observed',
                        value: 'Normal exam',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    //    {
    //    selectdData: [],
    //    classDash: 'dashed_bottom_border',
    //    checkboxBtnContent:
    // {
    //   header:{
    //      title: '',
    //      selectedValue: '',
    //      name: 'Vaginal inspection'
    //  },
    //   data:[
    //       {
    //        name: 'Evidence of amniotic fluid',
    //         value: 'evidence of amniotic fluid',
    //          checked: false,
    //           labelPlacement: 'start',
    //            colSize: '6',
    //             justify: 'space-between'

    //          },
    // {
    //     name: 'Genital pain',
    //     value: 'genital pain',
    //     checked: false,
    //     labelPlacement: 'start',
    //     colSize: '6',
    //     justify: 'space-between'

    //  },
    // ]
    // }

    // },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Vaginal inspection'
                },
                data:[
                    {
                        name: 'Abnormal discharge',
                        value: 'Abnormal vaginal discharges',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Papules',
                        value: 'papules',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Vaginal inspection'
                },
                data:[
                    {
                        name: 'Ulcers',
                        value: 'Genital sores',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Warts',
                        value: 'Vulva warts',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Vaginal inspection'
                },
                data:[
                    {
                        name: 'Vesicles',
                        value: 'Vesicles',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Bleeding',
                        value: 'Bleeding',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name: 'Vaginal inspection'

                },
                data:[
                    {
                        name: 'Genital pain',
                        value: 'genital pain',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                    {
                        name: 'Other',
                        value: 'Other',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between'

                    },
                ]
            }

    },
    {
        isFinishBtn: false,
        sectionHeader: '',
        classDash: '',
        childName:"Other",

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Other general exam findings',
                                required: true,
                                eventType: 'input',
                                inputWidth: "100%",
                            },

                        ],

                    },
                ]
            },
    },
    {
        isFinishBtn: false,
        sectionHeader: "",
        class:"bold",
        data: {
            rowData: [
                {
                    colData: [
                        {
                            class: "bold",
                            inputHeader: "Amniotic fluid level",
                            value: "",
                            name: "Amniotic fluid",
                            icon: icons.editPen,
                            required: true,
                            valueType: "text",
                            eventType: "input",
                            alertsErrorMassage: "",
                            inputWidth: "100%",

                        },
                    ],
                },
            ],
        },
    },


] as any;
const initialPallor=[
    {
    classDash:'dashed_bottom_border',
    radioBtnContent:
        {
            header:{
                title: 'Is pallor present?',
                selectedValue: '',
                name:'Pallor',
                class:'bold',
                displayNext:"Yes",
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
                    colSize: '2.5',

                },
            ]
        }

},
    {
        childName:"Pallor",
        classDash:'dashed_bottom_border',
        radioBtnContent:
            {
                header:{
                    title: 'Any action taken?',
                    selectedValue: '',
                    name:'Action on pallor',
                    class:'bold',
                    displayNone:true,
                    displayNext:"Yes"
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
                        colSize: '2.5',

                    },
                ]
            }

    },
    {
        isFinishBtn: false,
        sectionHeader: '',
        classDash: '',
        childName:"Action on pallor",

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'Specify the action taken',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                name: 'Other notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "100%",
                            },

                        ],

                    },
                ]
            },
    },
] as any;
const initialCervicalExam=[
    {
    classDash: 'dashed_bottom_border',
    radioBtnContent:
        {
            header:{
                title: 'Vaginal examination done?',
                selectedValue: '',
                name:'Cervical exam',
                class:"bold",
                displayNext:"Yes"
            },
            data:[
                {
                    value: 'Yes',
                    name: 'Yes',
                    colSize: '2.5',

                },
                {
                    value: 'No',
                    name: 'No',
                    colSize: '2.5',

                }
            ]
        }
},
    {
        classDash: 'dashed_bottom_border',
        childName: "Cervical exam",
        checkboxBtnContent:
            {
                header:{
                    title: 'Type of vaginal examination done?',
                    selectedValue: '',
                    name:'Type of vaginal examination',
                    class:"bold",
                    displayNone:true
                },
                data:[
                    {
                        value: 'Digital',
                        name: 'Digital',
                        colSize: '4',

                    },
                    {
                        value: 'Speculum',
                        name: 'Speculum',
                        colSize: '4',

                    }
                ]
            }
    },
    {
        sectionHeader: '',
        childName:"Digital",
        data:
            {
                rowData:[
                    {
                        colData: [
                            {   displayNone:true,
                                inputHeader: 'Digital examination findings notes',
                                unit: '',
                                icon:pencil,
                                value: '',
                                name: 'Cervical dilation',
                                valueType:'number',
                                eventType: 'input',
                                inputWidth: '100%'
                            },

                        ]
                    },
                ]
            },
    },
    {
        sectionHeader: '',
        childName:"Speculum",
        data:
            {
                rowData:[
                    {
                        colData: [
                            {   displayNone:true,
                                inputHeader: 'Speculum examination findings notes',
                                unit: '',
                                icon:pencil,
                                value: '',
                                name: 'Other notes',
                                valueType:'number',
                                eventType: 'input',
                                inputWidth: '100%'
                            },

                        ]
                    },
                ]
            },
    }
    ]
const initialOedema=[
    {
        selectdData: [],
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Is oedema present?',
                    selectedValue: '',
                    class: 'bold',
                    name:'Oedema',
                    displayNext:"Yes"
                },
                data:[
                    {
                        value: 'Yes',
                        name: 'Yes',
                        colSize: '2.5',

                    },
                    {
                        value: 'No',
                        name: 'No',
                        colSize: '2.5',

                    }
                ]
            }


    },
    {
        childName:"Oedema",
        selectdData: [],
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Select the type of Oedema the woman has?',
                    selectedValue: '',
                    name:'Oedema types',
                    class:'bold',
                    displayNone:true,
                },
                data:[
                    {
                        value: 'pitting ankle oedema',
                        name: 'Pitting ankle oedema',
                        colSize: '7',

                    },
                    {
                        value: 'leg swelling',
                        name: 'Leg swelling',
                        colSize: '7',

                    },
                    {
                        value: 'oedema of the hands and feet',
                        name: 'Oedema of the hands and feet',
                        colSize: '7',


                    },
                    {
                        value: 'pitting lower back oedema',
                        name: 'Pitting lower back oedema',
                        colSize: '7',


                    },
                    {
                        value: 'Facial oedema',
                        name: 'Facial oedema',
                        colSize: '7',


                    },
                    {
                        value: 'General body oedema',
                        name: 'General body oedema',
                        colSize: '7',


                    },
                ]
            }
    },
    {
        childName:"Oedema",
        selectdData: [],
        classDash: '',
        radioBtnContent:
            {
                header:{
                    title: 'Severity of Oedema?',
                    selectedValue: '',
                    name:'Oedema severity',
                    displayNone:true,
                    class:"bold"

                },
                data:[
                    {
                        value: '+',
                        name: '+',
                        colSize: '7',

                    },
                    {
                        value: '++',
                        name: '++',
                        colSize: '7',


                    },
                    {
                        value: '+++',
                        name: '+++',
                        colSize: '7',


                    },
                    {
                        value: '++++',
                        name: '++++',
                        colSize: '7',

                    },
                ]
            }


    },


]
export const useMaternalExamStore = defineStore('maternalExamStore',{
    state: () => ({
        respiratory: [...initialRespiratoryExam] as any,
        breastExam: [...initialBreastExam] as any,
        pallor: [...initialPallor] as any,
        cervicalExam: [...initialCervicalExam] as any,
        vaginalInspection: [...initialVaginalExam] as any,
        oedemaPresence: [...initialOedema] as any,
    }),
    actions:{
        setMaternalExam(data: any){
            this.breastExam = data
        },
        getInitialRespiratoryExam(){
            const data=[...initialRespiratoryExam]
            return [...data]
        },
        getInitialBreastExam(){
            const data=[...initialBreastExam]
            return [...data]
        },
        getInitialPallor(){
            const data=[...initialPallor]
            return [...data]
        },
        getInitialCervicalExam(){
            const data=[...initialCervicalExam]
            return [...data]
        },
        getInitialVaginalInspection(){
            const data=[...initialVaginalExam]
            return [...data]
        },

        getInitialOedema(){
            const data=[...initialOedema]
            return [...data]
        },
    },
    // persist:true,

})
