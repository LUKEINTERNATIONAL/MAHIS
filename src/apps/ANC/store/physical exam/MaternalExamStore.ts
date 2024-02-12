import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useMaternalExamStore = defineStore('maternalExamStore',{
    state: () => ({
        pallor: [
            {
                classDash:'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'Y',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'No',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }

            },
        ],
        respiration: [
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash:'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'RespirationNotDone',
                                name: 'Not done',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'NormalExamResult',
                                name: 'Normal exam result',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'RespiratoryDistress',
                                name: 'Respiratory distress',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },

                            {
                                value: 'Cough',
                                name: 'Cough',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'RapidBreathing',
                                name: 'Rapid breathing',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'SlowBreathing',
                                name: 'Slow breathing',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'Wheezing',
                                name: 'Wheezing',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'Rales',
                                name: 'Rales',
                                labelPlacement: 'start',
                                colSize: '12',
                                justify: 'space-between'

                            },
                            {
                                value: 'Other result',
                                name: 'Rales',
                                labelPlacement: 'start',
                                colSize: '12',
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
                                        inputHeader: 'Specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                        required: true
                                    },

                                ],

                            },
                        ]
                    },
            },

        ],

        temperature: [

            {
                sectionHeader: '',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'First temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'FirstTemp',
                                        eventType: 'input'
                                    },
                                    {
                                        inputHeader: 'Second Temperature',
                                        unit: 'C',
                                        icon: icons.temprature,
                                        value: '',
                                        name: 'SecondTemp',
                                        eventType: 'input'
                                    }
                                ]
                            },
                        ]
                    },

            }

        ],
        pulse: [

            {
                sectionHeader: '',
                classDash:'dashed_bottom_border',
                data:
                    {
                        rowData:[
                            {
                                colData:
                                    [
                                        {
                                            inputHeader: 'Pulse rate',
                                            unit: 'BMP',
                                            icon: icons.respiratory,
                                            value: '',
                                            name: 'FirstRespiratory',
                                            eventType: 'input'
                                        },
                                        {
                                            inputHeader: 'Second pulse rate',
                                            unit: 'BMP',
                                            icon: icons.respiratory,
                                            value: '',
                                            name: 'SecondRespiratory',
                                            eventType: 'input'
                                        },
                                    ]
                            }
                        ]
                    },

            }

        ],
        vulvaInspection: [

            {
                selectdData: [],
                classDash:'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Abdominal exam not done',
                                value: 'NoAbdominalResultConducted',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Normal abdominal exam result',
                                value: 'NormalAbdominalResult',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Mass/tumour',
                                value: 'Mass',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Pain on superficial palpation',
                                value: 'PainOnSuperficialPalpation',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Pain on deep palpation',
                                value: 'Pain on deep palpation',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Painful decompression',
                                value: 'Painful decomppression',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Other',
                                value: 'other',
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
                                        inputHeader: 'Specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "90%",
                                        required: true
                                    },

                                ],

                            },
                        ]
                    },
            },


        ],
        breastExam: [

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
                                name: 'No breast exam conducted',
                                value: 'NoBreastExamConducted',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Normal breast exam result',
                                value: 'NormalBreastExamResult',
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
                            selectedValue: ''
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Local pain',
                                value: 'LocalPain',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Increased temperature',
                                value: 'IncreasedTemperature',
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
                                name: 'Epigastric pain',
                                value: 'EpigastricPain',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Other breast exams',
                                value: 'other breast exams',
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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "90%",
                                        required: true
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
                            title: '',
                            selectedValue: '',
                            name:'Yes'
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

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
                                        inputHeader: 'Cervical dilation',
                                        unit: 'cm',
                                        icon:'',
                                        value: '',
                                        name: ' cervical dilation',
                                        eventType: 'input',
                                        inputWidth: '56%'
                                    },

                                ]
                            },
                        ]
                    },

            }

        ],
        vaginalInspection: [

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
                                name: 'No vaginal exam done',
                                value: 'no vaginal exam done',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Normal viginal exam result',
                                value: 'NormalBreastExamResult',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Abnormal discharge',
                                value: 'abnormal discharge',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Ulcers',
                                value: 'Ulcers',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Warts',
                                value: 'Warts',
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
                                name: 'Vesicles',
                                value: 'vesicles',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between'

                            },
                            {
                                name: 'Bleeding',
                                value: 'bleeding',
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
                                value: 'other',
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
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "90%",
                                        required: true
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
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is oedema present?',
                            selectedValue: '',
                            name:'Yes'
                        },
                        data:[
                            {
                                value: 'yes',
                                name: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'no',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            }
                        ]
                    }


            },
            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Select the type of Oedema the woman has?',
                            selectedValue: '',
                            name:'types of oedema',
                            displayNone:true,
                        },
                        data:[
                            {
                                value: 'pitting ankle oedema',
                                name: 'Pitting ankle oedema',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'leg swelling',
                                name: 'Leg swelling',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'oedema of the hands and feet',
                                name: 'Oedema of the hands and feet',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'pitting lower back oedema',
                                name: 'Pitting lower back oedema',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

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
                            name:'severity of oedema',
                            displayNone:true
                        },
                        data:[
                            {
                                value: '+',
                                name: '+',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: '++',
                                name: '++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: '+++',
                                name: '+++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: '++++',
                                name: '++++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },


        ],
    }),
    actions:{
        setMaternalExam(data: any){
            this.breastExam = data
        }
    },
    persist:true,

})
