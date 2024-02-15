import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationStore = defineStore ('immunizationStore', {
    state: () => ({
            ttDoses:[
                {
                    selectdData: [],
                    isFinishBtn: false,
                    classDash: 'dashed_bottom_border _padding',
                    radioBtnContent:
                    {
                        header:{
                            title: 'Did the client complete Tetanus Toxoid (TT) doses before?', 
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
                        
                },
            ],


        tt1:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Teatanus Toxoid (TT) 1',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'TT 1 Date',
                                value: '',
                                name: 'tt1Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        tt2:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Teatanus Toxoid (TT) 2',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'TT 2 Date',
                                value: '',
                                name: 'tt2Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        tt3:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Teatanus Toxoid (TT) 3',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'TT 3 Date',
                                value: '',
                                name: 'tt3Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        tt4:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Teatanus Toxoid (TT) 4',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'TT 4 Date',
                                value: '',
                                name: 'tt4Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        tt5:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Teatanus Toxoid (TT) 5',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'TT 5 Date',
                                value: '',
                                name: 'tt5Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        ttReason:[
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
                            
                                inputHeader: 'Other (Specify)',
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
        
        HepBCounselling:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Counselling conducted on Hep B negative', 
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
                    
            },
        ],
        HepB1:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Hepatitis B-1',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'Hep B-1 Date',
                                value: '',
                                name: 'hep1Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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
        HepB2:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Hepatitis B-2',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'Hep B-2 Date',
                                value: '',
                                name: 'hep2Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        HepB3:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Hepatitis B-3',
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
                    
            },
            {
                isFinishBtn: false,
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:{
                    rowData: [{
                        colData: [{
                            
                                inputHeader: 'Hep B-3 Date',
                                value: '',
                                name: 'hep2Date',
                                isDatePopover: true,
                                icon: icons.calenderPrimary,
                                placeholder: 'Pick the date',
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

        hepBReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason Hepatitis B vaccination not conducted',
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
                            value: 'client_refused',
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
                            
                                inputHeader: 'Other (Specify)',
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
        
    }),
    actions:{
        setTTDoses(data:any){
            this.ttDoses = data
        },
        setTT1(data:any){
            this.tt1 = data
        },
        setTT2(data:any){
            this.tt2 = data
        },
        setTT3(data:any){
            this.tt3 = data
        },
        setTT4(data:any){
            this.tt4 = data
        },
        setTT5(data:any){
            this.tt5 = data
        },
        setTTReason(data:any){
            this.ttReason = data
        },
        setHepB1(data:any){
            this.HepB1 = data
        },
        setHepB2(data:any){
            this.HepB2 = data
        },
        setHepB3(data:any){
            this.HepB3 = data
        },
        setHepBReason(data:any){
            this.hepBReason = data
        },
    },
    persist:true
})