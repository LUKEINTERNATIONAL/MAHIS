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
                            title: 'Select fetal presentation',
                            selectedValue: '',
                            name:'Fetal presentation',
                            class:"bold"
                        },
                        data:[
                            {
                                value: 'Unknown presentation',
                                name: 'Unknown',
                                colSize: '4',

                            },
                            {
                                value: 'Cephalic',
                                name: 'Cephalic',
                                colSize: '8',

                            },
                            {
                                value: 'Pelvic',
                                name: 'Pelvic',
                                colSize: '4',

                            },
                            {
                                value: 'Transverse',
                                name: 'Transverse',
                                colSize: '8',

                            },
                            {
                                value: 'other',
                                name: 'Other',
                                colSize: '4',

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
