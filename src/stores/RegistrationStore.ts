import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useRegistrationStore = defineStore('registrationStore',{
    state: () => ({
        personInformation:[
            {
                selectdData: [],
                isFinishBtn: false,
                data:
                    { 
                        rowData:[
                            {
                                colData:[
                                    {
                                        inputHeader: 'National ID',
                                        iconRight: icons.scannerIcon,
                                        icon: icons.nationalID,
                                        value: '',
                                        name: 'nationalID',
                                        eventType: 'input',
                                        required: true,
                                        placeholder: "__-__-__-__"
                                    }
                                    
                                ]
                            }
                        ],
                        
                    }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'First name*',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'firstname',
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Last name*',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'lastname',
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Middle name',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'middleName',
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Phone number',
                                    icon: icons.phone,
                                    value: '',
                                    name: 'phoneNumber',
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Date of birth/Estimated age*',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'birthdate',
                                    eventType: 'input',
                                    required: true
                                }
                                
                            ]
                        }
                    ],
                    
                },
                radioBtnContent:
                    {
                        header:{
                            title: 'Gender*',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Male',
                                value: 'M'
                            },
                            {
                                name: 'Female',
                                value: 'F',
                            }
                        ]
                }
                    
            }
                
        ],
        socialHistory: [
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:{
                    header:{
                        title: 'Marital status',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Single',
                            value: 'single'
                        },
                        {
                            name: 'Married',
                            value: 'married',
                        },
                        {
                            name: 'Widow',
                            value: 'widow',
                        },
                        {
                            name: 'Divorced',
                            value: 'divorced',
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
                                    inputHeader: 'Religion',
                                    icon: icons.search,
                                    value: '',
                                    placeholder: 'eg. Christian',
                                    eventType: 'input'
                                }
                                
                            ]
                        }
                    ],
                    
                },
                radioBtnContent:
                    {
                        header:{
                            title: 'Occupation status',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Employed',
                                value: 'employed'
                            },
                            {
                                name: 'Unemployed',
                                value: 'unemployed',
                            }
                        ],
                        inputFields:[
                            {
                                icon: icons.search,
                                placeholder: 'Select Occupation',
                                value: '',
                                eventType: 'input'
                            }
                        ]
                }
                    
            }
                
        ],
        homeLocation: [
            {
                selectdData: [],
                isFinishBtn: false,
                data:
                    { 
                        rowData:[
                            {
                                colData:[
                                    {
                                        inputHeader: 'Home district',
                                        icon: icons.search,
                                        value: '',
                                        eventType: 'input',
                                    }
                                    
                                ]
                            }
                        ],
                        
                    }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Home village',
                                    icon: icons.search,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Home traditional authority',
                                    icon: icons.search,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            }
                
        ],
        currentLocation: [
            {
                selectdData: [],
                isFinishBtn: false,
                data:
                    { 
                        rowData:[
                            {
                                colData:[
                                    {
                                        inputHeader: 'Current district',
                                        icon: icons.search,
                                        value: '',
                                        eventType: 'input',
                                    }
                                    
                                ]
                            }
                        ],
                        
                    }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Current village',
                                    icon: icons.search,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Current traditional authority',
                                    icon: icons.search,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Closest landmark/Plotnumber',
                                    icon: icons.search,
                                    value: '',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            }
                
        ],
        guardianInformation: [
            {
                selectdData: [],
                isFinishBtn: false,
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'First name*',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'firstname',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Last name*',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'lastname',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Middle name',
                                    icon: icons.fullName,
                                    value: '',
                                    name: 'middleName',
                                    eventType: 'input',
                                }
                                
                            ]
                        }
                    ],
                    
                }
                    
            },
            {
                data:{ 
                    rowData:[
                        {
                            colData:[
                                {
                                    inputHeader: 'Phone number eunice',
                                    icon: icons.phone,
                                    value: '',
                                    name: 'phoneNumber',
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
        setPersonalInformation(data: any){
            this.personInformation = data
        },
        setSocialHistory(data: any){
            this.socialHistory = data
        },
        setHomeLocation(data: any){
            this.homeLocation = data
        },
        setCurrentLocation(data: any){
            this.currentLocation = data
        },
        setGuardianInformation(data: any){
            this.guardianInformation = data
        }
    },
    persist:true,

})