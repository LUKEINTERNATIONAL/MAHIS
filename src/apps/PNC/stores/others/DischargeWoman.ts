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
                            selectedValue: '',
                            class:'bold',
                            name:'Discharge status of woman'
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Postpartum family planning counselling done?',
                            selectedValue: '',
                            name:'Postpartum family planning counselling',
                            class:'bold'
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Postpartum family planning methods provided?',
                            selectedValue: '',
                            name:'Postpartum family planning methods provided',
                            class:'bold'
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
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                    {
                        header:{
                            title: 'Select the method provided',
                            selectedValue: '',
                            name:'Postpartum family planning method',
                            class:'bold'
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
                                        name: 'Cause of death notes',
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