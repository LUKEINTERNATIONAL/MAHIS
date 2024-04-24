import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialPNCEnd=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Reason for ending PNC?',
                    selectedValue: '',
                    name:'Reason for ending PNC',
                    class:'bold',
                },
                data:[
                    {
                        name: 'Refer',
                        value: 'Refer',
                        colSize: '8',

                    },
                    {
                        name: 'Discharge home',
                        value: 'Discharge home',
                        colSize: '8',

                    },
                    {
                        name: 'Death mother',
                        value: 'Death mother',
                        colSize: '5',

                    },
                ]
            }

    },
] as any;
export const usePNCEndStore = defineStore('pncEndStore',{
    state: () => ({
        pncEnd: [...initialPNCEnd] as any,
    }),
    actions:{
        setPNCend(data: any){
            this.pncEnd = data
        },
        getInitial(){
            const data=[...initialPNCEnd]
            return [...data]
        }


    },
    persist:true,

})