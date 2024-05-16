import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialHeadssAssesment =[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: 'dashed_bottom_border',
            radioBtnContent:
                {
                    header:{
                        class:"bold",
                        title: 'Who does the client live with?*',
                        selectedValue: '',
                        name:'Who does the client live with',
                        displayNext:"Other"
                    },
                    data:[
                        {
                            name: 'Parents',
                            value: 'Parents',
                            colSize: '4',
                        },
                        {
                            name: 'Siblings',
                            value: 'Siblings',
                            colSize: '4',
                        },
                        {
                            name: 'Extended family',
                            value: 'Extended family',
                            colSize: '4',
                        },
                        {
                            name: 'Partner',
                            value: 'Partner',
                            colSize: '4',
                        },
                        {
                            name: 'Friend',
                            value: 'Friend',
                            colSize: '4',
                        },
                        {
                            name: 'No one',
                            value: 'No one',
                            colSize: '4',
                        },
                        {
                            name: 'Other',
                            value: 'Other',
                            colSize: '4',
                        },
                    ]
                }

        },
    {
        childName:"Who does the client live with",
        classDash: "dashed_bottom_border",
        sideColSize:0,
        data: {
            rowData: [
                {
                    colData: [
                        {
                            displayNone: true,
                            inputHeader: "Specify other people whom the client lives with",
                            class:'bold',
                            icon: icons.editPen,
                            value: "",
                            valueType:'text',
                            name: "Other notes",
                            eventType: "input",
                            inputWidth: "100%",
                            required: true,
                        },
                    ],
                },
            ],
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
                                    class:"bold",
                                    inputHeader: 'How does the client perceive her home situation?',
                                    unit: '',
                                    icon: icons.editPen,
                                    value: '',
                                    valueType:"text",
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
                                    class:"bold",
                                    inputHeader: 'How does she perceive her relationship with her teachers and fellow students/employers and colleagues?',
                                    unit: '',
                                    icon: icons.editPen,
                                    value: '',
                                    valueType:'text',
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
                        class:'bold',
                        title: 'Any recent changes in their situation?',
                        selectedValue: '',
                        name:'Changes to situation'
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes',
                            colSize: '2',
                        },
                        {
                            name: 'No',
                            value: 'No',
                            colSize: '2',
                        },
                    ]
                }

        },
    ] as any;
export const useHeadssAssessmentStore = defineStore('headssAssessmentStore',{
    state: () => ({

        headssAssesment: [...initialHeadssAssesment]
       
    }),
    actions:{
        setHeadsAssessment(data: any){
            this.headssAssesment = data
        },
        getInitial(){
            const data = _.cloneDeep(initialHeadssAssesment);
            return [...data];
        }
      
    },
     // persist:true,

})