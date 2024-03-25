import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useBabyStatusStore = defineStore('babyStatusStore',{
    state: () => ({
        babyStatusDetails: [
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Full name of the baby',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'full name of the baby',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
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
                            title: 'Baby sex?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Male',
                                value: 'male',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'female',
                                value: 'female',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Birth weight',
                                        unit: 'kg',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'Birth weight',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },
                                    {
                                        inputHeader: 'current weight',
                                        unit: 'kg',
                                        icon: icons.weight,
                                        value: '',
                                        name: 'Current weight',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
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
                            title: 'Is the birth weight low?',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Prematurity/Kangaroo?',
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

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Condition at birth',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Well',
                                value: 'well',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Asphyxia',
                                value: 'asphyxia',
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
                            title: 'Resuscitation tempted',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'What is the status of the baby?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Alive',
                                value: 'alive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Dead',
                                value: 'dead',
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
                            title: 'Is the visit within',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: '48 hrs before discharge',
                                value: '48 hrs before discharge',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '2-7 days',
                                value: '2-7 days',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '8-42 days',
                                value: '8-42 days',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'What immunisation has been given?',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'BCG',
                                value: 'bcg',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
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
                                name: 'Polio',
                                value: 'polio',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Date BCG given',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: '',
                                        name: 'Date BCG given',
                                        required: true,
                                        eventType: 'input',
                                        datePopover:true,
                                        inputWidth: '',
                                        placeholder:'Pick holder'
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Date polio given',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: '',
                                        name: 'Date polio given',
                                        required: true,
                                        eventType: 'input',
                                        datePopover:true,
                                        inputWidth: '',
                                        placeholder:'Pick holder'
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
                            title: 'Tetracycline eye ointment  given?',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Cord care (Chlorhexidine) used?',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Vitamin K given?',
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

        dangerSigns:[
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
                                name: 'None',
                                value: 'none',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not able to feed',
                                value: 'not able to feed',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
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
                                name: 'Fever (>37.5C)',
                                value: 'fever',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hypothermia',
                                value: 'Hypothermia',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Convulsions',
                                value: 'convulsions',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Lethargic',
                                value: 'lethargic',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Chest in-drawing',
                                value: 'chest in-drawing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Fast breathing',
                                value: 'fast breathing',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Eye discharge',
                                value: 'eye discharge',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Signs of cord infection',
                                value: 'signs of cord infection',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Jaundice',
                                value: 'jaundice',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Skin rashes',
                                value: 'skin rashes',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
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
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'otherC',
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
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Describe the intervention',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Describe the intervention',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "",
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
                            title: 'Nevirapine given?',
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
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Cotrimoxazole prophylaxis?',
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
        ] as any
    }),
    actions:{
        setBabyStatusDetails(data: any){
            this.babyStatusDetails = data
        },
        setBabyDangerSigns(data: any){
            this.dangerSigns = data
        },


    },
    persist:true,

})