import { defineStore } from "pinia";

export const useDemographicsStore = defineStore("demographicStore", {
    state: () => ({
        patient: {} as any,
    }),
    actions: {
        setPatient(data: any) {
            this.patient = data;
        },
        getPatient() {
            return this.patient;
        },
    },
    persist: true,
});
