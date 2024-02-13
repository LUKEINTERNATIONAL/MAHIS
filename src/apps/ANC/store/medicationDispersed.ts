import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useMedicationDispersedStore = defineStore ('medicationDispersed', {
    state: () => ({
        iron :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Amount of Iron prescribed',
                            value: '',
                            name: 'iron',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                          
        }] as any,

        dailyFolicAcid :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Amount of folic acid prescribed',
                            value: '',
                            name: 'dailyFolicAcid',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                          
        }] as any,

        folicAcid :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Reason iron and folic acid not prescribed',
                            value: '',
                            name: 'iron',
                            required: true,
                            icon: icons.editPen,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                          
        }] as any,

        vitaminA :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Reason vitamin A not prescribed',
                            value: '',
                            name: 'iron',
                            required: true,
                            icon: icons.editPen,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                          
        }] as any,

        dailyCalcium :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Amount of daily calcium supplements',
                            value: '',
                            name: 'dailyCalcium',
                            required: true,
                            eventType: 'input',
                            alertsError: false,
                            alertsErrorMassage: ''
                    }]
                }]
               } 
                          
        }] as any,

        calcium :[{
            data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Reason calcium supplements not prescribed',
                            value: '',
                            name: 'dailyCalcium',
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
        setIron(data:any) {
            this.iron = data
        },
        setDailyFolicAcid(data:any) {
            this.dailyFolicAcid = data
        },
        setFolicAcid(data:any) {
            this.folicAcid = data
        },
        setVitaminA(data:any) {
            this.vitaminA = data
        },
        setDailyCalcium(data:any) {
            this.dailyCalcium = data
        },
        setCalcium(data:any) {
            this.calcium = data
        }



    },
    persist:true
})