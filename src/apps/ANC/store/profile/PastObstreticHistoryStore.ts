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
                                    name: 'Gravida',
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
                                inputHeader: 'Abortions/Miscarriages',
                                value: '',
                                icon: icons.editPen,
                                name: 'abortions',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                                {
                                    inputHeader: 'Stillbirths',
                                    value: '',
                                    name: 'Stillbirths',
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
                                inputHeader: 'Live births',
                                value: '',
                                name: 'Live births',
                                required: true,
                                icon: icons.editPen,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },
                            {
                                inputHeader: 'Parity',
                                value: '',
                                name: 'Parity',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: ''
                            },

                        ]
                    },
                    ]
                }
            }

        ] as any,
        abnormalities:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Last live birth had congenital abnormalities?',
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
                        {
                            name: 'Dont know',
                            value: 'Dont know',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
            // {
            //     data:{ 
            //         rowData:[
            //             {
            //                 colData:[
            //                     {
            //                         // displayNone:true,
            //                         inputHeader: 'Specify',
            //                         icon: icons.editPen,
            //                         value: "",
            //                         name: "specify",
            //                         eventType: 'input',
            //                         inputWidth: "82%",
            //                         required: true
            //                     }
                                
            //                 ]
            //             }
            //         ],
                    
            //     }
                    
            // },
        ],
        preterm:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Was last live birth preterm?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Last live birth was preterm\n',
                            value: 'notPreterm',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'Last live birth was not preterm/ Last live birth was full term\n',
                            value: 'fullTerm',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'Last live birth had congenital abnormalities\n',
                            value: 'congetalAbnormalities',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ],
        modeOfDelivery: [

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: 'Specify mode of delivery',
                            selectedValue: '',
                            name:'cesareanSec',
                        },
                        data:[
                            {
                                name: 'Cesarean section',
                                value: 'cesarean',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Vacuum',
                                value: 'vacuum',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'Breach',
                                value: 'breach',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'SDV',
                                value: 'sdv',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }

            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    displayNone:true,
                                    inputHeader: 'specify',
                                    icon: icons.editPen,
                                    value: '',
                                    name: "Specify",
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },         
        ] as any,

        Complications:[
            {
                selectdData: [],
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Asphyxia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Does not know',
                                value: 'does not know',
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
                            selectedValue: ''
                        },
                        data:[

                            {
                                name: 'Pre-eclampsia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Eclampsia',
                                value: 'value',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Puerperal Sepsis',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Baby died within 24hrs of birth',
                                value: 'value',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Convulsions',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Forceps',
                                value: 'value',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Gestational diabetes mellitus',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Heavy bleeding',
                                value: 'value',
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
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Macrosomia',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Perineal tear (3rd or 4th degree)',
                                value: 'value',
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
                            selectedValue: ''
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
                                name: 'Other',
                                value: 'otherInfo',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
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
                                        inputHeader: 'specify',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: '',
                                        name: 'otherC',
                                        required: true,
                                        eventType: 'input',
                                        inputWidth: "85%",
                                    },

                                ]
                            }
                        ]
                    },
            },


        ] as any, 
       
    }),
    actions:{
        setPrevPregnancies(data: any){
            this.prevPregnancies = data
        },
        setPreterm(data: any){
            this.preterm = data
        },
        setAbnormalities(data: any){
            this.abnormalities = data
        },
        setModeOfDelivery(data:any) {
            this.modeOfDelivery = data
        },
        setComplications(data:any) {
            this.Complications = data
        },
      
    },
    // persist:true,

})