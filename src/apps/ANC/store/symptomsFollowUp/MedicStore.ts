import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useMedicStore = defineStore('medicStore',{
    state: () => ({
        Medication:[
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
                                name: 'Oral PreP for HIV',
                                value: 'OralPrePforHIV',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Analgesic',
                                value: 'value',
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
                                name: 'Anti-consulsive',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Anti-TB',
                                value: 'value',
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
                                name: 'Antihelmintic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Antimarials',
                                value: 'value',
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
                                name: 'Antitussive',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Aspirin',
                                value: 'value',
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
                                name: 'Calcium',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Doxylamine',
                                value: 'value',
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
                                name: 'Hematinic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                 colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Iron',
                                value: 'value',
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
                                name: 'Metoclopramide',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                 colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Thyroid medication',
                                value: 'value',
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
                                name: 'Antiacids',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                 colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Anti-psychotics',
                                value: 'value',
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
                                name: 'Anti-diabetic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Anti-hypertensive',
                                value: 'value',
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
                                name: 'ARVs',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Antivirals',
                                value: 'value',
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
                                name: 'Asthamatic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Co-trimoxazole',
                                value: 'value',
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
                                name: 'Folic acid',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hemorrhoidal medication',
                                value: 'value',
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
                                name: 'Magnesium',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Multivitamin',
                                value: 'value',
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
                                name: 'Vitamin A',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other medications',
                                value: 'otherMedications',
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
                                        inputWidth: "85%",
                                       
                                    },

                                ]
                            }
                        ]
                    },
            },

        ] as any
    }),
    actions:{
        setPersonalInformation(data: any){
            this.Medication = data
        }
    },
    persist:true,

})