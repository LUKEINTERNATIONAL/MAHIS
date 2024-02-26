import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useCurrentPregnanciesStore = defineStore('currentPregnanciesStore',{
    state: () => ({
        palpation:[


        ] as any,
    lmnp:[
        {
            radioBtnContent:
            {
                header:{
                    title: 'LNMP Known?',
                    name:'Yes',
                    selectedValue: '',

                },
                data:[
                    {
                        value: 'yes',
                        name: 'Yes',
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
        {
            sectionHeader:'',
            classDash: 'dashed_bottom_border _padding',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {

                                    inputHeader: 'LNMP date*',
                                    value: '',
                                    name: 'lmnp date',
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                    inputWidth:'55%'
                                },

                            ],

                        },


                    ],

                },
            alerts:
                [
                    {
                        backgroundColor: '',
                        status: '',
                        icon: icons.editPen,
                        textColor: '',
                        value: '',
                        name: '',
                        index: ''
                    }
                ],
        }

    ] as any,
    ultrasound:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
            {
                header:{
                    title: 'Ultrasound done?',
                    selectedValue: '',
                    name:'Yes'
                },
                data:[
                    {
                        name: 'Yes',
                        value: 'yes',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'No',
                        value: 'no',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                ]
            }
                
        },
        {
            isFinishBtn: false,
            classDash: '',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {   displayNone:true,
                                    inputHeader: 'Date for ultrasound*',
                                    value: '',
                                    name: 'ultrasound delivery date',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                    inputWidth:'55%'
                                },

                            ],

                        },


                    ],

                },
        },
        {
            isFinishBtn: false,
            classDash: '',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {  displayNone: true,
                                    inputHeader: 'Gestation age from ultrasound',
                                    value: '',
                                    name: 'gestation age from ultrasound',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    icon:icons.editPen,
                                    placeholder: 'Enter gestation age from ultrasound',
                                    inputWidth:'55%'
                                },

                            ],

                        },


                    ],

                },
        },
        {
            isFinishBtn: false,
            classDash: 'dashed_bottom_border',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {  displayNone: true,
                                    inputHeader: 'LMNP date from ultrasound',
                                    value: '',
                                    name: 'ultrasound lmnp date',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Enter lmnp from ultrasound',
                                    inputWidth:'55%'
                                },

                            ],

                        },


                    ],

                },
        },
        {
            isFinishBtn: false,
            sectionHeader: 'Gestation age by Palpation',
            classDash: 'dashed_bottom_border',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: 'Gestation age by palpation',
                                    value: '',
                                    name: 'gestation age by palpation',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    icon:icons.editPen,
                                    inputWidth: '175px',
                                },

                            ],

                        },


                    ],

                },
        },
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: 'dashed_bottom_border',
            radioBtnContent:
                {
                    header:{
                        title: 'Gestation age to be used',
                        selectedValue: '',
                        name:'source of gestation age'
                    },
                    data:[
                        {
                            name: 'GA by  LNMP ',
                            value: 'ga by lnmp',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'GA by ultrasound',
                            value: 'ga by ultrasound',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'GA by palpation',
                            value: 'ga by palpation',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }

        },




    ],
    tetanus:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: 'dashed_bottom_border',
            radioBtnContent:
            {
                header:{
                    title: 'The woman received tetanus doses for immunization?',
                    selectedValue: '',
                    name:'Tetanus doses'
                },
                data:[
                    {
                        name: 'Fully Immunised',
                        value: 'fully immunised',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Under Immunised',
                        value: 'under immunised',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'No doses',
                        value: 'no doses',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Unknown doses',
                        value: 'unknown doses',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },

                ]
            }
                
        },
        {
            isFinishBtn: false,
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {
                        displayNone:true,
                        inputHeader: 'TTV 1 Date of Immunisation',
                        value: '',
                        name: 'tt1Date',
                        isDatePopover: true,
                        icon: icons.calenderPrimary,
                        placeholder: 'Pick the date',
                        required: true,
                        eventType: 'input',
                        inputWidth: '55%',
                        alertsError: false,
                        alertsErrorMassage: ''
                    },
                    ],
                }]
            },


        },
        {
            isFinishBtn: false,
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: 'TTV 2 Date of Immunisation',
                            value: '',
                            name: 'tt2Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '55%',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: 'TTV 3 Date of Immunisation',
                            value: '',
                            name: 'tt3Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '55%',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: 'TTV 4 Date of Immunisation',
                            value: '',
                            name: 'tt4Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '55%',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,

            data:{
                rowData: [{
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: 'TTV 5 Date of Immunisation',
                            value: '',
                            name: 'tt5Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '55%',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,

            data:{
                rowData: [{
                    colData: [
                        {
                            displayNone:true,
                            inputHeader: 'Number of under immunised doses',
                            value: '',
                            name: 'number of under immunised doses',
                            icon: icons.editPen,
                            placeholder: 'Enter number of doses',
                            required: true,
                            eventType: 'input',
                            inputWidth: '55%',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },

        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
                {
                    header:{
                        title: 'Reason Tetanus toxoid (TT) was not conducted',
                        name:'Reasons for no tetanus doses',
                        selectedValue: '',
                        displayNone:true
                    },
                    data:[
                        {
                            name: 'Stockout',
                            value: 'stockout',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Client is ill',
                            value: 'client is ill',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Client refused',
                            value: 'client refused',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Allergy to vaccinate',
                            value: 'allergy',
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
            data:{
                rowData: [{
                    colData: [{
                        displayNone:true,
                        inputHeader: 'Specify',
                        value: '',
                        name: 'Other',
                        icon: icons.editPen,
                        required: true,
                        eventType: 'input',
                        inputWidth: "55%",
                        alertsError: false,
                        alertsErrorMassage: ''
                    }]
                }]
            }
        },
    ],
    }),
    actions:{
        setPrevPregnancies(data: any){
            this.palpation = data
        },
        setTetanus(data: any){
            this.tetanus = data
        },
        setLMNP(data: any){
            this.lmnp = data
        },
        setUltrasound(data: any){
            this.ultrasound = data
        },
        // setGestation(data: any){
        //     this.gestation = data
        // },
        // setDeliveryDate(data: any){
        //     this.deliveryDate = data
        // },


      
    },
    // persist:true,

})