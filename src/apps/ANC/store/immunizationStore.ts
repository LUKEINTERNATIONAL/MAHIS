import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useImmunizationStore = defineStore ('immunizationStore', {
    state: () => ({
        tt1Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TT 1 Date',
                                value: '',
                                name: 'tt1Date',
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
                    
        }] as any,
        tt2Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TT 2 Date',
                                value: '',
                                name: 'tt2Date',
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
                    
        }] as any,
        tt3Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TT 3 Date',
                                value: '',
                                name: 'tt3Date',
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
                    
        }] as any,
        tt4Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TT 4 Date',
                                value: '',
                                name: 'tt4Date',
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
                    
        }] as any,
        tt5Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TT 5 Date',
                                value: '',
                                name: 'tt5Date',
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
                    
        }] as any,
        ttReason: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'ttReason',
                            icon: icons.editPen,
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
            }
        ] as any,
        
        hepB1Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Hep B-1 Date',
                                value: '',
                                name: 'hepB1Date',
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
                    
        }] as any,
        hepB2Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Hep B-2 Date',
                                value: '',
                                name: 'hepB2Date',
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
                    
        }] as any,
        hepB3Date :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Hep B-3 Date',
                                value: '',
                                name: 'hepB3Date',
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
                    
        }] as any,

        hepBReason: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'hepBReason',
                            icon: icons.editPen,
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
            }
        ] as any,
        
    }),
    actions:{
        setTT1Date(data:any){
            this.tt1Date = data
        },
        setTT2Date(data:any){
            this.tt2Date = data
        },
        setTT3Date(data:any){
            this.tt3Date = data
        },
        setTT4Date(data:any){
            this.tt4Date = data
        },
        setTT5Date(data:any){
            this.tt5Date = data
        },
        setTTReason(data:any){
            this.ttReason = data
        },
        setHepB1Date(data:any){
            this.hepB1Date = data
        },
        setHepB2Date(data:any){
            this.hepB2Date = data
        },
        setHepB3Date(data:any){
            this.hepB3Date = data
        },
        setHepBReason(data:any){
            this.hepBReason = data
        },
    },
    persist:true
})