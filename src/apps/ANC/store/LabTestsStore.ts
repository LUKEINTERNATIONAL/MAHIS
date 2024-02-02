import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useLabTestsStore = defineStore ('labTestsStore', {
    state: () => ({
        ultrasoundDate :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Ultrasound Scan Date',
                                value: '',
                                name: 'USD',
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
        otherReason: '' as string,
    }),
    actions:{
        setUltrasoundDate(data:any){
            this.ultrasoundDate = data
        },
        setOtherReason(value:string){
            this.otherReason = value
        },
        getOtherReason(){
            return this.otherReason
        }
    },
    persist:true
})