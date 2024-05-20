import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import { combineArrays } from "@/utils/GeneralUti"

export const useClinicalDaysStore = defineStore('ClinicalDaysStore', {
    state: () => ({
        holidayDates: [] as any,
    }),
    actions:{
        setSelectedMedicalDrugsList(data: any) {
            this.holidayDates = data
        },
        getHolidaydates() {
            return this.holidayDates
        },
        getHolidaydatesDataSize() {
            return this.holidayDates.length
        },
        generateDisabledDates(): Date[] {
            const disabledDates: Date[] = this.holidayDates
                .map((dateString: string) => new Date(dateString))
        
            return disabledDates;
        },
        getDays(day: number): Date[] {
            const startDate = new Date("1900-01-01");
            const endDate = new Date("2030-01-01");
            const saturdays: Date[] = [];
            const currentDate = new Date(startDate);
        
            while (currentDate <= endDate) {
                if (currentDate.getDay() === day) { // Saturday has index 6
                    saturdays.push(new Date(currentDate));
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        
            return saturdays;
        },
        getAllSaturdays() {
            return this.getDays(6)
        },
        getAllSundays() {
            return this.getDays(0)
        },
        getDisabledDates(): any[] {
            return combineArrays(
                this.getAllSaturdays(),
                this.getAllSundays(),
                this.generateDisabledDates()
            )
        }
        
    },
    persist:true,

})