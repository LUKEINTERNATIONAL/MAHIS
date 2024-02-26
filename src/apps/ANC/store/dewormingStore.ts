import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDewormingStore = defineStore ('dewormingStore', {
    state: () => ({
        treatment:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Was preventative antihelminthic treatment provided?', 
                        selectedValue: '',
                        name:'preventive'
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

        // treatmentType:[
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent:
                {
                    header:{
                        title: 'Preventative antihelminthic treatment provided', 
                        selectedValue: '',
                        name:'treatInfo',
                        displayNone:true
                    },
                    data:[
                        {
                            name: 'Single-dose albendazole 400mg',
                            value: 'single',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                        {
                            name: 'Single-dose albendazole 500mg',
                            value: 'n',
                            labelPlacement: 'start',
                            colSize: '7',
                            justify: 'space-between',
                        },
                    ]
                }
                    
            },
        // ],

        // treatmentReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason no preventative treatment provided',
                        selectedValue: '',
                        name:'reason',
                        displayNone:true
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
                                 
                                displayNone:true,
                                inputHeader: 'specify',
                                value: '',
                                name: 'Specify',
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


        malaria:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border _padding',
                radioBtnContent:
                {
                    header:{
                        title: 'Was preventative antihelminthic treatment provided?', 
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

        malariaReason:[
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: '',
                radioBtnContent:
                {
                    header:{
                        title: 'Reason no counselling on malaria prevention was not conducted',
                        selectedValue: ''
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
        setTreatment(data:any){
            this.treatment = data
        },
        setTreatmentType(data:any){
            this.treatmentType = data
        },
        setTreatmentReason(data:any){
            this.treatmentReason = data
        },
        setMalaria(data:any){
            this.malaria = data
        },
        setMalariaReason(data:any){
            this.malariaReason = data
        },
    },
    persist:true
})