import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useMedicationsStore = defineStore('medicationsStore',{
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Analgesic',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Anti-TB',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Antimarials',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Aspirin',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Doxylamine',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Iron',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Thyroid medication',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Anti-psychotics',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Anti-hypertensive',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Antivirals',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Co-trimoxazole',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Hemorrhoidal medication',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Multivitamin',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
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
                                colSize: '2',
                                justify: 'end',
                            },
                            {
                                name: 'Other',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '3',
                                justify: 'end',
                            },

                        ]
                    }

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