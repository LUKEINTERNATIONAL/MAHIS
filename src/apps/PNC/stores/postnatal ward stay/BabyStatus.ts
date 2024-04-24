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
                                        valueType:'text',
                                        name: 'Full name of the baby',
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
                            selectedValue: '',
                            name:'Sex',
                            class:'bold'
                        },
                        data:[
                            {
                                name: 'Male',
                                value: 'Male',
                                colSize: '2.5',

                            },
                            {
                                name: 'Female',
                                value: 'Female',
                                colSize: '2.5',

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
                                        name: 'Weight',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },
                                    {
                                        inputHeader: 'current weight',
                                        unit: 'kg',
                                        icon: icons.weight,
                                        valueType:'text',
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
                            class:'bold',
                            name:'Low birth weight',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',


                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            selectedValue: '',
                            class:'bold',
                            name:'Prematurity/Kangaroo',
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            title: 'What is the condition at birth?',
                            name:'Birth condition',
                            selectedValue: '',
                            class:'bold'
                        },
                        data:[
                            {
                                name: 'Very well',
                                value: 'Very well',
                                colSize: '4',

                            },
                            {
                                name: 'Asphyxia',
                                value: 'Asphyxia',
                                colSize: '4',

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
                            selectedValue: '',
                            class:'bold',
                            name:'Resuscitation attempt'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            selectedValue: '',
                            name:'Status of the baby',
                            class:'bold',

                        },
                        data:[
                            {
                                name: 'Alive',
                                value: 'Alive',
                                colSize: '2.5',

                            },
                            {
                                name: 'Dead',
                                value: 'Dead',
                                colSize: '2.5',

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
                            selectedValue: '',
                            name:'Is the visit within',
                            class:'bold'
                        },
                        data:[
                            {
                                name: '48 hrs before discharge',
                                value: '48 hrs before discharge',
                                colSize: '7',

                            },
                            {
                                name: '2-7 days',
                                value: '2-7 days',
                                colSize: '7',

                            },
                            {
                                name: '8-42 days',
                                value: '8-42 days',
                                colSize: '7',

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
                            title: 'What type immunisation has been given?',
                            selectedValue: '',
                            name:'Immunisation given',
                            class:'bold'
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
                                        valueType:'text',
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
                                        valueType:'text',
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
                            selectedValue: '',
                            name:'Tetracycline eye ointment',
                            class:'bold'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',
                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            selectedValue: '',
                            name:'Cord care',
                            class:'bold'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',
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
                            selectedValue: '',
                            class:'bold',
                            name:'Vitamin K given'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            title: 'Danger signs',
                            selectedValue: '',
                            name:'Danger signs',
                            class:'bold'
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
                            selectedValue: '',
                            name:'Danger signs',

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
                            selectedValue: '',
                            name:'Danger signs',

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
                            selectedValue: '',
                            name:'Danger signs',

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
                            selectedValue: '',
                            name:'Danger signs',

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
                            selectedValue: '',
                            name:'Danger signs',

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
                            selectedValue: '',
                            name:'Danger signs',

                        },
                        data:[
                            {
                                name: 'Other danger signs',
                                value: 'Other danger signs',
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
                                        valueType:'text',
                                        name: 'Other danger signs notes',
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
                                        name: 'Intervention notes',
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
                            selectedValue: '',
                            class:'bold',
                            name:'Nevirapine given'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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
                            selectedValue: '',
                            name:'Cotrimoxazole prophylaxis',
                            class:'bold'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                colSize: '2.5',

                            },
                            {
                                name: 'No',
                                value: 'No',
                                colSize: '2.5',

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