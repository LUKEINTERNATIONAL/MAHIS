import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useUrineTestStore = defineStore ("urineTestingStore", {
    state: ()=> ({
        stockOut: false as boolean,
        expiredTests: false as boolean,
        otherReason: '' as string,
        testDate :[{
            isFinishBtn: false,
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'Urine Test Date',
                                value: '',
                                name: 'UTD',
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
                    
        }]



    }),

    actions: {
        setStockout(value: boolean){
            this.stockOut = value
        },
        setExpiredTests(value: boolean){
            this.expiredTests = value
        },
        setReason(value: string){
            this.otherReason = value
        },
        getReason() {
            return this.otherReason
        },
        setDate(value: any){
            this.testDate = value
        },

    },
    persist:true,
    
})
