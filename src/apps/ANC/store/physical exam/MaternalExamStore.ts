import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useMaternalExamStore = defineStore('maternalExamStore',{
    state: () => ({
        respiratory: [{
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
            sideColSize:0.000001,
            sectionHeader: '',
            classDash: 'dashed_bottom_border',
            data:
                {
                    rowData:[
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
        }],
        pallor: [
            {
                classDash:'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is pallor present?',
                            selectedValue: '',
                            name:'Pallor?',
                            class:'bold'
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
        ],
        breastExam: [

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
                                name: 'Epigastric pain',
                                value: 'Epigastric Pain symptom',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Other breast exams',
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
                                        inputWidth: "90%",
                                        
                                    },

                                ],

                            },
                        ]
                    },
            },


        ],
        cervicalExam: [
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Cervical examination done?',
                            selectedValue: '',
                            name:'Cervical exam',
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',

                            }
                        ]
                    }
            },
            {
                sectionHeader: '',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {   displayNone:true,
                                        inputHeader: 'Cervical findings',
                                        unit: 'cm',
                                        icon:'',
                                        value: '',
                                        name: 'Cervical dilation',
                                        valueType:'number',
                                        eventType: 'input',
                                        inputWidth: '56%'
                                    },

                                ]
                            },
                        ]
                    },

            }

        ] as any,
        vaginalInspection: [

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
                                name: 'No vaginal exam done',
                                value: 'Exam not done',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Normal vaginal exam result',
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
                            name: 'Vaginal inspection'
                        },
                        data:[
                            {
                                name: 'Evidence of amniotic fluid',
                                value: 'evidence of amniotic fluid',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Genital pain',
                                value: 'genital pain',
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
                            selectedValue: ''
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
                classDash: '',

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
                                        inputWidth: "90%",
                                       
                                    },

                                ],

                            },
                        ]
                    },
            },


        ],
        oedemaPresence: [
            {
                selectdData: [],
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is oedema present?',
                            selectedValue: '',
                            class: 'bold',
                            name:'Oedema'
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                value: 'no',
                                name: 'No',
                                colSize: '2.5',

                            }
                        ]
                    }


            },
            {
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
                        ]
                    }
            },
            {
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


        ],
    }),
    actions:{
        setMaternalExam(data: any){
            this.breastExam = data
        },
      
    },
    persist:true,

})
