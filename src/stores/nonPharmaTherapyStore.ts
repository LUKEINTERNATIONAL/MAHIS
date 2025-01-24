import { defineStore } from "pinia";
import { nonPharmaTherapyService } from "../../src/services/non_pharma_therapy_service";
import HisDate from "@/utils/Date";
import { Service } from "@/services/service";

export const useNonPharmaTherapyStore = defineStore("nonPharmaTherapyStore", {
    state: () => ({
        items: [
            { id: "wound-dressing", label: "Wound dressing", checked: false },
            { id: "patient-education", label: "Patient education", checked: false },
            { id: "counseling", label: "Counseling", checked: false },
            { id: "minor-surgery", label: "Minor Surgery", checked: false },
        ],
    }),
    actions: {
        async saveNonPharmaTherapyPatientData() {
            const payload = [] as any;
            this.items.forEach((data: any) => {
                if (data.checked == true) {
                    payload.push({
                        concept_id: 11023,
                        value_coded: 2592,
                        value_text: JSON.stringify(data),
                        obs_datetime: HisDate.toStandardHisFormat(Service.getSessionDate()),
                    });
                }
            })
            const outcomeService = new nonPharmaTherapyService();
            return await outcomeService.createEncounter(payload as any);
            }
    },
    persist: true,
});