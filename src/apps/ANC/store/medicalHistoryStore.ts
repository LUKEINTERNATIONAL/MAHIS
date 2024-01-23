import { defineStore } from 'pinia'
export const useMedicalHistoryStore = defineStore('medicalHistoryStore',{
    state: () => ({
    medicalHistory:[  
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
                            name: 'Dilation and currettage',
                            value: 'dilation',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Myomectomy',
                            value: 'myomectomy',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Removal of ovarian cystst',
                            value: 'removelOfOvarianCystst',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Oophorectomy',
                            value: 'oophorectomy',
                            checked: false
                        }
                        
                    ],
                },
                    
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
                            name: 'Salpingectomy',
                            value: 'salpingectomy',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Cervical cone',
                            value: 'cervicalCone',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],
     allegies:[  
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
                            name: 'Albendazole',
                            value: 'albendazole',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Aluminium hydroxide',
                            value: 'aluminiumHydroxide',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Calcium',
                            value: 'calcium',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Chamomile',
                            value: 'chamomile',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Folic acid',
                            value: 'folicAcid',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Ginger',
                            value: 'ginger',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Fish',
                            value: 'fish',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Iron',
                            value: 'iron',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Malaria medication(sulfadoxine-pyrimethamine)',
                            value: 'malariaMedication',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Mebendazole',
                            value: 'mebendazole',
                            checked: false
                        }
                        
                    ],
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
                            name: 'Penicillin',
                            value: 'penicillin',
                            checked: false
                        }
                        
                    ],
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
                            name: 'PrEP tenofovir disoproxil fumarate(TDF)',
                            value: 'prep',
                            checked: false
                        }
                        
                    ],
                }
                    
        },
    ],

    }),
    actions:{
         addMedicalHistory(data:any){
            this.medicalHistory = data
         },
        addAllegies(data:any){
            this.allegies = data
        },
    },
    persist:true
});