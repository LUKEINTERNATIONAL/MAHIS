import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialHIVStatusAndTreatment =[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'HIV status of woman',
                    selectedValue: '',
                    class:'bold',
                    name:'Mother HIV Status'
                },
                data:[
                    {
                        name: 'Positive',
                        value: 'positive',
                        colSize: '5',

                    },
                    {
                        name: 'Negative',
                        value: 'negative',
                        colSize: '5',

                    },
                    {
                        name: 'Unknown',
                        value: 'unknown',
                        colSize: '5',

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
                    title: 'New HIV test result in postnatal',
                    selectedValue: '',
                    class:'bold',
                    name:'New HIV status'
                },
                data:[
                    {
                        name: 'Positive',
                        value: 'Positive',
                        colSize: '5'
                    },
                    {
                        name: 'Negative',
                        value: 'Negative',
                        colSize: '5'

                    },
                    {
                        name: 'HIV test not done',
                        value: 'HIV test not done',
                        colSize: '5'

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
                    title: 'Has the woman started ART treatment?',
                    selectedValue: '',
                    class:'bold',
                    name:'Has the woman started ART treatment',
                    displayNext:'Yes'
                },
                data:[
                    {
                        name: 'Yes',
                        value: 'Yes',
                        colSize: '2.5'
                    },
                    {
                        name: 'No',
                        value: 'No',
                        colSize: '2.5'

                    },
                ]
            }

    },
    {
        isFinishBtn: false,
        childName:'Has the woman started ART treatment',
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',
        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                displayNone:true,
                                inputHeader: 'ART clinic number',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:"text",
                                name: 'ART clinic registration number',
                                required: true,
                                eventType: 'input',
                                inputWidth: "",
                            },

                        ]
                    }
                ]
            },
    },
] as any;
export const useHIVStatusAndTreatmentStore = defineStore('hivStatusAndTreatmentStore',{
    state: () => ({
        hivStatusAndTreatment: [...initialHIVStatusAndTreatment] as any,
    }),
    actions:{
        setHIVStatusANDTreatment(data: any){
            this.hivStatusAndTreatment = data
        },
        getInitial(){
            const data=[...initialHIVStatusAndTreatment]
            return [...data]
        }


    },
    persist:true,

})