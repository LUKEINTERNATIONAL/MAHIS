import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDiagnosisStore = defineStore('diagnosisStore',{
    state : () => ({
        hypertension: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'hypertension',
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
        preEclampsia: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'preEclampsia',
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
        hiv: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'hiv',
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
        hepatitisB: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'hepatitisB',
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
        hepatitisC: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'hepatitisC',
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
        tbScreening: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'tbScreening',
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
        syphilis: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Diagnosis result',
                            value: '',
                            name: 'syphilis',
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
        hypertensionCounselling: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'hypertensionCounselling',
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
        hivCounselling: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'hivCounselling',
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
        hepatitisBCounselling: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'hepatitisBCounselling',
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
        ASBcounselling: [
            {
               data:{
                rowData: [{
                    colData: [{
                        
                            inputHeader: 'Other (Specify)',
                            value: '',
                            name: 'ASBcounselling',
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
        setHypertension(data:any) {
            this.hypertension = data
        },
        setPreEclampsia(data:any) {
            this.preEclampsia = data
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
        setTBScreening(data:any) {
            this.tbScreening = data
        },
        setSyphilis(data:any) {
            this.syphilis = data
        },
        setHIVCounselling(data:any) {
            this.hivCounselling = data
        },
        setHypertensionCounselling(data:any) {
            this.hypertensionCounselling = data
        },
        setHepatitisBcounselling(data:any) {
            this.hepatitisBCounselling = data
        },
        setASBcounselling(data:any) {
            this.ASBcounselling = data
        },
    },
    persist: true,


})