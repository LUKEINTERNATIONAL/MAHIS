import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useCurrentPregnanciesStore = defineStore('currentPregnanciesStore',{
    state: () => ({
        currentPregnancies:[    
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
                                    inputHeader: 'LNMP',
                                    value: '',
                                    name: 'LNMP',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                },
                                {
                                    inputHeader: 'Ultrasound scan date',
                                    value: '',
                                    name: 'ultrasound',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                },
                                
                            ],
                            
                        },
                         {
                        colData: [
                            {
                                inputHeader: 'Gestation age',
                                value: '',
                                name: 'gestation',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                
                            },
                            
                        ],}
                   

                    ],
                
                },
            },
          
             
        ] as any,
       deliveryDate :[
           {
        isFinishBtn: false,
        classDash: 'dashed_bottom_border _padding',
        data:
        { 
            rowData:[
                {
                    colData: [
                        {
                            inputHeader: 'Expected Delivery Date',
                            value: '',
                            name: 'EDD',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: '',
                            isDatePopover: true,
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                        },
                        
                    ],
                    
                },
           

            ],
        
        },
                
    }],
    lmnp:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
            {
                header:{
                    title: 'LNMP Known?',
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
            classDash: 'dashed_bottom_border _padding',
            data:
                {
                    rowData: [
                        {
                            colData: [
                                {
                                    inputHeader: 'LNMP date*',
                                    value: '',
                                    name: 'EDD',
                                    required: true,
                                    eventType: 'input',
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    isDatePopover: true,
                                    icon: icons.calenderPrimary,
                                    placeholder: 'Pick the date',
                                    colSize:'55%'
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
            classDash: 'dashed_bottom_border',
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
    ],
    gestation:[
        {
            selectdData: [],
            isFinishBtn: false,
            classDash: '',
            radioBtnContent:
            {
                header:{
                    title: 'Source of gestation age',
                    selectedValue: ''
                },
                data:[
                    {
                        name: 'LNMP',
                        value: 'Yes',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Ultrasound',
                        value: 'No',
                        labelPlacement: 'start',
                        colSize: '7',
                        justify: 'space-between',
                    },
                    {
                        name: 'Fundal height',
                        value: 'No',
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
        setGestation(data: any){
            this.gestation = data
        },
        setDeliveryDate(data: any){
            this.deliveryDate = data
        },


      
    },
    persist:true,

})