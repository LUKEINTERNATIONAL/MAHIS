import { defineStore } from "pinia";

export const useAdministerVaccineStore = defineStore('administerVaccineStore',{
    state: () => ({
      administeredVaccines: [] as any,
      currentSelectedDrug: null as any,
      currentMilestone: '' as any,
      vaccineSchedule: {
        vaccinSchedule: [
          {
            "visit": 1,
            "age": "At birth",
            "antigens": [
              {
                "drug_name": "BCG",
                "status": "Administered",
                "date_administered": "06-04-2024",
                "drug_id": 12
              },
              {
                "drug_name": "OPV0",
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
                "drug_name": "OPV1",
                "status": "pending",
                "date_administered": "",
                "drug_id": 14
              },
              {
                "drug_name": "Pentavalent 1",
                "status:": "pending",
                "date_administered": "",
                "drug_id": 15
              },
              {
                "drug_name": "PCV1",
                "status": "pending",
                "date_administered": "",
                "drug_id": 16
              },
              {
                "drug_name": "Rota 1",
                "status": "pending",
                "date_administered": "",
                "drug_id": 17
              }
            ]
          }
        ]
      }
    }),
    actions:{
      setVaccineSchedule(data: any) {
        this.vaccineSchedule = data
      },
      getVaccineSchedule() {
          return this.vaccineSchedule
      },
      setAdministeredVaccine(data: any) {
        this.administeredVaccines = []
        this.administeredVaccines.push(data)
      },
      getAdministeredVaccines() {
        return this.administeredVaccines
      },
      setCurrentSelectedDrug(visit_id: number, drug_id: number, drug_name: string): void {
          console.log(visit_id)
          console.log(drug_id)
          this.currentSelectedDrug = {
              visit_id: visit_id,
              drug_id: drug_id,
              drug_name: drug_name,
          }
      },
      getCurrentSelectedDrug() {
          return this.currentSelectedDrug
      },
      setCurrentMilestone(data: any): void {
        this.currentMilestone = data
      },
      getCurrentMilestone() {
        return this.currentMilestone
      }
    },
    persist: true,
})