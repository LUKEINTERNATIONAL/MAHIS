import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const usePNCEndStore = defineStore('pncEndStore',{
    state: () => ({
        pncEnd: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Reason for ending PNC?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Refer',
                                value: 'refer',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Discharge home',
                                value: 'discharge home',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Death mother',
                                value: 'death mother',
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
        setPNCend(data: any){
            this.pncEnd = data
        },


    },
    persist:true,

})