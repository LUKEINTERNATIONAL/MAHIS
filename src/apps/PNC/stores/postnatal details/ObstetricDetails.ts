import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

const initialObstetricDetails=[
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
                                inputHeader: 'Gravida',
                                value: '',
                                name: 'Gravida',
                                icon: icons.editPen,
                                required: true,
                                valueType:"text",
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            {
                                inputHeader: 'Parity',
                                value: '',
                                name: 'Parity',
                                icon: icons.editPen,
                                valueType:"text",
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },

                        ],

                    },

                ],

            },

    },

    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: 'Any past pregnancy problems',
                    selectedValue: '',
                    class:'bold',
                    name:'Past pregnancy problems'
                },
                data:[

                    {
                        name: 'Cord prolapse',
                        value: 'cord prolapse',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Antepartum haemorrhage',
                        value: 'antepartum haemorrhage',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        selectdData: [],
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[

                    {
                        name: 'Pre-Eclampsia',
                        value: 'pre-eclampsia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Sepsis',
                        value: 'sepsis',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                ]
            }

    },

    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Retained placenta',
                        value: 'retained placenta',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Perineal tear',
                        value: 'perineal tear',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Postpartum haemorrhage',
                        value: 'postpartum haemorrhage',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Obstructed or prolonged labour',
                        value: 'Obstructed or prolonged labour',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Premature labour',
                        value: 'premature labour',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Placenta previa',
                        value: 'placenta previa',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Severe anaemia',
                        value: 'severe anaemia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Placenta abruption',
                        value: 'placenta abruption',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Fetal distress',
                        value: 'fetal distress',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Eclampsia',
                        value: 'eclampsia',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },

    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Haemorrhage',
                        value: 'haemorrhage',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Ruptured uterus',
                        value: 'Ruptured uterus',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        classDash: 'dashed_bottom_border',
        checkboxBtnContent:
            {
                header:{
                    title: '',
                    selectedValue: '',
                    name:'Past pregnancy problems'

                },
                data:[
                    {
                        name: 'Symphysiotomy',
                        value: 'symphysiotomy',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },
                    {
                        name: 'Other problems',
                        value: 'Other problems',
                        checked: false,
                        labelPlacement: 'start',
                        colSize: '6',
                        justify: 'space-between',
                    },

                ]
            }

    },
    {
        childName:"Other problems",
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
                                name: 'Other problems notes',
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
export const useObstetricDetailsStore = defineStore('obstetricDetails',{
    state: () => ({
        obstetricDetails: [...initialObstetricDetails] as any,
    }),
    actions:{
        setObstetricDetails(data: any){
            this.obstetricDetails = data
        },
        getInitial(){
            const data=[...initialObstetricDetails]
            return [...data]
        }


    },
    persist:true,

})