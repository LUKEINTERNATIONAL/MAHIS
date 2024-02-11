import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useIntimatePartnerStore = defineStore ('intimatePartnerStore', {
    state: () => ({
        IPV :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'IPV',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                isDatePopover: true,
                                placeholder: '',
                            },
                            
                        ],
                        
                    },
               
    
                ],
            
            },
                    
        }] as any,

        referrals :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Other (Specify)',
                                value: '',
                                name: 'IPV',
                                required: true,
                                eventType: 'input',
                                alertsError: false,
                                alertsErrorMassage: '',
                                icon:icons.editPen,
                                isDatePopover: true,
                                placeholder: '',
                            },
                            
                        ],
                        
                    },
               
    
                ],
            
            },
                    
        }] as any,
    }),
    actions:{
        setIPV(data:any){
            this.IPV = data
        },
        setReferrals(data:any){
            this.referrals = data
        },
    },
    persist:true
})