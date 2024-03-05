import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useIntimatePartnerStore = defineStore ('intimatePartnerStore', {
    state: () => ({
        ipv:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Intimate partner firstlline support provided?', 
                        selectedValue: '',
                        name:'intimateInfo'
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
        // ],

        // ipvReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason IPV firstline support not done',
                        selectedValue: '',
                        name:'reasonIPV',
                        displayNone:true,
                    },
                    data:[
                        {
                            name: 'Client was referred',
                            value: 'client_referred',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Trained provided unavailable',
                            value: 'trained',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Private/safe space unavailable',
                            value: 'safe_space',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Confidentiality could not be assured',
                            value: 'confidentiality',
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
                            
                                inputHeader: 'specify',
                                value: '',
                                name: 'other',
                                icon: icons.editPen,
                                required: true,
                                eventType: 'input',
                                inputWidth: "85%",
                                alertsError: false,
                                alertsErrorMassage: ''
                        }]
                    }]
                   } 
            },
        ],

        additionalCare:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'What additional care provided?', 
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'No action necessary',
                            value: 'no_action',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Safety assessment conducted',
                            value: 'safety',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Mental health care',
                            value: 'mental_health_care',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Care for other presenting signs and symptoms',
                            value: 'signs_and_symptoms',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Client was referred',
                            value: 'client_referred',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ],

        safety_assessment:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Safety assessment conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'y',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },],

        physical_violence:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Has the physical violence happened more often or gotten worse over the past 6 months?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'y',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },],

            beaten_pregnant:[
                {
                    selectdData: [],
                    isFinishBtn: false,
                    classDash: 'dashed_bottom_border _padding',
                    radioBtnContent:
                    {
                        header:{
                            title: 'Has he ever beaten you when you were pregnant?',
                            selectedValue: ''
                        },
                        data:[
                            {
                                name: 'Yes',
                                value: 'y',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                            {
                                name: 'No',
                                value: 'n',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between',
                            },
                        ]
                    }
                        
                },],

                woman_threatened:[
                    {
                        selectdData: [],
                        isFinishBtn: false,
                        classDash: 'dashed_bottom_border _padding',
                        radioBtnContent:
                        {
                            header:{
                                title: 'Has he ever threatened you with a weapon?',
                                selectedValue: ''
                            },
                            data:[
                                {
                                    name: 'Yes',
                                    value: 'y',
                                    labelPlacement: 'start',
                                    colSize: '7',
                                    justify: 'space-between',
                                },
                                {
                                    name: 'No',
                                    value: 'n',
                                    labelPlacement: 'start',
                                    colSize: '7',
                                    justify: 'space-between',
                                },
                            ]
                        }
                            
                    },],

                    constant_jealous:[
                        {
                            selectdData: [],
                            isFinishBtn: false,
                            classDash: 'dashed_bottom_border _padding',
                            radioBtnContent:
                            {
                                header:{
                                    title: 'Is he violently and constantly jealous of you?',
                                    selectedValue: ''
                                },
                                data:[
                                    {
                                        name: 'Yes',
                                        value: 'y',
                                        labelPlacement: 'start',
                                        colSize: '7',
                                        justify: 'space-between',
                                    },
                                    {
                                        name: 'No',
                                        value: 'n',
                                        labelPlacement: 'start',
                                        colSize: '7',
                                        justify: 'space-between',
                                    },
                                ]
                            }
                                
                        },],

                        strangling:[
                            {
                                selectdData: [],
                                isFinishBtn: false,
                                classDash: 'dashed_bottom_border _padding',
                                radioBtnContent:
                                {
                                    header:{
                                        title: 'Has he ever tried to strangle you?',
                                        selectedValue: ''
                                    },
                                    data:[
                                        {
                                            name: 'Yes',
                                            value: 'y',
                                            labelPlacement: 'start',
                                            colSize: '7',
                                            justify: 'space-between',
                                        },
                                        {
                                            name: 'No',
                                            value: 'n',
                                            labelPlacement: 'start',
                                            colSize: '7',
                                            justify: 'space-between',
                                        },
                                    ]
                                }
                                    
                            },],

                            murder_threat:[
                                {
                                    selectdData: [],
                                    isFinishBtn: false,
                                    classDash: 'dashed_bottom_border _padding',
                                    radioBtnContent:
                                    {
                                        header:{
                                            title: 'Do you believe he could kill you?',
                                            selectedValue: ''
                                        },
                                        data:[
                                            {
                                                name: 'Yes',
                                                value: 'y',
                                                labelPlacement: 'start',
                                                colSize: '7',
                                                justify: 'space-between',
                                            },
                                            {
                                                name: 'No',
                                                value: 'n',
                                                labelPlacement: 'start',
                                                colSize: '7',
                                                justify: 'space-between',
                                            },
                                        ]
                                    }
                                        
                                },],
                                referrals:[
                                    {
                                        selectdData: [],
                                        isFinishBtn: false,
                                         sectionHeader: '',
                                        classDash: 'dashed_bottom_border ',
                                        checkboxBtnContent:
                                        {
                                            header:{
                                                title: '',
                                                selectedValue: ''
                                            },
                                            data:[
                                                {
                                                    name: 'Care at another facility',
                                                    value: 'care_at_facility',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                                {
                                                    name: 'Crisis intervention or counselling',
                                                    value: 'crisis',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                            ]
                                        }
                                            
                                    },
                                    {
                                        selectdData: [],
                                        isFinishBtn: false,
                                         sectionHeader: '',
                                        classDash: 'dashed_bottom_border ',
                                        checkboxBtnContent:
                                        {
                                            header:{
                                                title: '',
                                                selectedValue: ''
                                            },
                                            data:[
                                                {
                                                    name: 'Police',
                                                    value: 'police',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                                {
                                                    name: 'Shelter or housing',
                                                    value: 'shelter',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                            ]
                                        }
                                            
                                    },
                                    {
                                        selectdData: [],
                                        isFinishBtn: false,
                                         sectionHeader: '',
                                        classDash: 'dashed_bottom_border ',
                                        checkboxBtnContent:
                                        {
                                            header:{
                                                title: '',
                                                selectedValue: ''
                                            },
                                            data:[
                                                {
                                                    name: 'Shelter or housing',
                                                    value: 'legal_aid',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                                {
                                                    name: 'Child protection',
                                                    value: 'protection',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                            ]
                                        }
                                            
                                    },

                                    {
                                        selectdData: [],
                                        isFinishBtn: false,
                                        classDash: 'dashed_bottom_border ',
                                         sectionHeader: '',
                                        checkboxBtnContent:
                                        {
                                            header:{
                                                title: '',
                                                selectedValue: ''
                                            },
                                            data:[
                                                {
                                                    name: 'Livelihood support',
                                                    value: 'police',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                                {
                                                    name: 'Other',
                                                    value: 'other',
                                                    labelPlacement: 'start',
                                                    colSize: '6',
                                                    justify: 'space-between',
                                                },
                                            ]
                                        }
                                            
                                    },
                                    {
                                        selectdData: [],
                                        isFinishBtn: false,
                                        classDash: 'dashed_bottom_border ',
                                         sectionHeader: '',
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
                                                                name: 'Specify',
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
        setIPV(data:any){
            this.ipv = data
        },
        // setIPVReason(data:any){
        //     this.ipvReason = data
        // },
        setAddCare(data:any){
            this.additionalCare = data
        },
        setSafety(data:any){
            this.safety_assessment = data
        },
        setViolence(data:any){
            this.physical_violence = data
        },
        setBeaten(data:any){
            this.beaten_pregnant = data
        },
        setThreatened(data:any){
            this.woman_threatened = data
        },
        setJealous(data:any){
            this.constant_jealous = data
        },
        setStrangling(data:any){
            this.strangling = data
        },
        setThreat(data:any){
            this.murder_threat = data
        },
        setReferral(data:any){
            this.referrals = data
        },
    },
    persist:true
})