import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialDischargeWoman=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'What is the discharge status of the woman?',
                    selectedValue: '',
                    class:'bold',
                    name:'Discharge status of woman',
                    displayNext:'Discharged alive'
                },
                data:[
                    {
                        name: 'Discharged alive',
                        value: 'Discharged alive',
                        colSize: '5',

                    },
                    {
                        name: 'Absconded',
                        value: 'Absconded',
                        colSize: '5',

                    },
                    {
                        name: 'Referred out',
                        value: 'Referred out',
                        colSize: '5',

                    },
                    {
                        name: 'Death',
                        value: 'Death',
                        colSize: '5',

                    },
                ]
            }

    },
    {
        childName:"Discharge status of woman",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Postpartum family planning counselling done?',
                    selectedValue: '',
                    name:'Postpartum family planning counselling',
                    class:'bold',
                    displayNone:true

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
        childName:"Discharge status of woman",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Postpartum family planning methods provided?',
                    selectedValue: '',
                    name:'Postpartum family planning methods provided',
                    class:'bold',
                    displayNone:true,
                    displayNext:'Yes',

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
        childName:"Postpartum family planning methods provided",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Select the method provided',
                    selectedValue: '',
                    name:'Postpartum family planning method',
                    class:'bold',
                    displayNone:true
                },
                data:[
                    {
                        name: 'IUCD',
                        value: 'IUCD',
                        colSize: '3',

                    },
                    {
                        name: 'BTL',
                        value: 'BTL',
                        colSize: '3',

                    },
                ]
            }

    },

] as any;
export const useDischargeWomanStore = defineStore('dischargeWomanStore',{
    state: () => ({
        dischargeWoman: [...initialDischargeWoman] as any,
    }),
    actions:{
        setDischargeWoman(data: any){
            this.dischargeWoman = data
        },
        getInitial(){
            const data=_.cloneDeep(initialDischargeWoman);
            return [...data];
        }


    },
    persist:true,

})