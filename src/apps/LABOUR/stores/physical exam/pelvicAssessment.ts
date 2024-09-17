import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const usePelvicAssessmentStore = defineStore('pelvicAssessment',{
    state: () => ({

        pelvicAssessment: [

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Shape of brim',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Followed',
                                value: 'followed',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not followed',
                                value: 'not followed',
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
                            title: 'Sacrum',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well curved',
                                value: 'well curved',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not curved',
                                value: 'not curved',
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
                            title: 'Sacral promontory',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Not tipped',
                                value: 'not tipped',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Tipped',
                                value: 'Not tipped',
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
                            title: 'Sacrospinous ligaments',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Flexible',
                                value: 'flexible',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Thick',
                                value: 'thick',
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
                            title: 'Ischial spines',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Blunt',
                                value: 'blunt',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Prominent',
                                value: 'prominent',
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
                            title: 'Station',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: '-4',
                                value: '-4',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '-3',
                                value: '-3',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '-2',
                                value: '-2',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '-1',
                                value: '-1',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '0',
                                value: '0',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '1',
                                value: '1',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '2',
                                value: '2',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '3',
                                value: '3',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '4',
                                value: '4',
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
                            title: 'Sub-pubic arch',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Less than 90 degrees',
                                value: 'less than 90 degrees',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'More than 90 degrees',
                                value: 'more than 90 degrees',
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
                            title: 'Intertuberous diameter',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'more than or equal to 8.5cm (Normal)',
                                value: 'more than or equal to 8.5cm (Normal)',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'less than 8.5cm (Abnormal)',
                                value: 'less than 8.5cm (Abnormal)',
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
                                        inputHeader: 'Conclusion about pelvis',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'conclusion about pelvis',
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
                                        inputHeader: 'Anticipated course of labour and delivery',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'anticipated course of labour and delivery',
                                        required: true,
                                        eventType: 'input',
                                    },
                                ]
                            }
                        ]
                    },
            },

        ] as any,
    }),
    actions:{
        setPelvivAssessment(data: any){
            this.pelvicAssessment = data
        },
    },
    // persist:true,

})