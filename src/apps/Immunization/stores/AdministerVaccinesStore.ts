import { defineStore } from "pinia";

export const useAdministerVaccineStore = defineStore("administerVaccineStore", {
    state: () => ({
        vaccineSchedule: [
            {
              "visit": 1,
              "age": "At birth",
              "antigens": [
                {
                  "name": "BCG",
                  "status": "Administered",
                  "date_administered": "06-04-2024"
                },
                {
                  "name": "OPV0",
                  "status": "missed",
                  "date_administered": ""
                }
              ]
            },
            {
              "visit": 2,
              "age": "6 weeks",
              "antigens": [
                {
                  "name": "OPV1",
                  "status": "pending",
                  "date_administered": ""
                },
                {
                  "name": "Pentavalent 1",
                  "status:": "pending",
                  "date_administered": ""
                },
                {
                  "name": "PCV1",
                  "status": "pending",
                  "date_administered": ""
                },
                {
                  "name": "Rota 1",
                  "status": "pending",
                  "date_administered": ""
                }
              ]
            }
          ] as any,
    }),
    actions: {
        setVaccineSchedule(data: any) {

        }
    },
    // persist: true,
});
