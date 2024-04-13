import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useThirdStageOfLabour = defineStore('thirdStageOfLabour',{
    state: () => ({

        placentaExamination: [
            {
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Time of delivery',
                                        unit: '',
                                        icon: icons.time,
                                        value: '',
                                        name: 'time of delivery',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'Pick time'

                                    },
                                    {
                                        inputHeader: 'Date of delivery',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: '',
                                        name: 'date of delivery',
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
                            title: 'Mode of delivery',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Controlled cord traction',
                                value: 'controlled cord traction',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Manual removal',
                                value: 'manual removal',
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
                                        placeholder:''

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
                            title: 'Placenta',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Complete',
                                value: 'complete',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Incomplete',
                                value: 'incomplete',
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
                            title: 'Membranes',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Complete',
                                value: 'complete',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Incomplete',
                                value: 'incomplete',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },

            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Placenta weight',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Placenta weight',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

                                    },
                                    {
                                        inputHeader: 'Cord weight',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Cord weight',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

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
                            title: 'Cord insertion',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Central',
                                value: 'central',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Lateral',
                                value: 'lateral',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Number of vessels',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Number of vessels',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

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
                            title: 'Placenta condition',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Healthy',
                                value: 'healthy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unhealthy',
                                value: 'unhealthy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Abnormalities',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Abnormalities',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

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
                            title: 'Cervix',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Intact',
                                value: 'intact',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Tears',
                                value: 'tears',
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
                            title: 'Perineum',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Intact',
                                value: 'intact',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Tears',
                                value: 'tears',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Episiotomy',
                                value: 'episiotomy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Lacerations',
                                value: 'lacerations',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                isFinishBtn: false,
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Specify tears',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Specify tears',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:''

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
                            title: 'Repair done for Tears/Episiotomy',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'no',
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
        setPlacentaExamnianation(data: any){
            this.placentaExamination = data
        },
    },
    persist:true,

})