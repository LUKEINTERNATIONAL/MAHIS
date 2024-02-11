import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useFetalPresentation = defineStore('fetalPresentation',{
    state: () => ({

        fetalPresentation: [

            {
                selectdData: [],
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
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
                                    {
                                        inputHeader: 'Other (specify)',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "55%",
                                        required: true
                                    },

                                ]
                            }
                        ]
                    },
            },
        ],

    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        }
    },
    persist:true,

})
