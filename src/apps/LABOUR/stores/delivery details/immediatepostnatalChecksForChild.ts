import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialExamsAfterDeliveryForChild=[

    {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent:
            {
                header:{
                    title: 'Immediate vitals for child'
,                   selectedValue: '',
                    class:"bold",
                    name:"Vitals"
                },
                data:[

                ]
            }

    },
    {
        sectionHeader: '',
        classDash: 'dashed_bottom_border _padding',

        data:
            {
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Respiration rate',
                                unit: 'BMP',
                                icon: icons.respiratory,
                                value: '',
                                name: 'Respiration rate',
                                eventType: 'input'
                            },
                            {
                                inputHeader: 'Temperature',
                                unit: 'C',
                                icon: icons.temprature,
                                value: '',
                                name: 'Temperature (c)',
                                eventType: 'input'
                            },
                        ],
                    },

                ]
            },
    },
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Cord bleeding?',
                    selectedValue: '',
                    class:"bold",
                    name:"Cord bleeding"
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
                    title: 'Breast feeding in the first hour of birth?',
                    selectedValue: '',
                    class:"bold",
                    name:"Breast feeding in the first hour of birth"
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
                    title: 'Skin to skin contact with the mother (Immediate Kangaroo Mother Care)',
                    selectedValue: '',
                    class:"bold",
                    name:"Skin to skin contact with the mother"
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
                    title: 'Delayed bathing?',
                    selectedValue: '',
                    class:"bold",
                    name:"Delayed bathing"
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
                    title: 'Delayed cord cutting?',
                    selectedValue: '',
                    class:"bold",
                    name:"Delayed cord cutting"
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
] as any;
export const useImmediatePostnatalChecksForChildStore = defineStore('immediatePostnatalChecksForChildStore',{
    state: () => ({

        examsAfterDeliveryForChild: [...initialExamsAfterDeliveryForChild] as any,
    }),
    actions:{
        setExamsAfterDelivery(data: any){
            this.examsAfterDeliveryForChild = data
        },
        getInitial(){
            const data=[...initialExamsAfterDeliveryForChild]
            return [...data]
        }
    },
    // persist:true,

})