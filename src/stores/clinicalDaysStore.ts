import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import { combineArrays } from "@/utils/GeneralUti"

export const useClinicalDaysStore = defineStore('ClinicalDaysStore', {
    state: () => ({
        holidayDates: [] as any,
        maximumNumberOfDaysForEachDay: 0 as number,
        areMondaysDisabled: false as boolean,
        areTuesdaysDisabled: false as boolean,
        areWednesdaysDisabled: false as boolean,
        areThursdaysDisabled: false as boolean,
        areFridaysDisabled: false as boolean,
        areSaturdaysDisabled: false as boolean,
        areSundaysDisabled: false as boolean,
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
            const startDate = new Date("2024-01-01");
            const endDate = new Date("2024-12-31");
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
            if (this.areSaturdaysDisabled == false) {
                return this.getDays(6)
            }
            else if (this.areSaturdaysDisabled == true) {
                return []
            }
        },
        getAllSundays() {
            if (this.areSundaysDisabled == false) {
                return this.getDays(0);
            } else if (this.areSundaysDisabled == true) {
                return [];
            }
        },
        getAllMondays() {
            if (this.areMondaysDisabled == false) {
                return this.getDays(1);
            } else if (this.areMondaysDisabled == true) {
                return [];
            }
        },
        getAllTuesdays() {
            if (this.areTuesdaysDisabled == false) {
                return this.getDays(2);
            } else if (this.areTuesdaysDisabled == true) {
                return [];
            }
        },
        getAllWednesdays() {
            if (this.areWednesdaysDisabled == false) {
                return this.getDays(3);
            } else if (this.areWednesdaysDisabled == true) {
                return [];
            }
        },
        getAllThursdays() {
            if (this.areThursdaysDisabled == false) {
                return this.getDays(4);
            } else if (this.areThursdaysDisabled == true) {
                return [];
            }
        },
        getAllFridays() {
            if (this.areFridaysDisabled == false) {
                return this.getDays(5);
            } else if (this.areFridaysDisabled == true) {
                return [];
            }
        },
        getDisabledDates(): any[] {
            return combineArrays(
                this.getAllMondays() as any,
                this.getAllTuesdays() as any,
                this.getAllWednesdays() as any,
                this.getAllThursdays() as any,
                this.getAllFridays() as any,
                this.getAllSaturdays() as any,
                this.getAllSundays() as any,
                this.generateDisabledDates()
            )
        },
        getDisabledDates2(): any[] {
            return combineArrays(
                this.getAllMondays() as any,
                this.getAllTuesdays() as any,
                this.getAllWednesdays() as any,
                this.getAllThursdays() as any,
                this.getAllFridays() as any,
                this.getAllSaturdays() as any,
                this.getAllSundays() as any,
            )
        },
        setMaximumNumberOfDaysForEachDay(num: number): void {
            this.maximumNumberOfDaysForEachDay = num
        },
        getMaximumNumberOfDaysForEachDay(): number {
            return this.maximumNumberOfDaysForEachDay
        },
        setAreMondaysDisabled(disabled: boolean): void {
            this.areMondaysDisabled = disabled
        },
        getAreMondaysDisabled(): boolean {
            return this.areMondaysDisabled
        },
        setAreTuesdaysDisabled(disabled: boolean): void {
            this.areTuesdaysDisabled = disabled;
        },
        getAreTuesdaysDisabled(): boolean {
            return this.areTuesdaysDisabled;
        },
        setAreWednesdaysDisabled(disabled: boolean): void {
            this.areWednesdaysDisabled = disabled;
        },
        getAreWednesdaysDisabled(): boolean {
            return this.areWednesdaysDisabled;
        },
        setAreThursdaysDisabled(disabled: boolean): void {
            this.areThursdaysDisabled = disabled;
        },
        getAreThursdaysDisabled(): boolean {
            return this.areThursdaysDisabled;
        },
        setAreFridaysDisabled(disabled: boolean): void {
            this.areFridaysDisabled = disabled;
        },
        getAreFridaysDisabled(): boolean {
            return this.areFridaysDisabled;
        },
        setAreSaturdaysDisabled(disabled: boolean): void {
            this.areSaturdaysDisabled = disabled;
        },
        getAreSaturdaysDisabled(): boolean {
            return this.areSaturdaysDisabled;
        },
        setAreSundaysDisabled(disabled: boolean): void {
            this.areSundaysDisabled = disabled;
        },
        getAreSundaysDisabled(): boolean {
            return this.areSundaysDisabled;
        },
    },
    persist:true,

})