import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisCounsellingStore = defineStore ('diagnosisCounsellingStore', {
    state: () => ({
        dailyAspirin:[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Amount of daily aspirin provided until delivery',
                            value: '',
                            name: 'dailyAspirin',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                    
        }] as any,
        aspirin:[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Reason aspirin not prescribed',
                            value: '',
                            name: 'aspirin',
                            required: true,
                            icon: icons.editPen,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                    
        }] as any,

        PrEP:[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Reason PrEP for HIV prevention not provided',
                            value: '',
                            name: 'PrEP',
                            required: true,
                            icon: icons.editPen,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                    
        }] as any,

        dailyPrEP:[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Amount of PrEP provided',
                            value: '',
                            name: 'dailyPrEP',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                    
        }] as any,

        birthPlace:[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'birthPlace',
                            required: true,
                            icon: icons.editPen,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                    
        }] as any,
    }),
    actions:{
        setDailyAspirin(data:any){
            this.dailyAspirin = data
        },
        setAspirin(data:any){
            this.aspirin = data
        },
        setPrEP(data:any){
            this.PrEP = data
        },
        setDailyPrEP(data:any){
            this.dailyPrEP = data
        },
        setBirthPlace(data:any){
            this.birthPlace = data
        },
    },
    persist:true
})