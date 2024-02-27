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
                            name:'fetalPresentation'
                        },
                        data:[
                            {
                                value: 'unknown',
                                name: 'Unknown',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'cephalic',
                                name: 'Cephalic',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'pelvic',
                                name: 'Pelvic',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'transverse',
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
                                        name: 'Other fetal presentation',
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
