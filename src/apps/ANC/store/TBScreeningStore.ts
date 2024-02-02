import { defineStore } from "pinia";
import { icons } from "@/utils/svg";

export const useTBScreeningStore = defineStore('TBScreeningStore',{
    state: () => ({
        Sputum: false as boolean,
        SputumCulture: false as boolean,
        GeneXpert: false as boolean,
        xRay: false as boolean,
        sputumTesting: false as boolean,
        Machine: false as boolean,
        Technician: false as boolean,
        otherReason: '' as string,
        screeningDate :[{
            isFinishBtn: false,
            classDash: 'dashed_bottom_border _padding',
            data:
            { 
                rowData:[
                    {
                        colData: [
                            {
                                inputHeader: 'TB Screening Date',
                                value: '',
                                name: 'TBD',
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
    actions:{
        setSputum(value: boolean){
            this.Sputum = value
        },
        setCulture(value: boolean){
            this.SputumCulture = value
        },
        setGeneXpert (value: boolean){
            this.GeneXpert = value
        },
        setxRay(value: boolean){
            this.xRay = value
        },
        setTesting(value: boolean){
            this.sputumTesting = value
        },
        setMachine(value: boolean){
            this.Machine = value
        },
        setTechnician(value: boolean){
            this.Technician = value
        },
        setReason(value: string){
            this.otherReason = value
        },
        getReason() {
            return this.otherReason
        },
        setDate(value: any){
            this.screeningDate = value
        },
    },
    persist:true,

})
