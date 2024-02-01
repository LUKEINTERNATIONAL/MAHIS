import { defineStore } from "pinia";
import {icons} from "@/utils/svg";

export const useWomanBehaviourStore = defineStore('womanBehaviourStore', {
    state: () => ({
        Caffeine: [

            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent: {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: 'More than 2 cups of tea',
                            value: 'more than 2 cups of tea',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent: {
                    data: [
                        {
                            name: 'More than 4 cups of tea',
                            value: 'more than 4 cups of tea',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent: {
                    data: [
                        {
                            name: 'More than 12 bars of chocolate',
                            value: 'more than 12 bars of chocolate',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                    ]
                }
            },
            {
                selected: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent: {
                    data: [
                        {
                            name: 'More than one bottle/cane of soda, energy, soft drink',
                            value: 'more than one bottle/cane of soda, energy, soft drink',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                    ]
                }
            },
            {
                selected: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent: {
                    data: [
                        {
                            name: 'None of the above',
                            value: 'none of the above',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                    ]
                }
            },
        ],

            Tobbaco: [

            {
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Recently quit tobbacco products',
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

    actions: {
        addCaffeine(data: any) {
            this.Caffeine = data;
        },
        addTobbaco(data: any) {
            this.Tobbaco = data;
        },
    },
    persist: true
});
