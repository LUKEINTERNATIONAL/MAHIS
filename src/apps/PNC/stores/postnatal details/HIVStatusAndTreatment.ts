import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";

const initialHIVStatusAndTreatment =[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'HIV status of woman*',
                    selectedValue: '',
                    class:'bold',
                    name:'Mother HIV Status'
                },
                data:[
                    {
                        name: 'Positive',
                        value: 'positive',
                        colSize: '4.001',

                    },
                    {
                        name: 'Negative',
                        value: 'negative',
                        colSize: '4.001',

                    },
                    {
                        name: 'Unknown',
                        value: 'unknown',
                        colSize: '4',

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
                    title: 'New HIV test result in postnatal*',
                    selectedValue: '',
                    class:'bold',
                    name:'New HIV status',
                    displayNext:"Positive"
                },
                data:[
                    {
                        name: 'Positive',
                        value: 'Positive',
                        colSize: '4.001'
                    },
                    {
                        name: 'Negative',
                        value: 'Negative',
                        colSize: '4.001'

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
        childName: 'New HIV status',
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Has the woman started ART treatment?*',
                    selectedValue: '',
                    class:'bold',
                    name:'Has the woman started ART treatment',
                    displayNext:'Yes',
                    displayNone:true
                },
                data:[
                    {
                        name: 'Yes',
                        value: 'Yes',
                        colSize: '2'
                    },
                    {
                        name: 'No',
                        value: 'No',
                        colSize: '2'

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
                                inputHeader: 'ART clinic number*',
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
            const data=_.cloneDeep(initialHIVStatusAndTreatment);
            return [...data];
        }


    },
    persist:true,

})