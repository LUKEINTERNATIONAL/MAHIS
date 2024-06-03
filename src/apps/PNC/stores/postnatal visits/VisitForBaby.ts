import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'
import _ from "lodash";


const initialVisitForBaby=[
    {
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'What is the status of the baby?',
                    selectedValue: '',
                    name:'Status of baby',
                    displayNext:"Alive",
                    class:"bold",
                    displayNone:'',
                },
                data:[
                    {
                        name: 'Alive',
                        value: 'Alive',
                        colSize: '4',

                    },
                    {
                        name: 'Dead',
                        value: 'Dead',
                        colSize: '4',
                    },
                ]
            }

    },
    {
        childName:"Status of baby",
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
                                inputHeader: 'Current weight',
                                unit: 'kg',
                                icon: icons.weight,
                                value: '',
                                valueType:'text',
                                name: 'Current weight',
                                required: true,
                                eventType: 'input',
                                inputWidth: '',
                            },

                        ]
                    }
                ]
            },
    },


    {
        childName:"Status of baby",
        selectdData: [],
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Is the postnatal visit within',
                    selectedValue: '',
                    name:'Postnatal visit period',
                    class:"bold",
                    displayNone:true,

                },
                data:[
                    {
                        name: 'Up to 48 hrs or before discharge',
                        value: 'Up to 48 hrs or before discharge',
                        colSize: '7',
                    },
                    {
                        name: '3-7 days',
                        value: '3-7 days',
                        colSize: '7',
                    },
                    {
                        name: '8-42 days',
                        value: '8-42 days',
                        colSize: '7',
                    },
                ]
            }

    },

    {
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border _padding',
        checkboxBtnContent:
            {
                header:{
                    title: 'Has the baby received the following immunisations?',
                    selectedValue: '',
                    name:'Type of immunisation the baby received',
                    displayNext:"",
                    class:"bold",
                    displayNone:true,
                },
                data:[

                    {
                        name: 'BCG',
                        value: 'BCG',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Polio',
                        value: 'Polio',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {

        childName:'BCG',
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
                                inputHeader: 'Date BCG given',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                valueType:'text',
                                name: 'Date BCG given',
                                required: true,
                                eventType: 'input',
                                datePopover:true,
                                inputWidth: '',
                                placeholder:'Pick holder',
                                isDatePopover:true
                            },

                        ]
                    }
                ]
            },
    },
    {
        childName:"Polio",
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
                                inputHeader: 'Date polio given',
                                unit: '',
                                icon: icons.calenderPrimary,
                                value: '',
                                valueType:'text',
                                name: 'Date polio given',
                                required: true,
                                eventType: 'input',
                                datePopover:true,
                                inputWidth: '',
                                placeholder:'Pick holder',
                                isDatePopover:true

                            },

                        ]
                    }
                ]
            },
    },

    {
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Danger signs for the child',
                    selectedValue: '',
                    name:'Danger signs',
                    class:"bold",
                    displayNone:true,
                },
                data:[

                    {
                        name: 'None',
                        value: 'none',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Not able to feed',
                        value: 'not able to feed',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:"Status of baby",
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[

                    {
                        name: 'Fever (>37.5C)',
                        value: 'fever',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Hypothermia',
                        value: 'Hypothermia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Convulsions',
                        value: 'convulsions',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Lethargic',
                        value: 'lethargic',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Chest in-drawing',
                        value: 'chest in-drawing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Fast breathing',
                        value: 'fast breathing',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Eye discharge',
                        value: 'Eye discharge',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Signs of cord infection',
                        value: 'Signs of cord infection',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Jaundice',
                        value: 'jaundice',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Skin rashes',
                        value: 'skin rashes',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:"Status of baby",
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Danger signs',
                    displayNone:true,


                },
                data:[
                    {
                        name: 'Other danger signs',
                        value: 'Other danger signs',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },
    {
        childName:"Other danger signs",
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
                                valueType:'text',
                                name: 'Other danger signs notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "",
                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        childName:"Status of baby",
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Was an intervention given?',
                    selectedValue: '',
                    name:'Intervention on danger signs',
                    class:"bold",
                    displayNext:'Yes',
                    displayNone:true,


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
        childName:'Intervention on danger signs',
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
                                inputHeader: 'Describe the intervention',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Intervention on danger signs notes',
                                required: true,
                                eventType: 'input',
                                inputWidth: "",
                            },

                        ]
                    }
                ]
            },
    },
    {
        selectdData: [],
        childName:"Status of baby",
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        radioBtnContent:
            {
                header:{
                    title: 'Has the baby started nevirapine?',
                    selectedValue: '',
                    name:'Nevirapine started',
                    class:"bold",
                    displayNext:'No',
                    displayNone:true,

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
        childName:'Nevirapine started',
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
                                inputHeader: 'Why the baby is not on neverapine?',
                                unit: '',
                                icon: icons.editPen,
                                value: '',
                                valueType:'text',
                                name: 'Neverapine not started notes',
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
export const useVisitForBabyStore = defineStore('visitForBabyStore',{
    state: () => ({
        visitForBaby: [...initialVisitForBaby] as any,

    }),
    actions:{
        setPNCVisitForBaby(data: any){
            this.visitForBaby = data
        },
        getInitial(){
            const data=_.cloneDeep(initialVisitForBaby)
            return [...data];
        }

    },
    persist:true,

})