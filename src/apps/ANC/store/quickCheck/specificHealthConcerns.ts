import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useSpecificHealthConcernsStore = defineStore('specificHealthConcernsStore',{
    state: () => ({
        HealthConcerns:[
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
                                name: 'Abnorminal varginal discharge',
                                value: 'AbnorminalVarginalDischarge',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Change in blood pressure-up',
                                value: 'ChangeInBloodPressure',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Diarrhoea',
                                value: 'Diarrhoea',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Vomiting',
                                value: 'Vomiting',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Viginal bleeding',
                                value: 'Viginal bleeding',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Change in blood pressure-down (hypotension)',
                                value: ' BloodPressureChange',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'constipation',
                                value: 'Constipation',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Contractions',
                                value: 'Constractions',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Vaginal bleeding',
                                value: 'VaginalBleeding',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'IntimatePartinerViolence',
                                value: 'IntimatePartinerViolence',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Flu symptoms',
                                value: 'FluSymptoms',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Draining Liquor',
                                value: 'DrainingLiquor',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Headache',
                                value: 'Headache',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                name: 'Heartburn',
                                value: 'heartburn',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Frequent urination/Polyuria',
                                value: 'FrequentUrination',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Injury',
                                value: 'Injury',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
                                justify: 'space-between',
                            },
                        ]
                    }

            },

            {
                selectdData: [],
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Jaundice',
                                value: 'Jaundice',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Mental health-Depression',
                                value: 'MentalHealth',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'No health concerns',
                                value: 'NoHealthConcerns',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '4',
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
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.height,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "300px",
                                        required: true
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
            this.HealthConcerns = data
        }
    },
    persist:true,

})