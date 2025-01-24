import { defineStore } from "pinia";

export const useNonPharmaTherapyStore = defineStore("nonPharmaTherapyStore", {
    state: () => ({
        items: [
            { id: "wound-dressing", label: "Wound dressing", checked: false },
            { id: "patient-education", label: "Patient education", checked: false },
            { id: "counseling", label: "Counseling", checked: false },
            { id: "minor-surgery", label: "Minor Surgery", checked: false },
        ],
    }),
    actions: {},
    persist: true,
});