import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useCurrentPregnanciesStore = defineStore('currentPregnanciesStore',{
    state: () => ({
        currentPregnancies:[    
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
                                inputHeader: 'Fundal height',
                                value: '',
                                name: 'gestation',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                inputWidth:'55%'
                                
                            },
                            
                        ],}
                   

                    ],
                
                },
            },
          
             
        ] as any,
    lmnp:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
            {
                header:{
                    title: 'LNMP Known?',
                    selectedValue: '',
                    name:'LMNP',
                    alertsError: false,
                    alertsErrorMassage: '',
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
        {
            isFinishBtn: false,
            classDash: 'dashed_bottom_border _padding',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: 'LNMP date*',
                                    value: '',
                                    name: 'lmnpEDD',
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
        }

    ],
    ultrasound:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
            {
                header:{
                    title: 'Ultrasound done?',
                    selectedValue: ''
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
        {
            isFinishBtn: false,
            classDash: '',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: 'Delivery date determined by ultrasound*',
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
        }

    ],
    tetanus:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: 'dashed_bottom_border',
            radioBtnContent:
            {
                header:{
                    title: 'Tetanus dose',
                    selectedValue: ''
                },
                data:[
                    {
                        name: 'Fully Immunised',
                        value: 'Full',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Under Immunised',
                        value: 'Under',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'No doses',
                        value: 'No',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Unknown',
                        value: 'Unknown',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },

                ]
            }
                
        },
        {
            isFinishBtn: false,
            sectionHeader: 'TTV 1 immunisation',
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {

                        inputHeader: 'TTV 1 Date of Immunisation',
                        value: '',
                        name: 'tt1Date',
                        isDatePopover: true,
                        icon: icons.calenderPrimary,
                        placeholder: 'Pick the date',
                        required: true,
                        eventType: 'input',
                        inputWidth: '175px',
                        alertsError: false,
                        alertsErrorMassage: ''
                    },
                    ],
                }]
            },


        },
        {
            isFinishBtn: false,
            sectionHeader: 'TTV 2 immunisation',
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {

                            inputHeader: 'TTV 2 Date of Immunisation',
                            value: '',
                            name: 'tt2Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '175px',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,
            sectionHeader: 'TTV 3 immunisation',
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {

                            inputHeader: 'TTV 3 Date of Immunisation',
                            value: '',
                            name: 'tt3Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '175px',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,
            sectionHeader: 'TTV 4 immunisation',
            classDash: '',

            data:{
                rowData: [{
                    colData: [
                        {

                            inputHeader: 'TTV 4 Date of Immunisation',
                            value: '',
                            name: 'tt4Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '175px',
                            alertsError: false,
                            alertsErrorMassage: ''
                        },
                    ],
                }]
            },

        },
        {
            isFinishBtn: false,
            sectionHeader: 'TTV 5 immunisation',
            classDash: 'dashed_bottom_border _padding',

            data:{
                rowData: [{
                    colData: [
                        {

                            inputHeader: 'TTV 5 Date of Immunisation',
                            value: '',
                            name: 'tt5Date',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            required: true,
                            eventType: 'input',
                            inputWidth: '175px',
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
                        selectedValue: ''
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
                            value: 'client',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Client refused',
                            value: 'client',
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
            classDash: 'dashed_bottom_border _padding',

            data:{
                rowData: [{
                    colData: [{

                        inputHeader: 'Specify',
                        value: '',
                        name: 'other',
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
            this.currentPregnancies = data
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
    persist:true,

})