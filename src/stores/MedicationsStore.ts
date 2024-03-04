import { defineStore } from "pinia";

export const useMedicationsStore = defineStore("medicationsStore", {
    state: () => ({
        medications: [] as any,
    }),
    actions: {
        setMedications(data: any) {
            this.medications = data;
        },
    },
    persist: true,
});
