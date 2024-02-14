import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore('diagnosisStore',{
    state : () => ({
        hypertensionReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason counselling on hypertension not provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Stockout',
                            value: 'required',
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
                            
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'hypertensionCounselling',
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


        hivReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason counselling on HIV not provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Stockout',
                            value: 'required',
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
                            
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'hivCounselling',
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

        hepatitisReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason counselling on Hepatitis B not provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Stockout',
                            value: 'required',
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
                            
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'hypertensionCounselling',
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
   
        asbReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason seven-day antibiotic regimen for asymptomatic bacteriuria (ASB) not provided',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Stockout',
                            value: 'required',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'Other',
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '9',
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
                            
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'hypertensionCounselling',
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

        diagnoses:[
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
                                name: 'Hypertension',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Pre-eclampsia',
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
                                name: 'HIV',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Hepatitis B',
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
                                name: 'Hepatitis C',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },
                            {
                                name: 'Syphilis',
                                value: 'value',
                                checked: false,
                                labelPlacement: 'start',
                                colSize: '6',
                                justify: 'space-between',
                            },

                        ]
                    }

            },
        ] as any, 

        hypertension:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Has client developed severe hypertension?',
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
        ] as any,

        preEclampsia:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Does the patient have severe pre-eclampsia with severe features?',
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
        ] as any,

        hyper:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling conducted on hypertension?',
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
        ] as any,

        hiv:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on HIV positive conducted?',
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
        ] as any,

        hepatitisB:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on Hepatitis B conducted?',
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
        ] as any,

        hepatitisC:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on Hepatitis C conducted?',
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
        ] as any,

        syphilis:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on Syphilis conducted?',
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
        ] as any,

        syphilisTesting:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on Syphilis conducted?',
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
        ] as any,

        tbScreening:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on TB screening conducted?',
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
        ] as any,


        ASB:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Seven-day antibiotic regemen for asymptomatic bacteriuria (ASB) provided?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'No',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ] as any,

        GDM:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on gestational diabetes mellitus (GDM)?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'No',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ] as any,
        diabetes:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on diabetes mellitus conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'No',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ] as any,
        anaemia:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling on anaemia conducted?',
                        selectedValue: ''
                    },
                    data:[
                        {
                            name: 'Yes',
                            value: 'Yes',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                        {
                            name: 'No',
                            value: 'No',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        ] as any,
        
        
    }),

    actions:{
        setDiagnoses(data:any) {
            this.diagnoses = data
        },
        setHIVReason(data:any) {
            this.hivReason = data
        },
        setHypertensionReason(data:any) {
            this.hypertensionReason = data
        },
        setHepatitisReason(data:any) {
            this.hepatitisReason = data
        },
        setASBReason(data:any) {
            this.asbReason = data
        },
        setHypertension(data:any) {
            this.hypertension = data
        },
        setPreEclampsia(data:any) {
            this.preEclampsia = data
        },
        setHyper(data:any) {
            this.hyper = data
        },
        setHIV(data:any) {
            this.hiv = data
        },
        setHepatitisB(data:any) {
            this.hepatitisB = data
        },
        setHepatitisC(data:any) {
            this.hepatitisC = data
        },
        setSyphilis(data:any) {
            this.syphilis = data
        },
        setSyphilisTesting(data:any) {
            this.syphilisTesting = data
        },
        setTBscreening(data:any) {
            this.tbScreening = data
        },
        setASB(data:any) {
            this.ASB = data
        },
        setGDM(data:any) {
            this.GDM = data
        },
        setDiabetes(data:any) {
            this.diabetes = data
        },
        setAnaemia(data:any) {
            this.anaemia = data
        },
    },
    persist: true,


})