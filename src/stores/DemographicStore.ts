import { defineStore } from "pinia";

export const useDemographicsStore = defineStore("demographicStore", {
    state: () => ({
        demographics: {} as any,
        patient: {} as any,
    }),
    actions: {
        setDemographics(data: any) {
            this.demographics = data;
        },
        setPatient(data: any) {
            this.patient = data;
        },
        getPatient() {
            return this.patient;
        },
    },
    persist: true,
});
