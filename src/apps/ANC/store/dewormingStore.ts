import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useDewormingStore = defineStore ('dewormingStore', {
    state: () => ({
        preventativeTreatment :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Other (specify)',
                                value: '',
                                name: 'preventativeTreatment',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                isDatePopover: true,
                                icon: icons.editPen,
                                placeholder: '',
                            },
                            
                        ],
                        
                    },
               
    
                ],
            
            },
                    
        }] as any,
        malaria :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Other (specify)',       
                                value: '',
                                name: 'malaria',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                isDatePopover: true,
                                icon: icons.editPen,
                                placeholder: '',
                            },
                            
                        ],
                        
                    },
               
    
                ],
            
            },
                    
        }] as any,
    }),
    actions:{
        setPreventativeTreatment(data:any){
            this.preventativeTreatment = data
        },
        setMalaria(data:any){
            this.malaria = data
        },
    },
    persist:true
})