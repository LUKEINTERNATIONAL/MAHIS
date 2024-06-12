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
      currentSchedFound: false,
      missedVaccineSchedules: [] as any, 
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
      setCurrentSchedFound(value: boolean): void {
        this.currentSchedFound = value
      },
      getCurrentSchedFound(): boolean {
        return this.currentSchedFound
      },
      setMissedVaccineSchedules(data: any): void {
        this.missedVaccineSchedules.push(data)
      },
      getMissedVaccineSchedules(): any {
        return this.missedVaccineSchedules
      },
      resetMissedVaccineSchedules(): void {
        this.missedVaccineSchedules = []
      },
      isVaccinePassed(): boolean {
        let bool = false
        this.vaccineSchedule.vaccinSchedule.forEach((vaccineSchudule: any) => {
          vaccineSchudule.antigens.forEach((vaccine: any) => {
              if (this.currentSelectedDrug.drug_id == vaccine.drug_id && vaccineSchudule.milestone_status=="passed") {
                bool = true
              }
          })
        })
        return bool
      }
    },
    persist: true,
})