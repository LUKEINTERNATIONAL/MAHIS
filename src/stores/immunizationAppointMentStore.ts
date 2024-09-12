import { defineStore } from 'pinia'
import HisDate from "@/utils/Date";

export const useImmunizationAppointMentStore = defineStore('immunizationAppointMentStore', {
    state: () => ({
        selectedAppointmentMent: [] as any,
        selectedAppointmentMentForAppointmentsPage: '' as any,
        AppointmentsReload: false,
        startDate: HisDate.currentDate(),
        endDate: HisDate.currentDate(),
    }),
    actions: {
        getAppointmentMents(): any {
            return this.selectedAppointmentMent;
        },
        setAppointmentMent(appointment: any): void {
            this.selectedAppointmentMent.length = 0
            this.selectedAppointmentMent.push(appointment)

        },
        clearAppointmentMent() {
            this.selectedAppointmentMent.length = 0
        },
        getSelectedAppointmentMentForAppointmentsPage(): any {
            return this.selectedAppointmentMentForAppointmentsPage
        },
        setSelectedAppointmentMentForAppointmentsPage(appointment: any): void {
            this.selectedAppointmentMentForAppointmentsPage = appointment
        },
        setAppointmentsReload(value: boolean): void {
            this.AppointmentsReload = value;
        },
        getAppointmentsReload(): boolean {
            return this.AppointmentsReload;
        },
        setStartEndDate(Start: string, End: string): void {
            this.startDate = Start;
            this.endDate = End;
        },
        getStartEndDate(): any {
            return {
                startDate: this.startDate,
                endDate: this.endDate,
            }
        }

    }
})


