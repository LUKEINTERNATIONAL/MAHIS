import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

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
        }
    },
    persist:true,

})