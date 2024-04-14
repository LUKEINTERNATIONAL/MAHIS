import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useHIVStatusAndTreatmentStore = defineStore('hivStatusAndTreatmentStore',{
    state: () => ({
        hivStatusAndTreatment: [

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'HIV status of woman',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Positive',
                                value: 'positive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Negative',
                                value: 'negative',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unknown',
                                value: 'unknown',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Positive',
                                value: 'positive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Negative',
                                value: 'negative',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Not done',
                                value: 'not done',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
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
                            title: 'Has the woman been started on ART treatment?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'no',
                                labelPlacement: 'start',
                                colSize: '7',
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
                                        inputHeader: 'ART clinic registration number',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'art clinic registration number',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "",
                                    },

                                ]
                            }
                        ]
                    },
            },

        ] as any,
    }),
    actions:{
        setHIVStatusANDTreatment(data: any){
            this.hivStatusAndTreatment = data
        },


    },
    persist:true,

})