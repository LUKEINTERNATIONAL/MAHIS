import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import { combineArrays, isSameDate, MalawiHolidayGenerator } from "@/utils/GeneralUti"
import { ProgramService } from "@/services/program_service"
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useUserStore } from "@/stores/userStore";
import { useGlobalPropertyStore } from "@/stores/GlobalPropertyStore";
import HisDate from "@/utils/Date";
import { Service } from '@/services/service'


export const useClinicalDaysStore = defineStore('ClinicalDaysStore', {
    state: () => ({
        holidayDates: [] as any,
        assignedAppointmentsDates: [] as any,
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
        setHolidayDates(data: any) {
            this.holidayDates = data
        },
        getHolidaydates() {
            return this.holidayDates
        },
        getHolidaydatesDataSize() {
            return this.holidayDates.length
        },
        generateDisabledDates(): Date[] {
            const today = new Date(Service.getSessionDate());
            today.setHours(0, 0, 0, 0);
        
            const disabledDates: Date[] = this.holidayDates
                .map((dateString: string) => new Date(dateString));
        
            // Add past dates to the disabled dates array
            const startDate = new Date(0); // Start from the earliest possible date
            for (let d = startDate; d < today; d.setDate(d.getDate() + 1)) {
                disabledDates.push(new Date(d));
            }
        
            return disabledDates;
        },
        getDays(day: number): Date[] {
            const startDate = new Date("2024-01-01");
            const endDate = new Date("2030-12-31");
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
                this.generateDisabledDates(),
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
        setsssignedAppointmentsDates(data: any, next_apt: boolean = false): void {
            const programID = ProgramService.getProgramID();
            const patientID = useDemographicsStore().getPatient().patient_id;

            if (Array.isArray(this.assignedAppointmentsDates)) {
                this.assignedAppointmentsDates.forEach((appointment) => {
                    appointment.markedNextApt = false;
                });
                if (!appointmentExists(this.assignedAppointmentsDates, programID, patientID, data)) {
                    this.assignedAppointmentsDates.push({
                        programID,
                        patientID,
                        date: data,
                        markedNextApt: next_apt,
                    });
                }
            } else {
                this.assignedAppointmentsDates = [];
            }
        },
        getAssignedAppointmentsDates() {
            return this.assignedAppointmentsDates
        },
        getAssignedAppointments() {
            if (Array.isArray(this.assignedAppointmentsDates)) {
                return getDateCounts(this.assignedAppointmentsDates)
            } else {
                return []
            }
        },
        async setWeekDaysPropertiesObj() {
            const user_store = useUserStore()
            const global_property_store = useGlobalPropertyStore()
            const facility_id = user_store.getfacilityLocation().location_id;
            const sv_obj = {
                facility_id: facility_id,
                weekDays: {
                    'areMondaysDisabled': this.areMondaysDisabled,
                    'areTuesdaysDisabled': this.areTuesdaysDisabled,
                    'areWednesdaysDisabled': this.areWednesdaysDisabled,
                    'areThursdaysDisabled': this.areThursdaysDisabled,
                    'areFridaysDisabled': this.areFridaysDisabled,
                    'areSaturdaysDisabled': this.areSaturdaysDisabled,
                    'areSundaysDisabled': this.areSundaysDisabled,
                }
            }
            const sv_obj_string = JSON.stringify(sv_obj);
            await global_property_store.setGlobalProperty("week_days_properties_"+facility_id, `${sv_obj_string}`);
        },
        async setMaximumNumberOfDaysForEachDayObj() {
            const user_store = useUserStore()
            const global_property_store = useGlobalPropertyStore()
            const facility_id = user_store.getfacilityLocation().location_id;
            const sv_obj = {
                facility_id: facility_id,
                maximumNumberOfDaysForEachDay: this.maximumNumberOfDaysForEachDay
            }
            const sv_obj_string = JSON.stringify(sv_obj);
            await global_property_store.setGlobalProperty("maximum_number_Of_c_for_each_day_"+facility_id, `${sv_obj_string}`);
        },
        async setHolidayDatesObj() {
            const user_store = useUserStore()
            const facility_id = user_store.getfacilityLocation().location_id;
            const global_property_store = useGlobalPropertyStore()
            const dates = this.holidayDates.map((holiday: any) => {
                return HisDate.toStandardHisFormat(holiday);
            });            
            const sv_obj = {
                facility_id: facility_id,
                holidayDates: dates,
            }
            const sv_obj_string = JSON.stringify(sv_obj);
            await global_property_store.setGlobalProperty("holiday_date_"+facility_id, `${sv_obj_string}`);
        },
        autoGeneratedDates(): any[] {
            const h_dates = getAutoGeneratedDates();
            const uniqueDates = new Set(this.holidayDates);
            h_dates.forEach((hdate: any) => {
                uniqueDates.add(hdate.date);
            });
            this.holidayDates = Array.from(uniqueDates);
            return this.holidayDates;
        }
    },
    persist:true,
})

function appointmentExists(appointments: any, programID: number, patientID: number, date: Date) {
    return appointments.some((appointment: any) => 
        appointment.programID === programID &&
        appointment.patientID === patientID &&
        isSameDate(new Date(appointment.date), new Date(date))
    );
}

function getDateCounts(appointments: any) {
    const dateCountMap = new Map();
    appointments.forEach((appointment: any) => {
        const dateKey = new Date(appointment.date).toISOString().split('T')[0];
        if (dateCountMap.has(dateKey)) {
            dateCountMap.set(dateKey, dateCountMap.get(dateKey) + 1);
        } else {
            dateCountMap.set(dateKey, 1);
        }
    })
    const dateCountsArray = Array.from(dateCountMap, ([date, count]) => ({ date, count }));
    return dateCountsArray;
}

function getAutoGeneratedDates() {
    const holidayGenerator = new MalawiHolidayGenerator();
    const holidayDates = holidayGenerator.generateFormattedHolidayDates();
    return holidayDates
}