import { defineStore } from "pinia";

export const useAdministerVaccineStore = defineStore('administerVaccineStore',{
    state: () => ({
      administeredVaccines: [] as any,
      currentSelectedDrug: null as any,
      vaccineSchedule: [
          {
            "visit": 1,
            "age": "At birth",
            "antigens": [
              {
                "name": "BCG",
                "status": "Administered",
                "date_administered": "06-04-2024",
                "drug_id": 12
              },
              {
                "name": "OPV0",
                "status": "missed",
                "date_administered": "",
                "drug_id": 13
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
                "date_administered": "",
                "drug_id": 14
              },
              {
                "name": "Pentavalent 1",
                "status:": "pending",
                "date_administered": "",
                "drug_id": 15
              },
              {
                "name": "PCV1",
                "status": "pending",
                "date_administered": "",
                "drug_id": 16
              },
              {
                "name": "Rota 1",
                "status": "pending",
                "date_administered": "",
                "drug_id": 17
              }
            ]
          }
        ] as any,
    }),
    actions:{
      setVaccineSchedule(data: any) {

      },
      getVaccineSchedule() {
          return this.vaccineSchedule
      },
      setAdministeredVaccine(data: any) {
        this.administeredVaccines.push(data)
      },
      getAdministeredVaccines() {
        return this.administeredVaccines
      },
      setCurrentSelectedDrug(visit_id: number, drug_id: number): void {
          console.log(visit_id)
          console.log(drug_id)
          this.currentSelectedDrug = {
              visit_id: visit_id,
              drug_id: drug_id
          }
      },
      getCurrentSelectedDrug() {
          return this.currentSelectedDrug
      }
    },
    persist: true,
})