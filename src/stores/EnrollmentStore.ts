import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useEnrollementStore = defineStore('enrollementStore',{
    state: () => ({
        substance:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Smoking',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Smoking',
                            value: 'smoking'
                        },
                        {
                            name: 'Never',
                            value: 'never',
                        },
                        {
                            name: 'Stopped',
                            value: 'stopped',
                        }
                    ]
                }
                    
            },
            {
                radioBtnContent:
                {
                    header:{
                        title: 'Drinking alcohol',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Drinking',
                            value: 'drinking'
                        },
                        {
                            name: 'Never',
                            value: 'never'
                        },
                        {
                            name: 'Stopped',
                            value: 'stopped'
                        }
                    ]
                }
                    
            }
                
        ],
        diagnosis: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: '',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Type 1 DM',
                            value: 'type_1',
                            checked: false
                        }
                    ],
                    inputFields:[
                        {
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            value: '',
                            eventType: 'input'
                        }
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
                            name: 'Type 2 DM',
                            value: 'type_2',
                            checked: false
                        }
                    ],
                    inputFields:[
                        {
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            value: '',
                            eventType: 'input'
                        }
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
                            name: 'Hypertetion',
                            value: 'hypertetion',
                            checked: false
                        }
                    ],
                    inputFields:[
                        {
                            icon: icons.calenderPrimary,
                            placeholder: 'Pick the date',
                            value: '',
                            eventType: 'input'
                        }
                    ]
                }
                    
            }
                
        ],
        patientHistory: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: 'HIV',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'P',
                            value: 'P',
                            checked: false
                        },
                        {
                            name: 'NR',
                            value: 'NR',
                            checked: false
                        }
                    ]
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'ART Stat date:',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header:{
                        title: 'TB',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Smear pos',
                            value: 'Smear pos',
                            checked: false
                        }
                    ]
                }
                    
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Smear neg',
                            value: 'Smear neg',
                            checked: false
                        }

                    ]
                }
                    
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'EPTB',
                            value: 'EPTB',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Never had TB',
                            value: 'Never had TB',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Cardiovascular desease',
                            value: 'Smear',
                            example: 'eg. heart attack, ischemic heart desease, CCF',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Retinopathy',
                            value: 'Retinopathy',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Renal disease',
                            value: 'Renal disease',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Stroke/TIA',
                            value: 'Stroke/TIA',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'PVD',
                            example: 'eg. ulcers, gangrene',
                            value: 'PVD',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Neuropathy',
                            value: 'Neuropathy',
                            checked: false
                        }
                    ]
                }
            },
            {
                checkboxBtnContent:
                {
                    data:[
                        {
                            name: 'Sexual dysfunction',
                            value: 'Sexual dysfunction',
                            checked: false
                        }
                    ]
                }
            }
                
        ],
        familyHistory: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Diabetes',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes'
                        },
                        {
                            name: 'No',
                            value: 'No',
                        },
                        {
                            name: 'Unknown',
                            value: 'Unknown',
                        }
                    ]
                }
                    
            },
            {
                radioBtnContent:
                {
                    header:{
                        title: 'Hypertension',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes'
                        },
                        {
                            name: 'No',
                            value: 'No'
                        },
                        {
                            name: 'Unknown',
                            value: 'Unknown'
                        }
                    ]
                }
                    
            }  
        ],
        NCDNumber: [
            {
                selectdData: [],
                isFinishBtn: false,
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    icon: icons.fullName,
                                    iconRight:icons.editStarts,
                                    value: '',
                                    placeholder: "__-__-__-__",
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            }
                
        ]
    }),
    actions:{
        setSubstance(data: any){
            this.substance = data
        },
        setDiagnosis(data: any){
            this.diagnosis = data
        },
        setPatientHistory(data: any){
            this.patientHistory = data
        },
        setFamilyHistory(data: any){
            this.familyHistory = data
        },
        setNCDNumber(data: any){
            this.NCDNumber = data
        }
    },
    persist:true,

})