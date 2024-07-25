import { defineStore } from 'pinia'

export const useImmunizationAppointMentStore = defineStore('immunizationAppointMentStore', {
    state: () => ({
        selectedAppointmentMent: [] as any,
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
        }
           
    }
})


