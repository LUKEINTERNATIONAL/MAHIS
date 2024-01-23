import { defineStore } from 'pinia'
import HisDate from "@/utils/Date";

export const useNextAppointmentStore = defineStore('nextAppointmentStore',{
    state: () => ({
        nextAppointment: HisDate.currentDate() as any
    }),
    actions:{
        setNextAppointment(data: any){
            this.nextAppointment = data
        }
    },
    persist:true,

})