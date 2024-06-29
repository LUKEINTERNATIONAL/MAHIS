import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useFetalPresentationStore = defineStore('fetalPresentationStore',{
    state: () => ({

        fetalPresentation: [

            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: '',
                            name:'Fetal presentation'
                        },
                        data:[
                            {
                                value: 'Unknown presentation',
                                name: 'Unknown',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Cephalic',
                                name: 'Cephalic',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Pelvic',
                                name: 'Pelvic',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'Transverse',
                                name: 'Transverse',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'other',
                                name: 'Other',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                        ]
                    }


            },

            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: '',

                header:{
                    title: '',
                    selectedValue: '',
                    
                },

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {   displayNone:true,
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other (specify)',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "55%",
                                        
                                    },

                                ]
                            }
                        ]
                    },
            },
        ],

    }),
    actions:{
        setFetalPresentation(data: any){
            this.fetalPresentation = data
        }
    },
    persist:true,

})
