import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useDischargeWomanStore = defineStore('dischargeWomanStore',{
    state: () => ({
        dischargeWoman: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'What is the discharge status of the woman?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Discharged alive',
                                value: 'discharged alive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Absconded',
                                value: 'absconded',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Referred out',
                                value: 'referred out',
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
                            title: 'Postpartum family planning counselling done?',
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Postpartum family planning methods provided?',
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Select the method',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'IUCD',
                                value: 'iucd',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'BTL',
                                value: 'btl',
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
                                        inputHeader: 'Specify cause of death',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Specify cause of death',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: '',
                                    },

                                ]
                            }
                        ]
                    },
            },

        ] as any,
    }),
    actions:{
        setDischargeWoman(data: any){
            this.dischargeWoman = data
        },


    },
    persist:true,

})