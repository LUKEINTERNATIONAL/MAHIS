import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useHeadssAssessmentStore = defineStore('headssAssessmentStore',{
    state: () => ({

        headssAssesment: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                    {
                        header:{
                            title: 'Who does the client live with?',
                            selectedValue: '',
                            name:'Who does the client live with'
                        },
                        data:[
                            {
                                name: 'Parents',
                                value: 'parents',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Siblings',
                                value: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Extended family',
                                value: 'Dont know',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Partner',
                                value: 'partner',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Friend',
                                value: 'friend',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No one',
                                value: 'No one',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Other',
                                value: 'other',
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
                                        displayNone:true,
                                        inputHeader: 'Specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'Other notes',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                    },

                                ]
                            }
                        ]
                    },
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
                                        // displayNone:true,
                                        inputHeader: 'How does the client perceive her home situation?',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'How they perceive their home situation',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                    },

                                ]
                            }
                        ]
                    },
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
                                        // displayNone:true,
                                        inputHeader: 'How does she perceive her relationship with her teachers and fellow students/employers and colleagues?',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'How they perceive their relationship with their teachers and fellow students/employers and colleagues',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "100%",
                                    },

                                ]
                            }
                        ]
                    },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Any recent changes in their situation?',
                            selectedValue: '',
                            name:'Changes to situation'
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'Yes',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'No',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
        ] as any,
       
    }),
    actions:{
        setHeadsAssessment(data: any){
            this.headssAssesment = data
        },
      
    },
     persist:true,

})