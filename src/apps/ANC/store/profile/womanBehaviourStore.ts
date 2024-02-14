import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useWomanBehaviourStore = defineStore('womanBehaviourStore',{
    state: () => ({
        dailyCaffeineIntake:[
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
                                name: 'More than 2 cups of tea',
                                value: 'more than 2 cups of tea',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '9',
                                justify: 'space-between'
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
                                name: 'More than 4 cups of tea',
                                value: 'more than 4 cups of tea',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '9',
                                justify: 'space-between'
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
                                name: 'More than 12 bars of chocolate',
                                value: 'more than 12 bars of chocolate',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '9',
                                justify: 'space-between'
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
                                name: 'More than one bottle of soda, energy, soft drink',
                                value: 'more than one bottle of soda, energy, soft drink',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '9',
                                justify: 'space-between'
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
                                name: 'None of the above',
                                value: 'none of the above',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '9',
                                justify: 'space-between'
                            },
                        ]
                    }

            },

        ],
        Tobacco: [

            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Recently quit tobacco products',
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
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            }
                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Exposure to second hand smoke',
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
                                value: 'N',
                                name: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            }
                        ]
                    }

            }
        ] as any
    }),
    actions:{
        setPersonalInformation(data: any){
            this.dailyCaffeineIntake = data
        }
    },
    persist:true,

});
