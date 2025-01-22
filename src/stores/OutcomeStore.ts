import { defineStore } from 'pinia'
import { OutcomeService } from "../../src/services/outcome_service";

export const useOutcomeStore = defineStore('outcome', {
    state: () => ({
        outcomes: [] as any,
    }),
    actions:{
        addOutcomeData(data: any, index: any) {
            if (isNaN(index)) {
                this.outcomes.splice(0, this.outcomes.length, data)
            } else {
                this.outcomes.splice(index, 1, data)
            }
        },
        async saveOutcomPatientData() {
            
            const mini_concept_id = [
                { other_name: "Referred", id: 6541, name: "Referred out" },
                { other_name: "Admitted", id: 7376, name: "Admitted for short stay" },
                { other_name: "Discharged home", id: 7445, name: "Discharged Home" },
            ];

            const get_concept_id = (name: string): number | undefined => {
                const concept = mini_concept_id.find(
                    (item) => item.name.toLowerCase() === name.toLowerCase() || item.other_name.toLowerCase() === name.toLowerCase()
                );
                return concept?.id;
            };

            const payload = [] as any;
            this.outcomes.forEach(async (data: any) => {
                payload.push({
                    concept_id: get_concept_id(data.type),
                    value_coded: 6538,
                    value_text: JSON.stringify(data),
                    obs_datetime: data.date.year + "-" + data.date.month + "-" + data.date.day,
                });
            })

            const outcomeService = new OutcomeService();
            return await outcomeService.createEncounter(payload as any);
        }
    },
    persist:true,
})

