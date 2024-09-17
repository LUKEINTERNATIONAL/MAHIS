import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

import * as yup from "yup"

export const FirstVaginalExaminationValidationSchema = yup.object().shape({
    'cervical dilation': yup.number()
        .typeError("cervical dilation can only be a number")
        .min(1)
        .min(10)
        .required()
    .label("Cervical Dilation")
   
})

export const usefirstVaginalExaminationStore = defineStore('firstVaginalExaminationStore',{
    state: () => ({

        firstVaginalExamination: [

            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'State of Cervical',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'state of cervical',
                                        required: true,
                                        eventType: 'input',
                                    },
                                    {
                                        inputHeader: 'Cervical dilation',
                                        unit: 'cm',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'cervical dilation',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'Enter the number between 1-10'
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Percentage of effacement',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: '25%',
                                value: '25',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '50%',
                                value: '50',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '75%',
                                value: '75',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '100%',
                                value: '100',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not effaced',
                                value: 'not effaced',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Application',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well applied',
                                value: 'well applied',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Loosely applied',
                                value: 'loosely applied',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not applied',
                                value: 'not applied',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'State of membranes?',
                            name: 'State of membranes',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Ruptured',
                                value: 'ruptured',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Intact',
                                value: 'intact',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'How',
                            name: 'How',
                            selectedValue: '',
                            displayNone: true
                        },
                        data:[
                            {
                                name: 'Spontaneously',
                                value: 'spontaneously',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Artificial',
                                value: 'artificial',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Time membranes ruptured',
                                        unit: '',
                                        icon: icons.time,
                                        value: '',
                                        name: 'time membranes ruptured',
                                        required: true,
                                        eventType: 'input',
                                    },
                                    {
                                        inputHeader: 'Date membranes ruptured',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: '',
                                        name: 'date membranes ruptured',
                                        required: true,
                                        datePopover:true,
                                        eventType: 'input',
                                        placeholder:'Pick date'
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Show',
                            name: 'Show',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Present',
                                value: 'present',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Absent',
                                value: 'absent',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Color',
                            name: 'Color',
                            selectedValue: '',
                            displayNone:true,
                        },
                        data:[
                            {
                                name: 'Clear',
                                value: 'clear',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Blood Stained',
                                value: 'blood Stained',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Soft tissues',
                            selectedValue: ''
                        },
                        data:[
            
                            {
                                name: 'Warm and moist',
                                value: 'warm and moist',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hot and dry',
                                value: 'hot and dry',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hot and moist',
                                value: 'hot and moist',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Liquor',
                            name: 'Liquor',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Clear',
                                value: 'clear',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Blood stained',
                                value: 'blood stained',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Meconium stained',
                                value: 'meconium stained',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Absent',
                                value: 'absent',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Offensive smell',
                                value: 'offensive smell',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Foul smelling',
                                value: 'Foul smelling',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Meconium Grade',
                            name: 'Meconium Grade',
                            selectedValue: '',
                            displayNone: true
                        },
                        data:[
                            {
                                name: '+',
                                value: '+',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '++',
                                value: '++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '+++',
                                value: '+++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Cord',
                            name: 'Cord',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Not felt',
                                value: 'not felt',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Presenting',
                                value: 'presenting',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Prolapsed',
                                value: 'prolapsed',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Felt',
                                value: 'felt',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Color',
                            selectedValue: '',
                            name: "cold felt color",
                            displayNone: true
                        },
                        data:[
                         
                            {
                                name: 'Clear',
                                value: 'clear',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Meconium stained',
                                value: 'meconium stained',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'blood stained',
                                value: 'blood stained',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'What part is presenting?',
                            name: 'What part is presenting',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Head',
                                value: 'head',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Face',
                                value: 'face',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Brow',
                                value: 'brow',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Foot',
                                value: 'foot',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Buttocks',
                                value: 'buttocks',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hand',
                                value: 'hand',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Back',
                                value: 'back',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Cord',
                                value: 'cord',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Vertex',
                                value: 'vertex',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

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
                                        name: 'specify',
                                        required: true,
                                        eventType: 'input',
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Position of sutures and fontanelles',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Position of sutures and fontanelles',
                                        eventType: 'input',
                                        displayNone: true

                                    },

                                ]
                            }
                        ]
                    },
            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Level in relation to ischial spines *',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Below',
                                value: 'below',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Above',
                                value: 'above',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'On level',
                                value: 'on level',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Caput',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Nil',
                                value: 'nil',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Mild',
                                value: 'mild',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'moderate',
                                value: 'moderate',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Severe',
                                value: 'severe',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Moulding *',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: '+',
                                value: '+',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '++',
                                value: '++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '+++',
                                value: '+++',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },


        ] as any,
    }),
    actions:{
        setVaginalExamination(data: any){
            this.firstVaginalExamination = data
        },
    },
    // persist:true,

})