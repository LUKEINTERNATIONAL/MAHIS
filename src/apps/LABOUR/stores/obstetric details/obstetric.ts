import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useObstreticHistoryStore = defineStore('obstreticHistoryStore',{
    state: () => ({
        prevPregnancies: [
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
                                        name: 'gravida',
                                        icon: icons.editPen,
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },
                                    {
                                        inputHeader: 'Para',
                                        value: '',
                                        name: 'para',
                                        icon: icons.editPen,
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
                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Number of ANC visits',
                                        value: '',
                                        icon: icons.editPen,
                                        name: 'number of anc visits',
                                        required: true,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },
                                    {
                                        inputHeader: 'LNMP',
                                        value: '',
                                        name: 'lnmp',
                                        required: true,
                                        icon: icons.editPen,
                                        eventType: 'input',
                                        alertsError: false,
                                        alertsErrorMassage: ''
                                    },

                                ]
                            },
                        ]
                    }
            },
            {
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'Gestation age',
                                    value: '',
                                    name: 'Gestation age',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Expected delivery date',
                                    value: '',
                                    name: 'expected delivery date',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },

                            ]
                        },
                    ]
                }
            },
            {
                classDash: 'dashed_bottom_border',
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'TDV received',
                                    value: '',
                                    name: 'tdv received',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },
                                {
                                    inputHeader: 'Last HB result',
                                    value: '',
                                    name: 'last hb result',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: ''
                                },

                            ]
                        },
                    ]
                }
            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'VDRL results',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Positive',
                                value: 'vdrlpositive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Negative',
                                value: 'vdrlnegative',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unknown',
                                value: 'vdrlunknown',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'HIV status',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Positive',
                                value: 'hivpositive',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Negative',
                                value: 'hivnegative',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Unknown',
                                value: 'hivunknown',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Is the woman on ART treatment',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yesart',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'noart',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                classDash: 'dashed_bottom_border',
                data:{
                    rowData:[
                        {
                            colData: [
                                {
                                    inputHeader: 'ART clinic registration number',
                                    value: '',
                                    name: 'artnumber',
                                    required: true,
                                    icon: icons.editPen,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    inputWidth:'55%'
                                },

                            ]
                        },
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'ART mother treatment start period',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'On ART before pregnancy',
                                value: 'on ART before pregnancy',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '1st or 2nd trimester (0-27 weeks)',
                                value: '2nd trimester',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: '3rd Trimester (28 weeks +)',
                                value: '3rd Trimester',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },

                        ]
                    }

            },


            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Dexamethasone given',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'yesdexa',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'nodexa',
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
        setPrevPregnancies(data: any){
            this.prevPregnancies = data
        },
        // setPreterm(data: any){
        //     this.preterm = data
        // },
        // setAbnormalities(data: any){
        //     this.abnormalities = data
        // },
        // setModeOfDelivery(data:any) {
        //     this.modeOfDelivery = data
        // },
        // setComplications(data:any) {
        //     this.Complications = data
        // },

    },
    // persist:true,

})