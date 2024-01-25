import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useComplicationsStore = defineStore('complicationsStore',{
    state: () => ({
        FootScreening:[
            {
                selectdData: [],
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Physical Exam',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
                        },
                        {
                            name: 'Left foot',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
                        },
                        {
                            name: 'Right foot',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
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
                            name: 'Previous Ulcer',
                            value: 'previousUlcer',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'type_2',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Previous Amputation',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Deformity',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Ingrown toenail',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Absent Pedal Pulses',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
                    ]
                }
                    
            },
            {
                selectdData: [],
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Foot Lesions',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
                        },
                        {
                            name: 'Left foot',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
                        },
                        {
                            name: 'Right foot',
                            labelPlacement: 'start',
                            colSize: '4',
                            justify: 'space-between',
                            header: true
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
                            name: 'Active Ulcer',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Blisters',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Calluses',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
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
                            name: 'Fissure/Linear Crack',
                            value: 'value',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '5',
                            justify: 'space-between'
                        },
                        {
                            value: 'value',
                            checked: false,
                            colSize: '4',
                            justify: 'end'
                        }
                    ]
                }
                    
            },
            {
                sectionHeader: 'Neuropathy/Monofilament Exam',
                sectionHeaderFontWeight: 400,
                data:
                    { 
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Negative piprics (left foot)',
                                        value: '',
                                        name: 'Temp',
                                        eventType: 'blur'
                                    },
                                    {
                                        inputHeader: 'Negative pinprics (right foot)',
                                        value: '',
                                        name: 'Pulse',
                                        eventType: 'blur'
                                    }
                                ]
                            }
                        ]
                    }
            }
                
        ] as any
    }),
    actions:{
        setPersonalInformation(data: any){
            this.FootScreening = data
        }
    },
    persist:true,

})