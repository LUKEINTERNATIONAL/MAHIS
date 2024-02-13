import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useUrgentReferralStore = defineStore ('urgentReferralStore', {
    state: () => ({
        referral :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Other (specify)',
                                value: '',
                                name: 'referral',
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
        otherReason: '' as string,
    }),
    actions:{
        setReferral(data:any){
            this.referral = data
        },
    },
    persist:true
})