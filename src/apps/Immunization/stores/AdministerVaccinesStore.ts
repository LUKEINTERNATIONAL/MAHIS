import { defineStore } from "pinia";

export const useAdministerVaccineStore = defineStore('administerVaccineStore',{
    state: () => ({
      administeredVaccines: [] as any,
      currentSelectedDrug: null as any,
      currentMilestone: '' as any,
      currentMilestoneToAdminister: {},
      currentVisitId: '' as any,
      vaccineSchedule: {} as any,
      vaccineReload: false,
    }),
    actions:{
      setVaccineSchedule(data: any) {
        this.vaccineSchedule = data
      },
      getVaccineSchedule() {
          return this.vaccineSchedule
      },
      setCurrentVisitId(data: number) {
        this.currentVisitId = data
      },
      getCurrentVisitId() {
        return this.currentVisitId
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
      },
      setCurrentMilestoneToAdminister(data: any): void {
        this.currentMilestoneToAdminister = data
      },
      getCurrentMilestoneToAdminister() {
       return this.currentMilestoneToAdminister
      },
      setVaccineReload(value: boolean): void {
        this.vaccineReload = value
      },
      getVaccineReload(): boolean {
        return this.vaccineReload
      },
    },
    persist: true,
})